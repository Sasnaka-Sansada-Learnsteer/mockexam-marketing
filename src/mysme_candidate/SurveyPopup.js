import React, { useState } from 'react';
import '../styles/survey.css';

const SurveyPopup = ({
                         surveyPage,
                         setSurveyPage,
                         progressValue,
                         setProgressValue,
                         onComplete
                     }) => {
    const [selectedOptions, setSelectedOptions] = useState({
        extraCurricular: [],
        achievements: [],
        interests: []
    });

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

    const handleNext = () => {
        if (surveyPage < 6) {
            setSurveyPage(prev => prev + 1);
        }
        if (surveyPage === 5) {
            if (progressValue < 100) {
                setProgressValue(100);
            }
        }
    };

    const handleClose = () => {
        if (surveyPage === 6) {
            onComplete();
        }
    };

    const extraCurricularOptions = [
        "Cricket", "Volleyball", "Netball", "Athletics",
        "Science Society", "Commerce Society", "Interact Club", "Debating Team",
        "School Band", "Choir", "Dancing Troupe", "Drama Club",
        "Prefect Board", "House Captain", "Club President/Secretary",
        "Western/Eastern Cadet Bands", "Scouting", "Girl Guides",
        "School Media Unit", "Magazine Committee", "Other"
    ];

    const achievementOptions = [
        "Prize Winner", "Subject Prizes", "High Z-Score",
        "Zonal/Provincial Colours", "All-Island Colours", "Team Captain",
        "Head Prefect", "Deputy Head Prefect", "Special Awards",
        "Debating/Quizzing Championships", "Science Olympiads",
        "Wins at All-Island Dancing/Music Competitions",
        "President's Scout/Guide Award", "Other"
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
                            <button onClick={handleNext} className="survey-next-btn">
                                Next →
                            </button>
                        </div>
                    )}

                    {surveyPage === 4 && (
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
                            <button onClick={handleNext} className="survey-next-btn">
                                Next →
                            </button>
                        </div>
                    )}

                    {surveyPage === 5 && (
                        <div className="survey-page">
                            <h3>✅ Thank you for letting us know about your interests.</h3>
                            <p>We'll be in touch with you.</p>
                            <button onClick={handleNext} className="survey-next-btn">
                                Next →
                            </button>
                        </div>
                    )}

                    {surveyPage === 6 && (
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
