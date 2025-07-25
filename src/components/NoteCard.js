import { toast } from 'react-toastify';
import './NoteCard.css';
import { incrementDownload, incrementPreview } from '../services/api';
const API_BASE = process.env.REACT_APP_API_BASE;
const NoteCard = ({ note }) => {

  
  const handleDownload = async () => {
    try {
      await incrementDownload(note._id);

      const backendDownloadUrl = `${API_BASE}/notes/${note._id}/download`;

      // Create a hidden link to trigger download
      const link = document.createElement("a");
      link.href = backendDownloadUrl;
      link.download = `${note.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    toast.success("Downloaded Succesfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Download failed:", error);
    toast.error("Download failed. Please try again.", {
      position: "top-right",
      autoClose: 2000,
    });
  }
  };

  return (
    <section className="note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="download-badge">
          <span className="download-count">{note.downloadCount}</span>
          <span className="download-label">downloads</span>
        </div>
      </div>
      
      <div className="note-content">
        <p className="note-subject">
          <span className="subject-label">Subject:</span> {note.subject}
        </p>
        <p className="note-subject">
          <span className="subject-label">Topics:</span> {note.description}
        </p>
        <p className="note-subject">
          <span className="subject-label">By:</span> {note.by}
        </p>
      </div>
      
      <div className="note-actions">
        <a 
          href={note.fileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-preview"
          onClick={() => incrementPreview(note._id)}
        >
          <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Preview
        </a>
        
        <button onClick={handleDownload} className="btn btn-download">
          <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download
        </button>
      </div>
    </section>
  );
};

export default NoteCard;