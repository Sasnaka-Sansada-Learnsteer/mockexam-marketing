import React from "react";
import "./ExamTimetable.css";

const ExamTimetable = () => {
  const examSchedule = [
    {
      subject: "Physics",
      date: "2025-08-24",
      time: "8:00 AM - 2:10 PM",
    },
    {
      subject: "Chemistry",
      date: "2025-08-17",
      time: "8:00 AM - 2:10 PM",
    },
    {
      subject: "Biology",
      date: "2025-08-16",
      time: "8:00 AM - 2:10 PM",
    },
    {
      subject: "Combined Mathematics",
      date: "2025-08-16",
      time: "8:00 AM - 3:20 PM",
    },
  ];
  return (
    <section className="exam-timetable">
      <div className="container">
        <h2>Exam Timetable</h2>

        <div className="timetable-row">
          {examSchedule.slice(0, 3).map((exam, index) => (
            <div
              className="exam-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="exam-card-header">
                <h3>{exam.subject}</h3>
              </div>
              <div className="exam-card-body">
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

        <div className="timetable-row single">
          {examSchedule.slice(3).map((exam, index) => (
            <div
              className="exam-card"
              key={index + 3}
              data-aos="fade-up"
              data-aos-delay={(index + 3) * 100}
            >
              <div className="exam-card-header">
                <h3>{exam.subject}</h3>
              </div>
              <div className="exam-card-body">
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
    </section>
  );
};

export default ExamTimetable;
