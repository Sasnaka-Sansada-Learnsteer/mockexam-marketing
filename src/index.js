import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'aos/dist/aos.css';
import AOS from 'aos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

AOS.init();
