import React, { useEffect, useState } from 'react';
import config from "../config/api";
import './PopupNotification.css'; // Create this file for the styles

const PopupNotification = () => {
    const [show, setShow] = useState(false);
    const [previousCount, setPreviousCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const fetchCount = async () => {
        try {
            const res = await fetch(config.endpoints.liveCount);
            const data = await res.json();
            if (data.total) {
                setPreviousCount(currentCount);
                setCurrentCount(data.total);
            }
        } catch (err) {
            console.error("Popup fetch error", err);
        }
    };

    useEffect(() => {
        // For development/testing purposes
        // const popupInterval = setInterval(() => {
        //     setShow(true);
        //     setIsExiting(false);
        //
        //     setTimeout(() => {
        //         setIsExiting(true);
        //         setTimeout(() => setShow(false), 800);
        //     }, 10000); // Show for 10 seconds
        //
        // }, 10000); // Show every 30 seconds

        // Uncomment for production
        const popupInterval = setInterval(() => {
            fetchCount();
        }, 20000); // check for new registrations every 20 seconds


        return () => clearInterval(popupInterval);
    }, []);

    useEffect(() => {
        const diff = currentCount - previousCount;
        if (diff > 0) {
            setShow(true);
            setIsExiting(false);

            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    setShow(false);
                }, 800); // Wait for exit animation to complete
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [currentCount, previousCount]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShow(false);
        }, 800); // Match exit animation duration
    };

    if (!show) return null;

    return (
        <div className={`popup-notification ${isExiting ? 'exiting' : ''}`}>
            <div className="popup-content">
                <div className="popup-icon">🧑🏻‍🏫</div>
                <div className="popup-message">
                    <h4>New Registration!</h4>
                    <p>Someone just registered for the exam</p>
                </div>
            </div>
            <button className="popup-close" onClick={handleClose}>×</button>
        </div>
    );
};

export default PopupNotification;
