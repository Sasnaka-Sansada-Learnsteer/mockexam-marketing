import React, { useState, useEffect } from "react";
import "./PopupCard.css";
import RegisterNow from "./RegisterNow";

const PopupCard = () => {
    const [visible, setVisible] = useState(false); // hidden at start
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setVisible(true); // show after 2 seconds
                sessionStorage.setItem("hasSeenPopup", "true");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setVisible(false), 300); // match animation duration
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
