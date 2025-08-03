// src/components/MyExamPortal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyExamPortal.css';

const MyExamPortal = () => {
  const navigate = useNavigate();

  const handleCheckStatus = () => {
    navigate('/login');
  };

  return (
    <div className="exam-portal-container">
      <div className="exam-portal-content">
        <h2>My Exam Portal</h2>
        <p>Access your registration details, exam schedules, and results</p>
        <button
          className="check-status-button"
          onClick={handleCheckStatus}
        >
          Check Registration Status
        </button>
      </div>
    </div>
  );
};

export default MyExamPortal;