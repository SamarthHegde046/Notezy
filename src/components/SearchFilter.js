// src/components/SearchFilter.js
import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Search by subject, title.."
        value={query}
        onChange={handleChange}
      />
    </section>
  );
};

export default SearchFilter;
