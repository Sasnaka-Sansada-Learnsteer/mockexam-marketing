import React from 'react';
import './RegisterNow.css';

const RegisterNow = ({ className = '', pulsing = true }) => {
    return (
        <a
            href="https://forms.gle/do6jF9UGx9gh4ZmZ9"
            target="_blank"
            rel="noreferrer"
            className={`register-button ${pulsing ? 'pulsing' : ''} ${className}`}
        >
            Register Now
        </a>
    );
};

export default RegisterNow;
