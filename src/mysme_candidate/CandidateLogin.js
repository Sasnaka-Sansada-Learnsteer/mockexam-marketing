import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/form.css';
import FloatingWhatsApp from "../components/FloatingWhatsApp";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EyeIcon = ({ visible }) => (
  visible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6b7280' }}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  )
);

const CandidateLogin = () => {
  const location = useLocation();
  const locationState = location.state || {};
  const [NIC, setNIC] = useState(locationState.NIC || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('checkNic'); // checkNic, login, signup
  const [candidateExists, setCandidateExists] = useState(false);
  const [hasMySmeAccount, setHasMySmeAccount] = useState(false);
  const navigate = useNavigate();
  const [autoChecked, setAutoChecked] = useState(false);

  //reset password
  const [resetToken, setResetToken] = useState('');
  const [showForgotLink, setShowForgotLink] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  //popup for confirm password
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fetchedFirstName, setFetchedFirstName] = useState('');


  useEffect(() => {
    // Check if URL contains a code parameter and redirect if it does
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has('code')) {
      navigate('/mysme/login', { replace: true });
    }

    // Auto check NIC if passed from registration
    if (locationState.autoCheck && locationState.NIC && !autoChecked) {
      setAutoChecked(true);
      checkNicExists(locationState.NIC);
    }
  }, [location, navigate, locationState, autoChecked]);

  const checkNicExists = async (nicToUse = NIC) => {
    setError('');
    setLoading(true);

    if (!nicToUse) {
      setError('Please enter your NIC number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/candidate/check-nic`, { NIC: nicToUse });

      setCandidateExists(response.data.exists);
      setHasMySmeAccount(response.data.hasMySmeAccount);

      if (response.data.firstName) {
        setFetchedFirstName(response.data.firstName);
      }

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
      const token = err.response?.data?.resetToken;
      if (token) {
        setResetToken(token); setShowForgotLink(true);
      }
    } finally {
      setLoading(false);
    }
  };
*/}

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleConfirmedReset = async () => {
    setShowConfirmPopup(false);
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/candidate/reset-password`,
        { NIC, newPassword },
        { headers: { Authorization: `Bearer ${resetToken}` } }
      );
      setStep('login');
      setShowForgotLink(false);
      setError('');
      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Please try logging in again.');
    } finally {
      setLoading(false);
    }
  };

  {/*
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/candidate/reset-password`,
        { NIC, newPassword },
        { headers: { Authorization: `Bearer ${resetToken}` } }
      );
      setStep('login');
      setShowForgotLink(false);
      setError('');
      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Please try logging in again.');
    } finally {
      setLoading(false);
    }
  };
