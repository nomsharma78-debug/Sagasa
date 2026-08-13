"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import Link from 'next/link';

import { products } from '@/data/products';
import './SearchOverlay.css';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="search-overlay-container container">
            <div className="search-header">
              <div className="search-input-wrapper">
                <Search size={24} className="search-icon-input" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <button className="search-close-btn" onClick={onClose} aria-label="Close search">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            <div className="search-results-area">
              {searchQuery && results.length > 0 && (
                <div className="search-results-grid">
                  {results.slice(0, 8).map((product) => (
                    <Link key={product.id} 
                      href={`/product/${product.id}`} 
                      className="search-result-item"
                      onClick={onClose}
                    >
                      <div className="search-result-img">
                        <img src={product.image1} alt={product.title} />
                      </div>
                      <div className="search-result-info">
                        <h4>{product.title}</h4>
                        <p>${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && results.length === 0 && (
                <div className="search-no-results">
                  <p>No results found for "{searchQuery}"</p>
                  <p className="search-suggestion">Try searching for "dress", "jacket", or "sale"</p>
                </div>
              )}

              {!searchQuery && (
                <div className="search-trending">
                  <p className="search-suggestions-title">Trending Now</p>
                  <div className="search-results-grid">
                    {[...products].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)).slice(0, 8).map((product) => (
                      <Link key={product.id} 
                        href={`/product/${product.id}`} 
                        className="search-result-item"
                        onClick={onClose}
                      >
                        <div className="search-result-img">
                          <img src={product.image1} alt={product.title} />
                        </div>
                        <div className="search-result-info">
                          <h4>{product.title}</h4>
                          <p>${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {results.length > 8 && (
              <div className="search-view-all">
                <Link href={`/shop`} onClick={onClose}>
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
