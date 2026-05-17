import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/form.css';
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import SurveyPopup from "./SurveyPopup";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const MAX_BACKOFF_DELAY_MS = 16000;

const CandidateProfile = () => {
    const [candidateData, setCandidateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
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

    const RESULTS_ENABLED = true;
    const QUIZ_ENABLED = false; // Set to false to hide the Quiz Platform button

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
                if (err.response?.status >= 400) {
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

    const handleLogout = () => {
        localStorage.removeItem('candidateToken');
        localStorage.removeItem('userRole');
        navigate('/mysme/login');
    };

    const downloadQRCode = () => {
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
            if (checkResultsClickCount === 0 && !surveyCompleted) {
                setSurveyVisible(true);
                startProgressBar();
                setResultsLoading(false);
            } else {
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
                return prev + (100 / 120);
            });
        }, 1000);
    };

    const handleSurveyComplete = () => {
        setSurveyVisible(false);
        setSurveyCompleted(true);
        setShowingResultMessages(true);
        setResultsExpanded(true);

        const messages = ["Loading results. . ."];
        let index = 0;
        setResultMessage(messages[0]);

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
        }, 3000);
    };

    const fetchActualResultsWithRetry = async (retryCount = 0, maxRetries = 5) => {
        const token = localStorage.getItem('candidateToken');
        if (!token) return;

        try {
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
            setResultsError('');
        } catch (err) {
            console.error(`Error fetching results (attempt ${retryCount + 1}):`, err);
            if (retryCount < maxRetries) {
                const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), MAX_BACKOFF_DELAY_MS);
                setTimeout(() => {
                    fetchActualResultsWithRetry(retryCount + 1, maxRetries);
                }, backoffDelay);
            } else {
                setResultsError('Failed to load results data after multiple attempts');
                setResultsLoading(false);
            }
        }
    };

    const CandidateResults = ({ data, error }) => {
        if (error) return <div className="reg-alert-error" style={{ marginTop: '1rem' }}>{error}</div>;
        if (!data || !data.results) return null;

        const { results } = data;

        return (
            <div style={{ marginTop: '1.5rem' }}>
                <h3 className="reg-section-title" style={{ fontSize: '1.3rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Exam Results Overview</h3>

                <div className="reg-fields-grid" style={{ marginBottom: '1.5rem' }}>
                    <div className="reg-field">
                        <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>District Rank</label>
                        <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.district_rank}</div>
                    </div>
                    <div className="reg-field">
                        <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Island Rank</label>
                        <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.island_rank}</div>
                    </div>
                    <div className="reg-field">
                        <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Z-Score</label>
                        <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.final_zscore}</div>
                    </div>
                </div>

                <h4 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: 600 }}>Subject Grades</h4>
                <div className="reg-fields-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {results.bio_grade ? (
                        <div className="reg-field">
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Biology</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.bio_grade}</div>
                        </div>
                    ) : results.maths_grade ? (
                        <div className="reg-field">
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Combined Maths</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.maths_grade}</div>
                        </div>
                    ) : null}
                    <div className="reg-field">
                        <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Physics</label>
                        <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.physics_grade}</div>
                    </div>
                    <div className="reg-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Chemistry</label>
                        <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{results.chemistry_grade}</div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="reg-page reg-loading-page">
                <span className="reg-spinner-lg" />
                <p>Loading profile data...</p>
            </div>
        );
    }

    if (error || !candidateData) {
        return (
            <div className="reg-page">
                <div className="reg-form-container">
                    <div className="reg-alert-error">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error || 'Unable to load profile data'}
                    </div>
                    <button onClick={handleLogout} className="reg-submit-btn" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>Back to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="reg-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem' }}>

            {surveyVisible && (
                <SurveyPopup
                    surveyPage={surveyPage}
                    setSurveyPage={setSurveyPage}
                    progressValue={progressValue}
                    setProgressValue={setProgressValue}
                    onComplete={handleSurveyComplete}
                />
            )}

            {/* Profile Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                    <h1 className="reg-hero-title" style={{ fontSize: '2rem', marginBottom: '0.2rem', color: 'var(--text-color)' }}>MySME Dashboard</h1>
                    <p className="reg-hero-sme-title" style={{ color: 'var(--text-color)', opacity: 0.8, fontSize: '0.9rem', marginTop: 0 }}>Sasnaka Sansada Mock Exam (SME) 2026</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="hide-on-mobile" onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', padding: '0.6rem 0', fontWeight: 600, transform: 'translateY(-8px)' }}>
                        Home
                    </button>
                    <button onClick={handleLogout} className="reg-submit-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', marginTop: 0 }}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="reg-form-container" style={{ width: '100%', maxWidth: '800px', margin: 0, padding: '2.5rem' }}>

                {/* ── Section 1: Personal Details ── */}
                <div className="reg-section" style={{ marginBottom: '2.5rem' }}>
                    <div className="reg-section-header">
                        <div className="reg-section-icon">👤</div>
                        <div>
                            <h2 className="reg-section-title">Candidate Information</h2>
                            <p className="reg-section-desc">Welcome back, {candidateData.candidate["Full Name"]?.split(' ')[0]}</p>
                        </div>
                    </div>
                    <div className="reg-fields-grid">
                        <div className="reg-field">
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Full Name</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{candidateData.candidate["Full Name"]}</div>
                        </div>
                        <div className="reg-field">
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>NIC Number</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{candidateData.candidate["NIC"]}</div>
                        </div>
                        <div className="reg-field">
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>School</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{candidateData.candidate["School"] ?? candidateData.candidate["School "]}</div>
                        </div>
                        <div className="reg-field">
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Subject Stream</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{candidateData.candidate["Subject Stream"]}</div>
                        </div>
                        <div className="reg-field" style={{ gridColumn: '1 / -1' }}>
                            <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Preferred Exam Center</label>
                            <div style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}>{candidateData.candidate["Preferred Exam Center"]}</div>
                        </div>
                    </div>
                </div>

                {/* ── Section 2: Exam Information & QR ── */}
                <div className="reg-section" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="reg-section-icon" style={{ fontSize: '2rem', marginTop: 0 }}>🎓</div>
                            <div>
                                <h2 className="reg-section-title">Exam Information</h2>
                                <p className="reg-section-desc">Your Index Number and QR Code</p>
                            </div>
                        </div>

                        {!candidateData.candidate.examIndexNumber ? (
                            <div className="reg-alert-error" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', color: '#ff9800', margin: 0 }}>
                                {candidateData.myExamInfoMessage || candidateData.candidate?.myExamInfoMessage || 'Your participation is not confirmed yet.'}
                            </div>
                        ) : (
                            <div>
                                <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Exam Index Number</label>
                                <div style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '2rem', marginTop: '0.2rem' }}>
                                    {candidateData.candidate.examIndexNumber}
                                </div>
                                <p style={{ color: 'var(--text-color)', opacity: 0.6, fontSize: '0.85rem', marginTop: '0.5rem', maxWidth: '250px' }}>
                                    You need to bring this QR code on the exam day to mark your attendance.
                                </p>
                            </div>
                        )}
                    </div>

                    {(candidateData.candidate.examIndexNumber && candidateData.candidate['qrCode'] && candidateData.candidate['qrCodeData']) && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', marginBottom: '0.75rem' }}>
                                <img src={candidateData.candidate['qrCode']} alt="Exam QR Code" style={{ display: 'block', width: '120px', height: '120px' }} />
                            </div>
                            <button onClick={downloadQRCode} className="reg-submit-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: 0 }}>
                                Download QR
                            </button>
                            {downloadSuccess && (
                                <div style={{ color: '#4ade80', marginTop: '0.5rem', fontWeight: 600, fontSize: '0.8rem' }}>Downloaded!</div>
                            )}
                        </div>
                    )}
                </div>               {/* ── Section 3: Actions & Results ── */}
                {(QUIZ_ENABLED || (RESULTS_ENABLED && candidateData.candidate.results_released)) && (
                    <div className="reg-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                        <div className="reg-section-header">
                            <div className="reg-section-icon">📊</div>
                            <div>
                                <h2 className="reg-section-title">Quiz & Results</h2>
                                <p className="reg-section-desc">Access your digital quiz platform and exam results</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {QUIZ_ENABLED && (
                                <button
                                    className="reg-submit-btn"
                                    onClick={() => window.location.href = '/mysme/quizplatform'}
                                    style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #0056b3 0%, #004494 100%)' }}
                                >
                                    Go to My Quiz Platform
                                </button>
                            )}

                            {RESULTS_ENABLED && candidateData.candidate.results_released && (
                                <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <button
                                        className="reg-submit-btn"
                                        onClick={handleShowResultsClick}
                                        style={{ width: '100%', justifyContent: 'center', background: resultsExpanded ? 'rgba(255,255,255,0.1)' : 'var(--accent-gradient)' }}
                                    >
                                        {resultsExpanded ? 'Hide Results' : 'Check My Results'}
                                    </button>

                                    {resultsExpanded && showingResultMessages && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0' }}>
                                            {/* Simple loading spinner placeholder for water-bubble */}
                                            <span className="reg-spinner-lg" style={{ marginBottom: '1rem' }} />
                                            <p style={{ color: 'var(--text-color)', fontWeight: 600 }}>{resultMessage}</p>
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
                            )}
                        </div>
                    </div>
                )}

            </div>
            <FloatingWhatsApp phoneNumber="94703445342" />
        </div>
    );
};

export default CandidateProfile;