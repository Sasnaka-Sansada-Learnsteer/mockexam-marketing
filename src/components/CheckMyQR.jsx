import React, { useState } from "react";
import "./RegisterNow.css";

const CheckMyQR = ({ className = "", pulsing = true }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <a
            href="https://sme.sasnaka.org/mysme/login"
            target="_blank"
            rel="noreferrer"
            className={`register-button ${pulsing ? "pulsing" : ""} ${
                isHovering ? "hovering" : ""
            } ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            Login
        </a>
    );
};

export default CheckMyQR;
