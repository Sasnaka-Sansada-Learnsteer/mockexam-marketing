import React from "react";
import "./ExamCenter.css";

const HearFromSuccessors = () => {
  return (
    <section className="hear-from-successors" data-aos="fade-up" data-aos-once="false">
      <div className="container">
        <h2 className="stats-title">Hear from Successors</h2>
        <p className="description-text">
          Discover the inspiring journeys of our students who have excelled in
          their A/Ls with the help of our mock exams. Read their stories and get
          motivated to achieve your own success!
        </p>
      </div>

      <br />

      <div className="success-gallery-wrapper">
        <img
          src="/SuccessStory1.jpeg"
          alt="Success Story 1"
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-back"
          data-aos-duration="1000"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <img
          src="/SuccessStory2.jpeg"
          alt="Success Story 2"
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-back"
          data-aos-duration="1000"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <img
          src="/SuccessStory3.jpeg"
          alt="Success Story 3"
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-back"
          data-aos-duration="1000"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <img
          src="/SuccessStory4.jpeg"
          alt="Success Story 3"
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-back"
          data-aos-duration="1000"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <img
          src="/SuccessStory5.jpeg"
          alt="Success Story 3"
          data-aos="zoom-in-up"
          data-aos-easing="ease-out-back"
          data-aos-duration="1000"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </div>
    </section>
  );
};

export default HearFromSuccessors;
