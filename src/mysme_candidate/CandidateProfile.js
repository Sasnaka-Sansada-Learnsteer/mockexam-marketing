import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/candidate.css';
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import CandidatePopup from "./CandidatePopup";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CandidateProfile = () => {
    // --- All state and hooks must be at the top level of the component ---
    const [candidateData, setCandidateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loadResultsDirectly, setLoadResultsDirectly] = useState(false);

    // --- useEffects ---
    useEffect(() => {
        const fetchCandidateData = async () => {
            const token = localStorage.getItem('candidateToken');
            if (!token) {
                navigate('/mysme/login');
                return;
            }
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/candidate/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCandidateData(response.data);
            } catch (err) {
                console.error('Error fetching candidate data:', err);
                setError('Failed to load profile data. Please try again later.');
                if (err.response?.status === 401) {
                    localStorage.removeItem('candidateToken');
                    localStorage.removeItem('userRole');
                    navigate('/mysme/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCandidateData();
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPopupVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // --- All helper functions must be INSIDE the component to access state/hooks ---
    const handleLogout = () => {
        localStorage.removeItem('candidateToken');
        localStorage.removeItem('userRole');
        navigate('/mysme/login');
    };

    const downloadQRCode = () => {
        // This function can now safely access `candidateData`
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const scale = 4;
            canvas.width = img.width * scale;
            canvas.height = (img.height + 40) * scale;
            ctx.scale(scale, scale);
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 20px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillText(`${candidateData.candidate.examIndexNumber}`, img.width / 2, img.height + 20);
            const imageData = canvas.toDataURL('image/png', 1.0);
            import('jspdf').then((jsPDFModule) => {
                const { default: jsPDF } = jsPDFModule;
                const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                pdf.setFontSize(16);
                pdf.text('MySME25 QR Code', 105, 20, { align: 'center' });
                pdf.setFontSize(12);
                pdf.text(`Candidate: ${candidateData.candidate["Full Name"]}`, 105, 30, { align: 'center' });
                pdf.text(`Exam Index: ${candidateData.candidate.examIndexNumber}`, 105, 40, { align: 'center' });
                const imgWidth = 100;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                pdf.addImage(imageData, 'PNG', (210 - imgWidth) / 2, 50, imgWidth, imgHeight);
                pdf.setFontSize(10);
                pdf.text('Please bring this QR code to the examination center to mark your attendance', 105, 50 + imgHeight + 10, { align: 'center' });
                pdf.save(`${candidateData.candidate.examIndexNumber}_MySME25_QRCode.pdf`);
                setDownloadSuccess(true);
                setTimeout(() => setDownloadSuccess(false), 3000);
            });
        };
        img.src = candidateData.candidate['qrCode'];
    };

    const handleShowResultsClick = () => {
        setIsPopupVisible(true);
        setLoadResultsDirectly(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setLoadResultsDirectly(false);
    };


    // --- Early returns for loading/error states ---
    if (loading) {
        return <div className="loading">Loading profile data...</div>;
    }
    if (error) {
        return <div className="error-container">{error}</div>;
    }
    if (!candidateData) {
        return <div className="error-container">Unable to load profile data</div>;
    }

    // --- Final JSX return ---
    return (
        <div className="candidate-profile-container">
            <div className="profile-header">
                <h2>MySME Profile</h2>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>

            <div className="profile-content">
                <div className="candidate-details">
                    <h3>My Information</h3>
                    <div className="detail-item">
                        <span className="label">NIC:</span>
                        <span className="value">{candidateData.candidate["NIC"]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Full Name:</span>
                        <span className="value">{candidateData.candidate["Full Name"]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">School:</span>
                        <span className="value">{candidateData.candidate["School "]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Subject Stream:</span>
                        <span className="value">{candidateData.candidate["Subject Stream"]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Preferred Exam Center:</span>
                        <span className="value">{candidateData.candidate["Preferred Exam Center"]}</span>
                    </div>
                </div>

                <div className="eligible-papers">
                    <h3>My Exam Papers</h3>
                    {candidateData.candidate.confirmed_papers?.length > 0 ? (
                        <ul>
                            {candidateData.candidate.confirmed_papers.map((paper, index) => (
                                <li key={index}>{paper}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No eligible papers found</p>
                    )}
                </div>

                <div className="exam-info-card">
                    <h3>My Exam Information</h3>
                    {(!candidateData.candidate.examIndexNumber || !candidateData.candidate['qrCode']) ? (
                        <div className="error-container">
                            Your Participation is not confirmed yet
                        </div>
                    ) : (
                        <>
                            <div className="detail-item highlight">
                                <span className="label">Exam Index Number:</span>
                                <span className="value">{candidateData.candidate.examIndexNumber}</span>
                            </div>
                            <button
                                className={`check-results-btn`}
                                onClick={handleShowResultsClick}
                            >
                                <i className="fas fa-chart-line"></i> Check My Results
                            </button>
                        </>
                    )}
                </div>
            </div>
            <CandidatePopup
                visible={isPopupVisible}
                onClose={handleClosePopup}
                loadOnOpen={loadResultsDirectly}
            />
            <FloatingWhatsApp phoneNumber="94703445342" />
        </div>
    );
};

export default CandidateProfile;