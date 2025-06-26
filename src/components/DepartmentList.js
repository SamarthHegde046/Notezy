import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DepartmentList.css';
import {
  Code,
  Cpu,
  Brain,
  Database,
  BarChart3
} from 'lucide-react';

const departments = [
  {
    id: 'computerscience',
    name: 'Computer Science',
    shortName: 'CSE',
    description: 'Master the fundamentals of computing, algorithms, and software development. Learn to build secure, efficient software systems from scratch.',
    icon: <Code className="icon" />,
    subjects: ['Data Structures', 'OS', 'DBMS', 'OOPs']
  },
  {
    id: 'electronicsandcommunications',
    name: 'Electronics and Communications',
    shortName: 'ECE',
    description: 'Design circuits, embedded systems, and explore signal processing. Dive deep into analog and digital communication technologies.',
    icon: <Cpu className="icon" />,
    subjects: ['Digital Electronics', 'Microcontrollers', 'VLSI', 'Signals']
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence & ML',
    shortName: 'AIML',
    description: 'Learn to train machines to make decisions. Explore deep learning, neural networks, and real-world intelligent applications.',
    icon: <Brain className="icon" />,
    subjects: ['Machine Learning', 'Neural Networks', 'Python', 'AI']
  },
  {
    id: 'informationscience',
    name: 'Information Science',
    shortName: 'ISE',
    description: 'Work with large-scale data systems, secure networks, and software engineering practices. A blend of IT and CS fundamentals.',
    icon: <Database className="icon" />,
    subjects: ['Cybersecurity', 'Database Design', 'Networks', 'Web Tech']
  },
  {
    id: 'aids',
    name: 'AI & Data Science',
    shortName: 'AIDS',
    description: 'Blend AI with data processing to extract insights and build predictive systems. Analyze data with real impact.',
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
      <div className="department-header">
        <h1 className="heading">Choose Your Department</h1>
        <p className="subheading">Explore branches, check subjects, and discover career paths.</p>
      </div>

      <div className="department-list">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="department-card"
            onClick={() => handleClick(dept.id)}
          >
            <div className="department-content">
              <div className="icon-wrapper">{dept.icon}</div>
              <h1>{dept.name}</h1>
              <h4 className="short-name">{dept.shortName}</h4>
              <p className="department-desc">{dept.description}</p>

              <div className="dept-extra">
                <p><strong>Core Subjects:</strong> {dept.subjects.join(', ')}</p>
              </div>

              <button className="explore-btn">Explore Notes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;