import React, { useRef, useEffect } from "react";
import "./HearFromSuccessors.css";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// How many seconds each tile stays fully in focus before scrolling to the next.
// Increase to slow down, decrease to speed up.
const SECONDS_PER_TILE = 3; // ← adjust this value as needed
// ─────────────────────────────────────────────────────────────────────────────

const images = [
  { src: "/SuccessStory1.jpeg", alt: "Success Story 1" },
  { src: "/SuccessStory2.jpeg", alt: "Success Story 2" },
  { src: "/SuccessStory3.jpeg", alt: "Success Story 3" },
  { src: "/SuccessStory4.jpeg", alt: "Success Story 4" },
  { src: "/SuccessStory5.jpeg", alt: "Success Story 5" },
];

const HearFromSuccessors = () => {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const startScroll = () => {
      // One full set = half the total duplicated strip width
      const totalWidth = track.scrollWidth / 2;
      // px/sec so each tile is visible for SECONDS_PER_TILE seconds
      const pxPerSec = totalWidth / (SECONDS_PER_TILE * images.length);
      let lastTime = null;
      let position = 0;

      const step = (timestamp) => {
        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        lastTime = timestamp;

        if (!pausedRef.current) {
          position += pxPerSec * (delta / 1000);
          if (position >= totalWidth) position -= totalWidth;
          track.style.transform = `translateX(-${position}px)`;
        }
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const timer = setTimeout(startScroll, 50);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  // Duplicate for seamless loop
  const allImages = [...images, ...images];

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

      <div
        className="successors-carousel-viewport"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="successors-carousel-track" ref={trackRef}>
          {allImages.map((img, idx) => (
            <div className="successor-tile" key={idx}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HearFromSuccessors;
