// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import CandidateCard from "./CandidateCard";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [registrations, setCandidates] = useState([]);
  const [panelMember, setPanelMember] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        console.log('Fetching dashboard data with token:', token);

        // Use full URL instead of relative path to avoid proxy issues
        const res = await axios.get('https://sme-api-04db435264b2.herokuapp.com/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Dashboard response:', res.data);

        setPanelMember(res.data.panelMember);

        // Ensure we handle different response structures
        const candidateData = res.data.assignedCandidates || res.data.candidates || [];
        console.log('Candidate data:', candidateData);
        setCandidates(Array.isArray(candidateData) ? candidateData : []);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        console.error('Error response:', err.response?.data);

        const errorMessage = err.response?.data?.message ||
                           err.response?.data?.error ||
                           'Failed to load dashboard data. Please try again.';
        setError(errorMessage);

        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('userRole');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    navigate('/admin/login');
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Panel Dashboard</h2>
        <div className="panel-info">
          <p>Panel ID: {panelMember?.panelId}</p>
          <p>Name: {panelMember?.name || 'N/A'}</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Your Assigned Candidates</h2>

        {registrations.length === 0 ? (
            <p className="no-candidates">No candidates assigned yet.</p>
        ) : (
            <div className="candidate-cards">
              {registrations.map((registration, index) => {
                console.log(`Candidate ${index}:`, registration);
                return (
                  <CandidateCard
                      key={registration._id || registration.NIC || registration.nic || index}
                      registration={registration}
                  />
                );
              })}
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;