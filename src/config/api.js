// src/config/api.js
const config = {
    // API endpoints
    endpoints: {
        liveCount: "https://script.google.com/macros/s/AKfycbylf8kXqM8zoVASg20ng6_jmRVrDupvi1GB73BeBoTf6ehgvfL1Lj4ieARQny6WywoW6g/exec",
        websocket: process.env.REACT_APP_WEBSOCKET_URL || 'wss://sme-api-04db435264b2.herokuapp.com:3002'
    },

    // Refresh intervals in milliseconds
    refreshIntervals: {
        liveCount: 15000,  // 15 seconds
        popupnotification: 30000,
        remainingseats:60000
    }
};

export default config;