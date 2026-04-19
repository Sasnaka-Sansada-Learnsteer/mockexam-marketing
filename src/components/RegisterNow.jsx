import React, { useState } from "react";
import "./RegisterNow.css";

const RegisterNow = ({ className = "", pulsing = true }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      href="https://forms.gle/VSBj5e7iGXakJaPA9"
      target="_blank"
      rel="noreferrer"
      className={`register-button ${pulsing ? "pulsing" : ""} ${isHovering ? "hovering" : ""
        } ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      Register Now
    </a>
  );
};

export default RegisterNow;
