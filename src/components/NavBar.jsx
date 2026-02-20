import React, { useState, useEffect } from 'react';
import './NavBar.css';
import logoBlack from './assets/sasnakalearnsteerblack.svg';
import logoWhite from './assets/sasnakalearnsteerwhite.svg';

const NavBar = ({ isDarkMode }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Logic: If scrolled more than 50px, set true
      setScrolled(window.scrollY > 50);
    };

    // { passive: true } improves scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-sticky' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img 
            src={isDarkMode ? logoWhite : logoBlack} 
            alt="Sasnaka & Learnsteer" 
            height={50}
          />
        </div>

        {/* Navigation Links */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          
        </ul>

        {/* Mobile Menu Toggle - Now inside the container for alignment */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;