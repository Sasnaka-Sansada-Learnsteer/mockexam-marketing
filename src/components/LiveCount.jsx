import React, { useEffect, useState } from 'react';
import config from "../config/api";

const LiveCount = () => {
    const [count, setCount] = useState(0);

    const fetchData = async () => {
        try {
            const res = await fetch(config.endpoints.liveCount);
            const data = await res.json();
            if (data.total) setCount(data.total);
        } catch (err) {
            console.error("Failed to fetch count", err);
        }
    };

    useEffect(() => {
        fetchData();
        // const interval = setInterval(() => {
        //     setCount(prev => prev + Math.floor(Math.random() * 3)); // Simulate new registrations
        // }, 10000); // every 10 seconds
        const interval = setInterval(fetchData, config.refreshIntervals.liveCount); // Update every 15 sec
        return () => clearInterval(interval);
    }, []);

    return (
        <section data-aos="fade-up">
            <h2>Live Registered Candidates: {count}</h2>
        </section>
    );
};

export default LiveCount;
