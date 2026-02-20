const config = {
    endpoints: {
        liveCount: "https://script.google.com/macros/s/AKfycbylf8kXqM8zoVASg20ng6_jmRVrDupvi1GB73BeBoTf6ehgvfL1Lj4ieARQny6WywoW6g/exec",
        websocket: process.env.REACT_APP_WEBSOCKET_URL || `wss://${process.env.REACT_APP_API_BASE_URL?.replace('https://', '')}:3002`
    },

    refreshIntervals: {
        liveCount: 15000,
        popupnotification: 30000,
        remainingseats: 60000
    }, 

    feature_flags: {
        FloatingWhatsapp: false,
    }
};

export default config;