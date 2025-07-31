import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitch.css";

const LanguageSwitch = () => {
    const { i18n } = useTranslation();
    const isSinhala = i18n.language === "si";

    const toggleLanguage = () => {
        i18n.changeLanguage(isSinhala ? "en" : "si");
    };

    return (
        <label className="lang-switch">
            <input type="checkbox" onChange={toggleLanguage} checked={isSinhala} />
            <span className="slider" />
            <span className="lang-label">{isSinhala ? "සිං" : "EN"}</span>
        </label>
    );
};

export default LanguageSwitch;
