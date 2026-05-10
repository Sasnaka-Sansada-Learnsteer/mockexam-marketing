import React from 'react';
import CountdownTimer from './CountdownTimer';
import './CountdownRegister.css';
import RegisterNow from "./RegisterNow";

const CountdownRegister = () => {
  return (
    <div className="countdown-register-container">
      <div className="container">
        <div className="countdown-register-wrapper">
          {/*<div className="countdown-section">*/}
          {/*  <h2>GET READY!</h2>*/}
          {/*  <CountdownTimer deadline="2025-08-01T20:00:00" />*/}
          {/*</div>*/}

          <div className="register-section">
            <h2>Ready to excel?</h2>
            <p>Hurry up! Register early for A/L Mock Examination 2026 and prepare yourself for success.</p>

            {/*<a
                href="https://forms.gle/do6jF9UGx9gh4ZmZ9"
                target="_blank"
                rel="noreferrer"
                className="register-button"
              >
                Register Now
              </a>
              */}

            {/*<RegisterNow className="register-button" />*/}
            <div className="register-actions">
              <RegisterNow className="small-button" />
              <a href="/mysme/login" className="register-button small-button login-button">
                Login to My SME
              </a>
            </div>

            {/*<p className="registration-message">Registrations opening soon!</p>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownRegister;