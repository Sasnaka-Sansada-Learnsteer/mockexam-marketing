import React from 'react';
import './HeroSection.css';
import smeCropped from "./assets/SME_cropped.png";

const HeroSection = () => {
    return (
        <div
            className="hero-container"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/tagImage.jpg)` }}
        >
            <div className="hero-content">
                <img
                    src={smeCropped}
                    alt="Sasnaka Sansada A/L Mock Exam 2025"
                    className="hero-title-image"
                />
            </div>
            <div className="hero-overlay"></div>
        </div>
    )
};

export default HeroSection;
