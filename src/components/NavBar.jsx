import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/assets/logo.png" alt="Sasnaka Logo" />
          <span>Sasnaka Sansada</span>
        </div>

        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#timetable" className="nav-link">Timetable</a>
          </li>
          <li className="nav-item">
            <a href="#sponsors" className="nav-link">Sponsors</a>
          </li>
          <li className="nav-item register-btn">
            <a
              href="https://forms.gle/do6jF9UGx9gh4ZmZ9"
              target="_blank"
              rel="noreferrer"
              className="register-button"
            >
              Register Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;