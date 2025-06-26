import React from 'react';
import './VTULinks.css';
import { FaUniversity, FaFileAlt, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

const VTULinks = () => {
  const links = [
    {
      title: 'VTU Results',
      description: 'Access your semester results directly from the official portal.',
      icon: <FaUniversity />,
      url: 'https://results.vtu.ac.in/',
    },
    {
      title: 'VTU Syllabus',
      description: 'Download up-to-date syllabus for all branches and semesters.',
      icon: <FaFileAlt />,
      url: 'https://vtu.ac.in/b-e-scheme-syllabus/',
    },
    {
      title: 'Model Question Papers',
      description: 'Practice for exams with real question papers from past years.',
      icon: <FaClipboardList />,
      url: 'https://vtu.ac.in/en/model-question-paper-b-e-b-tech-b-arch/',
    },
    {
      title: 'Academic Calendar',
      description: 'Stay informed about semester schedules and important dates.',
      icon: <FaCalendarAlt />,
      url: 'https://vtu.ac.in/en/academic-calendar/',
    },
  ];

  return (
    <div className="vtu-container">
      <header className="vtu-header">
        <div className="header-icon">📘</div>
        <h1 className="header-title1">VTU Resources</h1>
      </header>

      <div className="vtu-grid">
        {links.map((link, index) => (
          <div key={index} className="vtu-card">
            <div className="card-icon">{link.icon}</div>
            <h2 className="card-title">{link.title}</h2>
            <p className="card-description">{link.description}</p>
            <button
              className="visit-button"
              onClick={() => window.open(link.url, '_blank')}
            >
              <span className="button-icon">🔗</span> Visit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VTULinks;
