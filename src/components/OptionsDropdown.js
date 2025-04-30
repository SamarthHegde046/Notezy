// src/components/OptionsDropdown.jsx
import React from 'react';
import './OptionsDropdown.css';
import { SEM_OPTIONS } from './sems';

const OptionsDropdown = ({ onSelect }) => {
  const handleChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className="options-dropdown">
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Select Your Sem</option>
        {SEM_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionsDropdown;
