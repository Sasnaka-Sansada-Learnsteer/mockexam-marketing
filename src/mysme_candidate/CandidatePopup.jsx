import React, { useState, useEffect } from "react";
import "./CandidatePopup.css";

// --- STEP 1: Accept the new `loadOnOpen` prop ---
const CandidatePopup = ({ visible, onClose, loadOnOpen }) => {
    const [closing, setClosing] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    // ... (useEffect for closing animation remains the same)
    useEffect(() => {
        if (visible) {
            setClosing(false);
        }
    }, [visible]);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const checkResults = () => {
        // ... (this function remains the same)
        setLoading(true);
        setTimeout(() => {
            const mockResults = {
                subjects: [
                    { name: "Mathematics", grade: "A", score: 87 },
                    { name: "Chemistry", grade: "B", score: 78 },
                    { name: "Physics", grade: "A", score: 92 }
                ],
                rank: 15,
                zScore: 1.25,
                totalStudents: 250
            };
            setResults(mockResults);
            setLoading(false);
        }, 2000);
    };

    // --- STEP 2: Update the useEffect to use the `loadOnOpen` flag ---
    useEffect(() => {
        // Only fetch results automatically if the parent told us to.
        if (visible && loadOnOpen && !results) {
            checkResults();
        }
    }, [visible, loadOnOpen, results]);

    const getGradeColor = (grade) => {
        // ... (this function remains the same)
    };

    return visible ? (
        <div className="popup-overlay">
            <div className={`exam-results-popup ${closing ? "bounce-out-top" : "bounce-in-top"}`}>
                <button className="close-button" onClick={handleClose}>
                    &times;
                </button>
                <div className="results-content">
                    <div className="portal-icon">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <h2 className="results-title">MySME Exam Results</h2>
                    <div className="divider"></div>

                    {/* --- STEP 3: Update JSX to handle loading and the prompt button --- */}
                    {!results ? (
                        <div className="results-prompt">
                            {loading ? (
                                <p className="popup-message">
                                    <i className="fas fa-spinner fa-spin"></i> Loading results...
                                </p>
                            ) : (
                                <>
                                    <p className="popup-message">Check your exam results and performance statistics</p>
                                    <button
                                        className="check-results-btn"
                                        onClick={checkResults}
                                    >
                                        <i className="fas fa-chart-line"></i> Check My Results
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="results-display">
                            {/* This part for displaying results is the same */}
                            <div className="results-summary">
                                <div className="summary-item">
                                    <div className="summary-label">Rank</div>
                                    <div className="summary-value rank">#{results.rank}</div>
                                    <div className="summary-subtext">out of {results.totalStudents} students</div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-label">Z-Score</div>
                                    <div className="summary-value zscore">{results.zScore}</div>
                                    <div className="summary-subtext">Standardized measure</div>
                                </div>
                            </div>
                            <div className="subjects-header">Subject Results</div>
                            <div className="subjects-list">
                                {results.subjects.map((subject, index) => (
                                    <div key={index} className="subject-item">
                                        <div className="subject-name">{subject.name}</div>
                                        <div
                                            className="subject-grade"
                                            style={{ backgroundColor: getGradeColor(subject.grade) }}
                                        >
                                            {subject.grade}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default CandidatePopup;