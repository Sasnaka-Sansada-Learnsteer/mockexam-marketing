import React from 'react';
import './Stats.css';
import { useTranslation } from "react-i18next";

const Stats = () => {
    const { t } = useTranslation();

    return (
        <section className="stats-section" data-aos="fade-up">
            <div className="container">
                <h2 className="stats-title">{t("stats.stat_title")}</h2>
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">9</span>
                        <p className="stat-label">{t("stats.stat_dist")}</p>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">3</span>
                        <p className="stat-label">{t("stats.stat_cent")}</p>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">1000+</span>
                        <p className="stat-label">{t("stats.stat_studentServed")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default Stats;