import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';
import profileImg from '../assets/image.png';
import bgImg from '../assets/download.jpg';

const TechTerminal = () => {
    const skills = [
        "REACT.JS",
        "NODE.JS",
        "EXPRESS.JS",
        "MONGODB",
        "MYSQL",
        "GIT"
    ];

    const [currentSkill, setCurrentSkill] = useState("");
    const [skillIndex, setSkillIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = skills[skillIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && charIndex < fullText.length) {
                // Typing
                setCurrentSkill(fullText.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                setCurrentSkill(fullText.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === fullText.length) {
                // Determine wait before delete
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && charIndex === 0) {
                // Move to next skill
                setIsDeleting(false);
                setSkillIndex((prev) => (prev + 1) % skills.length);
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, skillIndex, skills]);

    return (
        <div className="tech-terminal-wrapper">
            <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="term-title">bash --v2.0</span>
            </div>
            <div className="portal-cta-tech">CLICK TO SEE WORK ↗</div>
            <div className="terminal-body">
                <div className="line-completed">
                    <span className="cmd-arrow">➜</span>
                    <span className="cmd-path">~/skills</span>
                    <span className="cmd-git">(main)</span>
                </div>
                <div className="line-active">
                    <span className="cmd-arrow">➜</span>
                    <span className="output">installing: <span className="highlight">{charIndex === skills[skillIndex].length && !isDeleting ? currentSkill : currentSkill}<span className="cursor">_</span></span></span>
                </div>
                <div className="scanline"></div>
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

const LandingPage = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="landing-page" data-theme={theme}>
            <div className="bento-grid">

                {/* 1. DESIGN PORTAL (Left Col - Row 1 & 2) */}
                <Link to="/design" style={{ textDecoration: 'none', display: 'contents' }}>
                    <motion.div
                        className="bento-card card-design"
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="design-vertical-text">DESIGN</div>
                        <div className="design-cta">ENTER<br />GALLERY<br />↗</div>
                        <div className="portal-cta-v2">CLICK TO SEE WORK ↗</div>
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
                        <TechTerminal />
                    </motion.div>
                </Link>

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
                        <div className="toggle-btn-mini" onClick={toggleTheme}>
                            {theme === 'light' ? '☀' : '☾'}
                        </div>
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
