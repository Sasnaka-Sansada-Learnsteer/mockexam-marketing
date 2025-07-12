import React from 'react';
import './Sponsors.css';

const Sponsors = () => {
  const sponsors = [
    { name: 'APIIT', logo: '/assets/APIIT-Logo.png' },
    { name: 'Sponsor 1', logo: '/images/sponsor1.png' },
  ];

  return (
    <section className="sponsors-section">
      <div className="container">
        <h2>Proud Sponsors</h2>
        <p className="sponsors-intro">Thanks to these amazing organizations for supporting our examination program</p>
        <div className="sponsors-grid">
          {sponsors.map((sponsor, index) => (
            <div className="sponsor-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="sponsor-logo">
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
              </div>
              <div className="sponsor-name">{sponsor.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;