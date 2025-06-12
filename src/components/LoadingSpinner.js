// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-wrapper">
        <div className="spinner" />
        <div className="spinner-glow" />
      </div>
      <div className="loading-text">
        <h3>Loading notes...</h3>
        <p>This usually takes 8-12 seconds</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;