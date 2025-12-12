import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // REPLACE THESE WITH YOUR ACTUAL EMAILJS IDS
        // Sign up at https://www.emailjs.com/
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

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <div className="form-group">
                        <input type="text" name="user_name" placeholder="Name" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="user_email" placeholder="Email" className="form-input" required />
                    </div>
                    <div className="form-group">
                        <textarea name="message" placeholder="Message" className="form-input form-textarea" required></textarea>
                    </div>

                    <motion.button
                        className={`submit-btn ${status}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === 'sending' || status === 'success'}
                    >
                        {status === 'idle' && 'Send Message'}
                        {status === 'sending' && 'Sending...'}
                        {status === 'success' && 'Message Sent!'}
                        {status === 'error' && 'Error. Try Again.'}
                    </motion.button>
                </form>

                <div className="social-links">
                    {[
                        { name: "Instagram", url: "https://instagram.com/the_raydsign" },
                        { name: "Behance", url: "https://behance.net/dattathota" },
                        { name: "Dribbble", url: "https://dribbble.com/datta-thota" },
                        { name: "LinkedIn", url: "https://linkedin.com/in/purushothama-datta" },

                    ].map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            {social.name}
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Contact;
