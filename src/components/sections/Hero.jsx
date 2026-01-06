import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section flat-poster-hero">
            <div className="hero-container">
                <motion.div
                    className="poster-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Top Credits */}
                    <div className="poster-production-credit">
                        A VISUAL DESIGN PRODUCTION BY DATTA THOTA
                    </div>

                    {/* Main 2D Title */}
                    <div className="poster-title-block">
                        <h1 className="poster-main-title">
                            <span className="name-top">DATTA</span>
                            <span className="name-bottom">THOTA</span>
                        </h1>
                    </div>

                    {/* Flat Tagline */}
                    <p className="poster-statement">
                        CRAFTING VISUAL STORIES THAT STRIKE INSTANTLY
                    </p>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
