import React from 'react';
import './GlowingButton.css';

const GlowingButton = ({ label = 'Popular Notes', onClick }) => {
  return (
    <button className="btn1 btn-download" onClick={onClick}>
      {label}
    </button>
  );
};

export default GlowingButton;
