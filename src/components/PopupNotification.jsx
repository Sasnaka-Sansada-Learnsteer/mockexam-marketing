import React, { useEffect, useState, useRef } from 'react';
import config from "../config/api";
import './PopupNotification.css'; // Create this file for the styles

const PopupNotification = () => {
    const [show, setShow] = useState(false);
    const [district, setDistrict] = useState('');
    const [isExiting, setIsExiting] = useState(false);
    const socketRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);

    useEffect(() => {
        const connectWebSocket = () => {
            // Connect to WebSocket server
            const wsUrl = config.endpoints.websocket;
            console.log('Connecting to WebSocket:', wsUrl);

            socketRef.current = new WebSocket(wsUrl);

            // WebSocket event handlers
            socketRef.current.onopen = () => {
                console.log('WebSocket connection established');
            };

            socketRef.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('WebSocket message received:', data);

                    if (data.type === 'new_registration') {
                        if(data.district){
                            // Set district data
                            setDistrict(data.district);
                        }

                        // Show popup
                        setShow(true);
                        setIsExiting(false);

                        // Auto-hide after timeout
                        const timer = setTimeout(() => {
                            setIsExiting(true);
                            setTimeout(() => setShow(false), 800);
                        }, 10000);

                        return () => clearTimeout(timer);
                    }
                } catch (err) {
                    console.error('Error processing WebSocket message:', err);
                }
            };
        }


        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
            // Attempt to reconnect after a delay
            reconnectTimeoutRef.current = setTimeout(() => {
                console.log('Attempting to reconnect WebSocket...');
                connectWebSocket();
            }, 5000);
        };

        connectWebSocket();

        // Clean up on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShow(false);
        }, 800);
    };

    if (!show) return null;

    return (
        <div className={`popup-notification ${isExiting ? 'exiting' : ''}`}>
            <div className="popup-content">
                <div className="popup-icon">🧑🏻‍🏫</div>
                <div className="popup-message">
                    <h4>New Registration!</h4>
                    <p>Someone from {district} just registered for the exam</p>
                </div>
            </div>
            <button className="popup-close" onClick={handleClose}>×</button>
        </div>
    );
};

export default PopupNotification;
