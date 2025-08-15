// src/mysme_admin/QRScannerDashboard.js
import React from 'react';
import QRScanner from './QRScanner';
import '../styles/QRScannerDashboard.css';
import smeCropped from "../components/assets/SME_cropped.png";

const QRScannerDashboard = () => {
    return (
        <div className="dashboard-container">
            <img
                src={smeCropped}
                alt="Sasnaka Sansada A/L Mock Exam 2025"
                className="hero-title-image-qr"
            />
            <div className="dashboard-header">
                <h1>Verify MyQR</h1>
                <p>Scan candidate's QR code to verify identity and mark attendance for the day</p>
            </div>

            <div className="dashboard-content">
                <QRScanner />

                {/*<div className="instructions-panel">*/}
                {/*    <h3>Instructions</h3>*/}
                {/*    <ol>*/}
                {/*        <li>Position the candidate's QR code in front of the camera</li>*/}
                {/*        <li>Hold steady until the code is scanned</li>*/}
                {/*        <li>Verify the returned exam index number with the candidate</li>*/}
                {/*        <li>Click "Scan Another" to continue with the next candidate</li>*/}
                {/*    </ol>*/}

                {/*    <div className="note">*/}
                {/*        <strong>Note:</strong> Make sure you have camera permissions enabled in your browser.*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default QRScannerDashboard;