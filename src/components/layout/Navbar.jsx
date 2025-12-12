import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ context }) => {
    const location = useLocation();

    // Determine home path based on context
    const homePath = context === 'tech' ? '/tech' : '/design';

    const links = [
        { name: 'Work', path: homePath },
        { name: 'About', path: '/about' }, // Shared for now
        { name: 'Contact', path: '/contact' } // Shared for now
    ];

    const isTech = context === 'tech';

    return (
        <nav className="navbar" style={isTech ? { background: 'rgba(10,10,10,0.8)', borderBottom: '1px solid #333' } : {}}>
            <div className="navbar-container">
                <Link to="/" className="logo">
                    DT<span className="dot" style={isTech ? { color: '#00ff88' } : {}}>.</span>
                </Link>

                <div className="nav-links">
                    {links.map((link) => (
                        <Link key={link.name} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`} style={isTech ? { color: '#ccc' } : {}}>
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    className="active-dot"
                                    layoutId="navDot"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    style={isTech ? { background: '#00ff88' } : {}}
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
