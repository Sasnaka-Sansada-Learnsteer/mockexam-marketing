import React from 'react';
import './ExamInfo.css';
import RegisterNow from "./RegisterNow";

const ExamInfo = () => (
    <section className="exam-info" data-aos="fade-up">
        <div className="container">
            <h2>What is Sasnaka Sansada A/L Mock Exam?</h2>
            <p className="description-text">
                Are you an Advanced Level student?
                This is your opportunity to prepare for your A/L exams early.
                The Profiling and Corporate Affairs Pillar of Sasnaka Sansada <br />
                is organizing a <b>mock examination</b> for you!
            </p>

            {/* Hurry-up notice — styled like the registration form warning */}
            <div className="exam-info-notice">
                <p>
                    <strong>Hurry up!</strong> Register now for A/L Mock Examination 2026
                    and prepare yourself for success.
                </p>
            </div>

            <div className="register-actions">
                <RegisterNow className="small-button" />
            </div>
        </div>
    </section>
);

export default ExamInfo;