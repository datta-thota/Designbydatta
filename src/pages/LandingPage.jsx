import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './LandingPage.css';

const LandingPage = () => {
    const [activeMode, setActiveMode] = useState(null); // 'design' | 'tech' | null
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`landing-page ${activeMode ? `active-mode-${activeMode}` : ''}`}>
            {/* Aura Vibes */}
            <div className="aura-blob blob-1"></div>
            <div className="aura-blob blob-2"></div>

            {/* Gen Z Image Stickers - Scattered Background */}


            {/* Intro Text Box */}
            <motion.div
                className="intro-box"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="intro-text">
                    I AM <span className="intro-highlight">DATTA THOTA</span> - PICK YOUR PATH: <span className="intro-highlight">DESIGN</span> OR <span className="intro-highlight">TECH</span>
                </div>

            </motion.div>

            <motion.div
                className="identity-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Minimal brand text below intro */}
                <div className="main-name">Datta Thota</div>
            </motion.div>

            <motion.div
                className="choice-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {/* DESIGN BUTTON - Lowercase Aesthetic */}
                <Link
                    to="/design"
                    className="choice-link design-link"
                    onMouseEnter={() => setActiveMode('design')}
                    onMouseLeave={() => setActiveMode(null)}
                >
                    <div className="choice-btn design-btn">
                        <span className="choice-title">design.</span>
                    </div>
                </Link>

                {/* TECH BUTTON - Brutal Uppercase */}
                <Link
                    to="/tech"
                    className="choice-link tech-link"
                    onMouseEnter={() => setActiveMode('tech')}
                    onMouseLeave={() => setActiveMode(null)}
                >
                    <div className="choice-btn tech-btn">
                        <span className="choice-title">TECH</span>
                    </div>
                </Link>
            </motion.div>
        </div>
    );
};

export default LandingPage;
