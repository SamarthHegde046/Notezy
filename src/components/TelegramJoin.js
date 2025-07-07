// src/components/TelegramBanner.jsx
import React from 'react';
import './TelegramJoin.css';

const TelegramJoin = () => {
  return (
    <a
      href="https://t.me/boost/notezy_online" 
      target="_blank"
      rel="noopener noreferrer"
      className="telegram-banner"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
        alt="Telegram"
        className="telegram-icon"
      />
      <span>Join our Telegram Channel for Latest Notes Updates</span>
    </a>
  );
};

export default TelegramJoin;
