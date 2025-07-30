import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';
import { useTranslation } from 'react-i18next';

const CountdownTimer = ({ deadline }) => {
    const { t } = useTranslation();

    const calculateTimeLeft = () => {
        const difference = +new Date(deadline) - +new Date();
        return difference > 0
            ? {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
            : null;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [deadline]);

    if (!timeLeft) return <h2>{t("countdown.registrationClosed")}</h2>;

    return (
        <div className="countdown-container">
            <h2 className="countdown-title">{t("countdown.title")}</h2>
            <div className="countdown-units">
                <div className="countdown-unit">
                    <span className="countdown-value">{timeLeft.days}</span>
                    <span className="countdown-label">{t("countdown.days")}</span>
                </div>
                <div className="countdown-unit">
                    <span className="countdown-value">{timeLeft.hours}</span>
                    <span className="countdown-label">{t("countdown.hours")}</span>
                </div>
                <div className="countdown-unit">
                    <span className="countdown-value">{timeLeft.minutes}</span>
                    <span className="countdown-label">{t("countdown.minutes")}</span>
                </div>
                <div className="countdown-unit">
                    <span className="countdown-value">{timeLeft.seconds}</span>
                    <span className="countdown-label">{t("countdown.seconds")}</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;