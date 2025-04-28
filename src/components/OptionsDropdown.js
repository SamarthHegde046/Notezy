// src/components/OptionsDropdown.jsx
import React from 'react';
import './OptionsDropdown.css';

const OptionsDropdown = ({ onSelect }) => {
  return (
    <div className="dropdown-container">
      <select onChange={(e) => onSelect(e.target.value)} className="dropdown">
        <option value="">Select an Option</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
        <option value="Option 4">Option 4</option>
        <option value="Option 5">Option 5</option>
        <option value="Option 6">Option 6</option>
      </select>
    </div>
  );
};

export default OptionsDropdown;
