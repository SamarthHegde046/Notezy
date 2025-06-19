// FeedbackForm.js - Updated to use MongoDB backend
import React, { useRef, useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = ({ sem, department, subject }) => {
  const formRef = useRef(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    const form = formRef.current;
    const formData = new FormData(form);

    // Create the data object
    const feedbackData = {
      name: formData.get('name'),
      college: formData.get('college') || '',
      message: formData.get('message'),
      sem: sem || '',
      department: department || '',
      subject: subject || ''
    };

    try {
      // Replace with your actual backend URL
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/feedback/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('✅ Feedback submitted successfully!');
        form.reset();
      } else {
        setSuccess('❌ Submission failed: ' + (result.message || 'Unknown error'));
      }

    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSuccess('❌ Submission failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Have a Query or Feedback?</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="feedback-form">
        <label htmlFor="name">
          Name:<span style={{ color: 'red' }}> *</span>
          <input type="text" name="name" id="name" required placeholder="Your name" />
        </label>

        <label htmlFor="college">
          College:
          <input type="text" name="college" id="college" placeholder="Your college (optional)" />
        </label>

        <label htmlFor="message">
          Message:<span style={{ color: 'red' }}> *</span>
          <textarea name="message" id="message" required placeholder="Your message or query" rows={4}></textarea>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {success && <p className="submission-status">{success}</p>}
    </div>
  );
};

export default FeedbackForm;