import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NokiaSnakeModal from '../components/common/NokiaSnakeModal';
import NameAnimationModal from '../components/common/NameAnimationModal';
import BentoInfoModal from '../components/common/BentoInfoModal';
import SignaturePreloader from '../components/common/SignaturePreloader';
import { AnimatePresence } from 'framer-motion';
import './LandingPage.css';
import profileImg from '../assets/image.png';
import bgImg from '../assets/download.jpg';

const MoviePosterUI = () => {
    return (
        <div className="movie-poster-wrapper">
            <div className="movie-vignette"></div>
            <div className="movie-grain"></div>

            {/* Spotlight / Searchlight Effects */}
            <div className="searchlight-container">
                <div className="searchlight beam-1"></div>
                <div className="searchlight beam-2"></div>
            </div>

            <div className="movie-content">
                <div className="movie-top-credits">A DATTA THOTA VISUAL EXPERIENCE</div>

                <div className="movie-main-section">
                    <div className="movie-tagline">IN A WORLD OF PIXELS</div>
                    <motion.div
                        className="movie-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        THE<br />DESIGNER
                    </motion.div>
                </div>

                <div className="movie-billing-block">
                    PRODUCED BY DATTA THOTA • STARRING CREATIVITY • IMAGINATION • VISUALS <br />
                    EDITED BY PASSION • MUSIC BY INSPIRATION • COSTUMES BY STYLE <br />
                    WRITTEN AND DIRECTED BY DATTA THOTA
                </div>

                <div className="movie-footer-action">
                    <div className="movie-rating-badge">🎨 CREATIVE CONTENT</div>
                    <motion.div
                        className="movie-ticket-cta"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 77, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="ticket-edge left"></span>
                        <span className="ticket-text">ENTER GALLERY NOW</span>
                        <span className="ticket-edge right"></span>
                    </motion.div>
                </div>
            </div>

            {/* Dynamic Light Leaks */}
            <div className="light-leaks-container">
                <motion.div
                    className="leak leak-1"
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        x: [-10, 10, -10]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="leak leak-2"
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 45, 0],
                        y: [-20, 20, -20]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>
        </div>
    );
};



const WindowsCMD = () => {

    return (
        <div className="windows-cmd-wrapper">
            <div className="cmd-header">
                <div className="cmd-title">
                    <span className="cmd-icon">🪟</span>
                    Command Prompt
                </div>
                <div className="cmd-controls">
                    <span className="cmd-btn win-min">─</span>
                    <span className="cmd-btn win-max">▢</span>
                    <span className="cmd-btn win-close">✕</span>
                </div>
            </div>
            <div className="cmd-body">
                <div className="cmd-line">
                    <span className="cmd-path">C:\Users\Datta&gt;</span>
                    <span className="cmd-input">open_portfolio.exe</span>
                </div>

                <div className="cmd-cta-container">
                    <div className="cmd-cta-text">CLICK TO VIEW DEVELOPMENT WORKS</div>
                    <div className="cmd-cta-sub">SYSTEM_ID: PORTFOLIO_V2.0.EXE</div>
                </div>

                <div className="cmd-cursor-line">
                    <span className="cmd-path hide-mobile">C:\Users\Datta&gt;</span>
                    <span className="cmd-cursor">█</span>
                </div>
                <div className="cmd-scanline"></div>
            </div>
        </div>
    );
};

const SnakeTeaser = ({ onClick }) => {
    return (
        <div className="snake-teaser" onClick={onClick}>
            <div className="snake-lcd-bg"></div>
            <div className="teaser-content">
                <div className="teaser-label">RETRO SYSTEM</div>
                <div className="teaser-main">
                    <h3 className="teaser-title">SNAKE<br />GAME</h3>
                    <p className="teaser-desc">Classic monochrome simulation. Navigate the grid.</p>
                </div>
                <div className="teaser-footer">
                    <span className="play-btn">START GAME →</span>
                </div>
            </div>
            <div className="teaser-pixels"></div>
        </div>
    );
};



// Retained functionality but moved to modal

