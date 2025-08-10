import React, { useEffect, useState } from "react";
import "./RemainingSeats.css";
import config from "../config/api";

const RemainingSeats = () => {
  const [centerData, setCenterData] = useState({
    Colombo: 0,
    Galle: 0,
    Kandy: 0,
  });
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [loading, setLoading] = useState(true);

  const TOTAL_SEATS = 1200;
  const SEATS_CONFIG = {
    Colombo: 400,
    Galle: 400,
    Kandy: 400,
  };
  const centers = [
    {
      id: "Colombo",
      name: "Colombo Center",
      location: "(Venue will be announced soon)",
    },
    {
      id: "Galle",
      name: "Galle Center",
      location: "(Venue will be announced soon)",
    },
    {
      id: "Kandy",
      name: "Kandy Center",
      location: "(Venue will be announced soon)",
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(config.endpoints.liveCount);
      const data = await res.json();

      if (data.counts && data.counts.centers) {
        setCenterData(data.counts.centers);
      }

      if (data.counts && data.counts.total !== undefined) {
        setTotalRegistered(data.counts.total);
      }
    } catch (err) {
      console.error("Failed to fetch registration count", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(
      fetchData,
      config.refreshIntervals.remainingseats
    );
    return () => clearInterval(interval);
  }, []);

  // Calculate remaining seats
  const calculateRemainingSeats = (center) => {
    const booked = centerData[center] || 0;
    const total = SEATS_CONFIG[center] || 400;
    return Math.max(0, total - booked);
  };

  const getPercentage = (remaining, center) => {
    const total = SEATS_CONFIG[center] || 400;
    return (remaining / total) * 100;
  };


  return (
    <section className="remaining-seats" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title-seats">Remaining Seats</h2>
        <h3 className="section-subtitle">( Seat counts are based on the real-time registrations.
          Subject to change after verification of the candidates )</h3>

        {loading ? (
          <div className="loading">Loading seat availability...</div>
        ) : (
          <div className="seats-container">
            {centers.map((center) => {
              const remainingSeats = calculateRemainingSeats(center.id);
              const percentage = getPercentage(remainingSeats, center.id);

              return (
                <div className="seat-card" key={center.id}>
                  <h3 className="center-name">{center.name}</h3>
                  {/*<p className="center-location">{center.location}</p>*/}
                  <div className="seat-info">
                    <div className="seats-number">{remainingSeats}</div>
                    <div className="seats-label">seats remaining</div>
                  </div>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="capacity-label">
                    {remainingSeats === 0 ? (
                      <span className="full">Fully Booked</span>
                    ) : (
                      <span>Almost {percentage.toFixed(0)}% available</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/*<div className="total-seats">*/}
        {/*    <p>Total Remaining Seats: <strong>{TOTAL_SEATS - totalRegistered}</strong> out of {TOTAL_SEATS}</p>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default RemainingSeats;
