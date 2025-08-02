// src/config/api.js
const config = {
    // API endpoints
    endpoints: {
        liveCount: "https://script.google.com/macros/s/AKfycby8RrjE-MJXUAswx2Zsv31jYYmVIbdrxTzSfWfpazLIo3U4i6vrhAETuqUEUDqIoCXjLw/exec"
    },

    // Refresh intervals in milliseconds
    refreshIntervals: {
        liveCount: 15000,  // 15 seconds
        popupnotification: 30000,
        remainingseats:60000
    }
};

export default config;