import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './TechNavbar.css';

const TechNavbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to scroll to section if on home page, or navigate then scroll
    const scrollToSection = (e, id) => {
        setIsMenuOpen(false); // Close menu on click
        if (location.pathname === '/tech') {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { id: 'about', label: '01. About' },
        { id: 'experience', label: '02. Experience' },
        { id: 'projects', label: '03. Projects' },
        { id: 'contact', label: '04. Contact' }
    ];

    return (
        <nav className="tech-navbar">
            <div className="tech-navbar-container container">
                <Link to="/" className="tech-logo">
                    <span className="command-prompt">&gt;</span> DT_DEV
                    <span className="cursor-blink">_</span>
                </Link>

                {/* Desktop Menu */}
                <div className="tech-nav-links desktop-only">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => scrollToSection(e, link.id)}
                            className="tech-nav-link"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button className="tech-hamburger" onClick={toggleMenu} aria-label="Toggle Navigation">
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                </button>

                {/* Mobile Overlay Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="tech-mobile-menu"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                        >
                            <div className="mobile-nav-content">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.id}
                                        href={`#${link.id}`}
                                        onClick={(e) => scrollToSection(e, link.id)}
                                        className="tech-mobile-link"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default TechNavbar;
