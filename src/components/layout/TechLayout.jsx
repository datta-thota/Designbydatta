import React from 'react';
import TechNavbar from './TechNavbar';
import CustomCursor from '../common/CustomCursor';
import { useLocation } from 'react-router-dom';

const TechLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="tech-layout-wrapper" style={{ background: '#0a0a0a', minHeight: '100vh', color: '#e0e0e0' }}>
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
