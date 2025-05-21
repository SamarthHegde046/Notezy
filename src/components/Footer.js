// components/Footer.js
import React, { useState } from 'react';
import Modal from './Modal';
import './Footer.css';
import { FaLock, FaFileContract, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import MessageFormModal from './MessageFormModal';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpen = (type) => setActiveModal(type);
  const handleClose = () => setActiveModal(null);

  const modalContent = {
    privacy: (
      <>
        <h3>Privacy Policy</h3>
        <p>We value your privacy and do not collect personal data without consent. Your files are stored securely.</p>
      </>
    ),
    terms: (
      <>
        <h3>Terms & Conditions</h3>
        <ul>
          <li>Use of notes is for educational purposes only.</li>
          <li>Do not redistribute files without permission.</li>
          <li>Admin has the right to remove any content.</li>
        </ul>
      </>
    ),
    about: (
      <>
        <h3>About Us</h3>
        <p>Our platform helps students share and access study materials easily. Built by developers passionate about education.</p>
      </>
    ),
  };

  return (
    <>
      <footer className="footer">
  <ul className="footer-links">
    <li onClick={() => handleOpen('privacy')}>
      <FaLock className="icon" /> Privacy Policy
    </li>
    <li onClick={() => handleOpen('terms')}>
      <FaFileContract className="icon" /> Terms & Conditions
    </li>
    <li onClick={() => handleOpen('about')}>
      <FaInfoCircle className="icon" /> About Us
    </li>
    <li onClick={() => handleOpen('contact')}>
      <FaEnvelope className="icon" /> Contact Us
    </li>
  </ul>
  <p className="footer-copy">© {new Date().getFullYear()} NoteBuddy. All rights reserved.</p>
</footer>


      {/* Standard Modals */}
      {activeModal !== 'contact' && (
        <Modal
          isOpen={!!activeModal}
          onClose={handleClose}
          title={activeModal && activeModal.charAt(0).toUpperCase() + activeModal.slice(1).replace(/([A-Z])/g, ' $1')}
        >
          {modalContent[activeModal]}
        </Modal>
      )}

      {/* Contact Modal (custom component) */}
      {activeModal === 'contact' && (
        <MessageFormModal onClose={handleClose} />
      )}
    </>
  );
};

export default Footer;
