import React, { useState } from 'react';
import axios from 'axios';
import './UploadModal.css';
import { toast } from 'react-toastify';

const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sem, setSem] = useState('');
  const [department, setDepartment] = useState('');


  const handleUpload = async () => {
    if (!title || !subject || !file) {
      toast.error('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('file', file);
    formData.append('sem', sem);
    formData.append('department', department);

    setUploading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/notes`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded*100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      onSuccess();
      toast.success('Note uploaded successfully!');
      onClose();
      setUploadProgress(0);
    } catch (err) {
      toast.error('Something went wrong!');
      setUploadProgress(0);
    }
    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <h3>Upload New Note</h3>
        <input
          type="text"
          autoComplete="on"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          autoComplete="on"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <select value={sem} onChange={(e) => setSem(e.target.value)}>
          <option value="">Select Semester</option>
          <option value="Sem1">Sem1</option>
          <option value="Sem2">Sem2</option>
          <option value="Sem3">Sem3</option>
          <option value="Sem4">Sem4</option>
          <option value="Sem5">Sem5</option>
          <option value="Sem5">Sem6</option>
        </select>

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value="computerscience">Computer Science</option>
          <option value="electronics">Electronics and Communications</option>
          <option value="aiml">AIML</option>
          <option value="informationscience">Information Science</option>
          <option value="aids">AIDS</option>
        </select>




        {uploading && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
            <span>{uploadProgress}%</span>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          <button className="cancel-btn" onClick={() => {
            onClose();
            setUploadProgress(0);
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
