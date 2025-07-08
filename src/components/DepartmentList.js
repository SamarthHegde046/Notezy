import React from 'react';
import {
  Code,
  Cpu,
  Brain,
  Database,
  BarChart3
} from 'lucide-react';
import './DepartmentList.css';
import { useNavigate } from 'react-router-dom';

const departments = [
  {
    id: 'computerscience',
    name: 'Computer Science',
    shortName: 'CSE',
    description: 'Master the fundamentals of computing, algorithms, and software development with comprehensive VTU syllabus coverage. Access detailed notes, question papers, and study materials to build secure, efficient software systems from scratch.',
    icon: <Code className="icon" />,
    subjects: ['Data Structures', 'OS', 'DBMS', 'OOPs']
  },
  {
    id: 'electronicsandcommunications',
    name: 'Electronics and Communications',
    shortName: 'ECE',
    description: 'Design circuits, embedded systems, and explore signal processing with VTU-aligned study materials. Download comprehensive notes and previous year question papers for analog and digital communication technologies.',
    icon: <Cpu className="icon" />,
    subjects: ['Digital Electronics', 'Microcontrollers', 'VLSI', 'Signals']
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence & ML',
    shortName: 'AIML',
    description: 'Learn to train machines to make decisions with VTU curriculum-based notes and resources. Explore deep learning, neural networks through structured study materials and practical question banks.',
    icon: <Brain className="icon" />,
    subjects: ['Machine Learning', 'Neural Networks', 'Python', 'AI']
  },
  {
    id: 'informationscience',
    name: 'Information Science',
    shortName: 'ISE',
    description: 'Work with large-scale data systems and secure networks using VTU-prescribed syllabus. Access comprehensive study notes, lab manuals, and question papers for IT and CS fundamentals.',
    icon: <Database className="icon" />,
    subjects: ['Cybersecurity', 'Database Design', 'Networks', 'Web Tech']
  },
  {
    id: 'aids',
    name: 'AI & Data Science',
    shortName: 'AIDS',
    description: 'Blend AI with data processing using VTU-approved curriculum and study materials. Download detailed notes, assignments, and previous year papers to extract insights and build predictive systems.',
    icon: <BarChart3 className="icon" />,
    subjects: ['Data Mining', 'Deep Learning', 'Big Data', 'Statistics'],
  }
];

const DepartmentList = ({ sem }) => {
  const navigate = useNavigate();

  const handleClick = (deptId) => {
    navigate(`/${sem}/${deptId}`);
  };

  return (
    <div className="department-list-wrapper">
      {/* New Content Section */}
      <div className="intro-section">
        <div className="intro-text">
          <h2>Choose Your Department</h2>
          <p>
            Access comprehensive notes, question papers, lab manuals, and study materials tailored for VTU students. 
            Our resources are organized by semester and department to help you excel in your engineering journey.
          </p>
        </div>
      </div>

      {/* Department List */}
      <div className="department-list">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="department-card"
            onClick={() => handleClick(dept.id)}
          >
            <div className="department-content">
              <div className="icon-wrapper">{dept.icon}</div>
              
              <h2>{dept.name}</h2>
              <h4 className="short-name">{dept.shortName}</h4>
              <p className="department-desc">
                {dept.description}
              </p>

              <div className="dept-extra">
                <p><strong>Core Subjects:</strong> {dept.subjects.join(', ')}</p>
              </div>

              <button className="explore-btn">
                Explore Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;