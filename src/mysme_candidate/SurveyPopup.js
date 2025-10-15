import React, { useState } from 'react';
import '../styles/survey.css';
import '../styles/candidate.css';
import '../styles/CandidateCard.css';
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SurveyPopup = ({
                         surveyPage,
                         setSurveyPage,
                         progressValue,
                         setProgressValue,
                         onComplete,
                         candidateId
                     }) => {
    const [selectedOptions, setSelectedOptions] = useState({
        extraCurricular: [],
        achievements: [],
        interests: []
    });

    const [volunteeringInterest, setVolunteeringInterest] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState(false);

    const handleOptionToggle = (category, option) => {
        setSelectedOptions(prev => {
            const updated = { ...prev };
            if (updated[category].includes(option)) {
                updated[category] = updated[category].filter(item => item !== option);
            } else {
                updated[category] = [...updated[category], option];
            }
            return updated;
        });
    };

    const handleNext = async () => {
        // Submit survey data when clicking Next on page 5
        if (surveyPage === 6) {
            try {
                setIsSubmitting(true);
                setApiError(false); // Reset any previous errors

                // Get token from localStorage
                const token = localStorage.getItem('candidateToken');

                // Prepare survey data
                const surveyData = {
                    NIC: candidateId,
                    extraCurricular: selectedOptions.extraCurricular,
                    achievements: selectedOptions.achievements,
                    volunteeringInterest: volunteeringInterest,
                    interests: selectedOptions.interests,
                    check_results_button_click_complete: true
                };

                // Make the API request
                await axios.post(`${API_BASE_URL}/api/candidate/update-survey`, surveyData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Continue to next page after successful submission
                setSurveyPage(prev => prev + 1);
                if (progressValue < 100) {
                    setProgressValue(100);
                }
            } catch (error) {
                console.error('Error submitting survey:', error);
                setApiError(true); // Set error state to true when API call fails
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // Skip volunteering interests question if not interested
            if (surveyPage === 4 && volunteeringInterest === false) {
                setSurveyPage(6); // Skip to thank you page
            } else if (surveyPage < 7) {
                setSurveyPage(prev => prev + 1);
            }
            if (surveyPage === 6) {
                if (progressValue < 100) {
                    setProgressValue(100);
                }
            }
        }
    };

    const handleBack = () => {
        // When going back from thank you page, check if we need to skip
        if (surveyPage === 6 && volunteeringInterest === false) {
            setSurveyPage(4); // Go back to volunteering interest question
        } else if (surveyPage > 1) {
            setSurveyPage(prev => prev - 1);
        }
    };

    const handleClose = () => {
        if (surveyPage === 7) {
            onComplete();
        }
    };

    const extraCurricularOptions = [
        "Cricket", "Volleyball", "Netball", "Athletics",
        "Science Society", "Commerce Society", "Interact Club", "Debating Team",
        "School Band", "Choir", "Dancing Troupe", "Drama Club",
        "Prefect Board", "House Captain", "Club President/Secretary",
        "Western/Eastern Cadet Bands", "Scouting", "Girl Guides",
        "School Media Unit", "Magazine Committee", "Other", "Nothing"
    ];

    const achievementOptions = [
        "Prize Winner", "Subject Prizes", "High Z-Score",
        "Zonal/Provincial Colours", "All-Island Colours", "Team Captain",
        "Head Prefect", "Deputy Head Prefect", "Special Awards",
        "Debating/Quizzing Championships", "Science Olympiads",
        "Wins at All-Island Dancing/Music Competitions",
        "President's Scout/Guide Award", "Other", "Nothing"
    ];

    const interestOptions = [
        "Mentoring", "Guiding students",
        "Teaching","Tutoring", "Conducting seminars",
        "Event Management", "Organize events",
        "Community Service", "Social welfare",
        "Content Creation",
        "Technical Support", "Other"
    ];

    return (
        <div className="survey-popup-overlay">
            <div className="survey-popup">
                {apiError && (
                    <button
                        className="survey-close-btn"
                        onClick={onComplete}
                    >
                        ×
                    </button>
                )}
                <div className="survey-header">
                    <h3>Survey</h3>
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${progressValue}%` }}
                        ></div>
                    </div>
                    <p>Processing your results</p>
                </div>

                <div className="survey-content">
                    {surveyPage === 1 && (
                        <div className="survey-page">
                            <h3>Help us to get to know about you</h3>
                            <p>Please answer the following questions to help us serve you better.</p>
                            <button onClick={handleNext} className="survey-next-btn">
                                Next →
                            </button>
                        </div>
                    )}

                    {surveyPage === 2 && (
                        <div className="survey-page">
                            <h3>What have you done as Extra-Curricular Activities at School?</h3>
                            <div className="option-list">
                                {extraCurricularOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`option-item ${selectedOptions.extraCurricular.includes(option) ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('extraCurricular', option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleBack} className="survey-back-btn">
                                ← Back
                            </button>
                            <button onClick={handleNext} className="survey-next-btn">
                                Next →
                            </button>
                        </div>
                    )}

                    {surveyPage === 3 && (
                        <div className="survey-page">
                            <h3>What are your achievements at School?</h3>
                            <div className="option-list">
                                {achievementOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`option-item ${selectedOptions.achievements.includes(option) ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('achievements', option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleBack} className="survey-back-btn">
                                ← Back
                            </button>
                            <button onClick={handleNext} className="survey-next-btn">
                                Next →
                            </button>
                        </div>
                    )}

                    {surveyPage === 4 && (
                        <div className="survey-page">
                            <h3>Are you interested in volunteering with Sasnaka Sansada after A/Ls?</h3>
                            <div className="yes-no-options">
                                <button
                                    className={`option-item yes-no-btn ${volunteeringInterest === true ? 'selected' : ''}`}
                                    onClick={() => setVolunteeringInterest(true)}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`option-item yes-no-btn ${volunteeringInterest === false ? 'selected' : ''}`}
                                    onClick={() => setVolunteeringInterest(false)}
                                >
                                    No
                                </button>
                            </div>
                            <div className="survey-nav-buttons">
                                <button onClick={handleBack} className="survey-back-btn">
                                    ← Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="survey-next-btn"
                                    disabled={volunteeringInterest === null}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Only show this page if the user is interested in volunteering */}
                    {surveyPage === 5 && volunteeringInterest === true && (
                        <div className="survey-page">
                            <h3>What are your interests in volunteering with Sasnaka Sansada after A/Ls?</h3>
                            <div className="option-list">
                                {interestOptions.map(option => (
                                    <div
                                        key={option}
                                        className={`option-item ${selectedOptions.interests.includes(option) ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('interests', option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <div className="survey-nav-buttons">
                                <button onClick={handleBack} className="survey-back-btn">
                                    ← Back
                                </button>
                                <button onClick={handleNext} className="survey-next-btn">
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {surveyPage === 6 && (
                        <div className="survey-page">
                            <h3>✅ Thank you for letting us know about your interests.</h3>
                            <p>We'll be in touch with you.</p>
                            {apiError && <p className="error-message">There was an error submitting your survey. You can try again or close the popup.</p>}
                            <button onClick={handleNext} className="survey-next-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Next →'}
                            </button>
                        </div>
                    )}

                    {surveyPage === 7 && (
                        <div className="survey-page">
                            <h3>🎉 Your results are almost ready!</h3>
                            <p>Close the popup to view your results.</p>
                            <button onClick={handleClose} className="survey-next-btn">
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SurveyPopup;
