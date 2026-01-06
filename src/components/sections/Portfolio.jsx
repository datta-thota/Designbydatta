import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../project/ProjectCard';
import { projects } from '../../data/projects';
import './Portfolio.css';

const categories = [
    { id: 'visual', title: 'Graphic & Visual', filter: 'Graphic & Visual' },
    { id: 'brand', title: 'Brand Systems', filter: 'Brand Systems' },
    { id: 'experimental', title: 'Experimental', filter: 'Experimental' },
    { id: 'motion', title: 'Motion Design', filter: 'Motion Design' },
    { id: 'uiux', title: 'UI/UX Design', filter: 'UI/UX Design' }
];

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState(categories[0].id);

    return (
        <section className="portfolio-section">
            <div className="portfolio-folder-system container">
                {/* Section Heading */}
                <div className="portfolio-main-header">
                    <h2 className="portfolio-main-title">Work</h2>
                    <p className="portfolio-main-subtitle">A selection of projects across disciplines</p>
                </div>

                {/* Folder Tabs - Stacked Theme */}
                <div className="folder-tabs-container">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat.id}
                            className={`folder-tab ${activeTab === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat.id)}
                            style={{
                                '--tab-color': cat.color,
                                zIndex: activeTab === cat.id ? 10 : 5 - idx
                            }}
                        >
                            <span className="tab-label">{cat.title}</span>
                        </button>
                    ))}
                </div>

                {/* Main Folder Body */}
                <div className="folder-cabinet">
                    <AnimatePresence mode="wait">
                        {categories.map((cat) => (
                            activeTab === cat.id && (
                                <motion.div
                                    key={cat.id}
                                    className="folder-content"
                                    initial={{ y: 100, opacity: 0, rotateX: -20 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: 100, opacity: 0, rotateX: 20 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="folder-inner">
                                        <div className="folder-header-info">
                                            <h2 className="folder-title">{cat.title}</h2>
                                            <p className="folder-meta">
                                                {cat.id === 'motion'
                                                    ? 'INTERACTIVE SHOWCASES'
                                                    : `CASE FILES // [ ${projects.filter(p => p.category === cat.filter).length} ]`
                                                }
                                            </p>
                                        </div>

                                        {/* Special handling for Motion Design - Embedded iframes */}
                                        {cat.id === 'motion' ? (
                                            <div className="motion-design-embeds">
                                                <div className="embed-container">
                                                    <div className="embed-header">
                                                        <h3>Fizz in Motion: Coca-Cola (Motion Design)</h3>
                                                        <a
                                                            href="https://datta-thota.github.io/motion_design_1/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="embed-link"
                                                        >
                                                            Open in New Tab ↗
                                                        </a>
                                                    </div>
                                                    <div className="embed-iframe-wrapper">
                                                        <iframe
                                                            src="https://datta-thota.github.io/motion_design_1/"
                                                            title="Fizz in Motion: Coca-Cola Motion Design"
                                                            className="motion-embed"
                                                            allowFullScreen
                                                        />
                                                        <a
                                                            href="https://datta-thota.github.io/motion_design_1/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="embed-overlay"
                                                            aria-label="Open Motion Design Showcase 1 in new tab"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="embed-container">
                                                    <div className="embed-header">
                                                        <h3>Move with Speed: Nike Shoes (Motion Design)</h3>

                                                        <a
                                                            href="https://datta-thota.github.io/motion_design_2/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="embed-link"
                                                        >
                                                            Open in New Tab ↗
                                                        </a>
                                                    </div>
                                                    <div className="embed-iframe-wrapper">
                                                        <iframe
                                                            src="https://datta-thota.github.io/motion_design_2/"
                                                            title="Motion Design Showcase 2"
                                                            className="motion-embed"
                                                            allowFullScreen
                                                        />
                                                        <a
                                                            href="https://datta-thota.github.io/motion_design_2/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="embed-overlay"
                                                            aria-label="Open Motion Design Showcase 2 in new tab"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Regular project grid for other categories */
                                            <div className="folder-mosaic-grid">
                                                {projects
                                                    .filter(p => p.category === cat.filter)
                                                    .map((project, idx) => (
                                                        <motion.div
                                                            key={project.id}
                                                            className="folder-item"
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                        >
                                                            <ProjectCard project={project} />
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
