import React, { useState } from "react";
import "./PopupCard.css";
import RegisterNow from "./RegisterNow";

const PopupCard = () => {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setVisible(false), 300); // Match duration with CSS
    };

    return visible ? (
        <div className="popup-overlay">
            <div className={`popup-card ${closing ? "bounce-out-top" : "bounce-in-top"}`}>
                <button className="close-button" onClick={handleClose}>
                    &times;
                </button>
                <div className="coming-soon-wrapper">
                    <div className="portal-icon">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <h2 className="my-exam-portal-text">MySME Exam Portal</h2>
                    <div className="divider"></div>
                    <p className="popup-message">is on its way!</p>
                    <RegisterNow />
                </div>
            </div>
        </div>
    ) : null;
};

export default PopupCard;
