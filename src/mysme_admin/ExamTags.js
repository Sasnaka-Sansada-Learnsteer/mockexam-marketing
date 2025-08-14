import React from 'react';
import '../styles/ExamTags.css';

const ExamTags = ({
                      availableExams = [],
                      selectedExams = [],
                      onExamToggle,
                      isEditable = true
}) => {
    return (
        <div className="exam-tags-container">
            <h3 className="section-title-selected-papers">Selected Papers</h3>
            <div className="exam-tags-grid">
                {availableExams.map((exam)=> {
                    // Extract exam_name from the exam object
                    const examName = exam;

                    // Check if this exam is selected by comparing exam_name
                    const isSelected = selectedExams.includes(examName);

                    return (
                        <div
                            key={examName}
                            className={`exam-tag ${isSelected ? 'selected' : ''} ${!isEditable ? 'read-only' : ''}`}
                            onClick={() => isEditable && onExamToggle(examName)}
                        >
                            <div className="exam-tag-content">
                                <span className="exam-name">{examName}</span>
                                {isEditable && (
                                    <span className="exam-tag-icon">
                    {isSelected ? '✓' : '+'}
                  </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            {isEditable && selectedExams.length > 0 && (
                <div className="selected-count">
                    {selectedExams.length} paper{selectedExams.length !== 1 ? 's' : ''} selected
                </div>
            )}
        </div>
    );
};

export default ExamTags;