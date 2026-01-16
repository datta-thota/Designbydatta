import React from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';
import './ContactBar.css';

const ContactBar = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <motion.div
                className="contact-bar-container"
                initial={{ y: 100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            >
                <div className="contact-bar-glass">
                    <button
                        className="contact-me-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span>Contact Me</span>
                    </button>

                    <div className="contact-bar-divider"></div>

                    <div className="contact-status">
                        <div className="status-dot-green"></div>
                        <span className="status-text">Available for Projects</span>
                    </div>
                </div>
            </motion.div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ContactBar;
