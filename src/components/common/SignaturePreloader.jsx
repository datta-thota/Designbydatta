import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './SignaturePreloader.css';
import signatureSvg from '../../assets/signature.svg';

const SignaturePreloader = ({ onLoadingComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 1600); // Even quicker per user request
        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="signature-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="signature-text-container">
                <motion.div
                    className="signature-svg-wrapper"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{
                        duration: 1.0,
                        ease: [0.45, 0.05, 0.55, 0.95],
                        delay: 0.1
                    }}
                >
                    <img
                        src={signatureSvg}
                        alt="Signature"
                        className="signature-svg"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SignaturePreloader;

