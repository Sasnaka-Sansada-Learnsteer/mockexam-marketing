// src/mysme_admin/QRScannerDashboard.js
import React from 'react';
import QRScanner from './QRScanner';
import '../styles/QRScannerDashboard.css';

const QRScannerDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>QR Code Verification Dashboard</h1>
                <p>Scan candidate QR codes to verify their identity and retrieve their exam index number</p>
            </div>

            <div className="dashboard-content">
                <QRScanner />

                <div className="instructions-panel">
                    <h3>Instructions</h3>
                    <ol>
                        <li>Position the candidate's QR code in front of the camera</li>
                        <li>Hold steady until the code is scanned</li>
                        <li>Verify the returned exam index number with the candidate</li>
                        <li>Click "Scan Another" to continue with the next candidate</li>
                    </ol>

                    <div className="note">
                        <strong>Note:</strong> Make sure you have camera permissions enabled in your browser.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRScannerDashboard;