import React from 'react';
import CountdownTimer from './CountdownTimer';
import './CountdownRegister.css';
import RegisterNow from "./RegisterNow";

const CountdownRegister = () => {
  return (
      <div className="countdown-register-container">
        <div className="container">
          <div className="countdown-register-wrapper">
            {/*<div className="countdown-section">
              <h2>HURRY UP!</h2>
              <CountdownTimer deadline="2025-08-01T20:00:00" />
            </div>*/}

            <div className="register-section">
              <h2>Ready to excel?</h2>
              <p>Join our comprehensive A/L mock examination program and prepare yourself for success.</p>

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

               <p className="registration-message">Registrations opening soon!</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CountdownRegister;