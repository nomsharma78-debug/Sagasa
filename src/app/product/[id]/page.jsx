"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ChevronLeft, ChevronRight, Heart, Star, ChevronDown, ChevronUp, CheckCircle, Tag, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import ProductReviews from '@/components/ProductReviews';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [openAccordions, setOpenAccordions] = useState({ description: true, details: false, shipping: false });

  // When ID changes, load the new product and reset state
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(0);
      setQuantity(1);
      setSelectedSize('M');
    }
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container section text-center" style={{ paddingTop: '150px' }}>
        <h2>Product not found</h2>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
          <div className="btn-content">Return to Shop</div>
        </Link>
      </div>
    );
  }

  const images = [product.image1, product.image2, product.image3].filter(Boolean);
  const sizes = ['26', '28', '30', '32', '34', '36'];
  const rating = product.isBestseller ? 4.9 : 4.5;
  const reviewsCount = product.isBestseller ? 342 : 87;
  const brandName = "Sagasa";

  // Grab 8 similar products (same category, excluding this one)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  // If not enough similar products, pad with other categories
  if (similarProducts.length < 8) {
    const more = products.filter(p => p.id !== product.id && !similarProducts.includes(p));
    similarProducts.push(...more.slice(0, 8 - similarProducts.length));
  }

  // Grab 8 products for "Complete Your Style With These"
  const completeYourStyleProducts = [...products]
    .filter(p => p.id !== product.id && !similarProducts.includes(p))
    .slice(0, 8);

  // If not enough unique products, just use some bestsellers
  if (completeYourStyleProducts.length < 8) {
    const more = products.filter(p => p.id !== product.id && !completeYourStyleProducts.includes(p));
    completeYourStyleProducts.push(...more.slice(0, 8 - completeYourStyleProducts.length));
  }

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pdp-page">
      {/* Breadcrumbs */}
      <div className="pdp-breadcrumbs container">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href={`/shop?category=${product.category}`} style={{ textTransform: 'capitalize' }}>
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="current-page">{product.title}</span>
      </div>

      <div className="pdp-main-grid container">
        {/* Left Column: Gallery */}
        <div className="pdp-gallery-column">
          <div className="pdp-gallery-sticky">
            {images.length > 1 && (
              <div className="pdp-thumbnails">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`pdp-thumb-btn ${activeImage === idx ? 'active' : ''}`}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
            
            <div className="pdp-main-image">
              <button 
                className="pdp-gallery-arrow pdp-gallery-prev" 
                onClick={() => setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="pdp-gallery-arrow pdp-gallery-next" 
                onClick={() => setActiveImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="pdp-oversized-badge">STRAIGHT FIT</div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="pdp-info-column">
          <div className="pdp-brand">{brandName}</div>
          <h1 className="pdp-title">{product.title}</h1>
          
          <div className="pdp-price-row">
            <div className="pdp-price-group">
              <span className="pdp-price">₹{product.price}</span>
              {product.oldPrice && (
                <span className="pdp-old-price">₹{product.oldPrice}</span>
              )}
              {product.oldPrice && (
                <span className="pdp-discount-percent">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
              )}
            </div>
            <div className="pdp-rating-pill">
              <Star size={12} fill="currentColor" color="currentColor" />
              <span>{rating}</span>
              <span className="pdp-rating-divider">|</span>
              <span>{reviewsCount}</span>
            </div>
          </div>
          <div className="pdp-tax-info">inclusive of all taxes</div>

          <p className="pdp-short-desc" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{product.description}</p>
          {/* Size Selector */}
          <div className="pdp-size-section">
            <div className="pdp-size-header">
              <span className="pdp-size-label">Select Size</span>
              <button className="pdp-size-guide">Size guide {'>'}</button>
            </div>
            <div className="pdp-size-grid">
              {sizes.map((size, index) => {
                const stock = index === 4 ? 5 : (index === 5 ? 6 : null);
                return (
                  <div className="pdp-size-wrapper" key={size}>
                    <button
                      className={`pdp-size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                    {stock && <div className="pdp-size-stock">{stock} left</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pdp-actions-row">
            <button className="pdp-add-to-bag">
              <ShoppingBag size={20} />
              ADD TO BAG
            </button>
            <button className="pdp-wishlist-icon-btn" aria-label="Add to Wishlist">
              <Heart size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Delivery Details */}
          <div className="pdp-delivery">
            <h3 className="pdp-section-title">Check for Delivery Details</h3>
            <div className="pdp-delivery-input-group">
              <input type="text" placeholder="Enter Pincode" />
              <button>Check</button>
            </div>
          </div>


          {/* Key Highlights */}
          <div className="pdp-highlights">
            <h3 className="pdp-section-title">Key Highlights</h3>
            <div className="pdp-highlights-grid">
              <div className="pdp-highlight-item">
                <span className="highlight-label">Style</span>
                <span className="highlight-value">Straight Leg</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="highlight-label">Fit</span>
                <span className="highlight-value">High-Rise</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="highlight-label">Closure</span>
                <span className="highlight-value">Button & Zip Fly</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="highlight-label">Occasion</span>
                <span className="highlight-value">Casual Wear</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="highlight-label">Pockets</span>
                <span className="highlight-value">5-Pocket Design</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="highlight-label">Wash Care</span>
                <span className="highlight-value">Machine Wash Cold</span>
              </div>
            </div>
          </div>


          {/* Accordions */}
          <div className="pdp-accordions">
            {/* Description */}
            <div className="pdp-accordion-item">
              <button 
                className="pdp-accordion-header"
                onClick={() => toggleAccordion('description')}
              >
                <span>Product Description</span>
                {openAccordions.description ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openAccordions.description && (
                  <motion.div 
                    className="pdp-accordion-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p>{product.description}</p>
                    <p style={{ marginTop: '1rem' }}>Designed with precision and crafted from the finest materials, this piece embodies the Sagasa commitment to modern luxury and everyday wearability.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Details & Composition */}
            <div className="pdp-accordion-item">
              <button 
                className="pdp-accordion-header"
                onClick={() => toggleAccordion('details')}
              >
                <span>Details & Composition</span>
                {openAccordions.details ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openAccordions.details && (
                  <motion.div 
                    className="pdp-accordion-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <ul style={{ paddingLeft: '1.2rem', color: 'var(--color-text-muted)' }}>
                      <li>Signature Sagasa hardware detailing</li>
                      <li>Durable construction for longevity</li>
                      <li>Sourced from sustainable partners</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping & Returns */}
            <div className="pdp-accordion-item">
              <button 
                className="pdp-accordion-header"
                onClick={() => toggleAccordion('shipping')}
              >
                <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                  <span className="pdp-accordion-icon">🔄</span>
                  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <span>15 Days Returns & Exchange</span>
                    <span style={{fontSize:'0.75rem', color:'var(--color-text-muted)', fontWeight:400}}>Know about return & exchange policy</span>
                  </div>
                </div>
                {openAccordions.shipping ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openAccordions.shipping && (
                  <motion.div 
                    className="pdp-accordion-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p><strong>Standard Shipping:</strong> 3-5 business days.</p>
                    <p><strong>Express Shipping:</strong> 1-2 business days.</p>
                    <p style={{ marginTop: '0.5rem' }}>We accept returns within 15 days of the delivery date. Items must be unworn and in original condition with all tags attached.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>


          {/* Trust Badges */}
          <div className="pdp-trust-badges">
            <div className="pdp-trust-badge">
              <div className="pdp-trust-icon">✓</div>
              <span className="pdp-trust-text">100% GENUINE<br/>PRODUCT</span>
            </div>
            <div className="pdp-trust-badge">
              <div className="pdp-trust-icon">💳</div>
              <span className="pdp-trust-text">100% SECURE<br/>PAYMENT</span>
            </div>
            <div className="pdp-trust-badge">
              <div className="pdp-trust-icon">🔄</div>
              <span className="pdp-trust-text">EASY RETURNS &<br/>INSTANT REFUNDS</span>
            </div>
          </div>


          <ProductReviews />
        </div>
      </div>

      {/* Complete Your Style Section */}
      <div className="pdp-cross-sell container">
        <ProductCarousel 
          title="Complete Your Style With These" 
          products={completeYourStyleProducts} 
        />
      </div>

      {/* You May Also Like Section */}
      <div className="pdp-cross-sell container">
        <h2 className="pdp-cross-sell-title">You May Also Like</h2>
        <div className="pdp-vertical-scroll">
          {similarProducts.slice(0, 10).map(prod => (
            <div className="pdp-vertical-item" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
