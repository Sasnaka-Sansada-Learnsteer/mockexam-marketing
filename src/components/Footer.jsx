import React from 'react';
import './Footer.css';
import logo from './assets/sasnaka_footer_image.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Sasnaka Sansada" />
          {/*<h3>Sasnaka Sansada</h3>*/}
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#herosection">Home</a></li>
              <li><a href="#examinfo">Exam Info</a></li>
              <li><a href="#examtimetable">Timetable</a></li>
              <li><a href="#remainingseats">Available Seats</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="mailto:almockexam.sasnaka@gmail.com">
                almockexam.sasnaka@gmail.com</a></li>
              {/*<li><a href="tel:+94112234645">+94 112 234 645</a></li>*/}
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com/sasnaka" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/sasnakasansada" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/tag/sasnakasansada" target="_blank" rel="noopener noreferrer" aria-label="Tiktok">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://linkedin.com/company/sasnaka" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/@sasnakasansada" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <i className="fab fa-youtube"></i>
            </a>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sasnaka Sansada. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;