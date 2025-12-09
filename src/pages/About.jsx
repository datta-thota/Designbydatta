import React from 'react';
import AboutSection from '../components/sections/About';
import PageTransition from '../components/common/PageTransition';

const About = () => {
    return (
        <PageTransition>
            <AboutSection />
        </PageTransition>
    );
};

export default About;
