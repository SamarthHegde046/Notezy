// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Loading notes...</p>
      <p>Usually it will take 8-12 seconds</p>
    </div>
  );
};

export default LoadingSpinner;
