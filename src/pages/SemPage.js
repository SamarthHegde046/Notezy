import React from 'react';
import { useLocation } from 'react-router-dom';
import DepartmentList from '../components/DepartmentList';

const SemPage = () => {
  const location = useLocation();
  const sem = location.pathname.split('/')[1];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>{sem} - Departments</h1>
      <DepartmentList sem={sem} />
    </div>
  );
};

export default SemPage;
