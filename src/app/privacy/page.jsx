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

export default function Privacy() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <h2>Information We Collect</h2>
      <p style={{ marginBottom: '1.5rem' }}>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our customer support.</p>
      <h2>How We Use Information</h2>
      <p style={{ marginBottom: '1.5rem' }}>We use the information we collect to process transactions, communicate with you about your orders, and improve our services and website.</p>
      <h2>Sharing of Information</h2>
      <p>We do not sell your personal information. We may share your information with third-party service providers who help us operate our business, such as payment processors and shipping companies.</p>
    </LegalPageLayout>
  );
}