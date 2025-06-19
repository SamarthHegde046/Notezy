//components/AdminFeedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFeedback.css';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/feedback/feedback`);
      setFeedbacks(res.data.data);
    } catch (err) {
      console.error('Error fetching feedbacks', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE}/feedback/${id}`);
      setFeedbacks(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      alert('Failed to delete feedback');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
  <div className="feedback-container">
    <h2>Manage Feedbacks</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="feedback-list">
        {feedbacks.map(fb => (
          <div key={fb._id} className="feedback-card">
            <p><strong>Name:</strong> {fb.name}</p>
            <p><strong>Department:</strong> {fb.department}</p>
            <p><strong>Semester:</strong> {fb.sem}</p>
            <p><strong>Subject:</strong> {fb.subject}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p><strong>Time:</strong> {fb.timestamp}</p>

            <div className="actions">
              <button onClick={() => deleteFeedback(fb._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default AdminFeedback;
