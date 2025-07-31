import React from 'react';
import './HeroSection.css';
import RegisterNow from "./RegisterNow";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <div className="hero-container">
            <div className="hero-content">
                <h1>{t("hero.title")}</h1>
                <h2>{t("hero.subtitle")}</h2>
                <p>{t("hero.description")}</p>
                {/* <RegisterNow className="always-visible" /> */}
                <p className="registration-message">Registrations opening soon!</p>
            </div>
            <div className="hero-overlay"></div>
        </div>
    );
};

export default HeroSection;