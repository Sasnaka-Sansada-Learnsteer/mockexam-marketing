import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './form.css';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwveMQFnZ51INI7EfaoW_VClVFEje1POg53SaeyJ8-Db3BNrb7forqU_N2jUQL8aOVYnA/exec';

const DISTRICTS = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya',
];
const AL_BATCHES = ['2026 A/L', '2027 A/L', '2028 A/L'];
const AL_ATTEMPTS = ['1st Attempt', '2nd Attempt', '3rd Attempt'];
const STREAMS = ['Bio Science', 'Physical Science', 'Non Stream (Combined Maths + ICT)', 'Other Stream (ICT only)'];
const MEDIUMS = ['Sinhala', 'English'];

const INIT = { firstName: '', lastName: '', email: '', school: '', nic: '', whatsapp: '', alBatch: '', alAttempt: '', stream: '', medium: '', district: '', examCenter: '' };

function validate(f) {
  const e = {};
  if (!f.firstName.trim()) e.firstName = 'First name is required.';
  if (!f.lastName.trim()) e.lastName = 'Last name is required.';
  if (!f.email.trim()) e.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address.';
  if (!f.school.trim()) e.school = 'School is required.';
  if (!f.nic.trim()) e.nic = 'NIC number is required.';
  else if (!/^\d{12}$/.test(f.nic)) e.nic = 'Invalid NIC — must be exactly 12 digits.';
  if (!f.whatsapp.trim()) e.whatsapp = 'WhatsApp number is required.';
  else if (!/^07\d{8}$/.test(f.whatsapp)) e.whatsapp = 'Must start with 07 and be exactly 10 digits.';
  if (!f.alBatch) e.alBatch = 'Please select your A/L batch.';
  if (!f.alAttempt) e.alAttempt = 'Please select your attempt.';
  if (!f.stream) e.stream = 'Please select your subject stream.';
  if (!f.medium) e.medium = 'Please select your medium.';
  if (!f.district) e.district = 'Please select your district.';
  if (!f.examCenter) e.examCenter = 'Please select a preferred exam center.';
  return e;
}

