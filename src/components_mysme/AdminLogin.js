// src/components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminLogin = () => {
  const [panelId, setPanelId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!panelId || !/^\d{7}$/.test(panelId)) {
      setError('Please enter a valid 7-digit panel ID');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with panel ID:', panelId);
      // Update API endpoint to point to backend server
      const res = await axios.post('https://sme-api-04db435264b2.herokuapp.com/api/admin/login', { panelId });
      console.log('Login response:', res.data);

      if (res.data.token) {
        // Store token and role in localStorage
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('userRole', 'admin');
        console.log('Login successful, navigating to dashboard');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please check your panel ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Exam Admin Panel Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="panelId">Panel ID</label>
          <input
            type="text"
            id="panelId"
            value={panelId}
            onChange={(e) => setPanelId(e.target.value)}
            placeholder="Enter your 7-digit panel ID"
            maxLength={7}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-login"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;