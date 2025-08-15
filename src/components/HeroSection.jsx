import React, {useEffect, useState} from 'react';
import './HeroSection.css';
import RegisterNow from "./RegisterNow";
import smeCropped from "./assets/SME_cropped.png";

const HeroSection = () => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date();

            // Set target to today at 8 PM
            target.setHours(18, 0, 0, 0);

            // If it's already past 8 PM, display a different message
            if (now >= target) {
                setTimeLeft("Registrations are open now!");
                return;
            }

            // Calculate time difference in milliseconds
            const diff = target - now;

            // Convert to hours, minutes, seconds
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Format with leading zeros
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            setTimeLeft({
                text: "Registrations opening in:",
                time: `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`
            });
        };

        // Calculate immediately and then set interval
        calculateTimeLeft();
        const timerId = setInterval(calculateTimeLeft, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="hero-container">
            <div className="hero-content">
                <img
                    src={smeCropped}
                    alt="Sasnaka Sansada A/L Mock Exam 2025"
                    className="hero-title-image"
                />
                {/*<h1>Prepare for Your Future</h1>*/}
                {/*<h2>with Sasnaka Sansada A/L Mock Exam 2025</h2>*/}
                <p>Take the first step towards A/L excellence with our comprehensive mock exam series</p>
                {/*<p className="registration-message">*/}
                {/*    {typeof timeLeft === 'string' ? (*/}
                {/*        timeLeft*/}
                {/*    ) : (*/}
                {/*        <>*/}
                {/*            {timeLeft.text}*/}
                {/*            <span className="countdown-numbers">{timeLeft.time}</span>*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</p>*/}
                <div className="register-button-container">
                    <RegisterNow className="small-button" />
                </div>
            </div>
            <div className="hero-overlay"></div>
        </div>
    );
};

export default HeroSection;