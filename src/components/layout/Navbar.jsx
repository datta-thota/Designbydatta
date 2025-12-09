import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const links = [
        { name: 'Work', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    DT<span className="dot">.</span>
                </Link>

                <div className="nav-links">
                    {links.map((link) => (
                        <Link key={link.name} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    className="active-dot"
                                    layoutId="navDot"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
