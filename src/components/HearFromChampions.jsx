import React from 'react';
import './HearFromChampions.css';

const HearFromChampions = () => {
    // Sample data for champions/speakers
    const champions = [
        {
            id: 1,
            name: 'John Smith',
            position: 'Gold Medalist 2023',
            photo: '/images/champions/john-smith.jpg',
            thoughts: 'The preparation journey was challenging but incredibly rewarding. Focus on understanding core concepts rather than memorizing.'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            position: 'Silver Medalist 2023',
            photo: '/images/champions/sarah-johnson.jpg',
            thoughts: 'Consistency is key. I dedicated two hours daily and focused on practice problems that tested different aspects of the subject.'
        },
        {
            id: 3,
            name: 'Michael Chen',
            position: 'Bronze Medalist 2023',
            photo: '/images/champions/michael-chen.jpg',
            thoughts: 'Group study sessions helped me gain different perspectives. Don\'t underestimate the power of explaining concepts to others.'
        },
        {
            id: 4,
            name: 'Lisa Wong',
            position: 'Top 10 Finalist 2023',
            photo: '/images/champions/lisa-wong.jpg',
            thoughts: 'Balance is essential. I made sure to take breaks and maintain a healthy lifestyle alongside my rigorous preparation.'
        }
    ];

    return (
        <section className="hear-from-champions" data-aos="fade-up">
            <div className="container">
                <h2 className="section-title">Hear From Champions</h2>

                <div className="champions-scroll-container">
                    <div className="champions-container">
                        {champions.map(champion => (
                            <div className="champion-card" key={champion.id}>
                                <div className="champion-photo-wrapper">
                                    <img
                                        src={champion.photo}
                                        alt={champion.name}
                                        className="champion-photo"
                                        onError={(e) => {
                                            e.target.src = '/images/default-profile.jpg';
                                        }}
                                    />
                                </div>
                                <div className="champion-info">
                                    <h3 className="champion-name">{champion.name}</h3>
                                    <p className="champion-position">{champion.position}</p>
                                    <div className="champion-thoughts">
                                        <p>"{champion.thoughts}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="scroll-indicator">
                        <span>Scroll to see more</span>
                        <div className="scroll-arrow">→</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HearFromChampions;