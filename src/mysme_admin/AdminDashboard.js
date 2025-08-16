// src/components/AdminDashboard.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';
import CandidateCard from "./CandidateCard";
import PropTypes from 'prop-types';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminDashboard = ({candidate, token}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [panelMember, setPanelMember] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
        const token = localStorage.getItem('adminToken');

        if (!token) {
            navigate('/admin/login');
            return;
        }
    const fetchDashboard = async () => {
      console.log('Fetching dashboard data with token:', token);

        // Use full URL instead of relative path to avoid proxy issues
        const response = await axios.get(   `${API_BASE_URL}/api/admin/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Dashboard response:', response.data);

      try {
        setPanelMember(response.data.panelMember);
        // Ensure we handle different response structures
        const candidateData = response.data.assignedCandidates || response.data.candidates || [];
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

    const fetchExams = async () => {
        const response = await axios.get(
                `${API_BASE_URL}/api/admin/api/exams`,
                { headers: { Authorization: `Bearer ${token}` } }
        );
        const examsArray = Array.isArray(response.data) ? response.data : response.data.exams;
        const examNames = examsArray.map(exam => exam.exam_name);
        setExams(examNames);
    };

    Promise.all([fetchDashboard(), fetchExams()]).then(() => setLoading(false));
  }, [navigate, token]);

    useEffect(() => {
        const Autologout = () => {
              // Clear auth tokens/session here
              localStorage.removeItem('adminToken');
              navigate('/admin/login');
        };

          const timer = setTimeout(Autologout, 600000); // 10 minutes

          // Optional: Reset timer on user activity
          const resetTimer = () => {
              clearTimeout(timer);
              setTimeout(Autologout, 1200000);
          };
          window.addEventListener('mousemove', resetTimer);
          window.addEventListener('keydown', resetTimer);

          return () => {
              clearTimeout(timer);
              window.removeEventListener('mousemove', resetTimer);
              window.removeEventListener('keydown', resetTimer);
          };
    }, [navigate]);

  const handleLogout = async () => {
      try {
          const token = localStorage.getItem('adminToken');
          await axios.post(`${API_BASE_URL}/api/admin/logout`, {}, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
      } catch (err) {
          console.error('Logout error:', err);
      } finally {
          // Clear local storage
          localStorage.removeItem('adminToken');
          localStorage.removeItem('userRole');
          localStorage.removeItem('panelId');
          // Don't remove deviceId as it's used for device tracking

          // Redirect to login
          navigate('/admin/login');
      }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Panel Dashboard</h2>
        <div className="panel-info">
          <p>admin ID: {panelMember?.panelId}</p>
          <p>Name: {panelMember?.Name || 'N/A'}</p>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Your Assigned Candidates</h2>

        {candidates.length === 0 ? (
            <p className="no-candidates">No candidates assigned yet.</p>
        ) : (
            <div className="candidate-cards">
              {candidates.map((candidate, index) => {
                return (
                  <CandidateCard
                      key={candidate.NIC}
                      candidate={candidate}
                      token={token}
                      exams={exams}
                  />
                );
              })}
            </div>
        )}
      </div>
    </div>
  );
};

// PropTypes for type checking
CandidateCard.propTypes = {
    candidate: PropTypes.shape({
        NIC: PropTypes.string,
        'Email Address': PropTypes.string,
        'Whatsapp Number': PropTypes.string,
        'Subject Stream': PropTypes.string,
        Preferred_Exam_Center_Confirmed: PropTypes.bool,
        confirmed_papers: PropTypes.arrayOf(PropTypes.string)
    }),
    token: PropTypes.string.isRequired
};

export default AdminDashboard;