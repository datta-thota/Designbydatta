import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, context = 'design' }) => {
    const location = useLocation();

    return (
        <>
            <div className="grain-overlay"></div>
            <Navbar context={context} />
            <main key={location.pathname}>
                {children}
            </main>
            {/* Footer can go here */}
        </>
    );
};

export default Layout;
