import React from "react";
import "./FloatingWhatsApp.css";

const FloatingWhatsApp = ({
                              phoneNumber = "94703445342",
                              message = "Hello! I’d like to know more info about the exam.",
                          }) => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
            <span className="whatsapp-text">Need Help?</span>
        </a>
    );
};

export default FloatingWhatsApp;
