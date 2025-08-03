// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [nic, setNic] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nic.trim()) {
      setError('Please enter your NIC number');
      return;
    }

    // Here you would typically call an API to verify the NIC
    // For now, just navigate to a dashboard or status page
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Check Registration Status</h2>
        <p>Enter your NIC number to access your exam portal</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nic">NIC Number</label>
            <input
              type="text"
              id="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              placeholder="Enter your NIC number"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;