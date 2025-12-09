import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section container">
            <div className="contact-content">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Let's Talk</h2>
                    <p className="contact-subtitle">Have a project in mind? Let's create something extraordinary.</p>
                </motion.div>

                <form className="contact-form">
                    <div className="form-group">
                        <input type="text" placeholder="Name" className="form-input" />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" className="form-input" />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Message" className="form-input form-textarea"></textarea>
                    </div>
                    <motion.button
                        className="submit-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Send Message
                    </motion.button>
                </form>

                <div className="social-links">
                    {['Instagram', 'Behance', 'LinkedIn', 'Twitter'].map((social) => (
                        <a key={social} href="#" className="social-link">{social}</a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
