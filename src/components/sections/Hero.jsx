import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section movie-poster-hero">
            {/* Film Grain Overlay */}
            <div className="film-grain"></div>

            {/* Vignette Effect */}
            <div className="vignette"></div>

            {/* Spotlight Effects */}
            <div className="spotlight spotlight-left"></div>
            <div className="spotlight spotlight-right"></div>

            <div className="hero-container">
                <motion.div
                    className="poster-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Top Credits */}
                    <motion.div
                        className="poster-credits-top"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <span>A VISUAL STORYTELLER PRODUCTION</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="poster-title"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="title-line-1">DATTA</span>
                        <span className="title-line-2">THOTA</span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        className="poster-tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        CRAFTING VISUAL STORIES THAT STRIKE INSTANTLY
                    </motion.p>

                    {/* Bottom Credits */}
                    <motion.div
                        className="poster-credits-bottom"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <div className="credit-line">
                            <span className="credit-label">STARRING</span>
                            <span className="credit-value">GRAPHIC DESIGN · MOTION · BRANDING</span>
                        </div>
                        <div className="credit-line">
                            <span className="credit-label">DIRECTED BY</span>
                            <span className="credit-value">CREATIVE VISION</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Theatrical Border */}
            <div className="theatrical-border"></div>
        </section>
    );
};

export default Hero;
