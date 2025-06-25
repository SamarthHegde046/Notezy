import React, { useState, useEffect } from 'react';
import { X, Download, Star, TrendingUp, BookOpen, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { incrementDownload, incrementPreview } from '../services/api';
import './PopularNotesPopup.css';

const PopularNotesPopup = ({ isOpen, onClose, department, subject, allNotes }) => {
  const [popularNotes, setPopularNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && subject && allNotes.length > 0) {
      setLoading(true);
      
      // Filter notes by subject and get most popular ones
      const subjectNotes = allNotes.filter(note => note.subject === subject);
      
      // Sort by download count (most downloaded first) and take top 5
      const sortedNotes = subjectNotes
        .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
        .slice(0, 4);
      
      // Add badges based on position and download count
      const notesWithBadges = sortedNotes.map((note, index) => ({
        ...note,
        badge: index === 0 ? 'Most Downloaded' : 
               index === 1 ? 'Top Rated' : 
               index === 2 ? 'Trending' : 'Popular',
        views: (note.downloadCount || 0) * 3, // Estimate views as 3x downloads
        size: '5-10 MB' // Mock size since you don't track this
      }));
      
      setPopularNotes(notesWithBadges);
      setLoading(false);
    }
  }, [isOpen, subject, allNotes]);

  const getBadgeClass = (badge) => {
    switch(badge) {
      case 'Most Downloaded': return 'badge badge-red';
      case 'Top Rated': return 'badge badge-yellow';
      case 'Trending': return 'badge badge-green';
      case 'Popular': return 'badge badge-blue';
      default: return 'badge badge-gray';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num?.toString() || '0';
  };

  const getDownloadUrl = (url) => {
    const parts = url.split('/upload/');
    return parts[0] + '/upload/fl_attachment/' + parts[1];
  };

  const handleDownload = async (note) => {
    try {
      await incrementDownload(note._id);
      
      const downloadUrl = getDownloadUrl(note.fileUrl);
      const fileResponse = await fetch(downloadUrl);
      if (!fileResponse.ok) throw new Error('Network response was not ok');
      
      const blob = await fileResponse.blob();
      const fileName = `${note.title.trim().replace(/\s+/g, '_')}.pdf`;
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      
      toast.success('Downloaded successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
      
      // Update the download count in the popup
      setPopularNotes(prev => 
        prev.map(n => 
          n._id === note._id 
            ? { ...n, downloadCount: (n.downloadCount || 0) + 1 }
            : n
        )
      );
      
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const handlePreview = async (note) => {
    try {
      await incrementPreview(note._id);
      window.open(note.fileUrl, '_blank');
    } catch (error) {
      console.error('Preview failed:', error);
      toast.error('Preview failed. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div 
        className="popup-backdrop"
        onClick={onClose}
      ></div>
      
      <div className="popup-container">
        <div className="popup-header">
          <button
            onClick={onClose}
            className="popup-close-btn"
          >
            <X size={20} />
          </button>
          
          <div className="popup-title-section">
            <div className="popup-title-row">
              <TrendingUp size={24} />
              <h2 className="popup-title">Popular in {subject}</h2>
            </div>
            <p className="popup-subtitle">
              Most downloaded notes by {department} students
            </p>
          </div>
        </div>

        <div className="popup-content">
          {loading ? (
            <div className="loading-section">
              {[1, 2, 3].map((i) => (
                <div key={i} className="loading-item">
                  <div className="loading-card">
                    <div className="loading-icon"></div>
                    <div className="loading-content">
                      <div className="loading-line loading-line-title"></div>
                      <div className="loading-line loading-line-subtitle"></div>
                      <div className="loading-line loading-line-small"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : popularNotes.length > 0 ? (
            <div className="notes-grid">
              {popularNotes.map((note, index) => (
                <div 
                  key={note._id}
                  className="note-item"
                >
                  <div className="note-rank">#{index + 1}</div>
                  
                  <div className="note-info">
                    <h4 className="note-title">{note.title}</h4>
                    
                    <div className="note-stats">
                      <span className="stat">
                        <Download size={14} />
                        {formatNumber(note.downloadCount)}
                      </span>
                      <span className="stat-size">{note.size}</span>
                    </div>
                  </div>
                  
                  <div className="note-buttons">
                    <button 
                      onClick={() => handleDownload(note)}
                      className="btn-download"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={() => handlePreview(note)}
                      className="btn-preview"
                      title="Preview"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} className="empty-icon" />
              <p className="empty-text">No popular notes found for this subject yet.</p>
            </div>
          )}
        </div>

        {!loading && popularNotes.length > 0 && (
          <div className="popup-footer">
            <div className="footer-content">
              <p className="footer-text">
                Showing top {popularNotes.length} most popular notes
              </p>
              <button 
                onClick={onClose}
                className="footer-link"
              >
                Browse All Notes →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularNotesPopup;