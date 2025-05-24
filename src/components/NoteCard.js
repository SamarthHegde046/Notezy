import { toast } from 'react-toastify';
import './NoteCard.css';
import { incrementDownload } from '../services/api';

const NoteCard = ({ note }) => {
  const getDownloadUrl = (url) => {
    const parts = url.split('/upload/');
    return parts[0] + '/upload/fl_attachment/' + parts[1];
  };

    const handleDownload = async () => {
  try {
    await incrementDownload(note._id);

    const downloadUrl = getDownloadUrl(note.fileUrl);
    const response = await fetch(downloadUrl);
    const blob = await response.blob();

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
  } catch (error) {
    console.error('Download failed:', error);
    toast.error('Download failed. Please try again.', {
      position: 'top-right',
      autoClose: 2000,
    });
  }
};



  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>Subject: {note.subject}</p>

      <div className="note-buttons">
        <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="preview-btn">
          Preview
        </a>
        <button onClick={handleDownload} className="download-btn">
          Download 
        </button>
        <span className="download-count">[{note.downloadCount}]</span>
      </div>
    </div>
  );
};

export default NoteCard;
