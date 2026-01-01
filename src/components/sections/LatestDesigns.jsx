import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { latestDesigns } from '../../data/latestDesigns';
import './LatestDesigns.css';

const LatestDesigns = () => {
    return (
        <section className="latest-designs-section container" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="portfolio-header">
                <h2 className="section-title">Latest Designs</h2>
                <span className="project-count">({latestDesigns.length})</span>
            </div>

            <div className="designs-grid">
                {[...latestDesigns].reverse().map((design, index) => (
                    <Link to={`/design/${design.id}`} key={design.id} className="design-card-link">
                        <motion.div
                            className="design-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="design-image-wrapper">
                                <img src={design.image} alt={design.title} loading="lazy" />
                                <div className="design-overlay">
                                    <span className="view-project">View Design</span>
                                </div>
                            </div>
                            <div className="design-info">
                                <h3 className="design-title">{design.title}</h3>
                                <span className="design-date">{design.date}</span>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LatestDesigns;
