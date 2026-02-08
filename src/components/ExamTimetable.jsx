import React from "react";
import "./ExamTimetable.css";


const ExamTimetable = () => {
    const districtData = [
        {
            district: "Ampara",
            exams: [
                {
                    subject: "Combined Mathematics",
                    date: "2025-09-23",
                    time: "8:30 AM - 3:50 PM",
                },
                {
                    subject: "Biology",
                    date: "2025-09-23",
                    time: "8:30 AM - 2:10 PM",
                },
                {
                    subject: "Chemistry",
                    date: "2025-09-25",
                    time: "8:30 AM - 2:40 PM",
                },
                {
                    subject: "Physics",
                    date: "2025-09-30",
                    time: "8:30 AM - 2:40 PM",
                },
            ],
        },
    ];

    return null;

    return (
        <section className="exam-timetable">
            <div className="container">
                <h2>Exam Timetable</h2>


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
                                                <span className="detail-value">
                         {new Date(exam.date).toLocaleDateString("en-US", {
                             year: "numeric",
                             month: "long",
                             day: "numeric",
                         })}
                       </span>
                                            </div>
                                            <div className="exam-detail">
                                                <span className="detail-label">Time:</span>
                                                <span className="detail-value">{exam.time}</span>
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

