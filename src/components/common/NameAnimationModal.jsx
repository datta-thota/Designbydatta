import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NameAnimationModal.css';

const NameAnimationModal = ({ isOpen, onClose }) => {
    const firstName = "DATTA".split("");
    const lastName = "THOTA".split("");

    const letterVariants = {
        hidden: { y: 80, opacity: 0, scale: 0.5, rotateY: 90 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200
            }
        },
        exit: {
            y: -50,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        exit: { opacity: 0, scale: 1.1 }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="elite-animation-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <button className="elite-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

                <motion.div
                    className="elite-name-popup"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Decorative Technical Elements */}
                    <div className="popup-bg-grid"></div>
                    <div className="corner-decor tl"></div>
                    <div className="corner-decor tr"></div>
                    <div className="corner-decor bl"></div>
                    <div className="corner-decor br"></div>

                    <div className="tech-rules">
                        <div className="rule-v"></div>
                        <div className="rule-h"></div>
                    </div>

                    <div className="kinetic-container">
                        <div className="name-block-elite">
                            <div className="name-row-elite first">
                                {firstName.map((char, i) => (
                                    <div key={`first-${i}`} className="letter-wrapper">
                                        <motion.span variants={letterVariants} className="l-main">{char}</motion.span>
                                        <motion.span variants={letterVariants} className="l-trail trail-1">{char}</motion.span>
                                        <motion.span variants={letterVariants} className="l-trail trail-2">{char}</motion.span>
                                    </div>
                                ))}
                            </div>
                            <div className="name-row-elite last">
                                {lastName.map((char, i) => (
                                    <div key={`last-${i}`} className="letter-wrapper">
                                        <motion.span variants={letterVariants} className="l-main">{char}</motion.span>
                                        <motion.span variants={letterVariants} className="l-trail trail-1">{char}</motion.span>
                                        <motion.span variants={letterVariants} className="l-trail trail-2">{char}</motion.span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="elite-badge"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <span className="badge-inner">VISUAL DESIGNER & DEV</span>
                        </motion.div>
                    </div>

                    <div className="popup-footer">
                        <div className="system-code">ID: 1768223228525 // BOOT_SEQUENCE: ACTIVE</div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NameAnimationModal;
