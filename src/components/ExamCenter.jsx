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
      venue: "St. Aloysius' College, Galle",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d495.9624053147078!2d80.21169785889549!3d6.035947066330427!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1753905550586!5m2!1sen!2slk",
      directionsUrl: "https://maps.google.com/maps/dir//St.+Aloysius'+College+St.+Aloysius'+College+Main+Building+Templers+Rd+Galle+80000/@6.0359809,80.2118981,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3ae173bdb100e2cf:0x16c14f666237c35f",
    },
    {
      province: "Kandy Center",
      venue: "Viharamahadevi Girls' College Kandy ",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5919088098835!2d80.62441351019038!3d7.287185092689823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36884a80ad257%3A0xeb3b08feb9c52601!2sViharamahadevi%20Balika%20Vidyalaya!5e0!3m2!1sen!2slk!4v1753905743284!5m2!1sen!2slk",
      directionsUrl: "https://maps.google.com/maps/dir//Viharamahadevi+Balika+Vidyalaya+333+Peradeniya+Rd+Kandy+20000/@7.2871851,80.6269938,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3ae36884a80ad257:0xeb3b08feb9c52601",
    },
  ];

  return (
    <section className="province-table">
      <div className="container">
        <h2>Exam Centers</h2>

        <div className="provincetable-row">
          {examCenter.slice(0, 3).map((exam, index) => (
              <div className="province-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="province-card-header">
                  <h3>{exam.province}</h3>
                </div>
                <div className="province-card-body">
                  <div className="province-detail">
                    <span className="detail-label">Venue:</span>
                    <span className="detail-value">{exam.venue}</span>
                  </div>

                  <div className="map-area">
                    <div className="map-frame">
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
                    </div>

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
