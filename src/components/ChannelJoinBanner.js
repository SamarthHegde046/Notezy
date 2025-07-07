import React from 'react';
import './ChannelJoinBanner.css';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const ChannelJoinBanner = () => {
  return (
    <div className="channel-banner">
      <p className="banner-title">Join our channels for latest notes updates & discussions</p>
      <div className="channel-icons">
        <a
          href="https://chat.whatsapp.com/KjNhFILHZFL8MpTT4xmOTk"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button whatsapp"
        >
          <FaWhatsapp className="icon" />
          <span>WhatsApp</span>
        </a>
        <a
          href="https://t.me/notezy_online"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button telegram"
        >
          <FaTelegramPlane className="icon" />
          <span>Telegram</span>
        </a>
      </div>
    </div>
  );
};

export default ChannelJoinBanner;
