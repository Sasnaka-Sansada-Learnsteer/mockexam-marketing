// src/mysme_admin/QRScanner.js
import React, {useEffect, useState, useRef} from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import '../styles/QRScanner.css';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scanner, setScanner] = useState(null);
    const [scannerActive, setScannerActive] = useState(true); // Track scanner active state
    const isProcessingScan = useRef(false);
    const isScanning = useRef(false); // Track if currently scanning

    // Create a ref for onScanSuccess to keep it stable across renders
    const onScanSuccessRef = useRef(async (decodedText) => {
        console.log("QR code scanned:", decodedText);

        // Prevent multiple simultaneous processing of the same QR code
        if (isProcessingScan.current || !scannerActive || isScanning.current) {
            console.log("Already processing a scan or scanner inactive, ignoring this scan");
            return;
        }

        isProcessingScan.current = true;
        isScanning.current = true;
        setScannerActive(false); // Disable scanner

        // Stop scanning immediately to prevent further detections
        if (scanner) {
            try {
                console.log("Stopping scanner after successful scan");
                await scanner.clear();

                // Also pause the camera stream to completely stop scanning
                const cameraElement = document.querySelector('video');
                if (cameraElement && cameraElement.srcObject) {
                    const tracks = cameraElement.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                    cameraElement.srcObject = null;
                }

                // Remove the scanner element completely
                const scannerContainer = document.getElementById("qr-reader");
                if (scannerContainer) {
                    scannerContainer.innerHTML = "";
                }
            } catch (err) {
                console.error("Error clearing scanner:", err);
            }
        }

        setLoading(true);
        setError(null);

        try {
            // Extract the examIndexNumber from the QR code content
            const examIndexNumber = extractExamIndexNumber(decodedText);
            console.log("Extracted exam index number:", examIndexNumber);

            // If no exam index number found, show error
            if (!examIndexNumber) {
                setScanResult({
                    success: false,
                    message: 'Could not extract a valid exam index number'
                });
                return;
            }

            // Call backend to verify the QR code
            console.log("Calling verify-qr API endpoint");
            const response = await axios.get(`https://sme-api-04db435264b2.herokuapp.com/api/qrcode/verify-qr/${examIndexNumber}`);
            console.log("API response:", response.data);

            if (response.data.verified) {
                setScanResult({
                    success: true,
                    examIndexNumber: response.data.examIndexNumber
                });
            } else {
                setScanResult({
                    success: false,
                    message: 'Invalid QR code'
                });
            }
        } catch (err) {
            console.error("QR verification error:", err);
            setError('Failed to verify QR code');
            setScanResult({
                success: false,
                message: err.response?.data?.error || 'Failed to verify QR code'
            });
        } finally {
            setLoading(false);
            isProcessingScan.current = false;
        }
    });

    // Error handler ref
    const onScanErrorRef = useRef((err) => {
        // Only log actual errors, not just camera switching messages
        if (err !== "User denied camera permission" &&
            !err.includes("Not found") &&
            !err.includes("camera access is suspended")) {
            console.error("QR scanner error:", err);
            setError('Error accessing camera');
        }
    });

    useEffect(() => {
        // Initialize scanner after component is mounted and DOM is ready
        let qrScanner = null;

        // Only initialize scanner if no scan result is displayed and scanner is active
        if (!scanResult && !loading && scannerActive && !isScanning.current) {
            // Small timeout to ensure DOM is ready
            const timerId = setTimeout(() => {
                try {
                    console.log("Initializing QR scanner");
                    qrScanner = new Html5QrcodeScanner(
                        "qr-reader",
                        {
                            fps: 10,
                            qrbox: 250,
                            disableFlip: false,
                            rememberLastUsedCamera: true,
                        }
                    );

                    qrScanner.render(onScanSuccessRef.current, onScanErrorRef.current);
                    setScanner(qrScanner);
                    console.log("QR Scanner initialized successfully");
                } catch (err) {
                    console.error("Scanner initialization error:", err);
                    setError("Failed to initialize camera scanner");
                }
            }, 100);

            // Cleanup
            return () => {
                console.log("Cleaning up QR Scanner");
                clearTimeout(timerId);
                if (qrScanner) {
                    try {
                        qrScanner.clear().catch(error => {
                            console.error("Failed to clear scanner", error);
                        });

                        // Also ensure camera is stopped
                        const cameraElement = document.querySelector('video');
                        if (cameraElement && cameraElement.srcObject) {
                            const tracks = cameraElement.srcObject.getTracks();
                            tracks.forEach(track => track.stop());
                            cameraElement.srcObject = null;
                        }
                    } catch (err) {
                        console.error("Error during scanner cleanup:", err);
                    }
                }
            };
        }

        // Return an empty cleanup function if we didn't initialize
        return () => {};
    }, [scanResult, loading, scannerActive]);

    const extractExamIndexNumber = (text) => {
        // Check if text is a URL
        try {
            // If it's a URL containing code parameter, extract it
            if (text.includes('?code=')) {
                const url = new URL(text);
                const examIndexNumber = url.searchParams.get('code');
                return examIndexNumber;
            }

            // If not a URL or doesn't have code parameter, return as is
            return text;
        } catch (e) {
            // If URL parsing fails, return the original text
            return text;
        }
    };

    const resetScanner = () => {
        console.log("Resetting scanner");
        setScanResult(null);
        setError(null);
        isProcessingScan.current = false;
        isScanning.current = false;

        // Clear previous scanner
        if (scanner) {
            try {
                console.log("Clearing existing scanner");
                scanner.clear().catch(error => {
                    console.error("Failed to clear scanner", error);
                });

                // Ensure camera is stopped
                const cameraElement = document.querySelector('video');
                if (cameraElement && cameraElement.srcObject) {
                    const tracks = cameraElement.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                    cameraElement.srcObject = null;
                }
            } catch (err) {
                console.error("Error clearing scanner:", err);
            }
            // Set scanner to null to avoid issues with multiple instances
            setScanner(null);
        }

        // Clean up the DOM element
        const existingElement = document.getElementById("qr-reader");
        if (existingElement) {
            console.log("Cleaning up existing HTML elements");
            existingElement.innerHTML = "";
        }

        // Re-enable scanner with a delay
        setTimeout(() => {
            setScannerActive(true);
        }, 500);
    };

    return (
        <div className="qr-scanner-container">
            <h2>Candidate QR Code Scanner</h2>

            {error && (
                <div className="scanner-error">
                    <p>{error}</p>
                    <button onClick={resetScanner}>Try Again</button>
                </div>
            )}

            {loading && (
                <div className="scanner-loading">
                    <p>Verifying QR code...</p>
                </div>
            )}

            {!scanResult && !loading && (
                <div className="scanner-active">
                    <p>Please position the QR code in front of the camera</p>
                    <div id="qr-reader" className="scanner-frame"></div>
                </div>
            )}

            {scanResult && (
                <div className={`scan-result ${scanResult.success ? 'success' : 'error'}`}>
                    {scanResult.success ? (
                        <>
                            <h3>QR Code Verified!</h3>
                            <p><strong>Exam Index Number:</strong> {scanResult.examIndexNumber}</p>
                        </>
                    ) : (
                        <>
                            <h3>Verification Failed</h3>
                            <p>{scanResult.message}</p>
                        </>
                    )}
                    <button onClick={resetScanner}>Scan Another</button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;