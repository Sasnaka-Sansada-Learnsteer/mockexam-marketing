import React, { useState, useEffect } from "react";
import "./CandidatePopup.css";

const CandidatePopup = () => {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Show popup after 1 second on every refresh
        const timer = setTimeout(() => {
            setVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setVisible(false), 300);
    };

    const checkResults = () => {
        setLoading(true);

        // API to fetch result (random data for now)
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

    const getGradeColor = (grade) => {
        switch(grade) {
            case 'A': return '#2575fc';
            case 'B': return '#2575fc';
            case 'C': return '#2575fc';
            case 'S': return '#2575fc';
            case 'W': return '#2575fc';
            default: return '#2575fc';
        }
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

                    {!results ? (
                        <div className="results-prompt">
                            <p className="popup-message">Check your exam results and performance statistics</p>
                            <button
                                className={`check-results-btn ${loading ? 'loading' : ''}`}
                                onClick={checkResults}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Loading...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-chart-line"></i> Check My Results
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="results-display">
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
                                        {/*<div className="subject-score">{subject.score}%</div>*/}
                                        <div
                                            className="subject-grade"
                                            style={{ backgroundColor: getGradeColor(subject.grade) }}
                                        >
                                            {subject.grade}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/*<div className="results-actions">
                                <button className="download-btn">
                                    <i className="fas fa-download"></i> Download Results
                                </button>
                            </div>*/}
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default CandidatePopup;