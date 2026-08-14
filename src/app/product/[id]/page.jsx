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
    <div className="pt-[25px] pb-[6rem]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-[0.5rem] text-[0.875rem] text-[var(--color-text-muted)] mb-[1.5rem] container">
        <Link href="/" className="text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Home</Link>
        <ChevronRight size={14} />
        <Link href={`/shop?category=${product.category}`} style={{ textTransform: 'capitalize' }} className="text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-[var(--color-foreground)] font-medium">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-[2rem] mb-0 min-[992px]:grid-cols-[1.2fr_1fr] min-[992px]:gap-[3rem] container">
        {/* Left Column: Gallery */}
        <div className="relative">
          <div className="flex gap-[1rem] sticky top-[calc(var(--header-height)+25px)]">
            {images.length > 1 && (
              <div className="flex flex-col gap-[0.75rem] w-[60px] shrink-0">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`w-full aspect-[3/4] bg-none border border-transparent p-0 cursor-pointer opacity-60 transition-all duration-200 ease-in overflow-hidden hover:opacity-100 hover:border-[var(--color-foreground)] ${activeImage === idx ? 'opacity-100 border-[var(--color-foreground)]' : ''}`}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)] max-h-[80vh]">
              <button 
                className="absolute top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.8)] border border-[var(--color-border)] text-[var(--color-foreground)] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer z-10 transition-all duration-200 ease-in shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-white left-[1rem]" 
                onClick={() => setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="absolute top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.8)] border border-[var(--color-border)] text-[var(--color-foreground)] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer z-10 transition-all duration-200 ease-in shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-white right-[1rem]" 
                onClick={() => setActiveImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute top-[1rem] left-[1rem] bg-[#fff] text-[#333] text-[0.75rem] font-bold py-[0.25rem] px-[0.5rem] rounded-[4px] tracking-[0.5px] z-10 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">STRAIGHT FIT</div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover block"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col">
          <div className="text-[0.875rem] uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-[0.25rem]">{brandName}</div>
          <h1 className="text-[1.75rem] font-normal font-[var(--font-display)] mb-[0.75rem] leading-[1.2]">{product.title}</h1>
          
          <div className="flex items-center justify-between mb-[0.5rem]">
            <div className="flex items-center gap-[0.5rem]">
              <span className="text-[1.5rem] font-bold text-[#111]">₹{product.price}</span>
              {product.oldPrice && (
                <span className="text-[1rem] text-[var(--color-text-muted)] line-through">₹{product.oldPrice}</span>
              )}
              {product.oldPrice && (
                <span className="text-[1rem] font-bold text-[#16a34a]">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
              )}
            </div>
            <div className="flex items-center gap-[0.25rem] bg-[var(--color-surface)] py-[0.25rem] px-[0.5rem] rounded-full text-[0.75rem] font-semibold border border-[var(--color-border)]">
              <Star size={12} fill="currentColor" color="currentColor" />
              <span>{rating}</span>
              <span className="text-[var(--color-text-muted)] font-normal">|</span>
              <span>{reviewsCount}</span>
            </div>
          </div>
          <div className="text-[0.75rem] text-[var(--color-text-muted)] mb-[1.5rem]">inclusive of all taxes</div>

          <p className="pdp-short-desc" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{product.description}</p>
          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-[0.75rem]">
              <span className="font-semibold text-[1rem]">Select Size</span>
              <button className="bg-none border-none text-[#0284c7] text-[0.875rem] font-medium cursor-pointer">Size guide {'>'}</button>
            </div>
            <div className="flex gap-[0.5rem] flex-wrap">
              {sizes.map((size, index) => {
                const stock = index === 4 ? 5 : (index === 5 ? 6 : null);
                return (
                  <div className="flex flex-col items-center gap-[0.25rem]" key={size}>
                    <button
                      className={`w-[3rem] h-[3rem] border border-[var(--color-border)] rounded-[4px] bg-none flex items-center justify-center text-[0.875rem] font-medium cursor-pointer transition-all duration-200 ease-in hover:border-[var(--color-foreground)] ${selectedSize === size ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                    {stock && <div className="text-[0.65rem] text-[#ef4444] font-semibold">{stock} left</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[0.5rem] mt-[1.5rem]">
            <button className="flex-1 flex items-center justify-center gap-[0.75rem] bg-[var(--color-foreground)] text-[var(--color-background)] border-none rounded-[4px] p-[1rem] text-[1rem] font-bold uppercase tracking-[0.05em] cursor-pointer transition-colors duration-200 ease-in hover:bg-[#333]">
              <ShoppingBag size={20} />
              ADD TO BAG
            </button>
            <button className="flex items-center justify-center w-[3.5rem] border border-[var(--color-border)] rounded-[4px] bg-none cursor-pointer text-[var(--color-foreground)] transition-all duration-200 ease-in hover:bg-[var(--color-surface)]" aria-label="Add to Wishlist">
              <Heart size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Delivery Details */}
          <div className="mt-6">
            <h3 className="text-[1rem] font-semibold mb-[1rem]">Check for Delivery Details</h3>
            <div className="flex mb-[0.75rem]">
              <input className="flex-1 p-[0.75rem] border border-[var(--color-border)] rounded-l-[4px] text-[0.875rem] outline-none focus:border-[#0284c7]" type="text" placeholder="Enter Pincode" />
              <button className="px-[1.5rem] py-0 border border-[var(--color-border)] border-l-0 bg-none text-[#0284c7] font-semibold rounded-r-[4px] cursor-pointer transition-colors duration-200 ease-in hover:bg-[var(--color-surface)]">Check</button>
            </div>
          </div>


          {/* Key Highlights */}
          <div className="mt-6">
            <h3 className="text-[1rem] font-semibold mb-[1rem]">Key Highlights</h3>
            <div className="grid grid-cols-2 gap-[1rem]">
              <div className="flex flex-col gap-[0.25rem]">
                <span className="text-[0.75rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">Style</span>
                <span className="text-[0.875rem] font-semibold">Straight Leg</span>
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <span className="text-[0.75rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">Fit</span>
                <span className="text-[0.875rem] font-semibold">High-Rise</span>
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <span className="text-[0.75rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">Closure</span>
                <span className="text-[0.875rem] font-semibold">Button & Zip Fly</span>
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <span className="text-[0.75rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">Occasion</span>
                <span className="text-[0.875rem] font-semibold">Casual Wear</span>
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <span className="text-[0.75rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">Pockets</span>
                <span className="text-[0.875rem] font-semibold">5-Pocket Design</span>
              </div>
              <div className="flex flex-col gap-[0.25rem]">
                <span className="text-[0.75rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">Wash Care</span>
                <span className="text-[0.875rem] font-semibold">Machine Wash Cold</span>
              </div>
            </div>
          </div>


          {/* Accordions */}
          <div className="flex flex-col mt-[1.5rem]">
            {/* Description */}
            <div className="border-b border-[var(--color-border)] last:border-b-0">
              <button 
                className="w-full flex justify-between items-center py-[1.25rem] px-0 bg-none border-none text-[1rem] font-medium cursor-pointer text-[var(--color-foreground)]"
                onClick={() => toggleAccordion('description')}
              >
                <span>Product Description</span>
                {openAccordions.description ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openAccordions.description && (
                  <motion.div 
                    className="overflow-hidden text-[var(--color-text-muted)] text-[0.875rem] leading-[1.6]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="pb-[1rem]">{product.description}</p>
                    <p className="pb-[1rem]" style={{ marginTop: '1rem' }}>Designed with precision and crafted from the finest materials, this piece embodies the Sagasa commitment to modern luxury and everyday wearability.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Details & Composition */}
            <div className="border-b border-[var(--color-border)] last:border-b-0">
              <button 
                className="w-full flex justify-between items-center py-[1.25rem] px-0 bg-none border-none text-[1rem] font-medium cursor-pointer text-[var(--color-foreground)]"
                onClick={() => toggleAccordion('details')}
              >
                <span>Details & Composition</span>
                {openAccordions.details ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openAccordions.details && (
                  <motion.div 
                    className="overflow-hidden text-[var(--color-text-muted)] text-[0.875rem] leading-[1.6]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <ul className="pb-[1rem]" style={{ paddingLeft: '1.2rem', color: 'var(--color-text-muted)' }}>
                      <li>Signature Sagasa hardware detailing</li>
                      <li>Durable construction for longevity</li>
                      <li>Sourced from sustainable partners</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shipping & Returns */}
            <div className="border-b border-[var(--color-border)] last:border-b-0">
              <button 
                className="w-full flex justify-between items-center py-[1.25rem] px-0 bg-none border-none text-[1rem] font-medium cursor-pointer text-[var(--color-foreground)]"
                onClick={() => toggleAccordion('shipping')}
              >
                <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                  <span className="text-[1.5rem] bg-[var(--color-surface)] rounded-full w-[40px] h-[40px] flex items-center justify-center">🔄</span>
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
                    className="overflow-hidden text-[var(--color-text-muted)] text-[0.875rem] leading-[1.6]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="pb-[1rem]"><strong>Standard Shipping:</strong> 3-5 business days.</p>
                    <p className="pb-[1rem]"><strong>Express Shipping:</strong> 1-2 business days.</p>
                    <p className="pb-[1rem]" style={{ marginTop: '0.5rem' }}>We accept returns within 15 days of the delivery date. Items must be unworn and in original condition with all tags attached.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>


          {/* Trust Badges */}
          <div className="flex justify-between items-start mt-[1.5rem]">
            <div className="flex flex-col items-center text-center gap-[0.5rem] flex-1">
              <div className="w-[48px] h-[48px] rounded-full border border-dashed border-[var(--color-border)] flex items-center justify-center text-[1.5rem] text-[var(--color-foreground)]">✓</div>
              <span className="text-[0.65rem] font-semibold text-[var(--color-text-muted)] tracking-[0.05em] uppercase">100% GENUINE<br/>PRODUCT</span>
            </div>
            <div className="flex flex-col items-center text-center gap-[0.5rem] flex-1">
              <div className="w-[48px] h-[48px] rounded-full border border-dashed border-[var(--color-border)] flex items-center justify-center text-[1.5rem] text-[var(--color-foreground)]">💳</div>
              <span className="text-[0.65rem] font-semibold text-[var(--color-text-muted)] tracking-[0.05em] uppercase">100% SECURE<br/>PAYMENT</span>
            </div>
            <div className="flex flex-col items-center text-center gap-[0.5rem] flex-1">
              <div className="w-[48px] h-[48px] rounded-full border border-dashed border-[var(--color-border)] flex items-center justify-center text-[1.5rem] text-[var(--color-foreground)]">🔄</div>
              <span className="text-[0.65rem] font-semibold text-[var(--color-text-muted)] tracking-[0.05em] uppercase">EASY RETURNS &<br/>INSTANT REFUNDS</span>
            </div>
          </div>


          <ProductReviews />
        </div>
      </div>

      {/* Complete Your Style Section */}
      <div className="container">
        <ProductCarousel 
          title="Complete Your Style With These" 
          products={completeYourStyleProducts} 
        />
      </div>

      {/* You May Also Like Section */}
      <div className="container">
        <h2 className="font-[var(--font-display)] text-[1.75rem] text-center mt-[48px] mb-[30px]">You May Also Like</h2>
        <div className="grid grid-cols-2 gap-[1.5rem] max-h-[800px] overflow-y-auto pr-[1rem] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid-cols-4 xl:grid-cols-5">
          {similarProducts.slice(0, 10).map(prod => (
            <div className="w-full" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