*/}

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
    <form className="reg-form" onSubmit={(e) => { e.preventDefault(); checkNicExists(); }}>
      <div className="reg-section">
        <div className="reg-fields-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="reg-field">
            <label className="reg-label" htmlFor="nic">NIC Number</label>
            <input
              className="reg-input"
              type="text"
              id="nic"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              placeholder="Enter your NIC number"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" className="reg-submit-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? 'Checking...' : 'Continue'}
      </button>
    </form>
  );

  const renderLoginForm = () => (
    <form className="reg-form" onSubmit={handleLogin}>
      <div className="reg-section">
        <div className="reg-fields-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="reg-field">
            <label className="reg-label" htmlFor="nic">NIC Number</label>
            <input
              className="reg-input"
              type="text"
              id="nic"
              value={NIC}
              disabled
            />
          </div>
          <div className="reg-field">
            <label className="reg-label" htmlFor="password" style={{ display: 'flex', alignItems: 'center' }}>
              <span>Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginLeft: '10px', transform: 'translateY(-8px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </label>
            <input
              className="reg-input"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {showForgotLink && (
              <button type="button"
                onClick={() => { setStep('resetPassword'); setError(''); }}
                style={{ color: '#fde68a', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Forgot your password? Reset it here →
              </button>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="reg-submit-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <button type="button" onClick={() => setStep('checkNic')} style={{ width: '100%', padding: '0.95rem 2.5rem', borderRadius: 'var(--border-radius-pill)', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
        Back
      </button>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form className="reg-form" onSubmit={handleResetSubmit}>
      <div className="reg-section">
        <div className="reg-fields-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="reg-field">
            <label className="reg-label" htmlFor="nic">NIC Number</label>
            <input className="reg-input" type="text" id="nic-reset" value={NIC} disabled />
          </div>
          <div className="reg-field">
            <label className="reg-label" htmlFor="newPassword" style={{ display: 'flex', alignItems: 'center' }}>
              <span>New Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginLeft: '10px', transform: 'translateY(-8px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </label>
            <input
              className="reg-input"
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="reg-field">
            <label className="reg-label" htmlFor="confirmNewPassword" style={{ display: 'flex', alignItems: 'center' }}>
              <span>Confirm New Password</span>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ marginLeft: '10px', transform: 'translateY(-8px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </label>
            <input
              className="reg-input"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" className="reg-submit-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      <button type="button" onClick={() => { setStep('login'); setError(''); }} style={{ width: '100%', padding: '0.95rem 2.5rem', borderRadius: 'var(--border-radius-pill)', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
        Back to Login
      </button>
      {showConfirmPopup && (
        <div className="confirm-popup-overlay">
          <div className="confirm-popup">
            <p style={{ color: '#000' }}>Are you sure you want to reset your password?</p>
            <p className="redWarning" style={{ color: 'red' }}>This action cannot be undone</p>
            <div className="confirm-popup-buttons">
              <button type="button" className="reg-submit-btn" onClick={handleConfirmedReset}>
                Yes, Reset
              </button>
              <button type="button" onClick={() => setShowConfirmPopup(false)} style={{ padding: '0.95rem 2.5rem', borderRadius: 'var(--border-radius-pill)', border: '1px solid rgba(0,0,0,0.3)', background: 'transparent', color: '#000', cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );


  const renderSignupForm = () => (
    <form className="reg-form" onSubmit={handleSignup}>
      <div className="reg-section">
        <div className="reg-fields-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="reg-field">
            <label className="reg-label" htmlFor="nic">NIC Number</label>
            <input
              className="reg-input"
              type="text"
              id="nic"
              value={NIC}
              disabled
            />
          </div>
          <div className="reg-field">
            <label className="reg-label" htmlFor="password" style={{ display: 'flex', alignItems: 'center' }}>
              <span>New Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginLeft: '10px', transform: 'translateY(-8px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </label>
            <input
              className="reg-input"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="reg-field">
            <label className="reg-label" htmlFor="confirmPassword" style={{ display: 'flex', alignItems: 'center' }}>
              <span>Confirm Password</span>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ marginLeft: '10px', transform: 'translateY(-8px)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon visible={showConfirmPassword} />
              </button>
            </label>
            <input
              className="reg-input"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" className="reg-submit-btn" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      <button type="button" onClick={() => setStep('checkNic')} style={{ width: '100%', padding: '0.95rem 2.5rem', borderRadius: 'var(--border-radius-pill)', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
        Back
      </button>
    </form>
  );

  return (
    <div className="reg-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <h1 className="reg-hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-color)' }}>MySME Portal</h1>
        <p className="reg-hero-sme-title" style={{ color: 'var(--text-color)', opacity: 0.8, fontSize: '1rem', marginTop: 0 }}>Sasnaka Sansada Mock Exam (SME) 2026</p>
        {(locationState.firstName || fetchedFirstName) && (
          <p style={{ fontSize: '1.15rem', fontWeight: 600, margin: '1.5rem 0 0', color: 'var(--text-color)' }}>
            Hi, {locationState.firstName || fetchedFirstName}! Welcome back.
          </p>
        )}
      </div>

      <div className="reg-form-container" style={{ width: '100%', maxWidth: '420px', margin: 0 }}>
        {error && (
          <div className="reg-alert-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {step === 'checkNic' && renderNicForm()}
        {step === 'login' && renderLoginForm()}
        {step === 'signup' && renderSignupForm()}
        {step === 'resetPassword' && renderResetPasswordForm()}
        <FloatingWhatsApp phoneNumber="94703445342" />
      </div>
    </div>
  );
};

export default CandidateLogin;