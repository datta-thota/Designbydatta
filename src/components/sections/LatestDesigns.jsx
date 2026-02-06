import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { latestDesigns } from '../../data/latestDesigns';
import './LatestDesigns.css';

import { useRef, useState, useEffect } from 'react';

const LatestDesigns = () => {
    const containerRef = useRef(null);
    const percentageRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const scaleWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (el.scrollLeft > 20) setHasScrolled(true);
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    useMotionValueEvent(scrollXProgress, "change", (latest) => {
        if (percentageRef.current) {
            percentageRef.current.textContent = `${Math.round(latest * 100)}%`;
        }
    });

    return (
        <section className="latest-designs-section">
            <div className="portfolio-header container" style={{ marginBottom: '2rem' }}>
                <div className="header-main">
                    <h2 className="section-title">Latest Explorations</h2>
                    <span className="project-count">/{latestDesigns.length}</span>
                </div>
            </div>

            <div className="designs-carousel-wrapper">
                <div className="designs-carousel-stage" ref={containerRef}>
                    <div className="designs-scroll-track">
                        {[...latestDesigns].reverse().map((design, index) => (
                            <div key={design.id} className="design-stage-item">
                                <Link to={`/design/${design.slug || design.id}`} className="design-stage-link">
                                    <motion.div
                                        className="design-stage-card"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-5%" }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="design-stage-image-container">
                                            <img src={design.image} alt={design.title} loading="lazy" />
                                            <div className="design-stage-overlay">
                                                <div className="stage-meta">
                                                    <span className="stage-index">{String(index + 1).padStart(2, '0')}</span>
                                                    <h3 className="stage-title">{design.title}</h3>
                                                </div>
                                                <span className="stage-cta">Visual Concept</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Unique Scroll Hint Overlay */}
                <motion.div
                    className="discovery-hint"
                    animate={{
                        opacity: hasScrolled ? 0 : 1,
                        x: hasScrolled ? 50 : 0,
                        pointerEvents: hasScrolled ? 'none' : 'auto'
                    }}
                >
                    <div className="hint-arrow">
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                            <path d="M1 10H38M38 10L30 2M38 10L30 18" stroke="var(--c-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="hint-text">SCROLL TO DISCOVER</span>
                </motion.div>

                {/* Discovery Gauge (Progress Bar) */}
                <div className="discovery-gauge-container container">
                    <div className="gauge-label">
                        <span>EXPLORATION DEPTH</span>
                        <motion.span ref={percentageRef} className="gauge-percentage">
                            0%
                        </motion.span>
                    </div>
                    <div className="gauge-track">
                        <motion.div
                            className="gauge-fill"
                            style={{
                                width: scaleWidth,
                                background: '#ff4d00' // Explicit inline fallback
                            }}
                        />
                    </div>
                    <div className="gauge-markers">
                        <span>start</span>
                        <span>halfway</span>
                        <span>complete</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestDesigns;
