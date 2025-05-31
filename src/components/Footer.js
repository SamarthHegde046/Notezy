// components/Footer.js
import React, { useState } from 'react';
import './Footer.css';
import { FaLock, FaFileContract, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import MessageFormModal from './MessageFormModal';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpen = (type) => setActiveModal(type);
  const handleClose = () => setActiveModal(null);

  return (
    <>
      <footer className="footer">
        <ul className="footer-links">
          <li>
            <Link to="/privacy-policy">
              <FaLock className="icon" /> Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-and-conditions">
              <FaFileContract className="icon" /> Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <FaInfoCircle className="icon" /> About Us
            </Link>
          </li>
          <li onClick={() => handleOpen('contact')} style={{ cursor: 'pointer' }}>
            <FaEnvelope className="icon" /> Contact Us
          </li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} Notezy. All rights reserved.</p>
      </footer>

      {/* Contact Modal (custom component) */}
      {activeModal === 'contact' && (
        <MessageFormModal onClose={handleClose} />
      )}
    </>
  );
};

export default Footer;
