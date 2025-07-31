import React, { useState } from "react";
import "./RegisterNow.css";
import { useTranslation } from "react-i18next";

const RegisterNow = ({ className = "", pulsing = true }) => {
  const { t } = useTranslation();
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
        {t("registerNowButton")}
      </a>
  );
};

export default RegisterNow;