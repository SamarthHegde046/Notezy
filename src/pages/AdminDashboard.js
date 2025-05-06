import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminDashboard.css';
import UploadModal from '../components/UploadModal';
import DashboardCharts from '../components/DashboardCharts';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';


const AdminDashboard = () => {
  const [notes, setNotes] = useState([]);
  const [downloads, setDownloads] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const openModal = () => setIsUploadOpen(true);
  const closeModal = () => setIsUploadOpen(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]); // dynamic subjects
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedNotes, setDisplayedNotes] = useState([]);


  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to access this.');
    navigate('/login');
  }
  const fetchFilteredNotes = async () => {
    if (!department || !semester || !subject) {
      toast.info('Please select all filters');
      return;
    }
  
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/notes`, {
        params: {
          department,
          sem: semester,
          subject
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setFilteredNotes(res.data); // full backend filtered
      setDisplayedNotes(res.data); // displayed + searchable
    } catch (error) {
      toast.error('Failed to fetch filtered notes');
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    if (!token) return;
  
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/notes/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setNotes(res.data.notes);
        setDownloads(res.data.totalDownloads);
        setAdmins(res.data.activeAdmins);
      } catch (err) {
        toast.error('Failed to load Dashboard data..');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, [token]);
  
  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
  
    // Add fade-out class
    const element = document.getElementById(`note-${id}`);
    if (element) {
      element.classList.add('fade-out');
    }
  
    setTimeout(async () => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE}/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(notes.filter(n => n._id !== id));
        toast.success('Note deleted successfully');
      } catch (err) {
        toast.error('Delete failed');
      }
    }, 400);
  };

    
useEffect(() => {
  const filtered = filteredNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setDisplayedNotes(filtered);
}, [searchQuery, filteredNotes]);

  
  if (loading) {
    return <div className="spinner">Loading dashboard...</div>;
  }  

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>{notes.length}</h3>
          <p>Notes Uploaded</p>
        </div>
        <div className="stat-box">
          <h3>{downloads}</h3>
          <p>Total Downloads</p>
        </div>
        <div className="stat-box">
          <h3>{admins.length}</h3>
          <p>Active Admins</p>
        </div>
      </div>

      <div className="admin-list">
        <h4>Admins Using This Site:</h4>
        <ul>
          {admins.map((admin) => (
            <li key={admin._id}>{admin.email}</li>
          ))}
        </ul>
        <button onClick={openModal} style={{
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        marginBottom: '20px',
        cursor: 'pointer'
        }}>
        + Upload Note
        </button>
      </div>
      <div className="filter-bar">
  <SearchFilter onSearch={setSearchQuery} />

  <select value={department} onChange={(e) => {
    setDepartment(e.target.value);
    setSemester('');
    setSubject('');
    setSubjects([]);
  }}>
    <option value="">Select Department</option>
    <option value="computerengineering">Computer Engineering</option>
    <option value='informationtechnology'>Information Technology</option>
    <option value="electronics">Electronics</option>
    <option value="mechanical">Mechanical</option>
    <option value="civil">Civil</option>
  </select>

  <select
  value={semester}
  onChange={async (e) => {
    const sem = e.target.value;
    setSemester(sem);
    setSubject('');
    setSubjects([]);
    
    if (department && sem) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE}/notes/subjects`, {
          params: { department, sem },
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubjects(res.data);
      } catch (err) {
        toast.error('Failed to fetch subjects');
      }
    }
  }}
  disabled={!department}>

    <option value="">Select Semester</option>
    {['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'].map((sem, idx) => (
      <option key={idx} value={sem}>{sem}</option>
    ))}
  </select>

  <select value={subject} onChange={(e) => setSubject(e.target.value)} disabled={!semester}>
    <option value="">Select Subject</option>
    {subjects.map((sub, idx) => (
      <option key={idx} value={sub}>{sub}</option>
    ))}
  </select>
  <button
  onClick={fetchFilteredNotes}
  disabled={!department || !semester || !subject}
  style={{
    padding: '8px 16px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginLeft: '10px'
  }}
>
  Search Notes
</button>

</div>

      <div className="note-listdash">

        <UploadModal
        isOpen={isUploadOpen}
        onClose={closeModal}
        onSuccess={() => window.location.reload()}
        />
        <h4>Uploaded Notes:-</h4>
        {department && semester && subject ? (
  displayedNotes.length > 0 ? (
    displayedNotes.map((note) => (
      <div className="note-card" key={note._id} id={`note-${note._id}`}>
        <p><strong>{note.title}</strong> ({note.subject})</p>
        <p>Downloads: {note.downloadCount}</p>
        <button
          style={{
            float: 'right',
            background: 'crimson',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px'
          }}
          onClick={() => handleDelete(note._id)}
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <p>No notes found for the selected filters.</p>
  )
) : (
  <p style={{ color: 'gray' }}>
    Please select department, semester and subject to view notes.
  </p>
)}

      </div>
      <DashboardCharts notes={notes} />
    </div>
  );
};

export default AdminDashboard;
