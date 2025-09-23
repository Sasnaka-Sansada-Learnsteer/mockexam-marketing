import React, {useEffect, useState} from "react";
import "./App.css";

import { Analytics } from "@vercel/analytics/react";

import ExamInfo from "./components/ExamInfo";
import HeroSection from "./components/HeroSection";
import ExamTimetable from "./components/ExamTimetable";
import Stats from "./components/Stats";
// import PopupNotification from "./components/PopupNotification";
import NavBar from "./components/NavBar";
import CountdownRegister from "./components/CountdownRegister";
import RemainingSeats from "./components/RemainingSeats";
import Footer from "./components/Footer";
import ExamCenter from "./components/ExamCenter";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MyExamInfoEntry from "./components/MyExamInfoEntry";
import PopupCard from "./components/PopupCard";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './mysme_admin/Login';
import AdminDashboard from "./mysme_admin/AdminDashboard";
import AdminLogin from "./mysme_admin/AdminLogin";
import PrivateRoute from './mysme_admin/PrivateRoute';
import QRScannerDashboard from './mysme_admin/QRScannerDashboard';
import ProjectDashboard from "./mysme_admin/ProjectDashboard";
import CandidateLogin from "./mysme_candidate/CandidateLogin";
import CandidateProfile from "./mysme_candidate/CandidateProfile";

// Create a component for the main marketing site
function MarketingSite() {
    return (
        <div className="App">
            <PopupCard />
            <header className="app-header">
                <NavBar />
            </header>

            <main>
                <Analytics />
                <section id="herosection">
                    <HeroSection />
                </section>
                <section id="myexaminfo">
                    <MyExamInfoEntry />
                </section>
                <section id="examinfo">
                    <ExamInfo />
                </section>
                <section id="stats">
                    <Stats />
                </section>
                <section id="examtimetable">
                    <ExamTimetable />
                </section>
                <section id="examcenter">
                    <ExamCenter />
                </section>
                {/*<section id="remainingseats">
         <RemainingSeats />
       </section>*/}


                <section id="countdown-register">
                    <CountdownRegister />
                </section>
            </main>

            {/*<PopupNotification />*/}
            <Footer />

            <FloatingWhatsApp phoneNumber="94703445342" />
        </div>
    );
}

function App() {
    const [token, setToken] = useState(null);

    // Check for stored token on app load
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* Main marketing site route */}
                    <Route path="/" element={<MarketingSite />} />

                    {/* Candidate Routes */}
                    <Route path="/mysme/login" element={<CandidateLogin />} />
                    <Route path="/mysme/profile" element={<CandidateProfile />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                    />
                    <Route path="/admin/qr-scanner-dashboard" element={
                        <PrivateRoute>
                            <QRScannerDashboard/>
                        </PrivateRoute>
                    }
                    />


                    {/*Admin redirect */}
                    <Route path="/admin" element={<Navigate to="/admin/login" />} />
                    <Route path="/mysme/dashboard/overview" element={
                        <PrivateRoute >
                            <ProjectDashboard />
                        </PrivateRoute>
                    } />


                </Routes>
            </div>
        </Router>
    );
}

export default App;
