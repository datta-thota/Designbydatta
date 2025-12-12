import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { techProjects } from '../data/techProjects';
import PageTransition from '../components/common/PageTransition';

const TechProjectDetails = () => {
    const { id } = useParams();
    const project = techProjects.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) return <div>Project not found</div>;

    return (
        <PageTransition>
            <div className="tech-details-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#0a0a0a', color: '#e0e0e0', fontFamily: 'monospace' }}>
                <div className="container">
                    <Link to="/tech" className="back-link" style={{ color: '#888', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
                        &lt; Back to Terminal
                    </Link>

                    <div className="project-header" style={{ marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1rem' }}>{project.title}</h1>
                        <div className="tech-tags-large" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{
                                    border: '1px solid #00ff88',
                                    color: '#00ff88',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem'
                                }}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                        <div className="main-content">
                            <div className="project-image-large" style={{ marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                                <img src={project.image} alt={project.title} style={{ width: '100%', display: 'block' }} />
                            </div>

                            <section style={{ marginBottom: '3rem' }}>
                                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#fff' }}>Overview</h3>
                                <p style={{ lineHeight: 1.6, color: '#ccc' }}>{project.description}</p>
                            </section>

                            <section style={{ marginBottom: '3rem' }}>
                                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#fff' }}>Key Features</h3>
                                <ul style={{ paddingLeft: '1.2rem', color: '#ccc' }}>
                                    {project.features.map((feature, i) => (
                                        <li key={i} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                                    ))}
                                </ul>
                            </section>

                            <section>
                                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#fff' }}>Challenges & Solution</h3>
                                <p style={{ marginBottom: '1rem', color: '#ccc' }}><strong>Challenge:</strong> {project.challenges}</p>
                                <p style={{ color: '#ccc' }}><strong>Solution:</strong> {project.solution}</p>
                            </section>
                        </div>

                        <div className="sidebar">
                            <div className="links-card" style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333', marginBottom: '2rem' }}>
                                <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Project Links</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <a href={project.githubUrl} style={{ color: '#00ff88', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        GitHub Repository ↗
                                    </a>

                                </div>
                            </div>

                            <div className="stack-card" style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                                <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Tech Stack</h4>
                                {project.techStack.map((stack, i) => (
                                    <div key={i} style={{ marginBottom: '1rem' }}>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '0.2rem' }}>{stack.name}</span>
                                        <span style={{ color: '#eee' }}>{stack.tools}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default TechProjectDetails;
