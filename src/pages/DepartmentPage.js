import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import './DepartmentPage.css';
import { getAllNotes } from '../services/api';
import SearchFilter from '../components/SearchFilter';
import BookAnimation from '../components/BookAnimation';
import SubjectDropdown from '../components/SubjectDropdown';

const DepartmentPage = () => {
  const { sem, department } = useParams();
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  const departmentMap = {
    computerengineering: 'Computer Engineering',
    electronics: 'Electronics',
    mechanical: 'Mechanical',
    civil: 'Civil',
    informationtechnology: 'Information Technology'
  };

  const properDepartment = departmentMap[department.toLowerCase()];
  const normalizedSem = decodeURIComponent(sem);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getAllNotes({ sem: normalizedSem, department: properDepartment });
      setNotes(data);
      const uniqueSubjects = [...new Set(data.map(note => note.subject))];
      setSubjects(uniqueSubjects);
    };

    fetchNotes();
  }, [normalizedSem, properDepartment]);

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
      <h1>{properDepartment}</h1>
      <h2>{normalizedSem}</h2>

      <div className="filter-bar">
        <SearchFilter onSearch={setSearchQuery} />
        <SubjectDropdown
          subjects={subjects}
          selectedSubject={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        />
      </div>

      <div className="notes-grid">
        {notes.length === 0 ? (
          <BookAnimation />
        ) : !selectedSubject ? (
          <p className="select-message">Select any subject first.</p>
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
