import React, { useState } from "react";
import "./RegisterNow.css";

const RegisterNow = ({ className = "", pulsing = true }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfV0DfAa1u-NV3XMFPTOYjC-ILvABJRgKS2L9z3MWWRsh9FXQ/viewform"
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
