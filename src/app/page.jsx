"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { products } from '@/data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="hero-title">
              Modern Clothing for Women and Men
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-subtitle">
              Sagasa offers timeless clothing collections for everyday wear. 
              Minimalist design, comfort, and quality fabrics.
            </motion.p>
            <motion.div variants={itemVariants} className="hero-actions">
              <Button to="/shop" variant="primary">Shop Collection</Button>
              <Button to="/shop" variant="outline">Explore New Arrivals</Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Sagasa Fashion" 
              className="hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="marquee-item">
                Free shipping on orders over $149 <span className="marquee-separator">•</span>
              </span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`dup-${i}`} className="marquee-item">
                Free shipping on orders over $149 <span className="marquee-separator">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section section">
        <div className="container">
          <div className="categories-grid">
            <Link href="/shop?category=women" className="category-card">
              <div className="category-image-wrapper">
                <img src="https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Women" />
              </div>
              <div className="category-overlay">
                <h2>Women</h2>
                <span className="category-link">Shop Now <ArrowRight size={16} /></span>
              </div>
            </Link>
            <div className="categories-column">
              <Link href="/shop?category=men" className="category-card">
                <div className="category-image-wrapper">
                  <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Men" />
                </div>
                <div className="category-overlay">
                  <h2>Men</h2>
                  <span className="category-link">Shop Now <ArrowRight size={16} /></span>
                </div>
              </Link>
              <Link href="/shop?category=accessories" className="category-card">
                <div className="category-image-wrapper">
                  <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Accessories" />
                </div>
                <div className="category-overlay">
                  <h2>Accessories</h2>
                  <span className="category-link">Shop Now <ArrowRight size={16} /></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured-section section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Collection</h2>
            <Link href="/shop" className="view-all-link">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="story-section section">
        <div className="container story-container">
          <motion.div 
            className="story-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Sagasa Studio" />
          </motion.div>
          <motion.div 
            className="story-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>The Sagasa Philosophy</h2>
            <p>
              We believe that clothing should be an extension of yourself—effortless, comfortable, and beautifully designed. Our collections are crafted with the utmost attention to detail, using sustainable fabrics that stand the test of time.
            </p>
            <Button to="/about" variant="outline">Read Our Story</Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
