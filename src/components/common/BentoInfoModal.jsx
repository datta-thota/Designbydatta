import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BentoInfoModal.css';

const BentoInfoModal = ({ isOpen, onClose, type, tvQuote }) => {
    if (!isOpen) return null;

    const renderContent = () => {
        switch (type) {
            case 'location':
                return (
                    <div className="bento-modal-content location-theme">
                        <div className="modal-header">
                            <span className="modal-tag">STATION: 16.5062° N, 80.6480° E</span>
                            <h2>VIJAYAWADA</h2>
                        </div>
                        <div className="location-list">
                            <div className="loc-item">
                                <span className="loc-bullet">01</span>
                                <div className="loc-info">
                                    <h3>Kanakadurga Temple</h3>
                                    <p>Spiritual heart of the city, perched on Indrakeeladri.</p>
                                </div>
                            </div>
                            <div className="loc-item">
                                <span className="loc-bullet">02</span>
                                <div className="loc-info">
                                    <h3>Prakasam Barrage</h3>
                                    <p>Night views of the Krishna river are unrivaled.</p>
                                </div>
                            </div>
                            <div className="loc-item">
                                <span className="loc-bullet">03</span>
                                <div className="loc-info">
                                    <h3>Street Food</h3>
                                    <p>Legendary spicy Andhra flavors at every corner.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'image':
                return (
                    <div className="bento-modal-content image-theme">
                        <div className="modal-header">
                            <span className="modal-tag">BEHIND THE PIXELS</span>
                            <h2>THE CREATOR</h2>
                        </div>
                        <div className="profile-details">
                            <div className="detail-stat">
                                <span className="stat-label">FOCUS</span>
                                <span className="stat-value">Design Systems & Cinema-Vibes</span>
                            </div>
                            <div className="detail-stat">
                                <span className="stat-label">TOOLS</span>
                                <span className="stat-value">Figma, After Effects, React</span>
                            </div>
                            <div className="bio-text">
                                <p>Blending technical precision with cinematic emotion to create interfaces that don't just work, but feel alive.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'tv':
                return (
                    <div className="tv-modal-immersive">
                        <div className="tv-antenna">
                            <div className="antenna-rod left"></div>
                            <div className="antenna-rod right"></div>
                        </div>
                        <div className="tv-chassis-large">
                            <div className="tv-bezel-large">
                                <div className="tv-screen-area-large">
                                    <div className="crt-glow"></div>
                                    <div className="crt-scanlines-large"></div>
                                    <div className="crt-noise"></div>
                                    <div className="tv-crt-screen-large">
                                        <div className="crt-content-large">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="quote-content"
                                            >
                                                <p className="main-quote-large">“{tvQuote?.text || "Creativity involves breaking out of established patterns in order to look at things in a different way."}”</p>
                                                <span className="quote-author-large">— {tvQuote?.author || "Edward de Bono"}</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tv-controls-large">
                                    <div className="knob-group">
                                        <div className="tv-knob-large v-tuning">
                                            <div className="knob-marker"></div>
                                        </div>
                                        <span className="knob-label">TUNE</span>
                                    </div>
                                    <div className="knob-group">
                                        <div className="tv-knob-large volume">
                                            <div className="knob-marker"></div>
                                        </div>
                                        <span className="knob-label">VOL</span>
                                    </div>
                                    <div className="tv-speaker-grill">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="speaker-slot"></div>
                                        ))}
                                    </div>
                                    <div className="power-indicator">
                                        <div className="power-led"></div>
                                        <span>POWER</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tv-base-large"></div>
                    </div>
                );
            case 'utility':
                return (
                    <div className="bento-modal-content utility-theme">
                        <div className="modal-header">
                            <span className="modal-tag">SYSTEM_LOG_V2.0</span>
                            <h2>KERNEL STATUS</h2>
                        </div>
                        <div className="system-logs">
                            <div className="log-line">&gt; BOOTING CREATIVE_OS... [OK]</div>
                            <div className="log-line">&gt; SCANNING FOR INSPIRATION... [DONE]</div>
                            <div className="log-line">&gt; COFFEE_RESERVE: 24% [LOW]</div>
                            <div className="log-line">&gt; PIXELS_PUSHED: 1,420,069</div>
                            <div className="log-line">&gt; UPTIME: {Math.floor(Math.random() * 1000)} HOURS</div>
                            <div className="log-line blink">&gt; STANDING BY FOR INPUT_</div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="bento-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className={`bento-modal-container ${type}-modal`}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                    {renderContent()}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BentoInfoModal;
