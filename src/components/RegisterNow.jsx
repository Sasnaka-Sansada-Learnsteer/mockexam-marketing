import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./RegisterNow.css";

const RegisterNow = ({ className = "", pulsing = true }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      to="/register"
      className={`register-button ${pulsing ? "pulsing" : ""} ${isHovering ? "hovering" : ""} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      Register Now
    </Link>
  );
};

export default RegisterNow;
