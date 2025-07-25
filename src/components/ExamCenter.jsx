import React from "react";
import "./ExamCenter.css";

const ExamCenter = () => {
  const examCenter = [
    {
      province: "Western Province",
      venue: "University of Colombo",
    },
    {
      province: "Southern Province",
      venue: "Hall A",
    },
    {
      province: "Central Province",
      venue: "Hall A",
    },
  ];

  return (
    <section className="province-table">
      <div className="container">
        <h2>Exam Centers</h2>

        <div className="provincetable-row">
          {examCenter.slice(0, 3).map((exam, index) => (
            <div
              className="province-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="province-card-header">
                <h3>{exam.province}</h3>
              </div>
              <div className="province-card-body">
                <div className="province-detail">
                  <span className="detail-label">Venue:</span>
                  <span className="detail-value">{exam.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamCenter;
