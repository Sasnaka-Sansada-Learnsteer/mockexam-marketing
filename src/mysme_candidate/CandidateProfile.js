import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/candidate.css';
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const CandidateProfile = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
    const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    const fetchCandidateData = async () => {
      const token = localStorage.getItem('candidateToken');

      if (!token) {
        navigate('/mysme/login');
        return;
      }

      try {
        const response = await axios.get(
          'https://sme-api-04db435264b2.herokuapp.com/api/candidate/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setCandidateData(response.data);
      } catch (err) {
        console.error('Error fetching candidate data:', err);
        setError('Failed to load profile data. Please try again later.');

        if (err.response?.status === 401) {
          localStorage.removeItem('candidateToken');
          localStorage.removeItem('userRole');
          navigate('/mysme/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('candidateToken');
    localStorage.removeItem('userRole');
    navigate('/mysme/login');
  };

  const downloadQRCode = () => {
      // Create a canvas element to combine QR code and text
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Load the QR code image
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Handle CORS issues
      img.onload = () => {
          // Set canvas size - add extra height for the text
          const scale = 4;
          canvas.width = img.width * scale;
          canvas.height = (img.height + 40) * scale; // Extra space for text

          // Scale the context to match
          ctx.scale(scale, scale);

          // Draw white background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

          // Enable high-quality image rendering
          ctx.imageSmoothingEnabled = false; // Keeps QR code crisp without anti-aliasing

          // Draw the QR code
          ctx.drawImage(img, 0, 0);

          // Add the text
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 20px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Draw text with a slight shadow for better readability
          ctx.shadowColor = 'rgba(255,255,255,0.8)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          ctx.fillText(`${candidateData.candidate.examIndexNumber}`, img.width / 2, img.height + 20);

          // Convert to data URL with maximum quality and trigger download
          const imageData = canvas.toDataURL('image/png', 1.0);

          // Create PDF
          import('jspdf').then((jsPDFModule) => {
              const { default: jsPDF } = jsPDFModule;
              const pdf = new jsPDF({
                  orientation: 'portrait',
                  unit: 'mm',
                  format: 'a4'
              });

              // Add title
              pdf.setFontSize(16);
              pdf.text('MySME25 QR Code', 105, 20, { align: 'center' });

              // Add candidate info
              pdf.setFontSize(12);
              pdf.text(`Candidate: ${candidateData.candidate["Full Name"]}`, 105, 30, { align: 'center' });
              pdf.text(`Exam Index: ${candidateData.candidate.examIndexNumber}`, 105, 40, { align: 'center' });

              // Calculate dimensions to fit QR code properly on the page
              const imgWidth = 100; // mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;

              // Add QR code image
              pdf.addImage(imageData, 'PNG', (210 - imgWidth) / 2, 50, imgWidth, imgHeight);

              // Add footer note
              pdf.setFontSize(10);
              pdf.text('Please bring this QR code to the examination center to mark your attendance', 105, 50 + imgHeight + 10, { align: 'center' });

              // Save PDF
              pdf.save(`${candidateData.candidate.examIndexNumber}_MySME25_QRCode.pdf`);

              // Show success message
              setDownloadSuccess(true);
              setTimeout(() => setDownloadSuccess(false), 3000);
          });
      };
      img.src = candidateData.candidate['qrCode'];
  };

  if (loading) {
    return <div className="loading">Loading profile data...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (!candidateData) {
    return <div className="error-container">Unable to load profile data</div>;
  }

  return (
    <div className="candidate-profile-container">
      <div className="profile-header">
        <h2>MySME Profile</h2>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>

      <div className="profile-content">
        <div className="candidate-details">
          <h3>My Information</h3>
          <div className="detail-item">
            <span className="label">NIC:</span>
            <span className="value">{candidateData.candidate["NIC"]}</span>
          </div>
          <div className="detail-item">
            <span className="label">Full Name:</span>
            <span className="value">{candidateData.candidate["Full Name"]}</span>
          </div>
          <div className="detail-item">
            <span className="label">School:</span>
            <span className="value">{candidateData.candidate["School "]}</span>
          </div>
          <div className="detail-item">
            <span className="label">Subject Stream:</span>
            <span className="value">{candidateData.candidate["Subject Stream"]}</span>
          </div>
          <div className="detail-item">
            <span className="label">Preferred Exam Center:</span>
            <span className="value">{candidateData.candidate["Preferred Exam Center"]}</span>
          </div>
        </div>

        <div className="eligible-papers">
          <h3>My Exam Papers</h3>
          {candidateData.candidate.confirmed_papers && candidateData.candidate.confirmed_papers.length > 0 ? (
            <ul>
              {candidateData.candidate.confirmed_papers.map((paper, index) => (
                <li key={index}>{paper}</li>
              ))}
            </ul>
          ) : (
            <p>No eligible papers found</p>
          )}
        </div>

        <div className="exam-info-card">
          <h3>My Exam Information</h3>
            {(!candidateData.candidate.examIndexNumber || !candidateData.candidate['qrCode']) ? (
                <div className="error-container">
                    Your Participation is not confirmed yet
                </div>
            ) : (
                <>
          <div className="detail-item highlight">
            <span className="label">Exam Index Number:</span>
            <span className="value">{candidateData.candidate.examIndexNumber}</span>
          </div>
          <div className="qr-code-container">
            <img src={candidateData.candidate['qrCode']} alt="Exam QR Code" className="qr-code" />
            {/*<button onClick={downloadQRCode} className="btn-download">*/}
            {/*  Download QR Code*/}
            {/*</button>*/}
            {/*  {downloadSuccess &&*/}
            {/*      <div className="success-message">QR Code downloaded successfully!</div>*/}
            {/*  }*/}
              <span className="label-qr">Stay tighter.. ! Your QR code is still processing.
                  It'll be available for you to download after 6 am on 15th Aug 2025. </span>
              <span className="value-qr">You need to bring this QR code on the exam day to mark your attendance.</span>
          </div>
                </>
            )}
        </div>
      </div>
        <FloatingWhatsApp phoneNumber="94703445342" />
    </div>
  );
};


export default CandidateProfile;