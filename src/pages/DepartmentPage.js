import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookAnimation from '../components/BookAnimation';
import FeedbackForm from '../components/FeedbackForm';
import LoadingSpinner from '../components/LoadingSpinner';
import NoteCard from '../components/NoteCard';
import SearchFilter from '../components/SearchFilter';
import SubjectDropdown from '../components/SubjectDropdown';
import { getAllNotes } from '../services/api';
import './DepartmentPage.css';
import { FaWhatsapp } from 'react-icons/fa';

const DepartmentPage = () => {
  const { sem, department } = useParams();
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false); // modal control

  const departmentMap = {
    computerscience: 'Computer Science',
    electronicsandcommunications: 'Electronics and Communications',
    aiml: 'AIML',
    informationscience: 'Information Science',
    aids: 'AIDS'
  };

  const normalizedDepartment = department.toLowerCase();
  const normalizedSem = decodeURIComponent(sem);
  const departmentDisplayName = departmentMap[normalizedDepartment] || department.toUpperCase();

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const data = await getAllNotes({ sem: normalizedSem, department: normalizedDepartment });
        setNotes(data);
        const uniqueSubjects = [...new Set(data.map(note => note.subject))];
        setSubjects(uniqueSubjects);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false);
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
      <h1>{departmentDisplayName}</h1>
      <div className="department-content">
        <div className="update-banner">
          📢 New notes will be uploaded regularly. Please visit again later to check for updates!
        </div>

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
            <div className="loading-container">
              <LoadingSpinner />
            </div>
          ) : notes.length === 0 ? (
            <div className="animation-container">
              <BookAnimation />
            </div>
          ) : !selectedSubject ? (
            <p className="select-message">Select any subject to see notes</p>
          ) : filteredNotes.length > 0 ? (
            filteredNotes.map(note => <NoteCard key={note._id} note={note} />)
          ) : (
            <div className="animation-container">
              <BookAnimation />
            </div>
          )}
        </div>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Hey! Your friend shared this page with you. It contains useful notes. Check it out:${window.location.href}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-share"
        >
          <FaWhatsapp size={34} style={{margin:'8px'}}/>
        </a>

        {selectedSubject && (
          <>
            <button
              className="floating-feedback-button"
              onClick={() => setShowFeedback(true)}
              title="Give Feedback"
            >
              📝
            </button>

            {showFeedback && (
              <div className="feedback-modal-overlay" onClick={() => setShowFeedback(false)}>
                <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
                  <button className="close-modal" onClick={() => setShowFeedback(false)}>×</button>
                  <FeedbackForm
                    sem={normalizedSem}
                    department={normalizedDepartment}
                    subject={selectedSubject}
                  />
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default DepartmentPage;