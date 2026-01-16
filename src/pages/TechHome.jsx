import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
            <Helmet>
                <title>Datta Thota | Full Stack Developer</title>
                <meta name="description" content="MERN Stack Developer specializing in scalable web applications, React, Node.js, and cloud architecture." />
            </Helmet>
            <div className="tech-home">
                {/* Tech Hero */}
                <section id="hero" className="tech-hero container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="tech-title">
                            <span className="code-bracket">C:\Users\Datta&gt;</span>
                            <span className="typewriter-effect" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>Datta Thota</span>
                            <span className="cursor-block"></span>
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
                    <div className="tech-section-header">C:\Users\Datta&gt; whoami</div>

                    <div className="tech-about-wrapper">
                        <div className="about-terminal">
                            <div className="terminal-output">
                                <p>
                                    Hi, I'm <span className="highlight">Datta Thota</span> — a full-stack developer obsessed with building high-performance, scalable web applications.
                                </p>
                                <p>
                                    My expertise lies in the MERN stack, JavaScript, and TypeScript. I thrive on solving complex architectural challenges and writing clean, maintainable code.
                                </p>
                            </div>

                            <div className="terminal-line">
                                <span className="prompt">C:\Users\Datta&gt;</span> <span className="command">dir /skills</span>
                            </div>
                            <div className="terminal-output">
                                <div className="skills-grid">
                                    {[
                                        'JavaScript (ES6+)',
                                        'TypeScript',
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
                    </div>
                </section>
                <br />
                <br />
                {/* Experience Section */}
                <section id="experience" className="container tech-section tech-experience-section">
                    <div className="tech-section-header">C:\Users\Datta\Experience&gt; type history.log</div>
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
                    <div className="tech-section-header">C:\Users\Datta\Projects&gt; dir</div>
                    <div className="tech-grid">
                        {techProjects.map((project) => (
                            <Link to={`/tech/project/${project.id}`} key={project.id} className="tech-card-link">
                                <motion.div
                                    className="tech-window"
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                >
                                    <div className="tech-window-header">
                                        <div className="window-title">{project.title.toLowerCase()}.exe</div>
                                        <div className="window-controls">
                                            <span className="win-btn">_</span>
                                            <span className="win-btn">□</span>
                                            <span className="win-btn">×</span>
                                        </div>
                                    </div>
                                    <div className="tech-window-body">
                                        <div className="tech-card-image">
                                            <img src={project.image} alt={project.title} loading="lazy" />
                                        </div>
                                        <div className="tech-window-content">
                                            <div className="tech-tags">
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="tech-tag">{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className="tech-project-title">&gt; {project.title}</h3>
                                            <p className="tech-project-desc">{project.description}</p>
                                        </div>
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
                    <div className="tech-section-header">C:\Users\Datta\Contact&gt; start mailto:dattathota988@gmail.com</div>

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
