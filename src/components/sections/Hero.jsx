import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="hero-section full-screen flex-center">
            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <motion.h1
                        className="hero-title"
                        style={{ y: y1 }}
                    >
                        DATTA THOTA
                    </motion.h1>

                    <motion.div
                        className="hero-subtitle-wrapper"
                        style={{ y: y2 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <p className="hero-subtitle text-thin">
                            Graphic Designer crafting visual stories that strike instantly.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <span>Scroll</span>
                </motion.div>
            </div>

            <div className="hero-background">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
            </div>
        </section>
    );
};

export default Hero;
