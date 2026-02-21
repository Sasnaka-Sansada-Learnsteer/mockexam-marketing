import React, { useState } from "react";
import "./RegisterNow.css";

const CheckMyQR = ({ className = "", pulsing = true }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <a
            href="https://quiz.sasnaka.org"
            target="_blank"
            rel="noreferrer"
            className={`register-button ${pulsing ? "pulsing" : ""} ${
                isHovering ? "hovering" : ""
            } ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            Login to Quiz Platform
        </a>
    );
};

export default CheckMyQR;
