import React, { useState } from 'react';
import './MaintenanceBanner.css';

const MaintenanceBanner = ({
  message = "We're currently performing maintenance. Some features might be unavailable.",
  showDismissButton = true,
  maintenanceEndTime = null
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="maintenance-banner">
      <div className="maintenance-content">
        <div className="maintenance-icon">
          <i className="fas fa-wrench"></i>
        </div>
        <div className="maintenance-message">
          <p>{message}</p>
          {maintenanceEndTime && (
            <p className="maintenance-time">Expected to end: {maintenanceEndTime}</p>
          )}
        </div>
      </div>
      {showDismissButton && (
        <button
          className="dismiss-button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss maintenance notification"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default MaintenanceBanner;