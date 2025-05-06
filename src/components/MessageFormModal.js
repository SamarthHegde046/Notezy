// components/MessageFormModal.jsx
import React, { useState } from 'react';
import './MessageFormModal.css';
import { submitContactMessage } from '../services/api';

const MessageFormModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactMessage({ email, message });
      alert('Message sent!');
      setEmail('');
      setMessage('');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default MessageFormModal;
