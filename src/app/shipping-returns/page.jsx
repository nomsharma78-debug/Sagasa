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

export default function Shipping() {
  return (
    <LegalPageLayout title="Shipping & Returns">
      <h2>Shipping Information</h2>
      <p style={{ marginBottom: '1.5rem' }}>We process and ship orders Monday through Friday, excluding holidays. Orders are typically processed within 1-2 business days.</p>
      <ul>
        <li>Standard Shipping (3-5 business days): $8.00</li>
        <li>Express Shipping (1-2 business days): $25.00</li>
        <li>Free standard shipping on all orders over $149.</li>
      </ul>
      <h2 style={{ marginTop: '2rem' }}>Returns Policy</h2>
      <p>We want you to be completely satisfied with your purchase. If you need to return an item, we accept returns within 30 days of the original purchase date. Items must be unworn, unwashed, and have the original tags attached.</p>
    </LegalPageLayout>
  );
}