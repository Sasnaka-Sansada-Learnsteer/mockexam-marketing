import React, { useState, useEffect } from "react";
import "./MyExamInfoEntry.css";
import CheckMyQR from "./CheckMyQR";
import CountdownTimer from "./CountdownTimer";

const MyExamInfoEntry = () => {
    const goLiveTime = new Date("2026-03-02T21:00:00+05:30");
    const [isLive, setIsLive] = useState(new Date() >= goLiveTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsLive(new Date() >= goLiveTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLoginToQuiz = () => {
        window.location.href = "https://quiz.sasnaka.org/login?redirected_from=sme.sasnaka.org";
    };
    return (
        <div className="my-exam-info-container">
            <div className="coming-soon-wrapper">
                <div className="portal-icon">
                    <i className="fas fa-laptop-code" style={{ color: "#0056b3" }}></i>
                </div>

                <h2 className="my-exam-portal-text">SME Digital Quiz Platform</h2>
                <div className="divider"></div>

                {/* The "Go-Live" Marketing Hook */}
                {isLive ? (
                    <h4 className="live-now-text" style={{ color: "#28a745", fontWeight: "bold", letterSpacing: "1px" }}>
                        🟢 WE ARE LIVE
                    </h4>
                ) : (
                    <CountdownTimer deadline={goLiveTime} />
                )}

                <p className="portal-description" style={{ marginBottom: "10px" }}>
                    {isLive ? (
                        <>The <strong>A/L Mock Examination MCQ Series</strong> is officially open. Test your knowledge with papers prepared by university undergrads.</>
                    ) : (
                        <>The <strong>A/L Mock Examination MCQ Series</strong> is launching soon. If you haven't registered yet, Click Register Now button below.</>
                    )}
                </p>

                {/* Value Propositions (Why they should click) */}
                <ul style={{ textAlign: "left", fontSize: "0.9rem", color: "#555", listStyleType: "none", padding: 0, margin: "0 auto 20px auto", maxWidth: "250px" }}>
                    <li style={{ marginBottom: "8px" }}>✅ <strong>Instant</strong> Auto-Grading</li>
                    <li style={{ marginBottom: "8px" }}>✅ <strong>Detailed</strong> Wiwarana</li>
                    <li>✅ <strong>National-Level</strong> Standards</li>
                </ul>

                <div className="register-button-container" style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                    {/* Primary Call to Action -> Routes to your new Go backend */}
                    <button
                        onClick={handleLoginToQuiz}
                        disabled={!isLive}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: isLive ? "#007bff" : "#cccccc",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: isLive ? "pointer" : "not-allowed",
                            width: "100%",
                            boxShadow: isLive ? "0 4px 6px rgba(0,123,255,0.2)" : "none"
                        }}
                    >
                        {isLive ? "Take a Mock Exam Now" : "Opening Soon..."}
                    </button>

                    {/* <CheckMyQR className="small-button" /> */}
                </div>

            </div>
        </div>
    );
};

export default MyExamInfoEntry;