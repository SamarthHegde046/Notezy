import React from 'react';
import './WhatsappBanner.css';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappBanner = () => {
  return (
    <a
      href="https://chat.whatsapp.com/KjNhFILHZFL8MpTT4xmOTk"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-banner"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className='whatsapp-text'>Click Here to Join our WhatsApp Channel for Latest Notes Updates and Discussion</span>
    </a>
  );
};

export default WhatsappBanner;
