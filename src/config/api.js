// src/config/api.js
const config = {
    // API endpoints
    endpoints: {
        liveCount: "https://script.google.com/macros/s/AKfycbylf8kXqM8zoVASg20ng6_jmRVrDupvi1GB73BeBoTf6ehgvfL1Lj4ieARQny6WywoW6g/exec"
    },

    // Refresh intervals in milliseconds
    refreshIntervals: {
        liveCount: 15000,  // 15 seconds
        popupnotification: 30000,
        remainingseats:60000
    }
};

export default config;