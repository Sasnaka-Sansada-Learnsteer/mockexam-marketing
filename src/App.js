import React from "react";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";

import CountdownTimer from "./components/CountdownTimer";
import ExamInfo from "./components/ExamInfo";
import HeroSection from "./components/HeroSection";
import ExamTimetable from "./components/ExamTimetable";
import RegisterNow from "./components/RegisterNow";
import Sponsors from "./components/Sponsors";
import Stats from "./components/Stats";
import LiveCount from "./components/LiveCount";
import PopupNotification from "./components/PopupNotification";
import NavBar from "./components/NavBar";
import CountdownRegister from "./components/CountdownRegister";
import RemainingSeats from "./components/RemainingSeats";
import Footer from "./components/Footer";
import HearFromChampions from "./components/HearFromChampions";
import ExamCenter from "./components/ExamCenter";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <NavBar />
      </header>

      <main>
        <Analytics />

        <section id="herosection">
          <HeroSection />
        </section>
        <section id="examinfo">
          <ExamInfo />
        </section>
        <section id="stats">
          <Stats />
        </section>
        {/*<section id="hearfromchampions"><HearFromChampions /></section>*/}
        {/*<section id="countdowntimer"><CountdownTimer deadline="2025-07-31T23:59:59" /></section>*/}
        <section id="examtimetable">
          <ExamTimetable />
        </section>
        <section id="examcenter">
          <ExamCenter />
        </section>
        {/*<section id="registernow"><RegisterNow /></section>*/}
        {/*<section id="sponsors"><Sponsors /></section>*/}
        <section id="remainingseats">
          <RemainingSeats />
        </section>
        {/*<section id="livecount"><LiveCount /></section>*/}
          <section id="countdown-register">
          <CountdownRegister />
        </section>
      </main>

      <PopupNotification />
      <Footer />

      <FloatingWhatsApp phoneNumber="94774620867" />
    </div>
  );
}

export default App;
