// src/components/MarqueeBanner.js
import React from 'react';
import './MarqueeBanner.css';

const MarqueeBanner = () => {
  return (
    <div className="marquee-banner">
      <div className="title-with-dot">
        <span className="blinking-dot"></span>
        <span className="update-text">Update!</span>
      </div>
      <div className="scrolling-text">
        <p>
           All Sem VTU Notes Available Now(2022 scheme) &nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;
           Join <a href='https://chat.whatsapp.com/KjNhFILHZFL8MpTT4xmOTk'>whatsapp Channel</a>&nbsp;&nbsp;|
           Join <a href='https://t.me/notezy_online'>Telegram Channel</a>&nbsp;&nbsp;|
           📄 Download Question Papers and Solutions
        </p>
      </div>
    </div>
  );
};

export default MarqueeBanner;
