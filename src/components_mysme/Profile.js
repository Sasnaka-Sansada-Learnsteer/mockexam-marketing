// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [candidate, setCandidate] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stream, setStream] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('/api/candidates/profile', {
          headers: { 'x-auth-token': token }
        });

        setCandidate(res.data.candidate);
        setMissingFields(res.data.missingFields);
        setStream(res.data.candidate.Stream || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data');
        setLoading(false);

        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/candidates/${candidate._id}`,
        { Stream: stream },
        { headers: { 'x-auth-token': token } }
      );

      if (res.data.success) {
        setUpdateSuccess('Stream updated successfully!');

        // Update missing fields list
        if (missingFields.includes('Stream')) {
          setMissingFields(missingFields.filter(field => field !== 'Stream'));
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Candidate Profile</h2>

      {error && <div className="error-message">{error}</div>}
      {updateSuccess && <div className="success-message">{updateSuccess}</div>}

      {missingFields.length > 0 && (
        <div className="missing-fields-alert">
          <p>Please update the following missing information:</p>
          <ul>
            {missingFields.map(field => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}

      {candidate && (
        <div className="candidate-info">
          <div className="info-item">
            <strong>NIC:</strong> {candidate.NIC || 'Not provided'}
          </div>
          <div className="info-item">
            <strong>Name:</strong> {candidate.Name || 'Not provided'}
          </div>
          <div className="info-item">
            <strong>District:</strong> {candidate.District || 'Not provided'}
          </div>
          <div className="info-item">
            <strong>Preferred Exam Center:</strong> {candidate['Preferred Exam Center'] || 'Not provided'}
          </div>

          <form onSubmit={handleSubmit} className="stream-form">
            <div className="form-group">
              <label>Stream:</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                required
              >
                <option value="">Select Stream</option>
                <option value="Physical Science">Physical Science</option>
                <option value="Bio Science">Bio Science</option>
              </select>
            </div>

            <button type="submit" className="btn-update">Update Stream</button>
          </form>
        </div>
      )}

      <button onClick={handleLogout} className="btn-logout">Logout</button>
    </div>
  );
};

export default Profile;