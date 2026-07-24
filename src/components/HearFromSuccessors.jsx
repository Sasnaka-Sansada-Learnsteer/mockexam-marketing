import React, { useState, useEffect, useRef } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragStart = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, SECONDS_PER_TILE * 1000);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const handlePointerDown = (e) => {
    dragStart.current = e.clientX;
    isDragging.current = true;
    setIsPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const diff = e.clientX - dragStart.current;
    const swipeThreshold = 30; // threshold for swiping
    
    if (Math.abs(diff) < 5) {
      // It's a press/click!
      const clickedEl = document.elementFromPoint(e.clientX, e.clientY);
      const tile = clickedEl ? clickedEl.closest(".successor-tile") : e.target.closest(".successor-tile");
      if (tile) {
        const idx = parseInt(tile.getAttribute("data-index"), 10);
        if (!isNaN(idx)) {
          setActiveIndex(idx);
        }
      }
    } else if (diff < -swipeThreshold) {
      // Swipe left -> next slide
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (diff > swipeThreshold) {
      // Swipe right -> prev slide
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    
    // Always resume auto-play immediately
    setIsPaused(false);
  };

  const handlePointerCancel = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsPaused(false);
  };

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
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ "--active-index": activeIndex }}
      >
        <div className="successors-carousel-track">
          {images.map((img, idx) => (
            <div
              className={`successor-tile ${idx === activeIndex ? "active" : ""}`}
              key={idx}
              data-index={idx}
              onClick={() => setActiveIndex(idx)}
            >
              <img src={img.src} alt={img.alt} draggable="false" />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HearFromSuccessors;

