// src/components_mysme/QRScanner.js
import React, {useEffect, useState} from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import '../styles/QRScanner.css';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scanner, setScanner] = useState(null);

    useEffect(() => {
        // Initialize scanner after component is mounted and DOM is ready
        let qrScanner = null;

        // Small timeout to ensure DOM is ready
        const timerId = setTimeout(() => {
            try {
                qrScanner = new Html5QrcodeScanner(
                    "qr-reader",
                    {
                        fps: 10,
                        qrbox: 250,
                        disableFlip: false
                    }
                );

                qrScanner.render(onScanSuccess, onScanError);
                setScanner(qrScanner);
            } catch (err) {
                console.error("Scanner initialization error:", err);
                setError("Failed to initialize camera scanner");
            }
        }, 100);

        // Cleanup
        return () => {
            clearTimeout(timerId);
            if (qrScanner) {
                qrScanner.clear().catch(error => {
                    console.error("Failed to clear scanner", error);
                });
            }
        };
    }, []);

    const onScanSuccess = async (decodedText) => {
        // Stop scanning
        if (scanner) {
            await scanner.clear();
        }

        setLoading(true);

        try {
            // The QR contains the examIndexNumber
            const examIndexNumber = decodedText;

            // Call backend to verify the QR code
            const response = await axios.get(`https://sme-api-04db435264b2.herokuapp.com/api/qrcode/verify-qr/${examIndexNumber}`);

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
            setError('Failed to verify QR code');
            setScanResult({
                success: false,
                message: err.response?.data?.error || 'Failed to verify QR code'
            });
        } finally {
            setLoading(false);
        }
    };

    const onScanError = (err) => {
        console.error(err);
        setError('Error accessing camera');
    };

    const resetScanner = () => {
        setScanResult(null);
        setError(null);

        // Clear previous scanner
        if (scanner) {
            scanner.clear().catch(error => {
                console.error("Failed to clear scanner", error);
            });
        }
        // Reinitialize scanner
        setTimeout(() => {
            try {
                const newScanner = new Html5QrcodeScanner(
                    "qr-reader",
                    {
                        fps: 10,
                        qrbox: 250,
                        disableFlip: false
                    }
                );

                newScanner.render(onScanSuccess, onScanError);
                setScanner(newScanner);
            } catch (err) {
                console.error("Scanner reinitialization error:", err);
                setError("Failed to reinitialize camera scanner");
            }
        }, 100);
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

            {/*{loading && (*/}
            {/*    <div className="scanner-loading">*/}
            {/*        /!*<p>Verifying QR code...</p>*!/*/}
            {/*    </div>*/}
            {/*)}*/}

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