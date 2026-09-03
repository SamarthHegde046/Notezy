import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
import { Upload } from 'lucide-react';
import GlowingButton from '../components/GlowingButton';
import ChannelJoinBanner from '../components/ChannelJoinBanner';
import quickNotesGif from "./open-book_15577982.gif";

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

  const pageTitle = `${departmentDisplayName} - ${normalizedSem} 2022 Scheme VTU Notes | Notezy`;
  const pageDescription = `Find high-quality VTU notes for ${departmentDisplayName} (${normalizedSem}). Access semester-wise curated resources, popular notes & quick study materials.`;

  
  // Handle closing popular notes popup
  const handleClosePopularNotes = () => {
    setShowPopularNotes(false);
  };

  // Handle Upload Notes
  const handleUploadNotesClick = () => {
    window.open('https://forms.gle/nd7wsDjrxv8fyh11A', '_blank');
  };
  const handlequicknotesClick = () => {
    navigate('/quicknotes');
  };

  return (
    <main className="department-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`notes, ${departmentDisplayName}, ${normalizedSem},all subjects, study materials, VTU`} />

        {/* Open Graph for better sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={`${window.location.origin}/feather-pen.png`} />

        <link rel="canonical" href={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${window.location.origin}/feather-pen.png`} />
      </Helmet>

      <ChannelJoinBanner/>
      <h1>{departmentDisplayName}</h1>
      <section className="department-content">

        <section className="filter-bar">
          <SearchFilter onSearch={setSearchQuery} />
          <span className="subject-label">Select Subject:</span>
          <SubjectDropdown
            subjects={subjects}
            selectedSubject={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          />
          <GlowingButton onClick={() => setShowPopularNotes(true)} />
            <button className="quick-notes-btn" onClick={handlequicknotesClick}>
              <img src={quickNotesGif} alt="Quick Notes Icon" className="quick-notes-icon" />
              <span>Quick Notes</span>
            </button>
        </section>

        <section className="notes-section">
          <div className="notes-grid">
            {loading ? (
              <div className="loading-container"><LoadingSpinner /></div>
            ) : notes.length === 0 ? (
              <div className="animation-container"><BookAnimation /></div>
            ) : !selectedSubject ? (
              <p className="select-message">Select any subject to see notes</p>
            ) : filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <article key={note._id}>
                  <NoteCard note={note} />
                </article>
              ))
            ) : (
              <div className="animation-container"><BookAnimation /></div>
            )}
          </div>
        </section>


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
          <aside>
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
          </aside>
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
        <section className="bottom-notezy-features">
          <div className="bottom-features-container">
            <h3 className="bottom-features-title">Enhance Your Study Experience</h3>
            <div className="bottom-features-grid">
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
        </section>
      </section>
    </main>
  );
};

export default DepartmentPage;