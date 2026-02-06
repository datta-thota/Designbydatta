import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import PageTransition from '../components/common/PageTransition';
import BehanceProjectLayout from '../components/project/BehanceProjectLayout';
import ShareButton from '../components/common/ShareButton'; // Import ShareButton
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find project by slug (string) or ID (numeric)
    const project = projects.find(p =>
        (p.slug && p.slug === id) ||
        p.id === parseInt(id)
    );

    const { scrollY } = useScroll();
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);

    if (!project) {
        return <div className="container flex-center full-screen">Project not found</div>;
    }

    const currentIndex = projects.indexOf(project);
    const nextProject = projects[(currentIndex + 1) % projects.length];
    const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

    if ((project.layout === 'flexible' || project.id === 11) && project.content) {
        return (
            <PageTransition>
                <Helmet>
                    <title>{project.title} | Datta Thota</title>
                    <meta name="description" content={project.concept ? project.concept.substring(0, 150) + "..." : "View this project by Datta Thota."} />
                    <meta property="og:title" content={project.title} />
                    <meta property="og:description" content={project.concept ? project.concept.substring(0, 150) + "..." : "View this project by Datta Thota."} />
                    <meta property="og:image" content={project.image} />
                    <meta property="og:type" content="article" />
                    <meta name="twitter:card" content="summary_large_image" />
                </Helmet>
                <BehanceProjectLayout project={project} />
                <div className="project-navigation container">
                    {/* Navigation logic reused or adapted */}
                    <Link to={`/design/project/${prevProject.slug || prevProject.id}`} className="nav-btn prev">
                        <span className="nav-label">Previous Project</span>
                        <span className="nav-title">{prevProject.title}</span>
                    </Link>
                    <Link to={`/design/project/${nextProject.slug || nextProject.id}`} className="nav-btn next">
                        <span className="nav-label">Next Project</span>
                        <span className="nav-title">{nextProject.title}</span>
                    </Link>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <Helmet>
                <title>{project.title} | Datta Thota</title>
                <meta name="description" content={project.concept ? project.concept.substring(0, 150) + "..." : "View this project by Datta Thota."} />
                <meta property="og:title" content={project.title} />
                <meta property="og:description" content={project.concept ? project.concept.substring(0, 150) + "..." : "View this project by Datta Thota."} />
                <meta property="og:image" content={project.image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
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
                            <div className="meta-item">
                                <ShareButton title={`${project.title} | Datta Thota`} />
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
                    <Link to={`/design/project/${prevProject.slug || prevProject.id}`} className="nav-btn prev">
                        <span className="nav-label">Previous Project</span>
                        <span className="nav-title">{prevProject.title}</span>
                    </Link>
                    <Link to={`/design/project/${nextProject.slug || nextProject.id}`} className="nav-btn next">
                        <span className="nav-label">Next Project</span>
                        <span className="nav-title">{nextProject.title}</span>
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProjectDetails;
