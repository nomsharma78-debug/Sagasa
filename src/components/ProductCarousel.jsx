"use client";

import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductCarousel.css';

// Unique SVG icons for the scroll buttons
const LeftArrowSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const RightArrowSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ProductCarousel = ({ title, products }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="product-carousel-wrapper">
      <div className="product-carousel-header">
        <h2 className="pdp-cross-sell-title">{title}</h2>
      </div>
      
      <div className="carousel-track-container">
        <button 
          className={`carousel-control-btn left-btn ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll Left"
        >
          <LeftArrowSVG />
        </button>
        
        <div 
          className="pdp-cross-sell-scroll" 
          ref={scrollRef} 
          onScroll={checkScroll}
        >
          {products.map(prod => (
            <div className="pdp-cross-sell-item" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>

        <button 
          className={`carousel-control-btn right-btn ${!canScrollRight ? 'disabled' : ''}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll Right"
        >
          <RightArrowSVG />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
