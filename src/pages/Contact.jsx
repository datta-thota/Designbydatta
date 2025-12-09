import React from 'react';
import ContactSection from '../components/sections/Contact';
import PageTransition from '../components/common/PageTransition';

const Contact = () => {
    return (
        <PageTransition>
            <ContactSection />
        </PageTransition>
    );
};

export default Contact;
