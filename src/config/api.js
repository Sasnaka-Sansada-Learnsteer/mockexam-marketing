// src/config/api.js
const config = {
    // API endpoints
    endpoints: {
        liveCount: "https://script.google.com/macros/s/AKfycbw3ykjVdNEEXNx0Kt7Okwy6e8ew61xu3huK2qsOLaB3rPRXj4kXRbMHhJl9UJFYQQv6Nw/exec"
    },

    // Refresh intervals in milliseconds
    refreshIntervals: {
        liveCount: 15000,  // 15 seconds
        popupnotification: 30000,
        remainingseats:60000
    }
};

export default config;