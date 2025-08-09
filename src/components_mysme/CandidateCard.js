import React, { useState, useEffect } from 'react';
import '../styles/CandidateCard.css';
import ExamTags from './ExamTags';
import axios from "axios";

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
    const [emailAddress, setEmailAddress] = useState( '');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [subjectStream, setSubjectStream] = useState('');
    const [preferredExamCenterConfirmed, setPreferredExamCenterConfirmed] = useState(false);
    const [joinedChannelsConfirmed, setJoinedChannelsConfirmed] = useState([]);
    const [selectedExams, setSelectedExams] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initialize state when candidate prop changes
    useEffect(() => {
        if (candidate) {
            setName(candidate['Full Name'] || '');
            setEmailAddress(candidate['Email Address'] || '');
            setWhatsappNumber(candidate['Whatsapp Number'] || '');
            setSubjectStream(candidate['Subject Stream'] || '');
            setPreferredExamCenterConfirmed(candidate.Preferred_Exam_Center_Confirmed || false);
            setSelectedExams(candidate.confirmed_papers || []);
        }
    }, [candidate]);

    const handleUpdate = async () => {
        if (!candidate?.NIC) {
            console.error('No NIC provided');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://sme-api-04db435264b2.herokuapp.com/api/admin/candidate-update-by-admin', {
                NIC: candidate.NIC,
                EmailAddress: emailAddress,
                WhatsappNumber: whatsappNumber,
                joinedChannelsConfirmed: joinedChannelsConfirmed,
                SubjectStream: subjectStream,
                Preferred_Exam_Center_Confirmed: preferredExamCenterConfirmed,
                confirmed_papers: selectedExams,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status >= 200 && response.status < 300) {
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Update failed:', error);
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

            {/* Subject Stream Selection */}
            <div className="card-section">
                <label className="field-label">Subject Stream</label>
                <select
                    value={subjectStream}
                    onChange={(e) => setSubjectStream(e.target.value)}
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
                <ExamTags
                    availableExams={exams}
                    selectedExams={selectedExams}
                    onExamToggle={handleExamToggle}
                    isEditable={true}
                />
            </div>

            {/* Update Button */}
            <div className="divider"></div>
            <button
                onClick={handleUpdate}
                disabled={loading}
                className="button button-primary button-full"
            >
                {loading ? (
                    <span>
            <span className="spinner"></span>
            Updating...
          </span>
                ) : 'Update'}
            </button>
        </div>
    );
};

export default CandidateCard;