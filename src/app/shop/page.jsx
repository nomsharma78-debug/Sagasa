"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const ShopContent = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'sales') return p.isSale;
    if (activeCategory === 'bestsellers') return p.isBestseller;
    return p.category === activeCategory;
  });

  const categories = ['all', 'men', 'women', 'sales', 'bestsellers'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-[calc(var(--header-height)+2rem)] pb-[var(--spacing-xl)] container"
    >
      <div className="flex flex-col gap-6 mb-8 pb-4 border-b border-[var(--color-border)] md:flex-row md:justify-between md:items-end">
        <div className="flex items-baseline gap-4">
          <h1 className="text-[2rem] tracking-[-0.03em]">
            {activeCategory === 'all' ? 'Shop Collection' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[2px] bg-[var(--color-border)] border border-[var(--color-border)] lg:grid-cols-4 [&>.product-card]:bg-[var(--color-background)] [&>.product-card]:p-0 [&>.product-card]:gap-0 [&_.product-info]:p-4">
        {filteredProducts.map((product, index) => {
          // Inject a full-width promotional banner after the 4th item (index 3)
          if (index === 4 && activeCategory === 'all') {
            return (
              <React.Fragment key="promo-banner-1">
                <div className="col-span-full bg-[var(--color-foreground)] text-[var(--color-background)] flex items-center justify-center text-center py-16 px-8 min-h-[400px]">
                  <div className="max-w-[500px] flex flex-col items-center gap-6">
                    <h2 className="text-[2.5rem] text-[var(--color-background)]">The Essentials Edit</h2>
                    <p className="text-lg opacity-90">Elevate your everyday wardrobe with our curated selection of timeless staples.</p>
                    <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                      <div className="btn-content">Explore</div>
                    </button>
                  </div>
                </div>
                <ProductCard key={product.id} product={product} />
              </React.Fragment>
            );
          }

          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 text-[var(--color-text-muted)] text-lg">
          <p>No products found in this category.</p>
        </div>
      )}
    </motion.div>
  );
};

const Shop = () => {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 container text-center">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
};

export default Shop;
