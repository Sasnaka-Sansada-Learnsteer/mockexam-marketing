import React from 'react';
import './Stats.css';


const Stats = () => (
    <section className="stats-section" data-aos="fade-up">
        <div className="container">
            <h2 className="stats-title">Our Journey</h2>
            <div className="stats-container">
                <div className="stat-item">
                    <span className="stat-number">12</span>
                    <p className="stat-label">Districts</p>
                </div>
                <div className="stat-item">
                    <span className="stat-number">4</span>
                    <p className="stat-label">Exam Centers</p>
                </div>
                <div className="stat-item">
                    <span className="stat-number">1000+</span>
                    <p className="stat-label">Students Served</p>
                </div>
            </div>
        </div>
    </section>
);


export default Stats;

