"use client";

import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';

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

  const btnBaseClass = "flex items-center justify-center w-[44px] h-[44px] rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] cursor-pointer transition-all duration-200 absolute top-[40%] -translate-y-1/2 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:border-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]";
  const disabledClass = "opacity-0 pointer-events-none";

  return (
    <div className="flex flex-col">
      <div>
        <h2 className="pdp-cross-sell-title">{title}</h2>
      </div>
      
      <div className="relative">
        <button 
          className={`${btnBaseClass} left-[-22px] ${!canScrollLeft ? disabledClass : ''}`}
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
          className={`${btnBaseClass} right-[-22px] ${!canScrollRight ? disabledClass : ''}`}
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
