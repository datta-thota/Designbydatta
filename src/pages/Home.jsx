import React from 'react';
import Hero from '../components/sections/Hero';
import Portfolio from '../components/sections/Portfolio';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import PageTransition from '../components/common/PageTransition';

const Home = () => {
    return (
        <PageTransition>
            <Hero />
            <Portfolio />
            <div style={{ height: 'var(--space-xl)' }}></div>
            <About />
            <Contact />
        </PageTransition>
    );
};

export default Home;
