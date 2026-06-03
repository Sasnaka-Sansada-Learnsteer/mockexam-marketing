import React from "react";
import "./ExamTimetable.css";

const ExamTimetable = () => {
    const districtData = [
        {
            district: "Colombo, Matara, Kalutara, Kurunegala",
            exams: [
                {
                    subject: "Biology II, Combined Mathematics I",
                    date: "2026-06-06",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Biology I, Combined Mathematics II",
                    date: "2026-06-06",
                    time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"],
                },
                {
                    subject: "Chemistry II, ICT II",
                    date: "2026-06-07",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Chemistry I, ICT I",
                    date: "2026-06-07",
                    time: "12:40 PM - 2:40 PM",
                },
                {
                    subject: "Physics II",
                    date: "2026-06-13",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Physics I",
                    date: "2026-06-13",
                    time: "12:40 PM - 2:40 PM",
                }
            ]
        },
        {
            district: "Kandy",
            exams: [
                {
                    subject: "Biology II, Combined Mathematics I",
                    date: "2026-06-06",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Biology I, Combined Mathematics II",
                    date: "2026-06-06",
                    time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"],
                },
                {
                    subject: "Chemistry II, ICT II",
                    date: "2026-06-07",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Chemistry I, ICT I",
                    date: "2026-06-07",
                    time: "12:40 PM - 2:40 PM",
                },
                {
                    subject: "Physics II",
                    date: "2026-06-20",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Physics I",
                    date: "2026-06-20",
                    time: "12:40 PM - 2:40 PM",
                }
            ]
        },
        {
            district: "Ratnapura",
            exams: [
                {
                    subject: "Biology II, Combined Mathematics I",
                    date: "2026-06-13",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Biology I, Combined Mathematics II",
                    date: "2026-06-13",
                    time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"],
                },
                {
                    subject: "Chemistry II, ICT II",
                    date: "2026-06-14",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Chemistry I, ICT I",
                    date: "2026-06-14",
                    time: "12:40 PM - 2:40 PM",
                },
                {
                    subject: "Physics II",
                    date: "2026-06-20",
                    time: "8:30 AM - 11:40 AM",
                },
                {
                    subject: "Physics I",
                    date: "2026-06-20",
                    time: "12:40 PM - 2:40 PM",
                }
            ]
        }
    ];

    return (
        <section className="exam-timetable" id="timetable">
            <div className="container">
                <div className="exam-timetable-heading" data-aos="fade-up">
                    <h2>Exam Timetable</h2>
                    <p className="subtitle">View scheduled dates and times for your district region</p>
                </div>

                <div className="district-card-container">
                    {districtData.map((district, districtIndex) => (
                        <div
                            className="district-card"
                            key={districtIndex}
                            data-aos="fade-up"
                            data-aos-delay={districtIndex * 100}
                        >
                            <div className="district-card-header">
                                <h3>{district.district}</h3>
                            </div>
                            <div className="district-card-body">
                                {district.exams.map((exam, examIndex) => (
                                    <div className="subject-item" key={examIndex}>
                                        <div className="subject-header">
                                            <h4>{exam.subject}</h4>
                                        </div>
                                        <div className="subject-details">
                                            <div className="exam-detail">
                                                <span className="detail-label">Date:</span>
                                                {/* Added non-breaking space mapping to prevent layout jumps with small text */}
                                                {"\u00a0"}
                                                <span className="detail-value">
                                                    {new Date(exam.date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                        timeZone: "UTC" /* Prevents local engine from rolling the date backward/forward */
                                                    })}
                                                </span>
                                            </div>
                                            <div className="exam-detail">
                                                <span className="detail-label">Time:</span>
                                                {"\u00a0"}
                                                {Array.isArray(exam.time) ? (
                                                    <div className="time-values">
                                                        {exam.time.map((t, idx) => (
                                                            <span key={idx} className="detail-value" style={{ display: 'block' }}>{t}</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="detail-value">{exam.time}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExamTimetable;