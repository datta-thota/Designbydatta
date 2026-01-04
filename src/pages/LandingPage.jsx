import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
                    <span className="cmd-path">C:\Users\Datta&gt;</span>
                    <span className="cmd-cursor">█</span>
                </div>
                <div className="cmd-scanline"></div>
            </div>
        </div>
    );
};



const HighLowGame = () => {
    const [currentNum, setCurrentNum] = useState(generateNum());
    const [nextNum, setNextNum] = useState(null); // Revealed after guess
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [message, setMessage] = useState('HIGHER or LOWER?');
    const [gameState, setGameState] = useState('PLAYING'); // PLAYING, RESULT
    const [hint, setHint] = useState(null);

    function generateNum() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Generate accurate probability hint
    const getHint = () => {
        const higherChance = 100 - currentNum;
        const lowerChance = currentNum - 1;

        if (higherChance > lowerChance) {
            return `Safe Bet: HIGHER (${higherChance}%)`;
        } else if (lowerChance > higherChance) {
            return `Safe Bet: LOWER (${lowerChance}%)`;
        } else {
            return `Risky! It's a 50/50 split.`;
        }
    };

    // Effect to update hint when currentNum changes and game is playing
    useEffect(() => {
        if (gameState === 'PLAYING') {
            setHint(getHint());
        }
    }, [currentNum, gameState]);

    const handleGuess = (guess) => {
        if (gameState === 'RESULT') return;

        setHint(null); // Clear hint on guess

        const newNum = generateNum();

        // Ensure not same number (rare edge case)
        if (newNum === currentNum) {
            handleGuess(guess); // Retry
            return;
        }

        setNextNum(newNum);
        setGameState('RESULT');

        const isHigher = newNum > currentNum;
        const isCorrect = (guess === 'HIGH' && isHigher) || (guess === 'LOW' && !isHigher);

        if (isCorrect) {
            const newScore = score + 1;
            setScore(newScore);
            if (newScore > highScore) setHighScore(newScore);
            setMessage('CORRECT!');

            // Auto continue after short delay
            setTimeout(() => {
                setCurrentNum(newNum);
                setNextNum(null);
                setGameState('PLAYING');
                setMessage('HIGHER or LOWER?');
            }, 1000);
        } else {
            setMessage('GAME OVER!');
            // Reset delay
            setTimeout(() => {
                setScore(0);
                setCurrentNum(generateNum());
                setNextNum(null);
                setGameState('PLAYING');
                setMessage('TRY AGAIN');
            }, 2000);
        }
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <span style={{ color: '#888' }}>DATA PREDICTOR</span>
                <span className="game-score">STREAK: {score} <span style={{ opacity: 0.5 }}>(Best: {highScore})</span></span>
            </div>

            <div className="game-display">
                <div className="num-box current">
                    {currentNum}
                </div>
                <div className="arrow-indicator">
                    {gameState === 'RESULT' ? (nextNum > currentNum ? '▲' : '▼') : '→'}
                </div>
                <div className={`num-box next ${gameState === 'RESULT' ? (message === 'CORRECT!' ? 'win' : 'lose') : ''}`}>
                    {gameState === 'RESULT' ? nextNum : '?'}
                </div>
            </div>

            <div className="game-status">
                {gameState === 'PLAYING' && (hint ? <span className="hint-text">{hint}</span> : <span className="hint-btn" onClick={() => setHint(getHint())}>💡 NEED HINT?</span>)}
                {gameState === 'RESULT' && message}
            </div>

            <div className="game-controls">
                <button
                    className="game-btn btn-high"
                    onClick={() => handleGuess('HIGH')}
                    disabled={gameState === 'RESULT'}
                >
                    ▲ HIGHER
                </button>
                <button
                    className="game-btn btn-low"
                    onClick={() => handleGuess('LOW')}
                    disabled={gameState === 'RESULT'}
                >
                    ▼ LOWER
                </button>
            </div>
        </div>
    );
};

const CinematicViewfinder = () => {
    const [timecode, setTimecode] = useState("00:00:00:00");

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - start;
            const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');
            const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
            const m = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
            const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
            setTimecode(`${h}:${m}:${s}:${ms}`);
        }, 33); // ~30fps for timecode
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="viewfinder-wrapper">
            <div className="viewfinder-overlay">
                <div className="viewfinder-top">
                    <div className="rec-group">
                        <motion.div
                            className="rec-dot"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        ></motion.div>
                        <span>REC</span>
                    </div>
                    <div className="viewfinder-mode">4K 24fps</div>
                </div>

                <div className="viewfinder-center">
                    <div className="focus-brackets">
                        <div className="bracket tl"></div>
                        <div className="bracket tr"></div>
                        <div className="bracket bl"></div>
                        <div className="bracket br"></div>
                        <div className="crosshair"></div>
                    </div>
                </div>

                <div className="viewfinder-bottom">
                    <div className="viewfinder-timecode">{timecode}</div>
                    <div className="viewfinder-status">
                        <div className="battery-box">
                            <motion.div
                                className="battery-level"
                                animate={{ width: ["88%", "85%", "88%"] }}
                                transition={{ duration: 20, repeat: Infinity }}
                            />
                        </div>
                        <span>88%</span>
                    </div>
                </div>
            </div>
            <div className="viewfinder-grain"></div>
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
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="landing-page" data-theme="dark">
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
                >
                    <h1 className="name-big">DATTA<br />THOTA</h1>
                    <div className="role-badge">VISUAL DESIGNER & DEV</div>
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
                <div className="bento-card card-unique">
                    <CinematicViewfinder />
                </div>


                {/* 4. LOCATION (Left Col - Bottom Row) */}
                {/* 4. LOCATION (Left Col - Bottom Row) */}
                <div className="bento-card card-location">
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
                </div>

                {/* 5. IMAGE CARD (Center - Row 2 & 3 MASSIVE) */}
                <div className="bento-card card-image">
                    <img src={bgImg} alt="Background" className="profile-bg" />
                    <img src={profileImg} alt="Profile" className="profile-full" />
                </div>

                {/* 6. HIGH-LOW GAME (Right Col - Middle Row) */}
                <div className="bento-card card-dino">
                    <HighLowGame />
                </div>

                {/* 7. UTILITY STACK (Right Col - Bottom Row) */}
                <div className="bento-card card-utility">
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
                </div>

            </div>
        </div>
    );
};

export default LandingPage;
