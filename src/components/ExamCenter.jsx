import React from "react";
import "./ExamCenter.css";

const ExamCenter = () => {
  const examCenter = [
    {
      province: "Colombo Center 1",
      venue: "SLIIT Malabe",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985117158014!2d79.9729445!3d6.9146775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1780337141866!5m2!1sen!2slk",
      directionsUrl:
        "https://www.google.com/maps/dir//Sri+Lanka+Institute+of+Information+Technology,+SLIIT+Malabe+Campus,+New+Kandy+Rd,+Malabe+10115/@6.8540837,79.9240067,13z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3ae256db1a6771c5:0x2c63e344ab9a7536!2m2!1d79.9729445!2d6.9146775?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      province: "Colombo Center 2",
      venue: "SLIIT Metro Campus",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.815187450974!2d79.8506793!3d6.9126881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596aaa8742d9%3A0xced655398fd4d621!2sSLIIT%20Metropolitan%20Campus!5e0!3m2!1sen!2slk!4v1780406706566!5m2!1sen!2slk",
      directionsUrl:
        "https://www.google.com/maps/dir//SLIIT+Metropolitan+Campus,+SLIIT+Metropolitan+Campus+16th+Floor,+BOC+Merchant+Tower,+28+St+Michaels+Rd,+Colombo+00300/@6.8496035,79.8031937,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ae2596aaa8742d9:0xced655398fd4d621!2m2!1d79.8506793!2d6.9126881?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      province: "Kalutara Center",
      venue: "Sri Sumangala Balika Maha Vidyalaya",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4788.08032165418!2d79.9097425!3d6.7026115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24624d4a813fd%3A0xb36b4d27ccccc07d!2sSri%20Sumangala%20Balika%20Maha%20Vidyalaya!5e1!3m2!1sen!2slk!4v1780356765650!5m2!1sen!2slk",
      directionsUrl: "https://www.google.com/maps/dir//Sri+Sumangala+Balika+Maha+Vidyalaya,+A2,+Panadura/@6.7026115,79.9097425,1100m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3ae24624d4a813fd:0xb36b4d27ccccc07d!2sSri+Sumangala+Balika+Maha+Vidyalaya!8m2!3d6.7026115!4d79.9097425!16s%2Fg%2F1tlczlw7!4m7!1m0!1m5!1m1!1s0x3ae24624d4a813fd:0xb36b4d27ccccc07d!2m2!1d79.909735!2d6.7026452!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      province: "Matara Center",
      venue: "SLIIT Matara",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15636.907977991637!2d80.54818355188377!3d5.942399038612131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d4871611eb%3A0xb61d2dbf9146d81!2sSLIIT%20Matara%20Center!5e0!3m2!1sen!2slk!4v1780337813453!5m2!1sen!2slk",
      directionsUrl: "https://www.google.com/maps/dir//SLIIT+Matara+Center,+EH+Cooray+Building,+No.24:+5th+Floor,+E.H.Cooray+Tower,+B535,+Matara/@5.9491765,80.5464577,860m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3ae138d4871611eb:0xb61d2dbf9146d81!2sSLIIT+Matara+Center!8m2!3d5.9491765!4d80.5464577!16s%2Fg%2F113hzrbd0!4m7!1m0!1m5!1m1!1s0x3ae138d4871611eb:0xb61d2dbf9146d81!2m2!1d80.5464577!2d5.9491765!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      province: "Kandy Center",
      venue: "SLIIT Peradeniya",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6948422851297!2d80.6127217!3d7.275522199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368bfd631eeb9%3A0x881fd608acc078bb!2sSLIIT%20Kandy%20Center!5e0!3m2!1sen!2slk!4v1780336991882!5m2!1sen!2slk",
      directionsUrl: "https://www.google.com/maps/dir//SLIIT+Kandy+Center,+670%2F1%2F1A+Peradeniya+Rd,+Peradeniya+20000/@7.2755222,80.6127217,858m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3ae368bfd631eeb9:0x881fd608acc078bb!2sSLIIT+Kandy+Center!8m2!3d7.2755222!4d80.6127217!16s%2Fg%2F11bwyh4pqw!4m7!1m0!1m5!1m1!1s0x3ae368bfd631eeb9:0x881fd608acc078bb!2m2!1d80.6127217!2d7.2755222!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      province: "Ampara Center",
      venue: "D.S Senanayaka College, Ampara",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.446687613651!2d81.67192059999999!3d7.303607899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae519c71d83cf15%3A0xf98995dcbc660552!2z4LaRIOC3g-C3iiDgt4Pgt5rgtrHgt4_gtrHgt4_gtrrgtpog4Lai4LeP4Lat4LeS4LaaIOC2tOC3j-C3g-C2vSwg4LaF4La44LeK4La04LeP4La7!5e0!3m2!1sen!2slk!4v1780336815631!5m2!1sen!2slk",
      directionsUrl: "https://www.google.com/maps/dir//%E0%B6%91+%E0%B7%83%E0%B7%8A+%E0%B7%83%E0%B7%9A%E0%B6%B1%E0%B7%8F%E0%B6%B1%E0%B7%8F%E0%B6%BA%E0%B6%9A+%E0%B6%A2%E0%B7%8F%E0%B6%AD%E0%B7%92%E0%B6%9A+%E0%B6%B4%E0%B7%8F%E0%B7%83%E0%B6%BD,+%E0%B6%85%E0%B6%B8%E0%B7%8A%E0%B6%B4%E0%B7%8F%E0%B6%BB,+D.S.Senanayaka+National+School,+Dharmapala+Mawatha,+Ampara/@7.3036079,81.6719206,858m/data=!3m1!1e3!4m16!1m7!3m6!1s0x3ae519c71d83cf15:0xf98995dcbc660552!2z4LaRIOC3g-C3iiDgt4Pgt5rgtrHgt4_gtrHgt4_gtrrgtpog4Lai4LeP4Lat4LeS4LaaIOC2tOC3j-C3g-C2vSwg4LaF4La44LeK4La04LeP4La7!8m2!3d7.3036079!4d81.6719206!16s%2Fg%2F11ckkxrkxx!4m7!1m0!1m5!1m1!1s0x3ae519c71d83cf15:0xf98995dcbc660552!2m2!1d81.6719205!2d7.303608!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
    },

  ];

  return (
    <section className="hear-from-successors" data-aos="fade-up" data-aos-once="false">


      <div className="container" style={{ marginTop: '5rem' }}>
        <h2 className="stats-title">Exam Centers</h2>
      </div>

      {/* ====================================================
          EXAM CENTERS CARD
          To HIDE: wrap the block below in JSX comment braces
          i.e.  {/*  ...card JSX...  * /}
          To SHOW: remove the comment wrapper
          ==================================================== */}
      <div className="exam-centers-card" data-aos="fade-up">

        <div className="exam-centers-body">
          <div className="provincetable-row">
            {examCenter.map((exam, index) => (
              <div
                className="province-card"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="province-card-header">
                  <h3>{exam.province}</h3>
                </div>
                <div className="province-card-body">
                  <div className="province-detail">
                    <span className="detail-label">Venue:</span>
                    <span className="detail-value">{exam.venue}</span>
                  </div>

                  <div className="map-area">
                    <div className="map-frame">
                      <iframe
                        src={exam.mapUrl}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${exam.venue}`}
                      ></iframe>
                    </div>

                    <a
                      href={exam.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="direction-button"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* END EXAM CENTERS CARD */}

    </section>
  );
};

export default ExamCenter;
