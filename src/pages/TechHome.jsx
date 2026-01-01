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
                <section id="hero" className="tech-hero container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="tech-title">
                            <span className="code-bracket">&lt;</span>
                            <span className="typewriter-effect" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Datta Thota</span>
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

                <section id="about" className="container tech-section">
                    <h2 className="section-header">01. About Me</h2>

                    {/* Removed inline grid styles (your CSS now controls it) */}
                    <div className="tech-about-content">

                        <div className="tech-about-text">
                            <p>
                                Hi, I'm <strong>Datta Thota</strong>  a developer who loves building fast, scalable web experiences.
                            </p>
                            <p>
                                I focus on the MERN stack and have strong command over JavaScript & TypeScript. I enjoy system architecture and clean problem solving.
                            </p>

                            <div className="tech-about-skills">
                                <h3>Core Technologies</h3>

                                <div className="skills-grid">
                                    {[
                                        'JavaScript (ES6+)',
                                        'Python',
                                        'React.js',
                                        'React Native',
                                        'Node.js',
                                        'MongoDB',
                                        'Git'
                                    ].map(skill => (
                                        <span key={skill} className="skill-chip">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="tech-profile-container">
                            <div className="tech-profile-glitch"></div>

                            <img
                                src="https://res.cloudinary.com/dl75qwr19/image/upload/v1765253706/WhatsApp_Image_2025-12-09_at_09.44.48_d3681d32_faiq4y.jpg"
                                alt="Profile"
                                className="tech-profile-img"
                            />
                        </div>
                    </div>
                </section>
                <br />
                <br />
                {/* Experience Section */}
                <section id="experience" className="container tech-section tech-experience-section">
                    <h2 className="section-header">02. Experience</h2>
                    <div className="experience-list">

                        {/* Personal Projects */}
                        <div className="experience-item">
                            <div className="exp-dot exp-dot-active"></div>
                            <h3 className="exp-title">Fresher – Personal Projects</h3>
                            <h4 className="exp-date">2024 - Present</h4>
                            <p className="exp-desc">
                                Building personal projects using React, Node.js, MongoDB, and Python to gain hands-on experience in full-stack development and clean coding practices.
                            </p>
                        </div>

                        {/* Learning / Training */}
                        <div className="experience-item">
                            <div className="exp-dot"></div>
                            <h3 className="exp-title">Self-Learning & Training</h3>
                            <h4 className="exp-date">2023 - 2024</h4>
                            <p className="exp-desc">
                                Learning and practicing JavaScript, React, Node.js, and MongoDB through online resources and small projects to strengthen full-stack development skills.
                            </p>
                        </div>

                    </div>
                </section>

                <br />
                <br />

                {/* Tech Projects Grid */}
                <section id="projects" className="tech-projects container">
                    <h2 className="section-header " >03. Selected Repositories</h2>
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
                <br />
                <br />
                {/* Contact Section */}
                <section id="contact" className="container tech-section tech-contact-section">
                    <h2 className="section-header contact-header">04. Initialize Connection</h2>

                    <div className="tech-contact-wrapper">
                        <form ref={form} onSubmit={sendEmail} className="tech-form">
                            <div className="tech-input-group">
                                <input type="text" name="user_name" placeholder="> Enter Name" className="tech-input" required />
                            </div>
                            <div className="tech-input-group">
                                <input type="email" name="user_email" placeholder="> Enter Email" className="tech-input" required />
                            </div>
                            <div className="tech-input-group">
                                <textarea name="message" placeholder="> // Write your message here..." className="tech-input tech-textarea" required></textarea>
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
                            <p className="contact-email">
                                Email: dattathota988@gmail.com
                            </p>

                            {/* Social links */}
                            <div className="tech-social-links">
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
                                    >
                                        <span className="social-arrow">➜</span>
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
