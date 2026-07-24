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

    // States for QR and Exam Center Confirmation Popup
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [qrModalStep, setQrModalStep] = useState('select'); // 'select' | 'confirm' | 'show_qr'
    const [selectedCenter, setSelectedCenter] = useState('');
    const [isUpdatingCenter, setIsUpdatingCenter] = useState(false);
    const [centerUpdateError, setCenterUpdateError] = useState('');

    const handleGetQRCodeClick = () => {
        const candidate = candidateData?.candidate;
        if (!candidate) return;

        // Safely fallback to "false" if the property is missing from the API payload
        const isConfirmed = candidate.exam_center_confirmed26 ?? "false";

        if (isConfirmed === true || isConfirmed === "true") {
            setQrModalStep('show_qr');
        } else {
            const centers = candidate.eligible_exam_centers || [
                "Ampara",
                "Colombo-Malabe",
                "Colombo-Colpetty",
                "Kalutara",
                "Kandy-Peradeniya",
                "Matara",
                "Kurunegala",
                "Ratnapura"
            ];
            const currentCenter = candidate.final_exam_center || candidate.your_exam_center || candidate["Preferred Exam Center"];
            const defaultCenter = centers.includes(currentCenter) ? currentCenter : centers[0];

            setSelectedCenter(defaultCenter);
            setQrModalStep('select');
            setCenterUpdateError('');
        }
        setIsQRModalOpen(true);
    };

    const handleConfirmCenter = async () => {
        const token = localStorage.getItem('candidateToken');
        if (!token) {
            setError('Your session has expired. Please login again.');
            return;
        }

        setIsUpdatingCenter(true);
        setCenterUpdateError('');
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/candidate/update_profile`,
                { final_exam_center: selectedCenter },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data && response.data.success !== false) {
                await fetchCandidateData();
                setQrModalStep('show_qr');
            } else {
                setCenterUpdateError(response.data.error || 'Failed to update exam center. Please try again.');
            }
        } catch (err) {
            console.error('Error updating exam center:', err);
            setCenterUpdateError(err.response?.data?.error || 'Failed to update exam center. Please try again.');
        } finally {
            setIsUpdatingCenter(false);
        }
    };

    const RESULTS_ENABLED = true;
    const QUIZ_ENABLED = false; // Set to false to hide the Quiz Platform button

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

    useEffect(() => {
        fetchCandidateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);



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
                pdf.text('MySME26 QR Code', 105, 20, { align: 'center' });
                pdf.setFontSize(12);
                pdf.text(`Candidate: ${candidateData.candidate["Full Name"]}`, 105, 30, { align: 'center' });
                pdf.text(`Exam Index: ${candidateData.candidate.examIndexNumber}`, 105, 40, { align: 'center' });
                const imgWidth = 100;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                pdf.addImage(imageData, 'PNG', (210 - imgWidth) / 2, 50, imgWidth, imgHeight);
                pdf.setFontSize(10);
                pdf.text('Please present this QR code at your examination center to mark your attendance.', 105, 50 + imgHeight + 10, { align: 'center' });
                pdf.save(`${candidateData.candidate.examIndexNumber}_MySME26_QRCode.pdf`);
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

                        {(candidateData.candidate.exam_center_confirmed26 === true || candidateData.candidate.exam_center_confirmed26 === "true") ? (
                            <div>
                                <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Exam Index Number</label>
                                <div style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '2rem', marginTop: '0.2rem' }}>
                                    {candidateData.candidate.examIndexNumber || "Pending"}
                                </div>
                                <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Your Exam Center</label>
                                <div style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.2rem' }}>
                                    {candidateData.candidate.final_exam_center || candidateData.candidate.your_exam_center || "Pending Confirmation"}
                                </div>

                                {!candidateData.candidate.examIndexNumber ? (
                                    <div className="reg-alert-error" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', color: '#ff9800', margin: '1rem 0 0.75rem 0', width: '100%' }}>
                                        {candidateData.myExamInfoMessage || candidateData.candidate?.myExamInfoMessage || 'Your participation is not confirmed yet.'}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
                                        {candidateData.candidate.examIndexNumber &&
                                         candidateData.candidate['qrCode'] &&
                                         candidateData.candidate['qrCodeData'] && (
                                            <button
                                                onClick={downloadQRCode}
                                                className="reg-submit-btn"
                                                style={{ padding: '0.6rem 1.2rem', marginTop: 0 }}
                                            >
                                                📥 Download QR Code
                                            </button>
                                        )}
                                        {downloadSuccess && (
                                            <div style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.85rem' }}>Downloaded!</div>
                                        )}
                                    </div>
                                )}
                                <p style={{ color: '#4ade80', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: 600 }}>
                                    ✓ Your examination center choice is permanently locked in.
                                </p>
                            </div>
                        ) : (
                            <div style={{ width: '100%' }}>
                                <div className="reg-alert-error" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', color: '#ff9800', margin: '0 0 1.25rem 0', width: '100%' }}>
                                    To get your exam index number and QR code, please confirm your exam center.
                                </div>
                                <button
                                    onClick={handleGetQRCodeClick}
                                    className="reg-submit-btn"
                                    style={{ marginTop: '0.25rem', padding: '0.6rem 1.2rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
                                >
                                    📍 Confirm Exam Center
                                </button>
                            </div>
                        )}
                    </div>

                    {/* QR block only mounts when index is loaded AND the user profile is explicitly confirmed */}
                    {(candidateData.candidate.examIndexNumber &&
                        candidateData.candidate['qrCode'] &&
                        candidateData.candidate['qrCodeData'] &&
                        (candidateData.candidate.exam_center_confirmed26 === true || candidateData.candidate.exam_center_confirmed26 === "true")) && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', marginBottom: '0.75rem' }}>
                                    <img src={candidateData.candidate['qrCode']} alt="Exam QR Code" style={{ display: 'block', width: '150px', height: '150px' }} />
                                </div>
                                <button onClick={downloadQRCode} className="reg-submit-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: 0 }}>
                                    Download QR
                                </button>
                                {downloadSuccess && (
                                    <div style={{ color: '#4ade80', marginTop: '0.5rem', fontWeight: 600, fontSize: '0.8rem' }}>Downloaded!</div>
                                )}
                            </div>
                        )}
                </div>

                {/* ── Section 3: Actions & Results ── */}
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

            {isQRModalOpen && (
                <div className="confirm-modal-overlay">
                    <style>{`
                        .confirm-modal-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background-color: rgba(0, 0, 0, 0.65);
                            backdrop-filter: blur(4px);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            z-index: 10000;
                        }
                        .confirm-modal-container {
                            background-color: var(--card-bg, #ffffff);
                            color: var(--text-color, #0f172a);
                            border: 1px solid var(--section-border, #e2e8f0);
                            border-radius: var(--border-radius-lg, 16px);
                            box-shadow: var(--shadow-lg);
                            width: 480px;
                            max-width: 90%;
                            position: relative;
                            overflow: hidden;
                            padding: 2.25rem 2rem;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            animation: confirm-slide-up 0.3s ease-out;
                        }
                        @keyframes confirm-slide-up {
                            from { transform: translateY(30px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                        .confirm-modal-close {
                            position: absolute;
                            top: 1rem;
                            right: 1.25rem;
                            background: none;
                            border: none;
                            font-size: 1.8rem;
                            cursor: pointer;
                            color: var(--text-color);
                            opacity: 0.5;
                            transition: opacity 0.2s;
                        }
                        .confirm-modal-close:hover {
                            opacity: 1;
                            color: #ff5252;
                        }
                        .confirm-modal-step {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }
                        .confirm-modal-icon {
                            font-size: 2.5rem;
                            margin-bottom: 0.75rem;
                        }
                        .confirm-modal-title {
                            font-size: 1.35rem;
                            font-weight: 700;
                            margin-bottom: 0.5rem;
                            color: var(--text-color);
                        }
                        .confirm-modal-text {
                            font-size: 0.95rem;
                            line-height: 1.5;
                            margin-bottom: 1.25rem;
                            color: var(--text-color);
                            opacity: 0.85;
                        }
                        .confirm-modal-subtext {
                            font-size: 0.8rem;
                            line-height: 1.4;
                            margin-bottom: 1.25rem;
                            color: var(--text-color);
                            opacity: 0.6;
                        }
                        .confirm-modal-select-wrapper {
                            width: 100%;
                            margin-bottom: 0.5rem;
                            position: relative;
                        }
                        .confirm-modal-select {
                            width: 100%;
                            padding: 0.7rem 0.95rem;
                            font-size: 0.95rem;
                            border-radius: var(--border-radius-sm, 8px);
                            border: 1.5px solid var(--section-border, #e2e8f0);
                            background-color: var(--bg-color, #f8fafc);
                            color: var(--text-color, #0f172a);
                            outline: none;
                            cursor: pointer;
                            appearance: none;
                            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
                            background-repeat: no-repeat;
                            background-position: right 1rem center;
                            padding-right: 2.5rem;
                        }
                        .confirm-modal-select:focus {
                            border-color: var(--accent-color);
                        }
                    `}</style>

                    <div className="confirm-modal-container">
                        <button className="confirm-modal-close" onClick={() => setIsQRModalOpen(false)}>
                            &times;
                        </button>

                        {qrModalStep === 'select' && (
                            <div className="confirm-modal-step">
                                <div className="confirm-modal-icon">📍</div>
                                <h3 className="confirm-modal-title">Select Your Exam Center</h3>
                                <p className="confirm-modal-text">
                                    Please select your preferred examination center from the options below. You can only confirm your center once.
                                </p>
                                <div className="confirm-modal-select-wrapper">
                                    <select
                                        value={selectedCenter}
                                        onChange={(e) => setSelectedCenter(e.target.value)}
                                        className="confirm-modal-select"
                                    >
                                        {(candidateData.candidate.eligible_exam_centers || [
                                            "Ampara",
                                            "Colombo-Malabe",
                                            "Colombo-Colpetty",
                                            "Kalutara",
                                            "Kandy-Peradeniya",
                                            "Matara",
                                            "Kurunegala",
                                            "Ratnapura"
                                        ]).map((center, index) => (
                                            <option key={index} value={center}>
                                                {center}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={() => setQrModalStep('confirm')}
                                    className="reg-submit-btn"
                                    style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
                                >
                                    Continue
                                </button>
                            </div>
                        )}

                        {qrModalStep === 'confirm' && (
                            <div className="confirm-modal-step">
                                <div className="confirm-modal-icon">⚠️</div>
                                <h3 className="confirm-modal-title">Confirm Exam Center</h3>
                                <p className="confirm-modal-text" style={{ fontSize: '1.05rem', fontWeight: '500' }}>
                                    You are confirming your exam center as <strong style={{ color: 'var(--accent-color)' }}>"{selectedCenter}"</strong>.
                                </p>
                                <p className="confirm-modal-subtext">
                                    Please note that you will not be able to change this selection once confirmed.
                                </p>
                                {centerUpdateError && (
                                    <div className="reg-alert-error" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                        {centerUpdateError}
                                    </div>
                                )}
                                <div className="confirm-modal-actions" style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => setQrModalStep('select')}
                                        className="reg-submit-btn"
                                        style={{ flex: 1, justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-color)', border: '1px solid var(--section-border)', marginTop: 0 }}
                                        disabled={isUpdatingCenter}
                                    >
                                        No (Go Back)
                                    </button>
                                    <button
                                        onClick={handleConfirmCenter}
                                        className="reg-submit-btn"
                                        style={{ flex: 1, justifyContent: 'center', marginTop: 0 }}
                                        disabled={isUpdatingCenter}
                                    >
                                        {isUpdatingCenter ? <span className="reg-spinner" /> : 'Yes, Confirm'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {qrModalStep === 'show_qr' && (
                            <div className="confirm-modal-step">
                                <div className="confirm-modal-icon">🎟️</div>
                                <h3 className="confirm-modal-title">Your Exam QR Code</h3>
                                <p className="confirm-modal-text">
                                    Below is your exam entrance QR code for <strong style={{ color: 'var(--accent-color)' }}>{candidateData.candidate.final_exam_center || candidateData.candidate.your_exam_center}</strong>.
                                </p>
                                <div style={{ background: '#fff', padding: '12px', borderRadius: '12px', marginBottom: '1rem', display: 'inline-block', boxShadow: 'var(--shadow-md)' }}>
                                    <img
                                        src={candidateData.candidate['qrCode']}
                                        alt="Exam QR Code"
                                        style={{ display: 'block', width: '180px', height: '180px' }}
                                    />
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: '0 0 1rem 0', maxWidth: '320px', lineHeight: '1.4' }}>
                                    Your Index Number is: <strong style={{ fontSize: '1.1rem' }}>{candidateData.candidate.examIndexNumber}</strong>. Please download and present this QR code on the exam day.
                                </p>
                                <button
                                    onClick={downloadQRCode}
                                    className="reg-submit-btn"
                                    style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', marginTop: 0 }}
                                >
                                    Download QR
                                </button>
                                {downloadSuccess && (
                                    <div style={{ color: '#4ade80', marginTop: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>
                                        Downloadable Successfully!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateProfile;