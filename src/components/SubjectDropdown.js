import React from 'react';
import './SubjectDropdown.css';

const SubjectDropdown = ({ subjects, selectedSubject, onChange }) => {
  return (
    <select className="subject-dropdown" value={selectedSubject} onChange={onChange}>
      <option value="">Select Subject</option>
      {subjects.map((subject, index) => (
        <option key={index} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
};

export default SubjectDropdown;
