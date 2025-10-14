import React, { useState, useEffect } from 'react';
import './NavBar.css';
import RegisterNow from './RegisterNow';
import logo from './assets/sasnakanlearnsteer.png';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <>
      <div className="navbar-banner">
          <span className="floating-banner-text">News : SME 25 - Phase I results will be releasing soon...</span>
      </div>
    <nav className={`navbar ${scrolled ? 'navbar-sticky' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Sasnaka&Learnsteer" />
          {/*<span>Sasnaka Sansada</span>*/}
        </div>

        {/*<RegisterNow className="always-visible" />*/}

        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {/* Other navigation items would go here */}
        </ul>
      </div>
    </nav>
      </>
  );
};

export default NavBar;