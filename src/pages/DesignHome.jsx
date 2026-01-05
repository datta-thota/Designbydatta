import React from 'react';
import Hero from '../components/sections/Hero';
import Portfolio from '../components/sections/Portfolio';
import LatestDesigns from '../components/sections/LatestDesigns';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import PageTransition from '../components/common/PageTransition';
import { motion, useScroll, useTransform } from 'framer-motion';

const DesignHome = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);

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
                <br />
                <br />
                <LatestDesigns />

                <motion.div style={{ y: y2 }}>
                    <Portfolio />
                </motion.div>

                <div style={{ height: 'var(--space-xl)' }}></div>

                <About />
                <div style={{ height: 'var(--space-lg)' }}></div>
                <Contact />
            </div>

            <style jsx>{`
                .design-home-experimental {
                    position: relative;
                    overflow: hidden;
                }
                .chaos-text-bg {
                    position: absolute;
                    top: 20%;
                    right: -10%;
                    font-size: 12vw;
                    font-weight: 900;
                    opacity: 0.03;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 0;
                    color: var(--text-white);
                    transform: rotate(-5deg);
                }
            `}</style>
        </PageTransition>
    );
};

export default DesignHome;
