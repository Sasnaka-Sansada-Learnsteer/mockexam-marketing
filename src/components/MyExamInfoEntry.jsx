import React from "react";
import "./MyExamInfoEntry.css";
import CheckMyQR from "./CheckMyQR";

const MyExamInfoEntry = () => {
    return (
        <div className="my-exam-info-container">
            <div className="coming-soon-wrapper">
                <div className="portal-icon">
                    <i className="fas fa-user-graduate"></i>
                </div>
                {/*<h2 className="my-exam-portal-text">MySME Exam Portal</h2>*/}
                <h2 className="my-exam-portal-text">MySME Login Portal</h2>
                <div className="divider"></div>
                {/*<h4 className="coming-soon-text">Coming Soon</h4>*/}
                {/*<p className="portal-description">*/}
                {/*    Your personalized exam management space. Easy Login using your NIC.*/}
                {/*</p>*/}
                <p className="portal-description">
                    Await for MOCK EXAM - MCQ Series
                </p>
                <div className="register-button-container">
                    <CheckMyQR className="small-button" />
                </div>
                <div className="notification-button">
                    {/*<button>Get Notified</button>*/}
                </div>
            </div>
        </div>
    );
};

export default MyExamInfoEntry;