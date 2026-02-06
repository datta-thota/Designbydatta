import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { latestDesigns } from '../data/latestDesigns';
import PageTransition from '../components/common/PageTransition';
import ImageModal from '../components/common/ImageModal';
import { Maximize2 } from 'lucide-react';
import ShareButton from '../components/common/ShareButton';
import './DesignDetails.css';

const DesignDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const design = latestDesigns.find(d =>
        (d.slug && d.slug === id) ||
        d.id === parseInt(id)
    );

    if (!design) {
        return <div className="container flex-center full-screen">Design not found</div>;
    }

    const currentIndex = latestDesigns.indexOf(design);
    const nextDesign = latestDesigns[(currentIndex + 1) % latestDesigns.length];
    const prevDesign = latestDesigns[(currentIndex - 1 + latestDesigns.length) % latestDesigns.length];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <PageTransition>
            <div className="design-details-page">
                <div className="container">
                    <Link to="/design" className="back-link" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none'
                    }}>
                        ← Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="design-details-title" style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            marginBottom: '1rem',
                            lineHeight: 1.1
                        }}>
                            {design.title}
                        </h1>

                        <div className="design-meta" style={{ marginBottom: '3rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <span>{design.date}</span>
                            <ShareButton title={`${design.title} | Datta Thota`} url={window.location.href} />
                        </div>

                        <div
                            className="design-full-image"
                            onClick={() => setSelectedImage(design.image)}
                        >
                            <div className="zoom-hint">
                                <Maximize2 size={20} />
                            </div>
                            <img
                                src={design.image}
                                alt={design.title}
                            />
                        </div>

                        <ImageModal
                            isOpen={!!selectedImage}
                            onClose={() => setSelectedImage(null)}
                            imageSrc={selectedImage}
                            altText={design.title}
                        />

                        <div className="design-description" style={{
                            maxWidth: '800px',
                            fontSize: '1.1rem',
                            lineHeight: 1.6,
                            color: 'var(--text-primary, #ddd)'
                        }}>
                            <p>{design.description}</p>
                        </div>

                        {/* Gallery Grid for Multiple Images */}
                        {design.gallery && design.gallery.length > 0 && (
                            <div className="design-gallery">
                                {design.gallery.filter(img => img !== design.image).map((img, index) => (
                                    <motion.div
                                        key={index}
                                        className="gallery-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt={`${design.title} detail ${index + 1}`} loading="lazy" />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div >

                    <div className="project-navigation" style={{
                        marginTop: '5rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '2rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Link to={`/design/${prevDesign.slug || prevDesign.id}`} className="nav-btn prev" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="nav-label" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Previous</span>
                            <span className="nav-title" style={{ fontSize: '1.1rem' }}>{prevDesign.title}</span>
                        </Link>
                        <Link to={`/design/${nextDesign.slug || nextDesign.id}`} className="nav-btn next" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
                            <span className="nav-label" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Next</span>
                            <span className="nav-title" style={{ fontSize: '1.1rem' }}>{nextDesign.title}</span>
                        </Link>
                    </div>
                </div >
            </div >
        </PageTransition >
    );
};

export default DesignDetails;
