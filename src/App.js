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
function MarketingSite({isDarkMode}) {
    return (
        <div className="App">
            {/*<PopupCard />*/}
            <header>
                <NavBar isDarkMode={isDarkMode} />
            </header>

            <main>
                <Analytics />
                <section id="herosection">
                    <HeroSection />
                </section>
                <section id="myexaminfo">
                    <MyExamInfoEntry />
                </section>
                <section id="countdown-register">
                    <CountdownRegister />
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
            </main>

            {/*<PopupNotification />*/}
            <Footer />

            <FloatingWhatsApp phoneNumber="94703445342" />
        </div>
    );
    
}

function App() {
    const [token, setToken] = useState(null);
    // 1. Add state for Dark Mode – persisted in localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            return localStorage.getItem('theme') === 'dark';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // 2. Function to toggle the state and persist preference
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const next = !prev;
            try {
                localStorage.setItem('theme', next ? 'dark' : 'light');
                // Keep the <html> class in sync (used by the pre-paint script)
                if (next) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
            } catch {}
            return next;
        });
    };

    return (
        <Router>
            {/* 3. Apply the class conditionally based on state */}
            <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
                
                {/* 4. The Toggle Button */}
                <button 
                    onClick={toggleDarkMode} 
                    style={{ 
                        position: 'fixed', 
                        bottom: '30px', 
                        left: '30px', 
                        zIndex: 9999,
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: 'var(--shadow-lg)',
                        background: 'var(--card-bg)',
                        color: 'var(--text-color)',
                        backdropFilter: 'var(--glass-blur)',
                        WebkitBackdropFilter: 'var(--glass-blur)'
                    }}
                    className="dark-mode-toggle"
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? '🔆' : '🌙'}
                </button>

                <Routes>
                    {/* Main marketing site route */}
                    <Route path="/" element={<MarketingSite isDarkMode={isDarkMode} />} />

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
                    
                    {/* Project Dashboard */}
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
