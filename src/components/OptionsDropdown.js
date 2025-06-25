import React from 'react';
import './OptionsDropdown.css';
import { SEM_OPTIONS } from './sems';

const OptionsDropdown = ({ onSelect }) => {
  const handleClick = (value) => {
    onSelect(value);
  };

  return (
    <div className="sem-list">
      {SEM_OPTIONS.map((option, index) => (
        <div
          key={index}
          className="sem-card"
          onClick={() => handleClick(option.value)}
        >
          <h2>{option.label}</h2>
        </div>
      ))}
    </div>
  );
};

export default OptionsDropdown;
