import React from 'react';
import ProjectCard from '../project/ProjectCard';
import { projects } from '../../data/projects';
import './Portfolio.css';

const Portfolio = () => {
    return (
        <section className="portfolio-section container">
            <div className="portfolio-header">
                <h2 className="section-title">Selected Works</h2>
                <span className="project-count">({projects.length})</span>
            </div>

            <div className="portfolio-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
