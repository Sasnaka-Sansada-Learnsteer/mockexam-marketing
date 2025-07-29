import React from "react";
import "./ExamCenter.css";

const ExamCenter = () => {
  const examCenter = [
    {
      province: "Colombo Center",
      venue: "University of Colombo",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7921.805930042093!2d79.85647084578099!3d6.902206909028085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963120b1509%3A0x2db2c18a68712863!2sUniversity%20of%20Colombo%20School%20of%20Computing%20(UCSC)!5e0!3m2!1sen!2slk!4v1753535419952!5m2!1sen!2slk",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=University+of+Colombo",
    },
    {
      province: "Galle Center",
      venue: "Pending",
      mapUrl: null,
      directionsUrl: null,
    },
    {
      province: "Kandy Center",
      venue: "Pending",
      mapUrl: null,
      directionsUrl: null,
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
                <div className="province-map">
                  <iframe
                    src={exam.mapUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${exam.venue}`}
                  ></iframe>

                  <a
                    href={exam.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direction-button"
                  >
                    Get Directions
                  </a>
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
