import React from 'react';
import '../styles/ProjectDashboard.css';

/**
 * ExamCenterCard — reusable card for displaying a single exam center's counts.
 *
 * Props:
 *   center           {string} — exam center name (e.g. "Colombo")
 *   registeredCount  {number} — total registrations for this center
 *   confirmedCount   {number} — total confirmations for this center
 */
const ExamCenterCard = ({ center, registeredCount, confirmedCount }) => (
    <div className="stat-card">
        <h3 className="stat-card-title">{center}</h3>
        <div className="stat-grid">
            <div className="stat-item total">
                <span className="stat-label">Registered</span>
                <span className="stat-value">{registeredCount ?? '—'}</span>
            </div>
            <div className="stat-item confirmed">
                <span className="stat-label">Confirmed</span>
                <span className="stat-value">{confirmedCount ?? '—'}</span>
            </div>
        </div>
    </div>
);

export default ExamCenterCard;
