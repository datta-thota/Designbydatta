import React from 'react';
import { motion } from 'framer-motion';
import ShareButton from '../common/ShareButton'; // Import ShareButton
import './BehanceProjectLayout.css';

const BehanceProjectLayout = ({ project }) => {
    return (
        <div className="behance-layout">
            <motion.div
                className="project-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="project-hero-image"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        opacity: 0.5
                    }}
                />
                <div className="project-hero-content container">
                    <motion.h1
                        className="project-title"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {project.title}
                    </motion.h1>
                    <motion.div
                        className="project-meta"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className="meta-item">
                            <span className="label">Category</span>
                            <span className="value">{project.category}</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Year</span>
                            <span className="value">{project.year}</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Role</span>
                            <span className="value">{project.role || "Lead Designer"}</span>
                        </div>
                        <div className="meta-item">
                            <ShareButton title={`${project.title} | Datta Thota`} />
                        </div>
                    </motion.div >
                </div >
            </motion.div >

            <div className="behance-content">
                {project.content.map((block, index) => (
                    <ContentBlock key={index} block={block} index={index} />
                ))}
            </div>

            {/* Footer removed to match standard project style */}
        </div >
    );
};

const ContentBlock = ({ block, index }) => {
    const blockStyle = {
        marginBottom: block.spacing || block.marginBottom ? (typeof block.spacing === 'number' ? `${block.spacing}px` : block.spacing) : undefined,
    };

    switch (block.type) {
        case 'image':
            return (
                <motion.div
                    className={`behance-block image-block ${block.fullWidth ? 'full-width' : 'container'} ${block.mobileContained ? 'mobile-contained' : ''}`}
                    style={blockStyle}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                >
                    <img src={block.src} alt={block.caption || ''} loading="lazy" />
                    {block.caption && <p className="caption">{block.caption}</p>}
                </motion.div>
            );

        case 'rich-text':
            return (
                <motion.div
                    className="behance-block text-block container"
                    style={blockStyle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-content" dangerouslySetInnerHTML={{ __html: block.html }} />
                </motion.div>
            );

        case 'grid':
            return (
                <div
                    className={`behance-block grid-block container cols-${block.columns || 2} ${block.mobileStack ? 'stack-mobile' : ''}`}
                    style={blockStyle}
                >
                    {block.items.map((item, i) => (
                        <motion.div
                            key={i}
                            className="grid-item"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <img src={item.src} alt="" loading="lazy" />
                        </motion.div>
                    ))}
                </div>
            );

        case 'video':
            return (
                <motion.div
                    className={`behance-block video-block ${block.fullWidth ? 'full-width' : 'container'}`}
                    style={blockStyle}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <video
                        src={block.src}
                        poster={block.poster}
                        controls={block.controls !== false}
                        autoPlay={block.autoPlay}
                        muted={block.muted}
                        loop={block.loop}
                        playsInline
                    />
                </motion.div>
            );

        default:
            return null;
    }
};

export default BehanceProjectLayout;
