import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const transform = useMotionTemplate`perspective(1000px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

    const CardContent = () => (
        <motion.div
            ref={ref}
            className="project-card"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="card-image"
                style={{ backgroundImage: `url(${project.image})` }}
            >
                <div className="card-overlay"></div>
            </div>

            <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-category">{project.category}</p>
            </div>
        </motion.div>
    );

    // If project has external link, use anchor tag; otherwise use React Router Link
    if (project.externalLink) {
        return (
            <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
            >
                <CardContent />
            </a>
        );
    }

    return (
        <Link to={`/design/project/${project.id}`} className="project-card-link">
            <CardContent />
        </Link>
    );
};

// Helper for transform
import { useTransform } from 'framer-motion';

export default ProjectCard;
