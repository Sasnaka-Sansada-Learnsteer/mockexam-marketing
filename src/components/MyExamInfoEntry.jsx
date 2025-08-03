import React from "react";
import "./MyExamInfoEntry.css";

const MyExamInfoEntry = () => {
    return (
        <div className="my-exam-info-container">
            <div className="coming-soon-wrapper">
                <div className="portal-icon">
                    <i className="fas fa-user-graduate"></i>
                </div>
                <h2 className="my-exam-portal-text">SME My Exam Portal</h2>
                <div className="divider"></div>
                {/*<h4 className="coming-soon-text">Coming Soon</h4>*/}
                <p className="portal-description">
                    Your personalized exam management space is on its way.
                    Stay tuned for a seamless exam experience.
                </p>
                <div className="notification-button">
                    {/*<button>Get Notified</button>*/}
                </div>
            </div>
        </div>
    );
};

export default MyExamInfoEntry;