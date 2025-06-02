import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import './DepartmentPage.css';
import { getAllNotes } from '../services/api';
import SearchFilter from '../components/SearchFilter';
import BookAnimation from '../components/BookAnimation';
import SubjectDropdown from '../components/SubjectDropdown';
import LoadingSpinner from '../components/LoadingSpinner'; 

const DepartmentPage = () => {
  const { sem, department } = useParams();
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true); // <- NEW

  const departmentMap = {
    computerscience: 'Computer Science',
    electronics: 'Electronics',
    aiml: 'AIML',
    cseaiml: 'CSE(AIML)',
    informationtechnology: 'Information Technology',
    aids: 'AIDS'
  };

  const normalizedDepartment = department.toLowerCase(); // already an internal key
  const normalizedSem = decodeURIComponent(sem);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true); // start loading
      try {
        const data = await getAllNotes({ sem: normalizedSem, department: normalizedDepartment });
        setNotes(data);
        const uniqueSubjects = [...new Set(data.map(note => note.subject))];
        setSubjects(uniqueSubjects);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchNotes();
  }, [normalizedSem, normalizedDepartment]);

  useEffect(() => {
    if (!selectedSubject) {
      setFilteredNotes([]);
      return;
    }

    const notesBySubject = notes.filter(note => note.subject === selectedSubject);
    const filtered = notesBySubject.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredNotes(filtered);
  }, [selectedSubject, searchQuery, notes]);

  return (
    <div className="department-page">
      <h2>{department.toUpperCase()}</h2>

      <div className="filter-bar">
        <SearchFilter onSearch={setSearchQuery} />
        <SubjectDropdown
          subjects={subjects}
          selectedSubject={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        />
      </div>

      <div className="notes-grid">
        {loading ? (
          <LoadingSpinner/>
        ) : notes.length === 0 ? (
          <BookAnimation />
        ) : !selectedSubject ? (
          <p className="select-message">Select any subject to see notes</p>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map(note => <NoteCard key={note._id} note={note} />)
        ) : (
          selectedSubject && <BookAnimation />
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
