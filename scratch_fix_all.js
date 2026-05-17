const fs = require('fs');

// 1. CandidateLogin.js: Update NIC input logic
let loginContent = fs.readFileSync('src/mysme_candidate/CandidateLogin.js', 'utf8');
loginContent = loginContent.replace(
  /onChange=\{\(e\) => setNIC\(e\.target\.value\)\}/g,
  `onChange={(e) => {
                const val = e.target.value.replace(/\\D/g, '').slice(0, 12);
                setNIC(val);
              }}`
);
fs.writeFileSync('src/mysme_candidate/CandidateLogin.js', loginContent);

// 2. form.jsx: Update NIC input logic
let formContent = fs.readFileSync('src/components/form.jsx', 'utf8');
formContent = formContent.replace(
  /onChange=\{handleChange\} maxLength=\{12\}/,
  `onChange={(e) => {
                    const val = e.target.value.replace(/\\D/g, '').slice(0, 12);
                    handleChange({ target: { name: 'nic', value: val } });
                  }} maxLength={12}`
);
fs.writeFileSync('src/components/form.jsx', formContent);

// 3. CandidateProfile.js: Update Logout Button and Exam Info Card
let profileContent = fs.readFileSync('src/mysme_candidate/CandidateProfile.js', 'utf8');

// Update Logout Button
profileContent = profileContent.replace(
  /<button onClick=\{handleLogout\} style=\{\{ padding: '0\.75rem 1\.5rem', borderRadius: 'var\(--border-radius-pill\)', border: '1px solid rgba\(255,255,255,0\.3\)', background: 'rgba\(255,255,255,0\.05\)', color: 'var\(--text-color\)', cursor: 'pointer', fontWeight: 600, backdropFilter: 'blur\(10px\)' \}\}>/g,
  `<button onClick={handleLogout} className="reg-submit-btn" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', marginTop: 0 }}>`
);

// Simplify Exam Info Card
const oldExamInfoCard = `{/* ── Section 2: Exam Information & QR ── */}
                <div className="reg-section" style={{ marginBottom: '2.5rem' }}>
                    <div className="reg-section-header">
                        <div className="reg-section-icon">🎓</div>
                        <div>
                            <h2 className="reg-section-title">Exam Information</h2>
                            <p className="reg-section-desc">Your Index Number and QR Code</p>
                        </div>
                    </div>

                    {!candidateData.candidate.examIndexNumber ? (
                        <div className="reg-alert-error" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', color: '#ff9800' }}>
                            Your participation is not confirmed yet.
                        </div>
                    ) : (
                        <div className="reg-fields-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="reg-field">
                                <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Exam Index Number</label>
                                <div style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', marginTop: '0.5rem' }}>
                                    {candidateData.candidate.examIndexNumber}
                                </div>
                            </div>

                            {(candidateData.candidate['qrCode'] && candidateData.candidate['qrCodeData']) && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', marginBottom: '1rem' }}>
                                        <img src={candidateData.candidate['qrCode']} alt="Exam QR Code" style={{ display: 'block', width: '200px', height: '200px' }} />
                                    </div>
                                    <button onClick={downloadQRCode} className="reg-submit-btn" style={{ width: '100%', maxWidth: '300px', justifyContent: 'center' }}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="7 10 12 15 17 10"></polyline>
                                            <line x1="12" y1="15" x2="12" y2="3"></line>
                                        </svg>
                                        Download QR Code
                                    </button>
                                    {downloadSuccess && (
                                        <div style={{ color: '#4ade80', marginTop: '0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>QR Code downloaded successfully!</div>
                                    )}
                                    <p style={{ color: '#aaa', fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem', maxWidth: '300px' }}>
                                        You need to bring this QR code on the exam day to mark your attendance.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>`;

const newExamInfoCard = `{/* ── Section 2: Exam Information & QR ── */}
                <div className="reg-section" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="reg-section-icon" style={{ fontSize: '2rem', marginTop: 0 }}>🎓</div>
                            <div>
                                <h2 className="reg-section-title">Exam Information</h2>
                                <p className="reg-section-desc">Your Index Number and QR Code</p>
                            </div>
                        </div>

                        {!candidateData.candidate.examIndexNumber ? (
                            <div className="reg-alert-error" style={{ backgroundColor: 'rgba(255, 152, 0, 0.1)', border: '1px solid rgba(255, 152, 0, 0.3)', color: '#ff9800', margin: 0 }}>
                                Your participation is not confirmed yet.
                            </div>
                        ) : (
                            <div>
                                <label className="reg-label" style={{ color: 'var(--text-color)', opacity: 0.7 }}>Exam Index Number</label>
                                <div style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '2rem', marginTop: '0.2rem' }}>
                                    {candidateData.candidate.examIndexNumber}
                                </div>
                                <p style={{ color: 'var(--text-color)', opacity: 0.6, fontSize: '0.85rem', marginTop: '0.5rem', maxWidth: '250px' }}>
                                    You need to bring this QR code on the exam day to mark your attendance.
                                </p>
                            </div>
                        )}
                    </div>

                    {(candidateData.candidate.examIndexNumber && candidateData.candidate['qrCode'] && candidateData.candidate['qrCodeData']) && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ background: '#fff', padding: '8px', borderRadius: '8px', marginBottom: '0.75rem' }}>
                                <img src={candidateData.candidate['qrCode']} alt="Exam QR Code" style={{ display: 'block', width: '120px', height: '120px' }} />
                            </div>
                            <button onClick={downloadQRCode} className="reg-submit-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: 0 }}>
                                Download QR
                            </button>
                            {downloadSuccess && (
                                <div style={{ color: '#4ade80', marginTop: '0.5rem', fontWeight: 600, fontSize: '0.8rem' }}>Downloaded!</div>
                            )}
                        </div>
                    )}
                </div>`;

const searchRegex = /\{\/\* ── Section 2: Exam Information & QR ── \*\/\}[\s\S]*?<\!candidateData\.candidate\.examIndexNumber \? \([\s\S]*?\)\s*\}\s*<\/div>/;

// I'll replace the block manually or with string replace using exact match or regex
// Let's find exactly what's there
let match = profileContent.match(/\{\/\* ── Section 2: Exam Information & QR ── \*\/\}[\s\S]*?<!-- End of Section 2 -->/);
// Actually I didn't put <!-- End of Section 2 -->. I'll just use indexOf and slice.

let startIdx = profileContent.indexOf('{/* ── Section 2: Exam Information & QR ── */}');
let endIdx = profileContent.indexOf('{/* ── Section 3: Actions & Results ── */}');

if (startIdx !== -1 && endIdx !== -1) {
  let before = profileContent.substring(0, startIdx);
  let after = profileContent.substring(endIdx);
  profileContent = before + newExamInfoCard + '\\n\\n                ' + after;
} else {
  console.log("Could not find Exam Info section to replace.");
}

fs.writeFileSync('src/mysme_candidate/CandidateProfile.js', profileContent);
