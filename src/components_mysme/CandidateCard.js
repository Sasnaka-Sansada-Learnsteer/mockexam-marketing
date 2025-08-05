import React from 'react';
import '../styles/CandidateCard.css';

const CandidateCard = ({ registration }) => {
  // Debug: Log the registration data structure

  // Format the timestamp
  // const formatDate = (timestamp) => {
  //   if (!timestamp) return 'N/A';
  //   try {
  //     const date = new Date(timestamp);
  //     if (isNaN(date.getTime())) return 'Invalid Date';
  //     return date.toLocaleString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //       hour: '2-digit',
  //       minute: '2-digit'
  //     });
  //   } catch (error) {
  //     console.error('Date formatting error:', error);
  //     return 'N/A';
  //   }
  // };

  // Handle missing registration data
  if (!registration) {
    return <div className="registration-card error">Invalid candidate data</div>;
  }

  return (
    <div className="registration-card" data-nic={registration.nic || registration.NIC || 'unknown'}>
      <div className="registration-card-header">
        <h3>{registration.fullName || registration["Full Name"] || 'Unnamed Registrant'}</h3>
        {/*<span className="timestamp">{formatDate(registration["Timestamp"])}</span>*/}
      </div>

      <div className="registration-details">
        {/*<div className="detail-row">*/}
        {/*  <span className="detail-label">NIC:</span>*/}
        {/*  <span className="detail-value">{registration["NIC"] || registration["NIC "] || 'Not provided'}</span>*/}
        {/*</div>*/}

        <div className="detail-row">
          <span className="detail-label">School:</span>
          <span className="detail-value">{registration["School "] || 'Not provided'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{registration["Email Address"] || 'Not provided'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">District:</span>
          <span className="detail-value">{registration["District"] || 'Not provided'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Exam Center:</span>
          <span className="detail-value">{registration["Preferred Exam Center"] || 'Not provided'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">WhatsApp:</span>
          <span className="detail-value">{registration["Whatsapp Number"] || 'Not provided'}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;