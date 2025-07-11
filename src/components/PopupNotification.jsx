import React, { useEffect, useState } from 'react';
import config from "../config/api";

const PopupNotification = () => {
    const [show, setShow] = useState(false);
    const [previousCount, setPreviousCount] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);

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
        // const popupInterval = setInterval(() => {
        //     setShow(true);
        //     setTimeout(() => setShow(false), 3000);
        // }, 30000); // show every 30s
        const popupInterval = setInterval(() => {
            fetchCount();
        }, 20000); // every 20 sec


        return () => clearInterval(popupInterval);
    }, []);

    useEffect(() => {
        const diff = currentCount - previousCount;
        if (diff > 0) {
            setShow(true);
            setTimeout(() => setShow(false), config.refreshIntervals.popupnotification);
        }
    }, [currentCount]);


    return (
        show && (
            <div className="popup">
                New candidate registered just now!
            </div>
        )
    );
};

export default PopupNotification;
