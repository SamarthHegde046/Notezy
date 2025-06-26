// components/Footer.js
import React, { useState } from 'react';
import './Footer.css';
import { FaLock, FaFileContract, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import MessageFormModal from './MessageFormModal';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (type) => setActiveModal(type);
  const handleClose = () => setActiveModal(null);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-brand">
            <h2 className="brand-title">Notezy</h2>
            <p className="brand-description">
              Notezy is a student-focused notes-sharing platform that helps learners access, share, and discover high-quality academic resources with ease
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title1">Quick Links</h4>
            <ul className="footer-nav">
              <li>
                <button 
                  onClick={() => navigate("/")} 
                  className="nav-button"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/notezybot")} 
                  className="nav-button"
                >
                  Notezy AI
                </button>
              </li>
              <li>
                <a 
                  href="https://forms.gle/nd7wsDjrxv8fyh11A"
                  className="nav-button"
                >
                  Upload Note
                </a>
              </li>
            </ul>
          </div>
          {/* Legal & Contact Links */}
          <div className="footer-section">
            <h4 className="section-title1">Support</h4>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy" className="footer-link">
                  <FaLock className="link-icon" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="footer-link">
                  <FaFileContract className="link-icon" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="footer-link">
                  <FaInfoCircle className="link-icon" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleOpen('contact')} 
                  className="footer-link contact-button"
                >
                  <FaEnvelope className="link-icon" />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Notezy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      {activeModal === 'contact' && (
        <MessageFormModal onClose={handleClose} />
      )}
    </>
  );
};

export default Footer;