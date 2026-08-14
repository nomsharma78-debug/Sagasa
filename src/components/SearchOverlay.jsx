"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import Link from 'next/link';

import { products } from '@/data/products';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Handle search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) => 
        product.title.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );
    setResults(filtered);
  }, [searchQuery]);

  const searchResultItemClass = "flex flex-col gap-3 group flex-none w-[150px]";
  const searchResultImgClass = "w-full aspect-[3/4] overflow-hidden bg-[var(--color-surface)]";
  const searchResultImgInnerClass = "w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-105";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 w-full bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-[0_10px_30px_rgba(0,0,0,0.05)] z-[1000] pt-8 pb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container">
            <div className="flex items-center justify-between mb-8 border-b border-[var(--color-foreground)] pb-4">
              <div className="flex items-center flex-1 gap-4">
                <Search size={24} className="text-[var(--color-text-muted)]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none [font-family:var(--font-display)] text-[2rem] text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-border)]"
                />
              </div>
              <button className="bg-transparent border-none cursor-pointer text-[var(--color-foreground)] transition-transform duration-200 hover:rotate-90" onClick={onClose} aria-label="Close search">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            <div className="min-h-[200px]">
              {searchQuery && results.length > 0 && (
                <div className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {results.slice(0, 8).map((product) => (
                    <Link key={product.id} 
                      href={`/product/${product.id}`} 
                      className={searchResultItemClass}
                      onClick={onClose}
                    >
                      <div className={searchResultImgClass}>
                        <img src={product.image1} alt={product.title} className={searchResultImgInnerClass} />
                      </div>
                      <div className="search-result-info">
                        <h4 className="text-sm font-medium mb-1">{product.title}</h4>
                        <p className="text-sm text-[var(--color-text-muted)]">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && results.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-xl mb-2">No results found for "{searchQuery}"</p>
                  <p className="text-[var(--color-text-muted)] text-sm">Try searching for "dress", "jacket", or "sale"</p>
                </div>
              )}

              {!searchQuery && (
                <div>
                  <p className="text-sm uppercase tracking-[0.05em] text-[var(--color-text-muted)] mb-4">Trending Now</p>
                  <div className="flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {[...products].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)).slice(0, 8).map((product) => (
                      <Link key={product.id} 
                        href={`/product/${product.id}`} 
                        className={searchResultItemClass}
                        onClick={onClose}
                      >
                        <div className={searchResultImgClass}>
                          <img src={product.image1} alt={product.title} className={searchResultImgInnerClass} />
                        </div>
                        <div className="search-result-info">
                          <h4 className="text-sm font-medium mb-1">{product.title}</h4>
                          <p className="text-sm text-[var(--color-text-muted)]">${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {results.length > 8 && (
              <div className="mt-8 text-center">
                <Link href={`/shop`} onClick={onClose} className="inline-block text-sm font-medium border-b border-[var(--color-foreground)] pb-1">
                  View all {results.length} results
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
