// OptionsDropdown.js
import React from 'react';
import './OptionsDropdown.css';
import { SEM_OPTIONS } from './sems';

const OptionsDropdown = ({ onSelect }) => {
  // Enhanced VTU-focused descriptions with keywords
  const getSemesterInfo = (value) => {
    const semesterData = {
      'Physicscycle': {
        description: 'VTU Physics Cycle foundation notes covering core engineering subjects. Access comprehensive study materials, previous year question papers, and detailed notes for VTU examinations.',
        subjects: ['Engineering Physics', 'Mathematics I', 'Engineering Mechanics', 'Basic Electronics', 'Programming Fundamentals']
      },
      'Chemistrycycle': {
        description: 'Complete VTU Chemistry Cycle study materials with detailed notes, lab manuals, and exam preparation resources. Perfect for VTU students seeking quality educational content.',
        subjects: ['Engineering Chemistry', 'Mathematics II', 'Materials Science', 'Environmental Studies', 'Workshop Practice']
      },
      'Sem3': {
        description: 'VTU 3rd Semester CSE notes with comprehensive coverage of core computer science subjects. Download high-quality study materials, solved examples, and VTU question papers.',
        subjects: ['Data Structures', 'Digital Logic Design', 'Object-Oriented Programming', 'Operating Systems' , 'Computer Organization']
      },
      'Sem4': {
        description: 'VTU 4th Semester computer science notes featuring advanced programming concepts and database systems. Access premium study materials for VTU exam preparation.',
        subjects: ['Database Management System', 'Computer Networks', 'Discrete Mathematics', 'Software Engineering', 'Theory of Computation','Biology for Engineers']
      },
      'Sem5': {
        description: 'VTU 5th Semester specialized notes covering modern technologies and industry-relevant subjects. Complete study package with VTU syllabus-aligned content and practice materials.',
        subjects: ['Web Technologies', 'Compiler Design', 'Computer Graphics', 'Artificial Intelligence', 'Mobile Computing']
      },
      'Sem6': {
        description: 'VTU 6th Semester advanced notes focusing on cutting-edge technologies and professional development. Premium quality study materials for VTU final semester preparation.',
        subjects: ['Machine Learning', 'Cloud Computing', 'Cybersecurity', 'Project Management', 'Professional Ethics']
      }
    };
    
    return semesterData[value] || {
      description: `Complete VTU study materials and notes for ${value}. Access quality educational content for VTU examinations.`,
      subjects: []
    };
  };

  // Get meaningful icon for each semester
  const getSemesterIcon = (value) => {
    const icons = {
      'Physicscycle': (
        // Physics/atom icon
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6l4-4zM23 12h-6l4 4zM12 23v-6l-4 4zM1 12h6L3 8z"/>
        </svg>
      ),
      'Chemistrycycle': (
        // Chemistry flask icon
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 2v6.12L3.34 14.8c-.99 1.32-.21 3.2 1.3 3.2h14.72c1.51 0 2.29-1.88 1.3-3.2L15 8.12V2H9zm1.5 1.5h3V7.5L16.5 11h-9l3-3.5V3.5z"/>
          <circle cx="8.5" cy="15.5" r="1.5"/>
          <circle cx="15.5" cy="15.5" r="1.5"/>
        </svg>
      ),
      'Sem3': (
        // Code/programming icon
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 6l-4 4 4 4v-2.5l-2.5-1.5L8 8.5V6zm8 0v2.5l2.5 1.5L16 11.5V14l4-4-4-4z"/>
          <path d="M12 14l-2-8h-1l2 8h1zm1 0h1l2-8h-1l-2 8z"/>
        </svg>
      ),
      'Sem4': (
        // Database/server icon
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 3.35 5 5v2c0 1.65 3.13 3 7 3s7-1.35 7-3V5c0-1.65-3.13-3-7-3z"/>
          <path d="M5 10.5V12c0 1.65 3.13 3 7 3s7-1.35 7-3v-1.5c-1.52.87-4.11 1.5-7 1.5s-5.48-.63-7-1.5z"/>
          <path d="M5 16.5V18c0 1.65 3.13 3 7 3s7-1.35 7-3v-1.5c-1.52.87-4.11 1.5-7 1.5s-5.48-.63-7-1.5z"/>
        </svg>
      ),
      'Sem5': (
        // Web/globe icon
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.93-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      'Sem6': (
        // AI/brain icon
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
          <path d="M9 21v-1h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1z"/>
          <circle cx="9" cy="9" r="1"/>
          <circle cx="15" cy="9" r="1"/>
          <path d="M12 13c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"/>
        </svg>
      )
    };
    
    return icons[value] || (
      // Default graduation cap icon
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
      </svg>
    );
  };

  const handleClick = (value) => {
    onSelect(value);
  };

  return (
    <div className="semester-container">
      <div className="semester-wrapper">
        <h1 className="semester-title">
          Choose Your Semester
        </h1>
        
        <div className="semester-grid">
          {SEM_OPTIONS.map((option, index) => {
            const semInfo = getSemesterInfo(option.value);
            
            return (
              <div
                key={index}
                className="semester-card"
                onClick={() => handleClick(option.value)}
              >
                {/* Header with icon and title */}
                <div className="semester-header">
                  <div className="semester-icon-container">
                    <div className="semester-icon">
                      {getSemesterIcon(option.value)}
                    </div>
                  </div>
                  <h2 className="semester-header-title">
                    {option.label}
                  </h2>
                </div>
                
                {/* Content */}
                <div className="semester-content">
                  <p className="semester-description">
                    {semInfo.description}
                  </p>
                  
                  {semInfo.subjects && semInfo.subjects.length > 0 && (
                    <div className="subjects-section">
                      <h3 className="subjects-title">
                        Core Subjects:
                      </h3>
                      <div className="subjects-container">
                        {semInfo.subjects.map((subject, subIndex) => (
                          <span 
                            key={subIndex}
                            className="subject-tag"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button className="explore-button">
                    Explore Notes
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OptionsDropdown;