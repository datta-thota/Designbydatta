import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const skills = [
    "Brand Identity",
    "Packaging Design",
    "Poster & Ad Design",
    "Merchandise Design",
    "UI/UX Design",
    "Typography",
    "Art Direction"
];


const experience = [
    { year: "2024 - Present", role: "Freelance Graphic Designer ", company: "Personal & Client Projects" },
    { year: "2023 - 2024", role: "Design Intern / College Projects ", company: "Academic & Personal Projects" },
    { year: "2023", role: "Poster & Merchandise Designer ", company: "College Events & Personal Work" }
];

const About = () => {
    return (
        <section className="about-section container">
            <div className="about-content">
                <motion.div
                    className="about-image-wrapper"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="about-image" style={{ backgroundImage: 'url("https://res.cloudinary.com/dl75qwr19/image/upload/v1765253706/WhatsApp_Image_2025-12-09_at_09.44.48_d3681d32_faiq4y.jpg?q=80&w=2574&auto=format&fit=crop")' }}></div>
                    <div className="glowing-frame"></div>
                </motion.div>

                <div className="about-text">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        About Me
                    </motion.h2>

                    <motion.p
                        className="about-bio"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        My name is Datta Thota.
                        I create digital experiences that breathe, move, and connect.
                        I build at the intersection of visual storytelling, design, and technology.
                        Design should stay with you long after the screen fades.
                    </motion.p>

                    <div className="skills-list">
                        {skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                className="skill-tag"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>

                    <div className="experience-timeline">
                        {experience.map((item, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                            >
                                <span className="year">{item.year}</span>
                                <div className="role-info">
                                    <span className="role">{item.role}</span>
                                    <span className="company">{item.company}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        className="download-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Download Resume
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default About;
