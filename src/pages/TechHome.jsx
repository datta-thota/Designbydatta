import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // Import emailjs
import { techProjects } from '../data/techProjects';
import './TechHome.css';
import PageTransition from '../components/common/PageTransition';

const TechHome = () => {
    // Contact Form Logic
    const form = useRef();
    const [status, setStatus] = useState('idle');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        const SERVICE_ID = 'service_q7hjb42';
        const TEMPLATE_ID = 'template_ctws4t6';
        const PUBLIC_KEY = 'ZasqFXAN0wKIctmTM';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setStatus('success');
                form.current.reset();
                setTimeout(() => setStatus('idle'), 5000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            });
    };

    return (
        <PageTransition>
            <div className="tech-home">
                {/* Tech Hero */}
                <section id="hero" className="tech-hero container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="tech-title">
                            <span className="code-bracket">&lt;</span>
                            Datta Thota
                            <span className="code-bracket">/&gt;</span>
                        </h1>
                        <p className="tech-subtitle">
                            Designing and developing full-stack applications that scale effortlessly.
                        </p>

                        <div className="tech-stack-ticker">
                            <span>React.js</span><span>•</span>
                            <span>React Native</span><span>•</span>
                            <span>Node.js</span><span>•</span>
                            <span>MongoDB</span><span>•</span>
                            <span>JavaScript</span><span>•</span>
                            <span>Python</span>
                        </div>

                    </motion.div>
                </section>

                {/* About Section */}
                <section id="about" className="container tech-section" style={{ paddingBottom: '6rem' }}>
                    <h2 className="section-header">01. About Me</h2>
                    <div className="tech-about-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div className="tech-about-text">
                            <p style={{ lineHeight: 1.6, color: '#ccc', marginBottom: '1rem' }}>
                                Hi, I'm <strong>Datta Thota</strong> a developer who loves building fast, scalable, and reliable web experiences. My journey started with a simple curiosity about how the internet works, and that curiosity quickly evolved into a deep passion for coding and system design.
                            </p>

                            <p style={{ lineHeight: 1.6, color: '#ccc' }}>
                                I focus on the MERN stack and have a solid command of modern JavaScript and TypeScript. I enjoy breaking down complex problems, architecting clean solutions, and writing efficient, maintainable code that actually scales.
                            </p>

                            <div className="tech-about-skills" style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>Core Technologies</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    {[
                                        'JavaScript (ES6+)',
                                        'Python',
                                        'React.js',
                                        'React Native',
                                        'Node.js',
                                        'MongoDB',
                                        'Git'

                                    ].map(skill => (
                                        <span
                                            key={skill}
                                            style={{
                                                color: '#00ff88',
                                                border: '1px solid #333',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </div>

                        {/* Unique Photo Section - Glitch Effect */}
                        <div className="tech-profile-container">
                            <div className="tech-profile-glitch"></div>
                            {/* Replace with actual user photo */}
                            <img
                                src="https://res.cloudinary.com/dl75qwr19/image/upload/v1765253706/WhatsApp_Image_2025-12-09_at_09.44.48_d3681d32_faiq4y.jpg"
                                alt="Profile"
                                className="tech-profile-img"
                            />
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="container tech-section" style={{ paddingBottom: '6rem' }}>
                    <h2 className="section-header">02. Experience</h2>
                    <div className="experience-list" style={{ borderLeft: '2px solid #333', paddingLeft: '2rem' }}>

                        {/* Personal Projects */}
                        <div className="experience-item" style={{ marginBottom: '3rem', position: 'relative' }}>
                            <div className="exp-dot" style={{ position: 'absolute', left: '-2.4rem', top: '0.5rem', width: '12px', height: '12px', background: '#00ff88', borderRadius: '50%' }}></div>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.2rem' }}>Fresher – Personal Projects</h3>
                            <h4 style={{ fontSize: '1rem', color: '#888', marginBottom: '0.5rem' }}>2024 - Present</h4>
                            <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                                Building personal projects using React, Node.js, MongoDB, and Python to gain hands-on experience in full-stack development and clean coding practices.
                            </p>
                        </div>

                        {/* Learning / Training */}
                        <div className="experience-item" style={{ position: 'relative' }}>
                            <div className="exp-dot" style={{ position: 'absolute', left: '-2.4rem', top: '0.5rem', width: '12px', height: '12px', background: '#333', borderRadius: '50%' }}></div>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.2rem' }}>Self-Learning & Training</h3>
                            <h4 style={{ fontSize: '1rem', color: '#888', marginBottom: '0.5rem' }}>2023 - 2024</h4>
                            <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                                Learning and practicing JavaScript, React, Node.js, and MongoDB through online resources and small projects to strengthen full-stack development skills.
                            </p>
                        </div>

                    </div>
                </section>



                {/* Tech Projects Grid */}
                <section id="projects" className="tech-projects container" style={{ paddingBottom: '6rem' }}>
                    <h2 className="section-header">03. Selected Repositories</h2>
                    <div className="tech-grid">
                        {techProjects.map((project) => (
                            <Link to={`/tech/project/${project.id}`} key={project.id} className="tech-card-link">
                                <motion.div
                                    className="tech-card"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="tech-card-image">
                                        <img src={project.image} alt={project.title} loading="lazy" />
                                    </div>
                                    <div className="tech-card-content">
                                        <div className="tech-tags">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="tech-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="tech-project-title">{project.title}</h3>
                                        <p className="tech-project-desc">{project.description}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="container tech-section" style={{ paddingBottom: '8rem', textAlign: 'center' }}>
                    <h2 className="section-header" style={{ display: 'inline-block', borderBottom: 'none' }}>04. Initialize Connection</h2>

                    <div className="tech-contact-wrapper">
                        <form ref={form} onSubmit={sendEmail} className="tech-form">
                            <div className="tech-input-group">
                                <input type="text" name="user_name" placeholder="> Enter Name" className="tech-input" required />
                            </div>
                            <div className="tech-input-group">
                                <input type="email" name="user_email" placeholder="> Enter Email" className="tech-input" required />
                            </div>
                            <div className="tech-input-group">
                                <textarea name="message" placeholder="> // Write your message here..." className="tech-input" style={{ minHeight: '150px', resize: 'vertical' }} required></textarea>
                            </div>

                            <button
                                type="submit"
                                className="tech-submit-btn"
                                disabled={status === 'sending' || status === 'success'}
                            >
                                {status === 'idle' && '> Execute Send'}
                                {status === 'sending' && '> Uploading...'}
                                {status === 'success' && '> Transmission Complete'}
                                {status === 'error' && '> Error. Retry'}
                            </button>
                        </form>

                        <div className="tech-social-section">
                            {/* Display email as plain text */}
                            <p style={{ color: '#00ff88', fontSize: '1rem', marginBottom: '1rem' }}>
                                Email: dattathota988@gmail.com
                            </p>

                            {/* Social links */}
                            <div className="tech-social-links" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {[
                                    { name: "GitHub", url: "https://github.com/datta-thota" },
                                    { name: "LinkedIn", url: "https://linkedin.com/in/purushothama-datta" }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tech-social-link"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>➜</span>
                                        <span>{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default TechHome;
