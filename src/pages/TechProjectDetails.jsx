import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { techProjects } from '../data/techProjects';
import PageTransition from '../components/common/PageTransition';
import './TechProjectDetails.css';

const TechProjectDetails = () => {
    const { id } = useParams();
    const project = techProjects.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return <div>Project not found</div>;

    return (
        <PageTransition>
            <div className="tech-details-page">
                <div className="tech-details-container">
                    <Link to="/tech" className="tech-back-btn">
                        <span className="cmd-prompt">&gt;</span> cd ..
                    </Link>

                    <div className="project-header">
                        <h1 className="tech-details-title">{project.title}</h1>
                        <div className="tech-tags-large">
                            {project.tags.map(tag => (
                                <span key={tag} className="tech-tag-large">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="tech-details-grid">
                        <div className="main-content">
                            <div className="project-image-large">
                                <img src={project.image} alt={project.title} />
                            </div>

                            <section className="section-block">
                                <h3 className="section-title">Overview</h3>
                                <p className="section-text">{project.description}</p>
                            </section>

                            <section className="section-block">
                                <h3 className="section-title">Key Features</h3>
                                <ul className="feature-list">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="feature-item">{feature}</li>
                                    ))}
                                </ul>
                            </section>


                        </div>

                        <div className="sidebar">
                            <div className="links-card">
                                <h4 className="links-title">Project Links</h4>
                                <div className="links-container">
                                    <a href={project.githubUrl} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                                        GitHub Repository ↗
                                    </a>
                                </div>
                            </div>

                            <div className="links-card">
                                <h4 className="links-title">Tech Stack</h4>
                                <div className="tech-stack-list">
                                    {project.techStack.map((stack, i) => (
                                        <div key={i} className="tech-stack-item">
                                            <span className="stack-category">{stack.name}</span>
                                            <span className="stack-tools">{stack.tools}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default TechProjectDetails;
