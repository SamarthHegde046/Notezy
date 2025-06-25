import React, { useEffect } from 'react';
import './SubjectDropdown.css';

const SubjectDropdown = ({ subjects, selectedSubject, onChange }) => {
  useEffect(() => {
    // If no subject is selected and subjects exist, select the first one by default
    if (!selectedSubject && subjects.length > 0) {
      onChange({ target: { value: subjects[0] } });
    }
  }, [subjects, selectedSubject, onChange]);

  return (
    <select className="subject-dropdown" value={selectedSubject} onChange={onChange}>
      {subjects.map((subject, index) => (
        <option key={index} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
};

export default SubjectDropdown;
