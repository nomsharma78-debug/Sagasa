"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import './Wishlist.css';

const Wishlist = () => {
  // For now, we will simulate an empty wishlist as requested
  // In a full implementation, this would pull from a context or global state
  const wishlistItems = []; 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="wishlist-page container"
    >
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p className="wishlist-count">{wishlistItems.length} Items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <Heart size={64} strokeWidth={1} className="wishlist-empty-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Save the items you love to keep track of them here.</p>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            <div className="btn-content">Continue Shopping</div>
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {/* Wishlist items would be mapped here */}
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
