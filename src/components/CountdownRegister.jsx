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
              <CountdownTimer deadline="2025-08-01T20:00:00" />
            </div>

            <div className="register-section">
              <h2>{t("countdownRegister.readyToExcel")}</h2>
              <p>{t("countdownRegister.description")}</p>

              {/*<RegisterNow /> */}
              <p className="registration-message">Registrations opening soon!</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CountdownRegister;