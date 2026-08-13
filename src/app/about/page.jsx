"use client";

import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container container section"
    >
      <div className="page-header text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Story
        </motion.h1>
      </div>
      
      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginTop: '3rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="About Sagasa" 
            style={{ width: '100%', borderRadius: '8px', aspectRatio: '21/9', objectFit: 'cover' }}
          />
        </motion.div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Founded with a vision to redefine modern minimalism, Sagasa is more than just a clothing brand. We are a lifestyle dedicated to the pursuit of effortless elegance, sustainable practices, and timeless design.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Every piece in our collection is meticulously crafted to ensure the highest quality. We source our materials from ethical suppliers who share our commitment to environmental responsibility. Our garments are designed to transcend seasons, becoming trusted staples in your wardrobe for years to come.
          </p>
          <p>
            We believe that true luxury lies in simplicity and the quiet confidence that comes from wearing clothes that feel as good as they look. Welcome to Sagasa.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
