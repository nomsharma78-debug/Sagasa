"use client";

import { motion } from 'framer-motion';
import Accordion from '@/components/Accordion';

const faqData = [
  {
    title: 'What is your return policy?',
    content: 'We accept returns within 30 days of the original purchase date for unused and unwashed items with tags still attached. Please note that sale items are final and cannot be returned.'
  },
  {
    title: 'How long does shipping take?',
    content: 'Standard shipping typically takes 3-5 business days within the US. International shipping can take anywhere from 7-14 business days depending on the destination.'
  },
  {
    title: 'Do you ship internationally?',
    content: 'Yes, we ship to over 50 countries worldwide. Shipping costs will apply and will be added at checkout.'
  },
  {
    title: 'How do I care for my garments?',
    content: 'We recommend washing all our garments in cold water and hanging them to dry to preserve the fabric quality and fit. Specific care instructions can be found on the label of each item.'
  }
];

const FAQ = () => {
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
          Frequently Asked Questions
        </motion.h1>
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion items={faqData} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQ;
