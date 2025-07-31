import React from "react";
import "./FloatingWhatsApp.css";
import { useTranslation } from "react-i18next";

const FloatingWhatsApp = ({
                              phoneNumber = "94774620867",
                              messageKey = "whatsapp.defaultMessage",
                          }) => {
    const { t } = useTranslation(); // Initialize the t function

    const translatedMessage = t(messageKey);

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(translatedMessage)}`;

    return (
        <a
            href={whatsappLink}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src="https://img.icons8.com/color/48/000000/whatsapp.png"
                alt="WhatsApp"
                className="whatsapp-icon"
            />
            {/* Translate "Need Help?" */}
            <span className="whatsapp-text">{t("whatsapp.needHelp")}</span>
        </a>
    );
};

export default FloatingWhatsApp;