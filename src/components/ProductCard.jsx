"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="flex flex-col gap-4 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="relative w-full aspect-[3/4] overflow-hidden bg-[#F4F4F4] rounded-none group">
        <motion.img 
          src={product.image1} 
          alt={product.title} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        {product.image2 && (
          <motion.img 
            src={product.image2} 
            alt={`${product.title} alternate`} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        
        {product.isSale && <span className="absolute top-4 left-4 py-1 px-3 text-xs font-semibold uppercase tracking-[0.05em] z-10 bg-[#D32F2F] text-white">Sale</span>}
        {!product.isSale && product.isBestseller && <span className="absolute top-4 left-4 py-1 px-3 text-xs font-semibold uppercase tracking-[0.05em] z-10 bg-[var(--color-foreground)] text-[var(--color-background)]">Bestseller</span>}

        {/* Quick Add Button */}
        <motion.button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-background)] text-[var(--color-foreground)] border-none py-3 px-6 rounded-full flex items-center gap-2 [font-family:var(--font-body)] font-medium text-sm cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-10 whitespace-nowrap hover:bg-[var(--color-surface)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.preventDefault();
            // Handle add to cart
          }}
        >
          <ShoppingBag size={18} />
          <span>Quick Add</span>
        </motion.button>
      </Link>
      
      <div className="flex justify-between items-start gap-4">
        <h3 className="[font-family:var(--font-body)] text-sm font-medium m-0">
          <Link href={`/product/${product.id}`} className="transition-colors duration-200 ease-in hover:text-[var(--color-text-muted)]">{product.title}</Link>
        </h3>
        <div className="flex items-center gap-2">
          {product.isSale && product.oldPrice && (
            <span className="text-sm text-[var(--color-text-muted)] line-through">${product.oldPrice.toFixed(2)}</span>
          )}
          <span className={`[font-family:var(--font-body)] text-sm font-semibold ${product.isSale ? 'text-[#D32F2F]' : ''}`}>
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
