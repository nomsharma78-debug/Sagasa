"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'The Art of Minimalist Dressing',
    excerpt: 'Discover how a few key pieces can transform your wardrobe and simplify your daily routine.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'Oct 15, 2026'
  },
  {
    id: 2,
    title: 'Sustainable Fabrics: What to Look For',
    excerpt: 'A guide to understanding organic cotton, linen, and other eco-friendly materials.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'Oct 02, 2026'
  },
  {
    id: 3,
    title: 'Transitioning Your Wardrobe for Autumn',
    excerpt: 'Layering techniques and essential pieces for the changing seasons.',
    image: 'https://images.unsplash.com/photo-1550639524-a6f58345a278?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'Sep 18, 2026'
  }
];

const Journal = () => {
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
          Journal
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}
        >
          Stories, guides, and thoughts on modern living and style.
        </motion.p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
        {posts.map((post, index) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ aspectRatio: '3/2', overflow: 'hidden', borderRadius: '8px' }}>
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>{post.date}</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{post.title}</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{post.excerpt}</p>
              <Link href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default Journal;
