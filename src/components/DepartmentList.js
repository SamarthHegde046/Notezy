import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DepartmentList.css';

const departments = [
  'Computer Engineering',
  'Electronics',
  'Mechanical',
  'Civil',
  'Information Technology'
];

const DepartmentList = ({ sem }) => {
  const navigate = useNavigate();

  const handleClick = (dept) => {
    // Navigate to /{sem}/{dept} (you can change this structure)
    const url = `/${sem}/${dept.replace(/\s+/g, '').toLowerCase()}`;
    navigate(url);
  };

  return (
    <div className="department-list">
      {departments.map((dept, index) => (
        <div
          key={index}
          className="department-card"
          onClick={() => handleClick(dept)}
        >
          <h2>{dept}</h2>
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
