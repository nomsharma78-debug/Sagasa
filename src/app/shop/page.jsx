"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import './Shop.css';

const Shop = () => {
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
      className="shop-page container"
    >
      <div className="catalog-toolbar">
        <div className="catalog-title-wrapper">
          <h1 className="catalog-title">
            {activeCategory === 'all' ? 'Shop Collection' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h1>
        </div>
      </div>

      <div className="catalog-grid">
        {filteredProducts.map((product, index) => {
          // Inject a full-width promotional banner after the 4th item (index 3)
          if (index === 4 && activeCategory === 'all') {
            return (
              <React.Fragment key="promo-banner-1">
                <div className="catalog-promo-banner">
                  <div className="promo-content">
                    <h2>The Essentials Edit</h2>
                    <p>Elevate your everyday wardrobe with our curated selection of timeless staples.</p>
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
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Shop;
