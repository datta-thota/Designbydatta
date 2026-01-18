import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const socials = [
    { name: "Instagram", url: "https://instagram.com/the_raydsign", id: "IG" },
    { name: "Behance", url: "https://behance.net/dattathota", id: "BE" },
    { name: "Dribbble", url: "https://dribbble.com/datta-thota", id: "DR" },
    { name: "LinkedIn", url: "https://linkedin.com/in/purushothama-datta", id: "LN" }
];

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('idle');

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');
        // REPLACE THESE WITH YOUR ACTUAL EMAILJS IDS
        const SERVICE_ID = 'service_q7hjb42';
        const TEMPLATE_ID = 'template_ctws4t6';
        const PUBLIC_KEY = 'ZasqFXAN0wKIctmTM';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                setStatus('success');
                form.current.reset();
                setTimeout(() => setStatus('idle'), 5000);
            }, (error) => {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            });
    };

    return (
        <section className="contact-section">
            <div className="contact-container container">

                {/* Header */}
                <div className="section-header-block">
                    <div className="header-content">
                        <h2 className="section-title">Contact</h2>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="contact-grid">

                    {/* Left: Socials List */}
                    <div className="socials-list">
                        <h3 className="list-label">SOCIALS</h3>
                        {socials.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-row"
                            >
                                <span className="social-id">{item.id}</span>
                                <span className="social-name">{item.name}</span>
                                <span className="social-arrow">↗</span>
                            </a>
                        ))}
                    </div>

                    {/* Right: Form */}
                    <div className="form-block">
                        <h3 className="list-label">SEND A MESSAGE</h3>
                        <form ref={form} onSubmit={sendEmail} className="minimal-form">
                            <div className="form-group">
                                <input type="text" name="user_name" placeholder="NAME" className="minimal-input" required />
                            </div>
                            <div className="form-group">
                                <input type="email" name="user_email" placeholder="EMAIL" className="minimal-input" required />
                            </div>
                            <div className="form-group">
                                <textarea name="message" placeholder="MESSAGE" className="minimal-input minimal-textarea" required></textarea>
                            </div>
                            <button
                                className={`minimal-submit-btn ${status}`}
                                disabled={status === 'sending' || status === 'success'}
                            >
                                {status === 'idle' && 'SEND MESSAGE ➔'}
                                {status === 'sending' && 'SENDING...'}
                                {status === 'success' && 'SENT SEAMLESSLY'}
                                {status === 'error' && 'ERROR'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
