import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './TechNavbar.css';

const TechNavbar = () => {
    const location = useLocation();

    // Helper to scroll to section if on home page, or navigate then scroll
    const scrollToSection = (e, id) => {
        if (location.pathname === '/tech') {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className="tech-navbar">
            <div className="tech-navbar-container container">
                <Link to="/" className="tech-logo">
                    <span className="command-prompt">&gt;</span> DT_DEV
                    <span className="cursor-blink">_</span>
                </Link>

                <div className="tech-nav-links">
                    <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="tech-nav-link">
                        01. About
                    </a>
                    <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="tech-nav-link">
                        02. Experience
                    </a>
                    <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="tech-nav-link">
                        03. Projects
                    </a>
                    <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="tech-nav-link">
                        04. Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default TechNavbar;
