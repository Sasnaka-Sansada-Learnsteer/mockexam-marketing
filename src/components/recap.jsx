import React from "react";
import "./recap.css";

// ─── MEDIA CONFIG ────────────────────────────────────────────────────────────
// Replace VIDEO_SRC with your YouTube embed URL, e.g.:
//   "https://www.youtube.com/embed/YOUR_VIDEO_ID"
// The video is displayed in vertical (9:16) format to match a phone-recorded
// or portrait-mode highlight reel.
const VIDEO_SRC = "https://www.youtube.com/embed/Icxbl5RHXAg?rel=0&modestbranding=1"; // ← replace VIDEO ID as needed
// ─────────────────────────────────────────────────────────────────────────────

const Recap = () => {
  return (
    <section className="recap-section" data-aos="fade-up" data-aos-once="false">
      {/* ── Header ── */}
      <div className="recap-header">
        <h2 className="recap-title">Highlights &amp; Recaps</h2>
        <h3>from SME 2025</h3>
        <p className="recap-subtitle">
          Relive the energy, effort, and excitement of the 2025 mock exam —
          through our official highlights video.
        </p>
      </div>

      {/* ── Vertical video ── */}
      <div className="recap-video-wrapper" data-aos="zoom-in" data-aos-delay="100">
        <h4 className="recap-video-title">Topper's Talks</h4>
        <div className="recap-video-frame">
          <iframe
            src={VIDEO_SRC}
            title="Sasnaka Sansada Mock Exam 2025 Highlights"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Recap;
