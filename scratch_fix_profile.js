const fs = require('fs');

let content = fs.readFileSync('src/mysme_candidate/CandidateProfile.js', 'utf8');

content = content.replace(/className="reg-input" style={{ background: 'rgba\(255,255,255,0\.03\)', color: '#fff' }}/g, "style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}");
content = content.replace(/className="reg-input" style={{ background: 'rgba\(255,255,255,0\.03\)', fontWeight: 'bold', fontSize: '1\.1rem' }}/g, "style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}");
content = content.replace(/className="reg-input" style={{ background: 'rgba\(255,255,255,0\.03\)', fontWeight: 'bold', fontSize: '1\.1rem', color: '#fde68a' }}/g, "style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}");
content = content.replace(/className="reg-input" style={{ background: 'rgba\(255,255,255,0\.03\)', fontWeight: 'bold' }}/g, "style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '1.1rem', marginTop: '0.3rem' }}");
content = content.replace(/className="reg-input" style={{ background: 'rgba\(255,255,255,0\.05\)', color: '#fde68a', fontWeight: 'bold', fontSize: '1\.2rem', textAlign: 'center', padding: '1rem' }}/g, "style={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', marginTop: '0.5rem' }}");
content = content.replace(/style={{ color: '#aaa' }}/g, "style={{ color: 'var(--text-color)', opacity: 0.7 }}");
content = content.replace(/<h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>/g, "<h4 style={{ color: 'var(--text-color)', marginBottom: '1rem', fontWeight: 600 }}>");
content = content.replace(/<p style={{ color: '#fff', fontWeight: 600 }}>/g, "<p style={{ color: 'var(--text-color)', fontWeight: 600 }}>");

fs.writeFileSync('src/mysme_candidate/CandidateProfile.js', content);
