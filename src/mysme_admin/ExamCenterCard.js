import React from 'react';
import '../styles/ProjectDashboard.css';

/**
 * ExamCenterCard — reusable card for displaying a single exam center count.
 *
 * Props:
 *   center {string} — exam center name (e.g. "Colombo")
 *   count  {number} — total registrations for this center
 */
const ExamCenterCard = ({ center, count }) => (
    <div className="stat-card">
        <h3 className="stat-card-title">{center}</h3>
        <div className="center-count-display">
            <span className="center-count-value">{count ?? '—'}</span>
            <span className="center-count-label">Registrations</span>
        </div>
    </div>
);

export default ExamCenterCard;
