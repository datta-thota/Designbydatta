import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import Portfolio from '../components/sections/Portfolio';
import LatestDesigns from '../components/sections/LatestDesigns';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import PageTransition from '../components/common/PageTransition';
import { motion, useScroll, useTransform } from 'framer-motion';
import './DesignHome.css';

const DesignHome = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <PageTransition>
            <div className="design-home-experimental">
                <Helmet>
                    <title>Datta Thota | Visual & Product Designer</title>
                    <meta name="description" content="Visual Design Portfolio featuring editorial layouts, brand systems, and immersive digital experiences." />
                </Helmet>
                <Hero />

                {/* Intentional Chaos Decorative Element */}
                <motion.div
                    style={{ y: y1 }}
                    className="chaos-text-bg"
                >
                    CREATIVE PLAYGROUND // NO RULES // DESIGN FIRST
                </motion.div>
                <LatestDesigns />

                <Portfolio />

                <About />
                <Contact />
            </div>
        </PageTransition>
    );
};

export default DesignHome;
