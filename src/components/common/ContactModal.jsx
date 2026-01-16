import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Linkedin, ExternalLink, Copy, Check, Github, Instagram, Dribbble, Globe } from 'lucide-react';
import { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
    const [copiedField, setCopiedField] = useState(null);

    const contactDetails = [
        {
            id: 'email',
            label: 'Email',
            value: 'dattathota988@gmail.com',
            icon: <Mail size={20} />,
            action: 'mailto:dattathota988@gmail.com',
            display: 'dattathota988@gmail.com'
        },
        {
            id: 'phone',
            label: 'Mobile',
            value: '+91 9100604721',
            icon: <Phone size={20} />,
            action: 'tel:+919100604721',
            display: '+91 9100604721'
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            value: 'linkedin.com/in/purushothama-datta',
            icon: <Linkedin size={20} />,
            action: 'https://linkedin.com/in/purushothama-datta',
            display: 'Purushothama Datta',
            isLink: true
        },
        {
            id: 'behance',
            label: 'Behance',
            value: 'behance.net/dattathota',
            icon: <Globe size={20} />,
            action: 'https://behance.net/dattathota',
            display: 'dattathota',
            isLink: true
        },
        {
            id: 'dribbble',
            label: 'Dribbble',
            value: 'dribbble.com/datta-thota',
            icon: <Dribbble size={20} />,
            action: 'https://dribbble.com/datta-thota',
            display: 'datta-thota',
            isLink: true
        },
        {
            id: 'github',
            label: 'GitHub',
            value: 'github.com/datta-thota',
            icon: <Github size={20} />,
            action: 'https://github.com/datta-thota',
            display: 'datta-thota',
            isLink: true
        },
        {
            id: 'instagram',
            label: 'Instagram',
            value: 'instagram.com/the_raydsign',
            icon: <Instagram size={20} />,
            action: 'https://instagram.com/the_raydsign',
            display: 'the_raydsign',
            isLink: true
        }
    ];

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedField(id);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="contact-modal-overlay" onClick={onClose}>
                    <motion.div
                        className="contact-modal-content"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="contact-modal-header">
                            <div className="modal-title-wrapper">
                                <h2>Let's Collaborate</h2>
                                <p>Available for freelance projects & full-time roles.</p>
                            </div>
                            <button className="modal-close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="contact-list">
                            <div className="contact-section-label">Primary</div>
                            {contactDetails.filter(i => ['email', 'phone'].includes(i.id)).map((item) => (
                                <div key={item.id} className="contact-item primary-contact">
                                    <div className="contact-icon-box">
                                        {item.icon}
                                    </div>
                                    <div className="contact-info">
                                        <span className="contact-label">{item.label}</span>
                                        {item.isLink ? (
                                            <a href={item.action} target="_blank" rel="noopener noreferrer" className="contact-value link">
                                                {item.display} <ExternalLink size={14} className="link-arrow" />
                                            </a>
                                        ) : (
                                            <span className="contact-value">{item.display}</span>
                                        )}
                                    </div>

                                    {!item.isLink && (
                                        <button
                                            className="copy-btn"
                                            onClick={() => handleCopy(item.value, item.id)}
                                            title="Copy to clipboard"
                                        >
                                            {copiedField === item.id ? <Check size={18} color="#4ade80" /> : <Copy size={18} />}
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="contact-divider">
                                <span>Socials</span>
                            </div>

                            <div className="social-grid">
                                {contactDetails.filter(i => !['email', 'phone'].includes(i.id)).map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.action}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-item social-item"
                                    >
                                        <div className="contact-icon-box social-icon">
                                            {item.icon}
                                        </div>
                                        <div className="contact-info">
                                            <span className="contact-value">{item.label}</span>
                                        </div>
                                        <ExternalLink size={14} className="link-arrow-static" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="footer-status">
                                <span className="status-dot"></span>
                                <span>Currently replying within 24 hours</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ContactModal;
