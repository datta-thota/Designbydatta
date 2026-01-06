import React from 'react';
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
