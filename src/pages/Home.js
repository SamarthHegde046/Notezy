import React, { useEffect, useState } from 'react';
import { getAllNotes } from '../services/api';
import NoteCard from '../components/NoteCard';
import SearchFilter from '../components/SearchFilter';
import './Home.css';
import BookAnimation from '../components/BookAnimation';
import OptionsDropdown from '../components/OptionsDropdown';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    getAllNotes().then((notes) => {
      if (Array.isArray(notes)) {
        setNotes(notes);
        setFilteredNotes(notes);
      } else {
        setNotes([]);
        setFilteredNotes([]);
      }
    });
  }, []);

  const handleSearch = (query) => {
    const filtered = notes.filter(note =>
      note.subject.toLowerCase().includes(query.toLowerCase()) ||
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const handleSelect = (value) => {
    setSelectedOption(value);
    console.log('Selected:', value);
  };

  return (
    <div className="homepage">
      <h1>All Study Notes</h1>

      {/* Search filter */}
      <SearchFilter onSearch={handleSearch} />

      {/* ADD OPTIONS DROPDOWN HERE ✅ */}
      <OptionsDropdown onSelect={handleSelect} />

      {/* When user selects an option, show this */}
      {selectedOption && (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem' }}>
          You selected: <strong>{selectedOption}</strong>
        </div>
      )}
    </div>
  );
};

export default Home;
