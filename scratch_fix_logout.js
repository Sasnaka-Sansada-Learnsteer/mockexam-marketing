const fs = require('fs');

let content = fs.readFileSync('src/mysme_candidate/CandidateProfile.js', 'utf8');

content = content.replace(/color: '#fff', cursor: 'pointer'/g, "color: 'var(--text-color)', cursor: 'pointer'");

fs.writeFileSync('src/mysme_candidate/CandidateProfile.js', content);
