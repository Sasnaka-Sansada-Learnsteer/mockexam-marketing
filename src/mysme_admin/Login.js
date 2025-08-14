// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    NIC: '',
    District: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', formData);

      if (res.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', res.data.token);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Candidate Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>NIC</label>
          <input
            type="text"
            name="NIC"
            value={formData.NIC}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="District"
            value={formData.District}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default Login;