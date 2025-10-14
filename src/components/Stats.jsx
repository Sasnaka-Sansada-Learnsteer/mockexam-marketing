import React, {useEffect, useState, useRef} from 'react';
import './Stats.css';

const statsData = [
    { label: 'Districts', value: 10 },
    { label: 'Exam Centers', value: 5 },
    { label: 'Students Served', value: 1200, suffix: '+' }
];

const animateTo = (target, setFn, duration = 1500) => {
    const start = performance.now();
    const from = 0;
    const delta = target - from;

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = Math.floor(from + delta * eased);
        setFn(current);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            setFn(target);
        }
    };

    requestAnimationFrame(step);
};

const Stats = () => {
    const [numbers, setNumbers] = useState(statsData.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        statsData.forEach((stat, idx) => {
                            const setFn = (val) =>
                                setNumbers((prev) => {
                                    const next = [...prev];
                                    next[idx] = val;
                                    return next;
                                });
                            setTimeout(() => animateTo(stat.value, setFn, 1200 + idx * 250), idx * 150);
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
    <section className="stats-section" data-aos="fade-up" ref={sectionRef}>
        <div className="container">
            <h2 className="stats-title">Our Journey</h2>
            <div className="stats-container">
                {statsData.map((stat, i) => (
                    <div className="stat-item" key={stat.label}>
                            <span className="stat-number">
                                {numbers[i]}
                                {stat.suffix ? stat.suffix : ''}
                            </span>
                        <p className="stat-label">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
};


export default Stats;

