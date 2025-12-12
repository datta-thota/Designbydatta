import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import TechLayout from './components/layout/TechLayout';

// Pages
import LandingPage from './pages/LandingPage';
import DesignHome from './pages/DesignHome';
import ProjectDetails from './pages/ProjectDetails';
import DesignDetails from './pages/DesignDetails';
import TechHome from './pages/TechHome';
import TechProjectDetails from './pages/TechProjectDetails';
import About from './pages/About';
import Contact from './pages/Contact';

import ScrollToTop from './components/common/ScrollToTop';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Root - Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Design Portfolio Routes */}
        <Route path="/design" element={
          <Layout context="design">
            <DesignHome />
          </Layout>
        } />
        <Route path="/design/project/:id" element={
          <Layout context="design">
            <ProjectDetails />
          </Layout>
        } />
        <Route path="/design/design/:id" element={
          <Layout context="design">
            <DesignDetails />
          </Layout>
        } />

        {/* Legacy Redirects or Keep Handling? 
                    Keep /project/:id accessible via Layout(design) for backward compatibility if needed, 
                    but best to standardize. I'll update references to include /design prefix where possible 
                    but React Router matches exactly.
                 */}
        <Route path="/project/:id" element={
          <Layout context="design">
            <ProjectDetails />
          </Layout>
        } />
        <Route path="/design/:id" element={
          <Layout context="design">
            <DesignDetails />
          </Layout>
        } />


        {/* Tech Portfolio Routes */}
        <Route path="/tech" element={
          <TechLayout>
            <TechHome />
          </TechLayout>
        } />
        <Route path="/tech/project/:id" element={
          <TechLayout>
            <TechProjectDetails />
          </TechLayout>
        } />

        {/* Shared Pages (Context is tricky here, default to design for now or pass context via state?) 
                    For now, About and Contact can just default to 'design' layout or 'tech' if we want duplicates.
                    Let's stick to 'design' layout for shared pages as they are personal.
                */}
        <Route path="/about" element={
          <Layout context="design">
            <About />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout context="design">
            <Contact />
          </Layout>
        } />

      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
