import React from 'react';
import { motion } from 'framer-motion';
import './SectionHeader.css';

const SectionHeader = ({ title, subtitle, count }) => {
    return (
        <div className="section-header-wrap">
            <motion.div
                className="section-header-bg-text"
                initial={{ x: '-10%', opacity: 0 }}
                whileInView={{ x: '0%', opacity: 0.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                {title}
            </motion.div>

            <div className="section-header-content">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="section-header-title">
                        {title}
                        {count !== undefined && <span className="section-header-count">[{count}]</span>}
                    </h2>
                    {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
                </motion.div>
                <div className="section-header-line"></div>
            </div>
        </div>
    );
};

export default SectionHeader;
