import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/ProjectDashboard.css';
import { useNavigate } from 'react-router-dom';
import ExamCenterCard from './ExamCenterCard';

const WS_URL = 'wss://sme-api-backend-new-2f61da25f399.herokuapp.com/ws/dashboard';
const API_BASE = process.env.REACT_APP_API_BASE_URL;

const ProjectDashboard = ({ token }) => {
    const [centers, setCenters] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const wsRef = useRef(null);         // live WebSocket instance
    const loggingOutRef = useRef(false); // prevents reconnect on intentional close

    const handleLogout = useCallback(async () => {
        // 1. Signal that we're logging out so the reconnect loop doesn't fire
        loggingOutRef.current = true;
        setIsLoggingOut(true);

        // 2. Close the WebSocket immediately
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        // 3. Call the backend logout endpoint
        const authToken = localStorage.getItem('adminToken');
        try {
            if (authToken) {
                await fetch(`${API_BASE}/api/admin/logout`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${authToken}` },
                });
            }
        } catch (e) {
            console.error('Logout request failed:', e);
        } finally {
            ['adminToken', 'authToken', 'panelId', 'deviceId', 'userRole'].forEach(k =>
                localStorage.removeItem(k)
            );
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        const authToken = token || localStorage.getItem('adminToken') || localStorage.getItem('authToken');

        if (!authToken) {
            navigate('/admin/login');
            return;
        }

        let ws = null;
        let reconnectTimer = null;

        const connect = () => {
            if (loggingOutRef.current) return; // don't reconnect during logout
            ws = new WebSocket(`${WS_URL}?token=${authToken}`);
            wsRef.current = ws;

            ws.onopen = () => {
                console.log('Dashboard WebSocket connected');
                setIsConnected(true);
                // Clear any pending reconnect timer on successful connect
                if (reconnectTimer) {
                    clearTimeout(reconnectTimer);
                    reconnectTimer = null;
                }
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (Array.isArray(data)) {
                        setCenters(data);
                        setLastUpdated(new Date());
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket data:', error);
                }
            };

            ws.onclose = () => {
                if (loggingOutRef.current) return; // intentional close — skip reconnect
                console.log('Dashboard WebSocket disconnected — reconnecting in 60s…');
                setIsConnected(false);
                reconnectTimer = setTimeout(connect, 60_000);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setIsConnected(false);
                ws.close(); // triggers onclose → reconnect timer
            };
        };

        connect();

        return () => {
            if (reconnectTimer) clearTimeout(reconnectTimer);
            if (ws) ws.close();
        };
    }, [navigate, token]);

    const totalRegistrations = centers.reduce((sum, { count }) => sum + count, 0);

    return (
        <div className="dashboard-container">
            {isLoggingOut && (
                <div className="logout-overlay">
                    <div className="logout-overlay-box">
                        <div className="logout-spinner" />
                        <p>Logging out, please wait…</p>
                    </div>
                </div>
            )}

            <div className="dashboard-header">
                <h1>SME26 Exam Centers Overview</h1>
                <div className="header-right">
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
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {centers.length > 0 && (
                <div className="total-banner">
                    <span className="total-banner-label">Total Registrations</span>
                    <span className="total-banner-value">{totalRegistrations.toLocaleString()}</span>
                </div>
            )}

            <div className="dashboard-grid">
                {centers.length > 0
                    ? centers.map(({ center, count }) => (
                        <ExamCenterCard key={center} center={center} count={count} />
                    ))
                    : !isConnected && (
                        <p className="no-data-message">Waiting for connection…</p>
                    )
                }
            </div>
        </div>
    );
};

export default ProjectDashboard;