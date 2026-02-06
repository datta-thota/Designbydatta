import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShareButton.css';

const ShareButton = ({ title, text, url }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: title || document.title,
            text: text || "Check out this design by Datta Thota",
            url: url || window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(shareData.url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    return (
        <div className="share-button-wrapper">
            <motion.button
                className="share-btn"
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share project"
            >
                <div className="icon-container">
                    {copied ? <Check size={18} /> : <Share2 size={18} />}
                </div>
                <span className="share-label">{copied ? 'Copied Link' : 'Share'}</span>
            </motion.button>
        </div>
    );
};

export default ShareButton;
