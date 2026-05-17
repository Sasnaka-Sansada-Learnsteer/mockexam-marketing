const config = {
    endpoints: {
        liveCount: "https://script.google.com/macros/s/AKfycbwveMQFnZ51INI7EfaoW_VClVFEje1POg53SaeyJ8-Db3BNrb7forqU_N2jUQL8aOVYnA/exec",
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