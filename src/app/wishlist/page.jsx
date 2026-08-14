"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const Wishlist = () => {
  // For now, we will simulate an empty wishlist as requested
  // In a full implementation, this would pull from a context or global state
  const wishlistItems = []; 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-var(--header-height))] pt-[calc(var(--header-height)+2rem)] pb-[var(--spacing-xl)] container"
    >
      <div className="text-center mb-16">
        <h1 className="text-[2.5rem] mb-2">My Wishlist</h1>
        <p className="text-[var(--color-text-muted)] text-sm">{wishlistItems.length} Items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-[var(--color-surface)] rounded-lg min-h-[400px]">
          <Heart size={64} strokeWidth={1} className="text-[var(--color-border)] mb-6" />
          <h2 className="text-[1.5rem] mb-3">Your wishlist is empty</h2>
          <p className="text-[var(--color-text-muted)] max-w-[400px]">Save the items you love to keep track of them here.</p>
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