const RetroTVQuote = ({ quote }) => {
    if (!quote) return null;

    return (
        <div className="tv-container">
            <div className="tv-chassis">
                <div className="tv-bezel">
                    <div className="tv-screen-area">
                        <div className="tv-crt-screen">
                            <div className="crt-overlay"></div>
                            <div className="crt-scanlines"></div>
                            <div className="crt-content">
                                <motion.div
                                    className="crt-broadcast"
                                    animate={{
                                        opacity: [0.9, 1, 0.9, 1, 0.8, 1],
                                        y: [0, 1, 0, -1, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <p className={`tv-quote-text ${quote.text.length > 70 ? 'long-quote' : ''}`}>“{quote.text}”</p>
                                    <div className="tv-quote-footer">
                                        <span className="tv-author">— {quote.author}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    <div className="tv-controls">
                        <div className="tv-knob"></div>
                        <div className="tv-knob small"></div>
                        <div className="tv-speaker"></div>
                    </div>
                </div>
                <div className="tv-base"></div>
            </div>
        </div>
    );
};



const SignalStrength = () => {
    const [isBoosting, setIsBoosting] = useState(false);

    const handleBoost = () => {
        setIsBoosting(true);
        setTimeout(() => setIsBoosting(false), 2000);
    };

    return (
        <div
            className={`signal-widget ${isBoosting ? 'boosting' : ''}`}
            onClick={handleBoost}
            title="Click to boost signal"
        >
            <div className="signal-bars">
                {[1, 2, 3, 4].map(i => (
                    <motion.div
                        key={i}
                        className="signal-bar"
                        animate={{
                            scaleY: isBoosting ? [1, 1.5, 1] : [1, 0.8, 1],
                            opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                            duration: isBoosting ? 0.3 : 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
            <div className="signal-label">SIGNAL: {isBoosting ? 'MAX' : 'STABLE'}</div>
        </div>
    );
};

const LandingPage = () => {
    const quotes = [
        { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
        { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
        { text: "The details are not the details. They make the design.", author: "Charles Eames" },
        { text: "Digital design is like painting, except the paint never dries.", author: "Neville Brody" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "Everything is designed. Few things are designed well.", author: "Brian Reed" },
        { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
        { text: "Content precedes design. Design in the absence of content is not design, it’s decoration.", author: "Jeffrey Zeldman" },
        { text: "Creativity involves breaking out of established patterns in order to look at things in a different way.", author: "Edward de Bono" }
    ];

    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const [isSnakeOpen, setIsSnakeOpen] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [activeBentoModal, setActiveBentoModal] = useState(null); // 'location', 'image', 'tv', 'utility'
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQuote, setSelectedQuote] = useState(quotes[0]);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setSelectedQuote(randomQuote);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <SignaturePreloader onLoadingComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <motion.div
                className="landing-page"
                data-theme="dark"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    filter: isLoading ? "brightness(0.6) blur(2px)" : "brightness(1) blur(0px)"
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="bento-grid">

                    {/* 1. DESIGN PORTAL (Left Col - Row 1 & 2) */}
                    <Link to="/design" style={{ textDecoration: 'none', display: 'contents' }}>
                        <motion.div
                            className="bento-card card-design"
                            whileHover={{ scale: 0.98 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <MoviePosterUI />

                        </motion.div>
                    </Link>


                    {/* 2. NAME CARD (Center Top - Row 1) */}
                    <motion.div
                        className="bento-card card-name"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsNameModalOpen(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <h1 className="name-big">DATTA<br />THOTA</h1>
                        <div className="role-badge">VISUAL DESIGNER & DEV</div>

                        {/* Subtle Click Hint */}
                        <div className="click-hint">CLICK TO EXPLORE</div>
                    </motion.div>

                    {/* 3. TECH PORTAL (Right Col - Top Row) */}
                    <Link to="/tech" style={{ textDecoration: 'none', display: 'contents' }}>
                        <motion.div
                            className="bento-card card-tech"
                            whileHover={{ scale: 0.98 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <WindowsCMD />
                        </motion.div>


                    </Link>

                    {/* NEW: UNIQUE CARD (Mobile Only Split) */}
                    <motion.div
                        className="bento-card card-unique"
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveBentoModal('tv')}
                        style={{ cursor: 'pointer' }}
                    >
                        <RetroTVQuote quote={selectedQuote} />
                    </motion.div>




                    {/* 4. LOCATION (Left Col - Bottom Row) */}
                    <motion.div
                        className="bento-card card-location"
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveBentoModal('location')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="location-data">
                            <div className="loc-label">CURRENTLY IN</div>
                            <div className="loc-city">VIJAYAWADA</div>
                            <div className="loc-sub">ANDHRA PRADESH, INDIA</div>
                            <div className="loc-icon">🌊</div>
                        </div>
                        <div className="river-container">
                            <div className="wave"></div>
                            <div className="wave"></div>
                        </div>
                    </motion.div>

                    {/* 5. IMAGE CARD (Center - Row 2 & 3 MASSIVE) */}
                    <div className="bento-card card-image editorial-layout">
                        <div className="editorial-bg-text">DESIGN</div>
                        <div className="aesthetic-solid-bg"></div>
                        <div className="editorial-grain"></div>
                        <div className="sun-flare"></div>

                        <img src={profileImg} alt="Profile" className="profile-full" />

                        {/* Editorial Overlays */}
                        <div className="editorial-overlay">
                            <div className="editorial-left-bar">
                                <div className="vertical-tag">CREATIVE PORTFOLIO 2025</div>
                                <div className="bar-separator"></div>
                                <div className="meta-minimal">
                                    <span>ISSUE_01</span>
                                    <span>VOL_2.0</span>
                                </div>
                            </div>

                            <div className="editorial-top-right">
                                <div className="verified-seal">
                                    <div className="seal-circle"></div>
                                    <span className="seal-text">DT_CERTIFIED</span>
                                </div>
                            </div>

                            <div className="editorial-status-hub">
                                <div className="status-header">
                                    <motion.div
                                        className="status-dot-pulse"
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <span className="status-label">SYSTEM_ACTIVE</span>
                                </div>
                                <div className="data-bars">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <motion.div
                                            key={i}
                                            className="data-bar"
                                            animate={{ height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`] }}
                                            transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: "reverse" }}
                                        />
                                    ))}
                                </div>
                                <div className="hub-footer">
                                    <span className="access-tag">ACCESS_GRANTED</span>
                                    <span className="id-code">#DT_98A_VISUAL</span>
                                </div>
                                <div className="corner-scanline"></div>
                            </div>


                            <div className="color-palette-minimal">
                                <span className="p-dot"></span>
                                <span className="p-dot"></span>
                                <span className="p-dot"></span>
                                <span className="p-dot"></span>
                            </div>
                        </div>
                    </div>

                    {/* 6. SNAKE TEASER (Right Col - Middle Row) */}
                    <motion.div
                        className="bento-card card-dino"
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <SnakeTeaser onClick={() => setIsSnakeOpen(true)} />
                    </motion.div>

                    {/* 7. UTILITY STACK (Right Col - Bottom Row) */}
                    <motion.div
                        className="bento-card card-utility"
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveBentoModal('utility')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="utility-row">
                            <div className="status-indicator">
                                <div className="status-dot"></div>
                                <span>WORK</span>
                            </div>
                            <SignalStrength />
                        </div>
                        <div style={{ textAlign: 'right', fontFamily: 'var(--f-tech)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {time}
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Modal Containers - Moved outside filtered container to fix mobile centering */}
            <NokiaSnakeModal
                isOpen={isSnakeOpen}
                onClose={() => setIsSnakeOpen(false)}
            />

            <NameAnimationModal
                isOpen={isNameModalOpen}
                onClose={() => setIsNameModalOpen(false)}
            />

            {/* Info Modals */}
            <BentoInfoModal
                isOpen={!!activeBentoModal}
                type={activeBentoModal}
                tvQuote={selectedQuote}
                onClose={() => setActiveBentoModal(null)}
            />
        </>
    );
};

export default LandingPage;
