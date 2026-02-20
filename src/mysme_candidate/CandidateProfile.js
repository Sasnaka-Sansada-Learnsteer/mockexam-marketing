import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/candidate.css';
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import SurveyPopup from "./SurveyPopup";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CandidateProfile = () => {
    const [candidateData, setCandidateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loadResultsDirectly, setLoadResultsDirectly] = useState(false);
    const [resultsExpanded, setResultsExpanded] = useState(false);
    const [resultsData, setResultsData] = useState(null);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [resultsError, setResultsError] = useState('');
    const [surveyVisible, setSurveyVisible] = useState(false);
    const [surveyPage, setSurveyPage] = useState(1);
    const [progressValue, setProgressValue] = useState(0);
    const [showingResultMessages, setShowingResultMessages] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const [surveyCompleted, setSurveyCompleted] = useState(false);
    const [checkResultsClickCount, setCheckResultsClickCount] = useState(0);

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

                if (response.data.success === false) {
                    localStorage.removeItem('candidateToken');
                    localStorage.removeItem('userRole');
                    navigate('/mysme/login');
                    return;
                }

                setCandidateData(response.data);
                setCheckResultsClickCount(response.data.candidate.check_results_button_clicks_count || 0);
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
        setResultsExpanded(!resultsExpanded);
        if (!resultsExpanded && !resultsData) {
            checkAndFetchResults();
        }
    };

    const checkAndFetchResults = async () => {
        const token = localStorage.getItem('candidateToken');
        if (!token) return;

        setResultsLoading(true);
        try {
            // Check if this is the first time checking results
            if (checkResultsClickCount === 0 && !surveyCompleted) {
                // First time - show survey
                setSurveyVisible(true);
                startProgressBar();
                setResultsLoading(false);
            } else {
                // Not first time - show results directly
                const response = await axios.get(
                    `${API_BASE_URL}/api/candidate/results`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: 10000
                    }
                );

                if (response.data.success === false) {
                    throw new Error('Failed to load results');
                }
                setResultsData(response.data);
                setResultsLoading(false);
            }
        } catch (err) {
            console.error('Error fetching results:', err);
            setResultsError('Failed to load results data');
            setResultsLoading(false);
        }
    };


    const startProgressBar = () => {
        const interval = setInterval(() => {
            setProgressValue(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + (100 / 120); // Fill in 2 minutes (120 seconds)
            });
        }, 1000);
    };

    const handleSurveyComplete = () => {
        setSurveyVisible(false);
        setSurveyCompleted(true);
        setShowingResultMessages(true);
        setResultsExpanded(true);

        const messages = [
            "Loading results. . ."
        ];

        let index = 0;
        setResultMessage(messages[0]);

        // Start fetching results immediately with retry mechanism
        fetchActualResultsWithRetry();

        const messageInterval = setInterval(() => {
            index++;
            if (index >= messages.length) {
                clearInterval(messageInterval);
                setTimeout(() => {
                    setShowingResultMessages(false);
                    setResultsLoading(false);
                }, 1000);
            } else {
                setResultMessage(messages[index]);
            }
        }, 3000); // Change message every 3 seconds
    };

    const fetchActualResultsWithRetry = async (retryCount = 0, maxRetries = 5) => {
        const token = localStorage.getItem('candidateToken');
        if (!token) return;

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/candidate/results`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: 10000 // 10 second timeout
                }
            );

            if (response.data.success === false) {
                throw new Error('Failed to load results');
            }

            setResultsData(response.data);
            setResultsError('');
        } catch (err) {
            console.error(`Error fetching results (attempt ${retryCount + 1}):`, err);
            if (retryCount < maxRetries) {
                // Exponential backoff: 1s, 2s, 4s, 8s, 16s
                const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 16000);
                console.log(`Retrying in ${backoffDelay}ms...`);

                setTimeout(() => {
                    fetchActualResultsWithRetry(retryCount + 1, maxRetries);
                }, backoffDelay);
            } else {
                setResultsError('Failed to load results data after multiple attempts');
                setResultsLoading(false);
            }
        }
    };

    const CandidateResults = ({ data, loading, error }) => {
        if (error) return <div className="results-error">{error}</div>;
        if (!data || !data.results) return null;

        const { results } = data;

        return (
            <div className="results-content">
                <h3>My Exam Results</h3>
                {/* Rankings Section */}
                <div className="results-summary">
                    <div className="summary-item">
                        <span className="label">District Rank:</span>
                        <span className="value">{results.district_rank}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Island Rank:</span>
                        <span className="value">{results.island_rank}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Z-Score:</span>
                        <span className="value">{results.final_zscore}</span>
                    </div>
                </div>

                {/* Grades Section */}
                <div className="results-grades">
                    {results.bio_grade ? (
                        <div className="grade-item">
                            <span className="subject-label">BIOLOGY:</span>
                            <span className="grade-value">{results.bio_grade}</span>
                        </div>
                    ) : results.maths_grade ? (
                        <div className="grade-item">
                            <span className="subject-label">COMBINED MATHS:</span>
                            <span className="grade-value">{results.maths_grade}</span>
                        </div>
                    ) : null}
                    <div className="grade-item">
                        <span className="subject-label">PHYSICS:</span>
                        <span className="grade-value">{results.physics_grade}</span>
                    </div>
                    <div className="grade-item">
                        <span className="subject-label">CHEMISTRY:</span>
                        <span className="grade-value">{results.chemistry_grade}</span>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="loading">Loading profile data...</div>;
    }
    if (error) {
        return <div className="error-container">{error}</div>;
    }
    if (!candidateData) {
        return <div className="error-container">Unable to load profile data</div>;
    }

    return (
        <div className="candidate-profile-container">
            {surveyVisible && (
                <SurveyPopup
                    surveyPage={surveyPage}
                    setSurveyPage={setSurveyPage}
                    progressValue={progressValue}
                    setProgressValue={setProgressValue}
                    onComplete={handleSurveyComplete}
                />
            )}

            <div className="profile-header">
                <h2>MySME Profile</h2>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>

            {/*candidateData.candidate.results_released && (
                <div className={`check-results-btn-container ${resultsExpanded ? 'expanded' : ''}`}>
                    <button
                        className={`check-results-btn`}
                        onClick={handleShowResultsClick}
                    > {resultsExpanded ? 'Hide Results' : 'Check Results'}
                    </button>

                    {resultsExpanded && showingResultMessages && (
                        <div className="loading-results-message">
                            <div className="water-bubble">
                                <div className="water-fill"></div>
                            </div>
                            <p className="result-message-text">{resultMessage}</p>
                        </div>
                    )}

                    {resultsExpanded && !showingResultMessages && (
                        <CandidateResults
                            data={resultsData}
                            loading={resultsLoading}
                            error={resultsError}
                        />
                    )}
                </div>
            )*/}

            <div className="profile-content">
                <div className="candidate-details">
                    <h3>My Information</h3>
                    <div className="detail-item">
                        <span className="label">NIC :</span>
                        <span className="value">{candidateData.candidate["NIC"]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Full Name :</span>
                        <span className="value">{candidateData.candidate["Full Name"]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">School :</span>
                        <span className="value">{candidateData.candidate["School "]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Subject Stream :</span>
                        <span className="value">{candidateData.candidate["Subject Stream"]}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Preferred Exam Center :</span>
                        <span className="value">{candidateData.candidate["Preferred Exam Center"]}</span>
                    </div>
                </div>
        </div>

        <div>
            <button 
                className='btn-primary' 
                onClick={() => window.location.href = '/mysme/quizplatform'}
            >
                Go to my quiz
            </button>
        </div>
                
        <div>           
                {/*<div className="eligible-papers">
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
                </div>*/}

                <div className="exam-info-card">
                    <h3>My Exam Information</h3>
                    {(!candidateData.candidate.examIndexNumber) ? (
                        <div className="error-container">
                            Your Participation is not confirmed yet
                        </div>
                    ) : (
                        <>
                            <div className="detail-item highlight">
                                <span className="label">Exam Index Number:</span>
                                <span className="value">{candidateData.candidate.examIndexNumber}</span>
                            </div>
                            {(candidateData.candidate['qrCode'] && candidateData.candidate['qrCodeData']) && (
                            <div className="qr-code-container">
                                <img src={candidateData.candidate['qrCode']} alt="Exam QR Code" className="qr-code" />
                                <button onClick={downloadQRCode} className="btn-download">
                                    Download QR Code
                                </button>
                                {downloadSuccess &&
                                    <div className="success-message">QR Code downloaded successfully!</div>
                                }
                                <span className="value-qr">You need to bring this QR code on the exam day to mark your attendance.</span>
                            </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <FloatingWhatsApp phoneNumber="94703445342" />
        </div>
    );
};

export default CandidateProfile;