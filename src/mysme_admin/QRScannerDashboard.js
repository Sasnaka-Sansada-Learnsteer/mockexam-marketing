// src/mysme_admin/QRScannerDashboard.js
import React, {useEffect, useState} from 'react';
import QRScanner from './QRScanner';
import '../styles/QRScannerDashboard.css';
import smeCropped from "../components/assets/SME_cropped.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const QRScannerDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');

        if (!token) {
            navigate('/admin/login');
            return;
        }
    },[navigate]);


    const handleLogout = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`${API_BASE_URL}/api/admin/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Clear local storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('panelId');
            // Don't remove deviceId as it's used for device tracking

            setLoading(false);

            // Redirect to login
            navigate('/admin/login');
        }
    };

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
                <button
                    onClick={handleLogout}
                    className="btn-logout"
                    disabled={loading}
                >
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
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