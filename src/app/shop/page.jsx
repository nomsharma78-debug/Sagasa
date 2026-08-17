"use client";

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import SagasaLoader from '@/components/SagasaLoader';

const ShopContent = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [isSwitching, setIsSwitching] = useState(false);
  const prevCategoryRef = useRef(categoryParam);

  useEffect(() => {
    const next = searchParams.get('category') || 'all';
    if (prevCategoryRef.current !== next) {
      setIsSwitching(true);
      const t = setTimeout(() => { setActiveCategory(next); setIsSwitching(false); }, 450);
      prevCategoryRef.current = next;
      return () => clearTimeout(t);
    }
    setActiveCategory(next);
  }, [searchParams]);

  const filtered = products.filter(p => {
    if (activeCategory === 'all' || activeCategory === 'new-arrivals') return true;
    if (activeCategory === 'sales' || activeCategory === 'sale') return p.isSale;
    if (activeCategory === 'bestsellers') return p.isBestseller;
    return p.category === activeCategory;
  });

  const getTitle = () => {
    if (activeCategory === 'all') return 'Shop Collection';
    if (activeCategory === 'new-arrivals') return 'New Arrivals';
    if (activeCategory === 'sale' || activeCategory === 'sales') return 'Sale';
    return activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
  };

  return (
    <>
      {isSwitching && <SagasaLoader />}
      <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-[calc(var(--header-height)+2rem)] pb-[var(--spacing-xl)] container">
        <div className="flex flex-col gap-6 mb-8 pb-4 border-b border-[var(--color-border)] md:flex-row md:justify-between md:items-end">
          <h1 className="text-[2rem] tracking-[-0.03em]">{getTitle()}</h1>
        </div>

        <div className="grid grid-cols-2 gap-[2px] bg-[var(--color-border)] border border-[var(--color-border)] lg:grid-cols-4 [&>.product-card]:bg-[var(--color-background)] [&>.product-card]:p-0 [&>.product-card]:gap-0 [&_.product-info]:p-4">
          {filtered.map((product, index) => (
            <React.Fragment key={product.id}>
              {index === 4 && activeCategory === 'all' && (
                <div className="col-span-full bg-[var(--color-foreground)] text-[var(--color-background)] flex items-center justify-center text-center py-16 px-8 min-h-[400px]">
                  <div className="max-w-[500px] flex flex-col items-center gap-6">
                    <h2 className="text-[2.5rem] text-[var(--color-background)]">The Essentials Edit</h2>
                    <p className="text-lg opacity-90">Elevate your everyday wardrobe with our curated selection of timeless staples.</p>
                    <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                      <div className="btn-content">Explore</div>
                    </button>
                  </div>
                </div>
              )}
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--color-text-muted)] text-lg">
            <p>No products found in this category.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default function Shop() {
  return (
    <Suspense fallback={<SagasaLoader />}>
      <ShopContent />
    </Suspense>
  );
}
