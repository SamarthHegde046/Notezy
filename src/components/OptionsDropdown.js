// src/components/OptionsDropdown.jsx
import React from 'react';
import './OptionsDropdown.css';

const OptionsDropdown = ({ onSelect }) => {
  const options = [
    'Science',
    'Mathematics',
    'History',
    'Geography',
    'Programming',
    'Arts'
  ];

  const handleChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className="options-dropdown">
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Select a category</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionsDropdown;
