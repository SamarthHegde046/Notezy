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
           All Sem VTU Notes Available Soon &nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;
           📚 Only 4th Sem Notes Available now! &nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;
           📄 Download Question Papers
        </p>
      </div>
    </div>
  );
};

export default MarqueeBanner;
