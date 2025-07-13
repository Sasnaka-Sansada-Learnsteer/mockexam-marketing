import React from 'react';
import './ExamTimetable.css';

const ExamTimetable = () => {
    const examSchedule = [
        { subject: 'Physics', date: '2025-08-15', time: '9:00 AM - 12:00 PM', venue: 'Hall A' },
        { subject: 'Chemistry', date: '2025-08-16', time: '9:00 AM - 12:00 PM', venue: 'Hall B' },
        { subject: 'Biology', date: '2025-08-17', time: '9:00 AM - 12:00 PM', venue: 'Hall A' },
        { subject: 'Mathematics', date: '2025-08-18', time: '9:00 AM - 12:00 PM', venue: 'Hall C' },
    ];
    return (
        <section className="exam-timetable">
            <div className="container">
                <h2>Exam Timetable</h2>
                <div className="timetable-grid">
                    {examSchedule.map((exam, index) => (
                        <div className="exam-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="exam-card-header">
                                <h3>{exam.subject}</h3>
                            </div>
                            <div className="exam-card-body">
                                {/*<div className="exam-detail">*/}
                                {/*    <span className="detail-label">Date:</span>*/}
                                {/*    <span className="detail-value">{new Date(exam.date).toLocaleDateString('en-US', {*/}
                                {/*        year: 'numeric',*/}
                                {/*        month: 'long',*/}
                                {/*        day: 'numeric'*/}
                                {/*    })}</span>*/}
                                {/*</div>*/}
                                {/*<div className="exam-detail">*/}
                                {/*    <span className="detail-label">Time:</span>*/}
                                {/*    <span className="detail-value">{exam.time}</span>*/}
                                {/*</div>*/}
                                {/*<div className="exam-detail">*/}
                                {/*    <span className="detail-label">Venue:</span>*/}
                                {/*    <span className="detail-value">{exam.venue}</span>*/}
                                {/*</div>*/}
                                <div className="timetable-tile" key={exam.id}>
                                    <span className="coming-soon-tag">Releasing Soon</span>
                                    <h3 className="tile-title">{exam.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExamTimetable;
