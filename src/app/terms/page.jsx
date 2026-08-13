"use client";
import { motion } from 'framer-motion';

const LegalPageLayout = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container container section"
    >
      <div className="page-header text-center" style={{ marginBottom: '4rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function Terms() {
  return (
    <LegalPageLayout title="Terms of Service">
      <h2>1. Introduction</h2>
      <p style={{ marginBottom: '1.5rem' }}>Welcome to Sagasa. By accessing our website, you agree to these Terms of Service. Please read them carefully.</p>
      <h2>2. Use of the Site</h2>
      <p style={{ marginBottom: '1.5rem' }}>You may use our site for lawful purposes only. You must not use our site in any way that causes, or may cause, damage to the site or impairment of the availability or accessibility of the site.</p>
      <h2>3. Intellectual Property</h2>
      <p>All content included on the site, such as text, graphics, logos, images, is the property of Sagasa or its content suppliers and protected by copyright laws.</p>
    </LegalPageLayout>
  );
}