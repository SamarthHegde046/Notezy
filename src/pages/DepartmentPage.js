import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookAnimation from '../components/BookAnimation';
import FeedbackForm from '../components/FeedbackForm';  
import LoadingSpinner from '../components/LoadingSpinner';
import NoteCard from '../components/NoteCard';
import SearchFilter from '../components/SearchFilter';
import SubjectDropdown from '../components/SubjectDropdown';
import PopularNotesPopup from '../components/PopularNotesPopup';
import { getAllNotes } from '../services/api';
import './DepartmentPage.css';
import { FaWhatsapp } from 'react-icons/fa';
import { Sparkles, Upload } from 'lucide-react';
import GlowingButton from '../components/GlowingButton';

const DepartmentPage = () => {
  const { sem, department } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPopularNotes, setShowPopularNotes] = useState(false);
  const [popupShownSubjects, setPopupShownSubjects] = useState(new Set());

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
  
  // Handle closing popular notes popup
  const handleClosePopularNotes = () => {
    setShowPopularNotes(false);
    // Mark as shown for this session (in memory)
    const popupKey = `${normalizedSem}-${normalizedDepartment}-${selectedSubject}`;
    setPopupShownSubjects(prev => new Set([...prev, popupKey]));
  };

  // Handle Notezy AI navigation
  const handleNotezybotClick = () => {
    navigate('/notezybot');
  };

  // Handle Upload Notes
  const handleUploadNotesClick = () => {
    window.open('https://forms.gle/nd7wsDjrxv8fyh11A', '_blank');
  };

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
          <GlowingButton onClick={() => setShowPopularNotes(true)} />
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
            `Hey! Your friend shared this page with you. It contains ${selectedSubject} notes. Check it out:${window.location.href}`
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
        <PopularNotesPopup
          isOpen={showPopularNotes}
          onClose={handleClosePopularNotes}
          department={departmentDisplayName}
          subject={selectedSubject}
          allNotes={notes}
        />
        <div className="feedback-banner" onClick={() => setShowFeedback(true)}>
        💡 We value your feedback to improve our website. <span className="click-here">Click here</span> to share your thoughts.

      </div>
        <div className="bottom-notezy-features">
          <div className="bottom-features-container">
            <h3 className="bottom-features-title">Enhance Your Study Experience</h3>
            <div className="bottom-features-grid">
              <div className="bottom-feature-card" onClick={handleNotezybotClick}>
                <div className="bottom-feature-icon">
                  <Sparkles className="sparkles-icon" />
                </div>
                <div className="bottom-feature-content">
                  <h4 className="bottom-feature-title">Notezy AI Assistant</h4>
                  <p className="bottom-feature-description">
                    Upload your PDFs and get instant answers, summaries, and explanations with our AI-powered study companion.
                  </p>
                  <span className="bottom-feature-cta">Try Notezy AI →</span>
                </div>
              </div>
              
              <div className="bottom-feature-card" onClick={handleUploadNotesClick}>
                <div className="bottom-feature-icon">
                  <Upload className="upload-icon" />
                </div>
                <div className="bottom-feature-content">
                  <h4 className="bottom-feature-title">Contribute Notes</h4>
                  <p className="bottom-feature-description">
                    Help your fellow students by sharing your study materials. Upload notes, assignments, and resources.
                  </p>
                  <span className="bottom-feature-cta">Upload Now →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;