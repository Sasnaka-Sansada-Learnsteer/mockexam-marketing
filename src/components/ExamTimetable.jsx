import React from "react";
import "./ExamTimetable.css";

const ExamTimetable = () => {
    // 1. Cleanly map out the distinct subject slots to build the rows
    const subjectsList = [
        { key: "bio_ii_math_i", label: "Biology II / Combined Mathematics I" },
        { key: "bio_i_math_ii", label: "Biology I / Combined Mathematics II" },
        { key: "chem_ii_ict_ii", label: "Chemistry II / ICT II" },
        { key: "chem_i_ict_i", label: "Chemistry I / ICT I" },
        { key: "physics_ii", label: "Physics II" },
        { key: "physics_i", label: "Physics I" },
    ];

    // 2. Keep columns flat and index schedules by the subject keys defined above
    const matrixData = [
        {
            district: "Colombo, Matara, Kalutara, Kurunegala",
            schedule: {
                bio_ii_math_i: { date: "2026-06-06", time: "8:30 AM - 11:40 AM" },
                bio_i_math_ii: { date: "2026-06-06", time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"] },
                chem_ii_ict_ii: { date: "2026-06-07", time: "8:30 AM - 11:40 AM" },
                chem_i_ict_i: { date: "2026-06-07", time: "12:40 PM - 2:40 PM" },
                physics_ii: { date: "2026-06-13", time: "8:30 AM - 11:40 AM" },
                physics_i: { date: "2026-06-13", time: "12:40 PM - 2:40 PM" },
            }
        },
        {
            district: "Kandy",
            schedule: {
                bio_ii_math_i: { date: "2026-06-06", time: "8:30 AM - 11:40 AM" },
                bio_i_math_ii: { date: "2026-06-06", time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"] },
                chem_ii_ict_ii: { date: "2026-06-07", time: "8:30 AM - 11:40 AM" },
                chem_i_ict_i: { date: "2026-06-07", time: "12:40 PM - 2:40 PM" },
                physics_ii: { date: "2026-06-20", time: "8:30 AM - 11:40 AM" },
                physics_i: { date: "2026-06-20", time: "12:40 PM - 2:40 PM" },
            }
        },
        {
            district: "Ampara",
            schedule: {
                bio_ii_math_i: { date: "2026-06-08", time: "8:30 AM - 11:40 AM" },
                bio_i_math_ii: { date: "2026-06-08", time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"] },
                chem_ii_ict_ii: { date: "2026-06-09", time: "8:30 AM - 11:40 AM" },
                chem_i_ict_i: { date: "2026-06-09", time: "12:40 PM - 2:40 PM" },
                physics_ii: { date: "2026-06-11", time: "8:30 AM - 11:40 AM" },
                physics_i: { date: "2026-06-11", time: "12:40 PM - 2:40 PM" },
            }
        },
        {
            district: "Ratnapura",
            schedule: {
                bio_ii_math_i: { date: "2026-06-13", time: "8:30 AM - 11:40 AM" },
                bio_i_math_ii: { date: "2026-06-13", time: ["12:40 PM - 2:40 PM", "12:40 PM - 3:50 PM"] },
                chem_ii_ict_ii: { date: "2026-06-14", time: "8:30 AM - 11:40 AM" },
                chem_i_ict_i: { date: "2026-06-14", time: "12:40 PM - 2:40 PM" },
                physics_ii: { date: "2026-06-20", time: "8:30 AM - 11:40 AM" },
                physics_i: { date: "2026-06-20", time: "12:40 PM - 2:40 PM" },
            }
        }
    ];

    // Helper function to format strings cleanly
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        });
    };

    return (
        <section className="exam-timetable" id="timetable">
            <div className="container">
                <div className="exam-timetable-heading" data-aos="fade-up">
                    <h2>Exam Timetable</h2>
                    <p className="subtitle">Cross-district schedule at a glance</p>
                </div>

                {/* Responsive wrapper to allow side-scrolling safely on mobile devices */}
                <div className="table-responsive-wrapper" data-aos="fade-up">
                    <table className="matrix-table">
                        <thead>
                            <tr>
                                <th>Subject Paper</th>
                                {matrixData.map((col, idx) => (
                                    <th key={idx}>{col.district}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {subjectsList.map((subject) => (
                                <tr key={subject.key}>
                                    <td className="subject-label-cell">
                                        <strong>{subject.label}</strong>
                                    </td>
                                    {matrixData.map((col, idx) => {
                                        const session = col.schedule[subject.key];
                                        return (
                                            <td key={idx} className="schedule-cell">
                                                <span className="cell-date">{formatDate(session.date)}</span>
                                                {Array.isArray(session.time) ? (
                                                    <div className="cell-time-stack">
                                                        {session.time.map((t, tIdx) => (
                                                            <span key={tIdx} className="cell-time variant">{t}</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="cell-time">{session.time}</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ExamTimetable;