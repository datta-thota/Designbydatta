import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone } from 'lucide-react';
import './ContactBar.css';

const ContactBar = () => {
    const contactLinks = [
        {
            name: 'Mobile',
            url: 'tel:+919100604721',
            icon: <Phone size={20} />,
            color: '#4ade80',
            label: '+91 9100604721'
        },
        {
            name: 'Email',
            url: 'https://mail.google.com/mail/?view=cm&fs=1&to=dattathota988@gmail.com',
            icon: <Mail size={20} />,
            color: '#EA4335',
            label: 'dattathota988@gmail.com'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/purushothama-datta',
            icon: <Linkedin size={20} />,
            color: '#0A66C2',
            label: 'LinkedIn'
        }
    ];

    return (
        <motion.div
            className="contact-bar-container"
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        >
            <div className="contact-bar-glass">
                <div className="contact-links">
                    {contactLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link-item"
                            whileHover={{ y: -5, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title={link.name}
                        >
                            <span className="icon-wrapper" style={{ '--hover-color': link.color }}>
                                {link.icon}
                            </span>
                            <span className="link-label">{link.label}</span>
                        </motion.a>
                    ))}
                </div>
                <div className="contact-bar-divider"></div>
                <div className="contact-status">
                    <div className="status-dot-green"></div>
                    <span className="status-text">AVAILABLE FOR PROJECTS</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ContactBar;
