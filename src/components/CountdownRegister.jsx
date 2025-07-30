import React from 'react';
import CountdownTimer from './CountdownTimer';
import './CountdownRegister.css';
import RegisterNow from "./RegisterNow";
import { useTranslation } from 'react-i18next';

const CountdownRegister = () => {
  const { t } = useTranslation();

  return (
      <div className="countdown-register-container">
        <div className="container">
          <div className="countdown-register-wrapper">
            <div className="countdown-section">
              <h2>{t("countdownRegister.hurryUp")}</h2>
              <CountdownTimer deadline="2025-07-31T23:59:59" />
            </div>

            <div className="register-section">
              <h2>{t("countdownRegister.readyToExcel")}</h2>
              <p>{t("countdownRegister.description")}</p>

              <RegisterNow />
            </div>
          </div>
        </div>
      </div>
  );
};

export default CountdownRegister;