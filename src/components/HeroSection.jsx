import React from 'react';
import './HeroSection.css';
import RegisterNow from "./RegisterNow";

const HeroSection = () => (
  <div className="hero-container">
    <div className="hero-content">
      <h1>Prepare for Your Future</h1>
      <h2>with Sasnaka Sansada A/L Mock Examination 2025</h2>
      <p>Take the first step towards A/L excellence with our comprehensive mock exams</p>
        {/*<a href="https://forms.gle/do6jF9UGx9gh4ZmZ9" target="_blank" rel="noreferrer">*/}
        {/*    <button className="cta-button">Register Now</button>*/}
        {/*</a>*/}
        {/*<RegisterNow className="always-visible" />*/}
        <p className="registration-message">Registrations opening soon!</p>
    </div>
    <div className="hero-overlay"></div>
  </div>
);

export default HeroSection;