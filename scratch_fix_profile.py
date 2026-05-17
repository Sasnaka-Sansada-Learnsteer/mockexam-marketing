import re

with open('src/mysme_candidate/CandidateProfile.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the reg-input div styles with transparent, text-color styles
content = re.sub(
    r'className="reg-input" style={{ background: \'rgba\(255,255,255,0\.03\)\', color: \'#fff\' }}',
    r'style={{ color: \'var(--text-color)\', fontWeight: 600, fontSize: \'1.1rem\', marginTop: \'0.3rem\' }}',
    content
)

content = re.sub(
    r'className="reg-input" style={{ background: \'rgba\(255,255,255,0\.03\)\', fontWeight: \'bold\', fontSize: \'1\.1rem\' }}',
    r'style={{ color: \'var(--text-color)\', fontWeight: 600, fontSize: \'1.1rem\', marginTop: \'0.3rem\' }}',
    content
)

content = re.sub(
    r'className="reg-input" style={{ background: \'rgba\(255,255,255,0\.03\)\', fontWeight: \'bold\', fontSize: \'1\.1rem\', color: \'#fde68a\' }}',
    r'style={{ color: \'var(--text-color)\', fontWeight: 600, fontSize: \'1.1rem\', marginTop: \'0.3rem\' }}',
    content
)

content = re.sub(
    r'className="reg-input" style={{ background: \'rgba\(255,255,255,0\.03\)\', fontWeight: \'bold\' }}',
    r'style={{ color: \'var(--text-color)\', fontWeight: 600, fontSize: \'1.1rem\', marginTop: \'0.3rem\' }}',
    content
)

content = re.sub(
    r'className="reg-input" style={{ background: \'rgba\(255,255,255,0\.05\)\', color: \'#fde68a\', fontWeight: \'bold\', fontSize: \'1\.2rem\', textAlign: \'center\', padding: \'1rem\' }}',
    r'style={{ color: \'var(--text-color)\', fontWeight: \'bold\', fontSize: \'1.2rem\', textAlign: \'center\', marginTop: \'0.5rem\' }}',
    content
)

# Fix labels as well. Currently: style={{ color: '#aaa' }}
# We can change them to style={{ color: 'var(--text-color)', opacity: 0.7 }}
content = re.sub(
    r'style={{ color: \'#aaa\' }}',
    r'style={{ color: \'var(--text-color)\', opacity: 0.7 }}',
    content
)

# Also fix the subtitle: <h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Subject Grades</h4>
content = re.sub(
    r'<h4 style={{ color: \'#fff\', marginBottom: \'1rem\', fontWeight: 600 }}>',
    r'<h4 style={{ color: \'var(--text-color)\', marginBottom: \'1rem\', fontWeight: 600 }}>',
    content
)

with open('src/mysme_candidate/CandidateProfile.js', 'w', encoding='utf-8') as f:
    f.write(content)