export default function RegistrationForm() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | confirming | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [studentId, setStudentId] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (status === 'success' && canvasRef.current && studentId) {
      QRCode.toCanvas(canvasRef.current,
        [`Student ID: ${studentId}`, `Name: ${form.firstName} ${form.lastName}`,
        `NIC: ${form.nic}`, `Stream: ${form.stream}`, `Medium: ${form.medium}`,
        `District: ${form.district}`, `Exam Center: ${form.examCenter}`].join('\n'),
        { width: 220, margin: 2, color: { dark: '#0f172a', light: '#ffffff' }, errorCorrectionLevel: 'M' }
      ).catch(console.error);
    }
  }, [status, studentId, form]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.getElementById(`field-${Object.keys(errs)[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setStatus('confirming');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleConfirm() {
    setStatus('submitting');
    try {
      const payload = {
        "First Name": form.firstName,
        "Last Name": form.lastName,
        "Email Address": form.email,
        "NIC": form.nic,
        "WhatsApp Number": form.whatsapp,
        "School": form.school,
        "AL Batch": form.alBatch,
        "AL Attempt": form.alAttempt,
        "Subject Stream": form.stream,
        "Medium": form.medium,
        "District": form.district,
        "Preferred Exam Center": form.examCenter
      };

      const res = await fetch('https://sme-api-backend-new-2f61da25f399.herokuapp.com/api/candidate/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (res.ok && result.success) {
        try {
          const params = new URLSearchParams({
            firstName: form.firstName, lastName: form.lastName, email: form.email,
            school: form.school, nic: form.nic, whatsapp: form.whatsapp, alBatch: form.alBatch,
            alAttempt: form.alAttempt, stream: form.stream, medium: form.medium,
            district: form.district, examCenter: form.examCenter,
          });
          fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`).catch(console.error);
        } catch (e) {
          console.error("Google Sheets error", e);
        }

        navigate('/mysme/login', { state: { NIC: form.nic, firstName: form.firstName, autoCheck: true } });
      } else if (result.message === "This NIC is already registered.") {
        setStatus('already_registered');
      } else {
        throw new Error(result.message || 'Unknown error.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again or contact support.');
      setStatus('error');
    }
  }

  function handleCancel() { setStatus('idle'); }

  // ── Confirmation popup ─────────────────────────────────────────────────────
  if (status === 'confirming') {
    return (
      <div className="reg-page">
        <div className="reg-confirm-wrapper">
          <div className="reg-confirm-card">
            <div className="reg-confirm-icon">📋</div>
            <h2 className="reg-confirm-title">Confirm Submission</h2>
            <p className="reg-confirm-sinhala">
              Submit කිරීමට ප්‍රථම, ඔබ ඇතුළත් කරන ලද සියලුම තොරතුරු නිවැරදිදැයි නැවත වරක් පරීක්ෂා කරන්න.
            </p>
            <p className="reg-confirm-english">
              A kind reminder to double-check that all the information you have entered is correct.
            </p>

            <div className="reg-confirm-summary">
              {[
                ['Name', `${form.firstName} ${form.lastName}`],
                ['Email', form.email],
                ['School', form.school],
                ['NIC', form.nic],
                ['WhatsApp', form.whatsapp],
                ['A/L Batch', form.alBatch],
                ['Attempt', form.alAttempt],
                ['Stream', form.stream],
                ['Medium', form.medium],
                ['District', form.district],
                ['Exam Center', form.examCenter],
              ].map(([label, val]) => (
                <div className="reg-confirm-row" key={label}>
                  <span>{label}</span><strong>{val}</strong>
                </div>
              ))}
            </div>

            <div className="reg-confirm-actions">
              <button className="reg-confirm-no" onClick={handleCancel}>
                ✏️ No, Edit Form
              </button>
              <button className="reg-confirm-yes" onClick={handleConfirm}>
                ✅ Yes, Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Submitting spinner ─────────────────────────────────────────────────────
  if (status === 'submitting') {
    return (
      <div className="reg-page reg-loading-page">
        <span className="reg-spinner-lg" />
        <p>Submitting your registration...</p>
      </div>
    );
  }

  if (status === 'already_registered') {
    return (
      <div className="reg-page">
        <div className="reg-confirm-wrapper">
          <div className="reg-confirm-card">
            <div className="reg-confirm-icon">⚠️</div>
            <h2 className="reg-confirm-title">Already Registered</h2>
            <p className="reg-confirm-english" style={{ marginBottom: '2rem' }}>
              There is an account associated with this NIC. Please head towards login.
            </p>
            <button className="reg-submit-btn" onClick={() => navigate('/mysme/login', { state: { NIC: form.nic, firstName: form.firstName, autoCheck: true } })}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div className="reg-page">
      <div className="reg-hero">
        <div className="reg-hero-glow" />
        <div className="reg-hero-content">
          <h1 className="reg-hero-title">Student Registration</h1>
          <p className="reg-hero-sme-title">Sasnaka Sansada Mock Exam (SME) 2026 👩‍🏫💙 — Register Now !!</p>

          {/* Bilingual intro inside hero */}
          <div className="reg-hero-intro">
            <p>ඔබත් මෙවර අ.පො.ස. උසස් පෙළ විභාගයට මුහුණ දීමට සූදානම් වන ශිෂ්‍යයෙක් හෝ ශිෂ්‍යාවක් ද? එසේනම් උසස් පෙළ කඩයිමට මුහුණ දීමට මත්තෙන්, නියමිත විභාග වාතාවරණයක් තුළම, නොමිලේ පෙනී සිටීමට ඔබටයි මේ අවස්ථාව..</p>
            <div className="reg-hero-intro-sep" />
            <p>Are you an Advanced Level student? Sasnaka Sansada is organizing a free mock examination for you — prepare for our A/Ls in a real exam environment!</p>
          </div>

          {/* Warning notice inside hero */}
          <div className="reg-hero-notice" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <div>
              <p><strong>සැ.යු :</strong> ඔබ Early Registrations හරහා දැනටමත් ලියාපදිංචි වී ඇත්නම්, මෙහි නැවත වරක් ලියාපදිංචි වීමට අවශ්‍ය නොවේ.</p>
              <p><strong>Important:</strong> If you've already registered through Early Registrations, you don't need to register here.</p>
              <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>
                👉 <Link to="/mysme/login" style={{ color: '#fde68a', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Login to your MySME Account here</Link>
              </p>
            </div>
          </div>
          <br></br>
          <p className="reg-hero-sub">Fill in your details below — proceed to account creation upon successful registration.</p>
        </div>
      </div>

      <div className="reg-form-container">



        {status === 'error' && (
          <div className="reg-alert-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMsg}
          </div>
        )}

        <form className="reg-form" onSubmit={handleSubmitClick} noValidate>

          {/* ── Section 1: Personal Details ── */}
          <div className="reg-section">
            <div className="reg-section-header">
              <div className="reg-section-icon">👤</div>
              <div>
                <h2 className="reg-section-title">Personal Details</h2>
                <p className="reg-section-desc">Your personal identification information</p>
              </div>
            </div>
            <div className="reg-fields-grid">

              <div className={`reg-field ${errors.firstName ? 'has-error' : ''}`} id="field-firstName">
                <label htmlFor="firstName">First Name <span className="req">*</span></label>
                <input id="firstName" name="firstName" type="text" placeholder="e.g. Kavindu"
                  value={form.firstName} onChange={handleChange} autoComplete="given-name" />
                {errors.firstName && <span className="reg-error-msg">{errors.firstName}</span>}
              </div>

              <div className={`reg-field ${errors.lastName ? 'has-error' : ''}`} id="field-lastName">
                <label htmlFor="lastName">Last Name <span className="req">*</span></label>
                <input id="lastName" name="lastName" type="text" placeholder="e.g. Perera"
                  value={form.lastName} onChange={handleChange} autoComplete="family-name" />
                {errors.lastName && <span className="reg-error-msg">{errors.lastName}</span>}
              </div>

              <div className={`reg-field ${errors.email ? 'has-error' : ''}`} id="field-email">
                <label htmlFor="email">Email Address <span className="req">*</span></label>
                <input id="email" name="email" type="email" placeholder="e.g. kavindu@example.com"
                  value={form.email} onChange={handleChange} autoComplete="email" />
                {errors.email && <span className="reg-error-msg">{errors.email}</span>}
              </div>

              <div className={`reg-field ${errors.school ? 'has-error' : ''}`} id="field-school">
                <label htmlFor="school">School <span className="req">*</span></label>
                <input id="school" name="school" type="text" placeholder="e.g. Royal College"
                  value={form.school} onChange={handleChange} />
                {errors.school && <span className="reg-error-msg">{errors.school}</span>}
              </div>

              <div className={`reg-field ${errors.nic ? 'has-error' : ''}`} id="field-nic">
                <label htmlFor="nic">NIC Number <span className="req">*</span></label>
                <input id="nic" name="nic" type="text" placeholder="e.g. 200612345678"
                  value={form.nic} onChange={handleChange} maxLength={12} />
                {errors.nic ? <span className="reg-error-msg">{errors.nic}</span>
                  : <span className="reg-field-hint">Must be exactly 12 digits</span>}
              </div>

              <div className={`reg-field ${errors.whatsapp ? 'has-error' : ''}`} id="field-whatsapp">
                <label htmlFor="whatsapp">WhatsApp Number <span className="req">*</span></label>
                <input id="whatsapp" name="whatsapp" type="tel" placeholder="e.g. 0771234567"
                  value={form.whatsapp} onChange={handleChange} maxLength={10} />
                {errors.whatsapp ? <span className="reg-error-msg">{errors.whatsapp}</span>
                  : <span className="reg-field-hint">Start with 07, exactly 10 digits</span>}
              </div>

            </div>
          </div>

          {/* ── Section 2: Exam Details ── */}
          <div className="reg-section">
            <div className="reg-section-header">
              <div className="reg-section-icon">🎓</div>
              <div>
                <h2 className="reg-section-title">Exam Details</h2>
                <p className="reg-section-desc">Your A/L batch, stream and preferences</p>
              </div>
            </div>
            <div className="reg-fields-grid">

              <div className={`reg-field ${errors.alBatch ? 'has-error' : ''}`} id="field-alBatch">
                <label htmlFor="alBatch">A/L Batch <span className="req">*</span></label>
                <select id="alBatch" name="alBatch" value={form.alBatch} onChange={handleChange}>
                  <option value="">Select batch</option>
                  {AL_BATCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.alBatch && <span className="reg-error-msg">{errors.alBatch}</span>}
              </div>

              <div className={`reg-field ${errors.alAttempt ? 'has-error' : ''}`} id="field-alAttempt">
                <label htmlFor="alAttempt">A/L Attempt <span className="req">*</span></label>
                <select id="alAttempt" name="alAttempt" value={form.alAttempt} onChange={handleChange}>
                  <option value="">Select attempt</option>
                  {AL_ATTEMPTS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {errors.alAttempt && <span className="reg-error-msg">{errors.alAttempt}</span>}
              </div>

              <div className={`reg-field ${errors.stream ? 'has-error' : ''}`} id="field-stream">
                <label htmlFor="stream">Subject Stream <span className="req">*</span></label>
                <select id="stream" name="stream" value={form.stream} onChange={handleChange}>
                  <option value="">Select stream</option>
                  {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.stream && <span className="reg-error-msg">{errors.stream}</span>}
              </div>

              <div className={`reg-field ${errors.medium ? 'has-error' : ''}`} id="field-medium">
                <label htmlFor="medium">Medium <span className="req">*</span></label>
                <select id="medium" name="medium" value={form.medium} onChange={handleChange}>
                  <option value="">Select medium</option>
                  {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.medium && <span className="reg-error-msg">{errors.medium}</span>}
              </div>

              <div className={`reg-field ${errors.district ? 'has-error' : ''}`} id="field-district">
                <label htmlFor="district">Your District <span className="req">*</span></label>
                <select id="district" name="district" value={form.district} onChange={handleChange}>
                  <option value="">Select your district</option>
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <span className="reg-error-msg">{errors.district}</span>}
              </div>

              <div className={`reg-field ${errors.examCenter ? 'has-error' : ''}`} id="field-examCenter">
                <label htmlFor="examCenter">Preferred Exam Center <span className="req">*</span></label>
                <select id="examCenter" name="examCenter" value={form.examCenter} onChange={handleChange}>
                  <option value="">Select preferred exam center</option>
                  {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.examCenter && <span className="reg-error-msg">{errors.examCenter}</span>}
              </div>

            </div>
          </div>

          {/* ── Submit ── */}
          <div className="reg-submit-section">
            <p className="reg-disclaimer">
              By submitting this form, you confirm that all provided information is accurate.
            </p>
            <button id="btn-submit-registration" type="submit" className="reg-submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Next
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
