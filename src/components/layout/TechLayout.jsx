import React from 'react';
import { useLocation } from 'react-router-dom';
import TechNavbar from './TechNavbar';
import './TechLayout.css';

const TechLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="tech-layout-wrapper">
            {/* Can use a specific tech cursor or reuse common one if style matches */}
            {/* <CustomCursor /> Assuming CustomCursor adapts or we just use default pointer for tech */}
            <div className="scanline-overlay"></div>
            <TechNavbar />
            <main key={location.pathname}>
                {children}
            </main>
        </div>
    );
};

export default TechLayout;
