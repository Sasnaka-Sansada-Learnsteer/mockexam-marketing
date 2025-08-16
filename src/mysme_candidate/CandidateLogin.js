import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import '../styles/candidate.css';
import FloatingWhatsApp from "../components/FloatingWhatsApp";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CandidateLogin = () => {
  const [NIC, setNIC] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('checkNic'); // checkNic, login, signup
  const [candidateExists, setCandidateExists] = useState(false);
  const [hasMySmeAccount, setHasMySmeAccount] = useState(false);
  const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if URL contains a code parameter and redirect if it does
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has('code')) {
            navigate('/mysme/login', { replace: true });
        }
    }, [location, navigate]);

  const checkNicExists = async () => {
    setError('');
    setLoading(true);

    if (!NIC) {
      setError('Please enter your NIC number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/candidate/check-nic`, { NIC });

      setCandidateExists(response.data.exists);
      setHasMySmeAccount(response.data.hasMySmeAccount);

      if (response.data.exists) {
        if (response.data.hasMySmeAccount) {
          setStep('login');
        } else {
          setStep('signup');
        }
      } else {
        setError('No registration found with this NIC. Please check your NIC or contact support.');
      }
    } catch (err) {
      console.error('NIC check error:', err);
      setError(err.response?.data?.message || 'Failed to verify NIC. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/candidate/login`, {
        NIC,
        password
      });

      localStorage.setItem('candidateToken', response.data.token);
      localStorage.setItem('userRole', 'candidate');
      navigate('/mysme/profile');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/candidate/signup`, {
        NIC,
        password
      });

      localStorage.setItem('candidateToken', response.data.token);
      localStorage.setItem('userRole', 'candidate');
      navigate('/mysme/profile');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderNicForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); checkNicExists(); }}>
      <div className="form-group">
        <label htmlFor="nic">NIC Number</label>
        <input
          type="text"
          id="nic"
          value={NIC}
          onChange={(e) => setNIC(e.target.value)}
          placeholder="Enter your NIC number"
          required
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Checking...' : 'Continue'}
      </button>
    </form>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="nic">NIC Number</label>
        <input
          type="text"
          id="nic"
          value={NIC}
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button type="button" className="btn-secondary" onClick={() => setStep('checkNic')}>
        Back
      </button>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup}>
      <div className="form-group">
        <label htmlFor="nic">NIC Number</label>
        <input
          type="text"
          id="nic"
          value={NIC}
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </div>
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      <button type="button" className="btn-secondary" onClick={() => setStep('checkNic')}>
        Back
      </button>
    </form>
  );

  return (
    <div className="candidate-login-container">
      <h2>MySME Login</h2>
      {error && <div className="error-message">{error}</div>}

      {step === 'checkNic' && renderNicForm()}
      {step === 'login' && renderLoginForm()}
      {step === 'signup' && renderSignupForm()}
        <FloatingWhatsApp phoneNumber="94703445342" />
    </div>
  );
};

export default CandidateLogin;