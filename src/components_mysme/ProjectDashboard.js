import React, { useState, useEffect } from 'react';
import '../styles/ProjectDashboard.css';
import {useNavigate} from "react-router-dom";

const ProjectDashboard = ({ token }) => {
    const [dashboardData, setDashboardData] = useState({
        colombo: { total: 0, confirmed: 0, rejected: 0, not_reachable: 0 },
        kandy: { total: 0, confirmed: 0, rejected: 0, not_reachable: 0 },
        galle: { total: 0, confirmed: 0, rejected: 0, not_reachable: 0 }
    });
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = token || localStorage.getItem('adminToken') || localStorage.getItem('authToken');

        if (!authToken) {
            navigate('/admin/login');
            return;
        }

        // Create WebSocket connection
        const ws = new WebSocket(`ws://localhost:3002/ws/dashboard?token=${authToken}`);

        ws.onopen = () => {
            console.log('Dashboard WebSocket connected');
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setDashboardData(data);
                setLastUpdated(new Date());
            } catch (error) {
                console.error('Error parsing WebSocket data:', error);
            }
        };

        ws.onclose = () => {
            console.log('Dashboard WebSocket disconnected');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        // Cleanup on unmount
        return () => {
            ws.close();
        };
    }, [navigate, token]);

    const StatCard = ({ title, data, centerName }) => (
        <div className="stat-card">
            <h3 className="stat-card-title">{title}</h3>
            <div className="stat-grid">
                <div className="stat-item total">
                    <span className="stat-label">Total Registered</span>
                    <span className="stat-value">{data.total}</span>
                </div>
                <div className="stat-item confirmed">
                    <span className="stat-label">Confirmed</span>
                    <span className="stat-value">{data.confirmed}</span>
                </div>
                <div className="stat-item rejected">
                    <span className="stat-label">Rejected</span>
                    <span className="stat-value">{data.rejected}</span>
                </div>
                <div className="stat-item not-reachable">
                    <span className="stat-label">Not Reachable</span>
                    <span className="stat-value">{data.not_reachable}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Project Dashboard</h1>
                <div className="connection-status">
                    <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                        {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                    </span>
                    {lastUpdated && (
                        <span className="last-updated">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                </div>
            </div>

            <div className="dashboard-grid">
                <StatCard
                    title="Colombo Center"
                    data={dashboardData.colombo}
                    centerName="colombo"
                />
                <StatCard
                    title="Kandy Center"
                    data={dashboardData.kandy}
                    centerName="kandy"
                />
                <StatCard
                    title="Galle Center"
                    data={dashboardData.galle}
                    centerName="galle"
                />
            </div>
        </div>
    );
};

export default ProjectDashboard;