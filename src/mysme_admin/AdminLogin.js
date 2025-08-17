// src/components/AdminLogin.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminLogin = () => {
  const [panelId, setPanelId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('userRole');

        if (token) {
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else if (role === 'scanner') {
                navigate('/admin/qr-scanner-dashboard');
            }
        }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!panelId || !/^\d{7}$/.test(panelId)) {
      setError('Please enter a valid 7-digit admin ID');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login with admin ID:', panelId);

        // Update API endpoint to include device fingerprint
        const deviceInfo = {
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            deviceId: localStorage.getItem('deviceId') || Math.random().toString(36).substring(2, 15)
        };

        // Store device ID if not already set
        if (!localStorage.getItem('deviceId')) {
            localStorage.setItem('deviceId', deviceInfo.deviceId);
        }

      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
          panelId,
          deviceInfo
      });
      console.log('Login response:', res.data);

      if (res.data.token) {
          // Store token and user information
          localStorage.setItem('adminToken', res.data.token);
          localStorage.setItem('panelId', panelId);

          // Check if this is a scanner panel ID
          if (res.data.role === 'scanner') {
              localStorage.setItem('userRole', 'scanner');
              navigate('/admin/qr-scanner-dashboard');
          } else {
              localStorage.setItem('userRole', 'admin');
              if (panelId === '9935095') { // Special admin case
                  navigate('/mysme/dashboard/overview');
              } else {
                  navigate('/admin/dashboard');
              }
          }
      }
    } catch (err) {
      console.error('Login error:', err);
        if (err.response?.status === 403 && err.response?.data?.message?.includes('already logged in')) {
            setError('This admin ID is already in use on another device. Please log out from that device first.');
        } else {
            setError(err.response?.data?.message || 'Login failed. Please check your admin ID.');
        }
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
          <label htmlFor="panelId">admin ID</label>
          <input
            type="text"
            id="panelId"
            value={panelId}
            onChange={(e) => setPanelId(e.target.value)}
            placeholder="Enter your 7-digit admin ID"
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