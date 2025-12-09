import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import PageTransition from '../components/common/PageTransition';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === parseInt(id));

    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);

    if (!project) {
        return <div className="container flex-center full-screen">Project not found</div>;
    }

    const nextProject = projects.find(p => p.id === parseInt(id) + 1) || projects[0];
    const prevProject = projects.find(p => p.id === parseInt(id) - 1) || projects[projects.length - 1];

    return (
        <PageTransition>
            <div className="project-details">
                <motion.div
                    className="project-hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="project-hero-image"
                        style={{
                            backgroundImage: `url(${project.image})`,
                            scale: heroScale,
                            opacity: heroOpacity
                        }}
                    />
                    <div className="project-hero-content container">
                        <motion.h1
                            className="project-title"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {project.title}
                        </motion.h1>
                        <motion.div
                            className="project-meta"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <div className="meta-item">
                                <span className="label">Category</span>
                                <span className="value">{project.category}</span>
                            </div>
                            <div className="meta-item">
                                <span className="label">Year</span>
                                <span className="value">{project.year}</span>
                            </div>
                            <div className="meta-item">
                                <span className="label">Role</span>
                                <span className="value">{project.role || "Lead Designer"}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="project-content container">
                    <section className="content-section">
                        <div className="section-header">
                            <h2>Concept & Objective</h2>
                        </div>
                        <div className="section-body">
                            <p>{project.concept}</p>
                        </div>
                    </section>

                    {project.gallery && project.gallery.length > 0 && (
                        <section className="content-section gallery-grid">
                            {project.gallery.map((item, index) => {
                                const isObject = typeof item === 'object' && item !== null;
                                const imgSrc = isObject ? item.image : item;
                                const caption = isObject ? item.caption : null;

                                return (
                                    <div
                                        key={index}
                                        className={`gallery-item ${index === 0 ? 'large' : ''}`}
                                    >
                                        <div className="gallery-item-wrapper">
                                            {caption && (
                                                <p className="gallery-caption">{caption}</p>
                                            )}
                                            <img src={imgSrc} alt={`Project gallery ${index + 1}`} loading="lazy" />
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    )}

                    <section className="content-section" style={{ marginTop: 'var(--space-xl)' }}>
                        <div className="section-header">
                            <h2>Process</h2>
                        </div>
                        <div className="section-body">
                            <p>{project.process}</p>
                        </div>
                    </section>
                </div>

                <div className="project-navigation container">
                    <Link to={`/project/${prevProject.id}`} className="nav-btn prev">
                        <span className="nav-label">Previous Project</span>
                        <span className="nav-title">{prevProject.title}</span>
                    </Link>
                    <Link to={`/project/${nextProject.id}`} className="nav-btn next">
                        <span className="nav-label">Next Project</span>
                        <span className="nav-title">{nextProject.title}</span>
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProjectDetails;
