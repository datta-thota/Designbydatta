import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <section className="about-section">
            <div className="about-container container">

                {/* Header (Matches Portfolio) */}
                <div className="section-header-block">
                    <div className="header-content">
                        <h2 className="section-title">Profile</h2>
                        <span className="section-count">(01)</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="about-archive">

                    {/* Bio Block */}
                    <motion.div
                        className="bio-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="bio-text">
                            My name is Datta Thota. I create digital experiences that breathe, move, and connect.
                            Building at the intersection of visual storytelling, design, and technology.
                            Design should stay with you long after the screen fades.
                        </p>
                        <div className="skills-text">
                            <span className="label">CORE CAPABILITIES:</span>
                            Brand Identity / Packaging / Poster Design / Merchandise / UI/UX / Typography / Art Direction
                        </div>
                        <a href="/Purushothama Datta.pdf" download className="resume-link">Download Resume ↗</a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
