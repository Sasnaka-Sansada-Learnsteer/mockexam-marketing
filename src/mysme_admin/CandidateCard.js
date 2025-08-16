import React, { useState, useEffect } from 'react';
import '../styles/CandidateCard.css';
import ExamTags from './ExamTags';
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// NameDisplay component
const NameDisplay = ({ name }) => (
    <div className="name-display">
        <span className="name-label">Name</span>
        <span className="name-value">{name || 'N/A'}</span>
    </div>
);

const InfoCard = ({ label, value }) => (
    <div className="info-card">
        <div className="info-label">{label}</div>
        <div className="info-value">{value || 'N/A'}</div>
    </div>
);

const CandidateCard = ({ candidate, token, exams }) => {
    const [isEditing,setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [subjectStream, setSubjectStream] = useState('');
    const [participateStatus, setParticipateStatus] = useState('');
    const [preferredExamCenterConfirmed, setPreferredExamCenterConfirmed] = useState(false);
    const [joinedChannelsConfirmed, setJoinedChannelsConfirmed] = useState(false);
    const [selectedExams, setSelectedExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredExams, setFilteredExams] = useState(exams);
    const [endMessage, setEndMessage] = useState('');


    // Initialize state when candidate prop changes
    useEffect(() => {
        if (candidate) {
            setName(candidate['Full Name'] || '');
            setEmailAddress(candidate['Email Address'] || '');
            setWhatsappNumber(candidate['Whatsapp Number'] || '');
            setSubjectStream(candidate['Subject Stream'] || '');
            setPreferredExamCenterConfirmed(candidate['Preferred_Exam_Center_Confirmed'] || false);
            setSelectedExams(candidate.confirmed_papers || []);
            setJoinedChannelsConfirmed(candidate['joined_channels_confirmed'] || false);
            setParticipateStatus(candidate['participation_status'] || '')
        }
        if (endMessage) {
            const timer = setTimeout(() => setEndMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [candidate, endMessage]);

    const handleUpdate = async () => {
        if (!candidate?.NIC) {
            console.error('No NIC provided');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/admin/candidate-update-by-admin`, {
                NIC: candidate.NIC,
                EmailAddress: emailAddress,
                WhatsappNumber: whatsappNumber,
                joined_channels_confirmed: joinedChannelsConfirmed,
                SubjectStream: subjectStream,
                Preferred_Exam_Center_Confirmed: preferredExamCenterConfirmed,
                confirmed_papers: selectedExams,
                participation_status: participateStatus,
            },{headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setEndMessage(response.data.message);

            if (response.status >= 200 && response.status < 300) {
                setIsEditing(false);

                // Show success message for a brief period before reloading
                setTimeout(() => {
                    window.location.reload(); // Reload the entire page
                }, 1000);
            }
        } catch (error) {
            console.error('Update failed:', error);
            setEndMessage(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleExamToggle = (examName) => {
        setSelectedExams(prev => {
            // If already selected, remove it
            if (prev.includes(examName)) {
                return prev.filter(name => name !== examName);
            }
            // Otherwise add it
            else {
                return [...prev, examName];
            }
        });
    };

    const handleStreamChange = (e) => {
        const stream = e.target.value;
        setSubjectStream(stream);

        if (stream === '') {
            setFilteredExams([]);
        } else if (stream === 'Bio Science') {
            setFilteredExams(exams.filter(
                exam => exam !== 'Combined Maths I' && exam !== 'Combined Maths II'
            ));
        } else if (stream === 'Physical Science') {
            setFilteredExams(exams.filter(
                exam => exam !== 'Biology I' && exam !== 'Biology II'
            ));
        } else {
            setFilteredExams(exams);
        }
    };

    const handleParticipateConfirmation = (e) => {
        const participateStatus = e.target.value;
        setParticipateStatus(participateStatus);
        // setParticipateConfirmation(e.target.value === "confirmed");
    };

    if (!candidate) {
        return <div>No candidate data available</div>;
    }

    return (
        <div className="candidate-card">
            <NameDisplay name={candidate['Full Name']} />

            {/* Contact Information */}
            <div className="card-section">
                <h3 className="section-header">Contact Information</h3>
                <div className="candidate-details">
                    <InfoCard label="Email Address" value={candidate["Email Address"]} />
                    <InfoCard label="Whatsapp Number" value={candidate["Whatsapp Number"]} />
                </div>
            </div>

            {/* Joined Channels Confirmation */}
            <div className="checkbox-container">
                <span className="checkbox-label">
                    <label className="field-label">Joined Channels ?</label>
                </span>
                <input
                    type="checkbox"
                    checked={joinedChannelsConfirmed}
                    onChange={(e) => setJoinedChannelsConfirmed(e.target.checked)}
                    className="checkbox-input"
                    id="joinedChannels"
                />
                <label htmlFor="examCenter" className="checkbox-label">
                    Confirmed
                </label>
            </div>

            {/* Exam Center Confirmation */}
            <div className="checkbox-container">
                <span className="checkbox-label">
                    <label className="field-label">Preferred Exam Center :</label>
                    {candidate['Preferred Exam Center'] || 'Exam Center N/A'}
                </span>
                <input
                    type="checkbox"
                    checked={preferredExamCenterConfirmed}
                    onChange={(e) => setPreferredExamCenterConfirmed(e.target.checked)}
                    className="checkbox-input"
                    id="examCenter"
                />
                <label htmlFor="examCenter" className="checkbox-label">
                    Confirmed
                </label>
            </div>

            {/* Participation for the exam  */}
            <div className="card-section participation-highlight">
                <label className="field-label">Participation for the Exam: </label>
                <select
                    value={participateStatus}
                    onChange={handleParticipateConfirmation}
                    className="field-select participation-select"
                >
                    <option value="">Select Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                    <option value="not_reachable">Not reachable</option>
                </select>
            </div>

            {/* Subject Stream Selection */}
            <div className="card-section">
                <label className="field-label">Subject Stream</label>
                <select
                    value={subjectStream}
                    onChange={handleStreamChange}
                    className="field-select"
                >
                    <option value="">Select Stream</option>
                    <option value="Bio Science">Bio Science</option>
                    <option value="Physical Science">Physical Science</option>
                </select>
            </div>

            {/* Exam Selection */}
            <div className="card-section">
                <h3 className="section-header">Confirmed Papers</h3>
                {subjectStream === '' && (
                    <div style={{ color: 'gray', marginTop: '10px' }}>
                        Select Subject Stream to get papers
                    </div>
                )}
                <ExamTags
                    availableExams={filteredExams}
                    selectedExams={selectedExams}
                    onExamToggle={handleExamToggle}
                    isEditable={true}

                />
            </div>

            {/* Update Button */}
            <div className="divider"></div>
            {endMessage && (
                <div className="end-message" style={{
                    padding: "8px 12px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    backgroundColor: endMessage.includes('fail') || endMessage.includes('error') ? "#ffebee" : "#e8f5e9",
                    color: endMessage.includes('fail') || endMessage.includes('error') ? "#c62828" : "#2e7d32",
                    textAlign: "center",
                    fontWeight: "500"
                }}>
                    {endMessage}
                </div>
            )}
            <button
                onClick={handleUpdate}
                disabled={loading}
                className="button button-primary button-full"
            >
                {loading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="spinner" style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderRadius: "50%",
                            borderTopColor: "#fff",
                            animation: "spin 1s linear infinite",
                            marginRight: "8px"
                        }}></span>
                        Updating...
                    </span>
                ) : 'Update'}
            </button>
        </div>
    );
};

export default CandidateCard;