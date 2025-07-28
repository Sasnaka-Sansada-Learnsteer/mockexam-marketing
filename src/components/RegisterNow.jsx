import React, { useState } from "react";
import "./RegisterNow.css";

const RegisterNow = ({ className = "", pulsing = true }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      href="https://forms.gle/do6jF9UGx9gh4ZmZ9"
      target="_blank"
      rel="noreferrer"
      className={`register-button ${pulsing ? "pulsing" : ""} ${
        isHovering ? "hovering" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      Register Now
    </a>
  );
};

export default RegisterNow;
