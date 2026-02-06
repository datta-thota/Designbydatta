import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import './Portfolio.css';

const categories = [
    { id: 'all', title: 'ALL WORK', filter: 'all' },
    { id: 'brand', title: 'IDENTITIES', filter: 'Brand Systems' },
    { id: 'visual', title: 'VISUALS', filter: 'Graphic & Visual' },
    { id: 'motion', title: 'MOTION', filter: 'Motion Design' },
    { id: 'experimental', title: 'LABS', filter: 'Experimental' }
];

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [expandedProjectId, setExpandedProjectId] = useState(null);
    const containerRef = useRef(null);

    // Mouse tracking for floating preview (Desktop Only)
    const cursorX = useSpring(0, { stiffness: 150, damping: 20 });
    const cursorY = useSpring(0, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        // Update cursor position relative to viewport or container
        // Using viewport coordinates for fixed position elements
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };

    const filteredProjects = useMemo(() => {
        let result = projects;

        // Filter by category
        if (activeFilter !== 'all') {
            result = projects.filter(p => p.category === categories.find(c => c.id === activeFilter)?.filter);
        }

        // Helper for "Curated" Sorting weight
        const getWeight = (cat) => {
            if (cat === 'Brand Systems') return 3; // Top Tier
            if (cat === 'Graphic & Visual') return 2; // Second Tier
            if (cat === 'Motion Design') return 1;
            return 0;
        };

        // Sort: New Projects (ID >= 11) First -> Then Curated Weight -> Newest Year -> Newest ID
        return result.sort((a, b) => {
            // Priority for new projects (ID >= 11)
            const isNewA = a.id >= 11;
            const isNewB = b.id >= 11;

            if (isNewA && !isNewB) return -1;
            if (!isNewA && isNewB) return 1;
            if (isNewA && isNewB) return b.id - a.id; // Sort new projects by ID desc

            // Legacy Sorting for ID < 11
            const weightA = getWeight(a.category);
            const weightB = getWeight(b.category);

            if (weightB !== weightA) return weightB - weightA; // Higher weight first

            const yearA = parseInt(a.year.toString().substring(0, 4));
            const yearB = parseInt(b.year.toString().substring(0, 4));

            if (yearB !== yearA) return yearB - yearA; // Newer year first

            return b.id - a.id; // Newer ID first
        });
    }, [activeFilter]);

    return (
        <motion.section
            className="portfolio-section"
            onMouseMove={handleMouseMove}
            ref={containerRef}
            onViewportLeave={() => setHoveredProject(null)}
            viewport={{ margin: "-10% 0px -10% 0px" }} // Buffer to clear smoothly before fully exiting
        >
            <div className="portfolio-container container">

                {/* Header & Filter Bar */}
                <div className="portfolio-header-block">
                    <div className="header-content">
                        <h2 className="portfolio-title">Selected Works</h2>
                        <span className="archive-count">({activeFilter === 'motion' ? 2 : filteredProjects.length})</span>
                    </div>

                    <div className="filter-bar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`filter-pill ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                {cat.title}
                                {activeFilter === cat.id && (
                                    <motion.span
                                        className="pill-bg"
                                        layoutId="activePill"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="portfolio-archive" onMouseLeave={() => setHoveredProject(null)}>

                    <AnimatePresence mode="wait">
                        {/* Special View for Motion Design */}
                        {activeFilter === 'motion' ? (
                            <motion.div
                                key="motion-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="motion-design-embeds"
                            >
                                {/* Reusing existing embed logic for Motion category */}
                                <div className="embed-container">
                                    <div className="embed-header">
                                        <h3>Fizz in Motion: Coca-Cola (Motion Design)</h3>
                                        <a href="https://datta-thota.github.io/motion_design_1/" target="_blank" rel="noopener noreferrer" className="embed-link">Open New Tab ↗</a>
                                    </div>
                                    <div className="embed-iframe-wrapper">
                                        <iframe src="https://datta-thota.github.io/motion_design_1/" title="Coca-Cola Motion" className="motion-embed" allowFullScreen />
                                        <a href="https://datta-thota.github.io/motion_design_1/" target="_blank" rel="noopener noreferrer" className="embed-overlay" />
                                    </div>
                                </div>
                                <div className="embed-container">
                                    <div className="embed-header">
                                        <h3>Move with Speed: Nike Shoes (Motion Design)</h3>
                                        <a href="https://datta-thota.github.io/motion_design_2/" target="_blank" rel="noopener noreferrer" className="embed-link">Open New Tab ↗</a>
                                    </div>
                                    <div className="embed-iframe-wrapper">
                                        <iframe src="https://datta-thota.github.io/motion_design_2/" title="Nike Motion" className="motion-embed" allowFullScreen />
                                        <a href="https://datta-thota.github.io/motion_design_2/" target="_blank" rel="noopener noreferrer" className="embed-overlay" />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            /* Kinetic List for All / Other Categories */
                            <div className="archive-list">
                                {filteredProjects.map((project, idx) => (
                                    <ArchiveRow
                                        key={project.id}
                                        project={project}
                                        index={idx}
                                        setHoveredProject={setHoveredProject}
                                        expandedProjectId={expandedProjectId}
                                        setExpandedProjectId={setExpandedProjectId}
                                    />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Floating Preview (Desktop Only) */}
                <PortalPreview
                    project={hoveredProject}
                    x={cursorX}
                    y={cursorY}
                />

            </div>
        </motion.section>
    );
};

// Extracted Row Component with Tactile Logic
const ArchiveRow = ({ project, index, setHoveredProject, expandedProjectId, setExpandedProjectId }) => {
    const isExpanded = expandedProjectId === project.id;

    const handleClick = (e) => {
        const isMobile = window.innerWidth <= 1024;

        if (isMobile) {
            // Logic: 
            // 1. If not expanded -> Expand only (Prevent nav).
            // 2. If expanded -> Allow nav.
            if (!isExpanded) {
                e.preventDefault();
                setExpandedProjectId(project.id);
            }
            // If expanded, do nothing (let default Link behavior happen)
        }
    };

    return (
        <div className="archive-row-wrapper">
            <Link
                to={project.externalLink || `/design/project/${project.slug || project.id}`}
                className={`archive-row ${isExpanded ? 'expanded' : ''}`}
                onMouseEnter={() => {
                    // Desktop Only: Hover logic
                    if (window.innerWidth > 1024) setHoveredProject(project);
                }}
                onClick={handleClick}
                target={project.externalLink ? "_blank" : "_self"}
            >
                <div className="row-index">{(index + 1).toString().padStart(2, '0')}</div>
                <div className="row-content">
                    <h3 className="row-title">
                        {project.title}
                        <span className="mobile-only-arrow" style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }}>
                            {isExpanded ? '↓' : '↗'}
                        </span>
                    </h3>
                    <div className="row-meta">
                        <span className="row-category">{project.category}</span>
                        <span className="row-year">{project.year}</span>
                    </div>

                    {/* Mobile Accordion Image */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                className="mobile-accordion-image"
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }} // smooth easeOutCubic
                            >
                                <img src={project.image} alt={project.title} />
                                <div className="mobile-cta-label">View Project ➔</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Link>
        </div>
    );
};

// Portal/Floating Component
const PortalPreview = ({ project, x, y }) => {
    return (
        <motion.div
            className="floating-preview-stage"
            style={{
                x,
                y,
                top: 0,
                left: 0,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: project ? 1 : 0,
                scale: project ? 1 : 0.8,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {project && (
                <div className="preview-card">
                    <img src={project.image} alt="Preview" />
                    <div className="preview-meta">
                        <span>View Case Study</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Portfolio;
