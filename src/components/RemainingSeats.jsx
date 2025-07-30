import React, { useEffect, useState } from "react";
import "./RemainingSeats.css";
import config from "../config/api";
import { useTranslation } from "react-i18next";

const RemainingSeats = () => {
  const { t } = useTranslation();
  const [centerData, setCenterData] = useState({
    Colombo: 0,
    Galle: 0,
    Kandy: 0,
  });
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [loading, setLoading] = useState(true);

  const TOTAL_SEATS = 1200;
  const SEATS_PER_CENTER = 400;
  const centers = [
    {
      id: "Colombo",
    },
    {
      id: "Galle",
    },
    {
      id: "Kandy",
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(config.endpoints.liveCount);
      const data = await res.json();

      if (data.centers) {
        setCenterData(data.centers);
      }

      if (data.total !== undefined) {
        setTotalRegistered(data.total);
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
    return Math.max(0, SEATS_PER_CENTER - booked);
  };

  const getPercentage = (remaining) => {
    return (remaining / SEATS_PER_CENTER) * 100;
  };

  return (
      <section className="remaining-seats" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">{t("remainingSeats.title")}</h2>

          {loading ? (
              <div className="loading">{t("remainingSeats.loading")}</div>
          ) : (
              <div className="seats-container">
                {centers.map((center) => {
                  const remainingSeats = calculateRemainingSeats(center.id);
                  const percentage = getPercentage(remainingSeats);

                  return (
                      <div className="seat-card" key={center.id}>
                        <h3 className="center-name">
                          {t(`remainingSeats.centers.${center.id.toLowerCase()}.name`)}
                        </h3>

                        <div className="seat-info">
                          <div className="seats-number">{remainingSeats}</div>
                          <div className="seats-label">
                            {t("remainingSeats.seatsRemaining")}
                          </div>
                        </div>
                        <div className="progress-container">
                          <div
                              className="progress-bar"
                              style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="capacity-label">
                          {remainingSeats === 0 ? (
                              <span className="full">{t("remainingSeats.fullyBooked")}</span>
                          ) : (
                              <span>
                        {t("remainingSeats.almostAvailable", {
                          percentage: percentage.toFixed(0),
                        })}
                      </span>
                          )}
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </div>
      </section>
  );
};

export default RemainingSeats;