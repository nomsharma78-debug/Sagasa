"use client";

import { useState } from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="product-image-container">
        <motion.img 
          src={product.image1} 
          alt={product.title} 
          className="product-image primary"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        {product.image2 && (
          <motion.img 
            src={product.image2} 
            alt={`${product.title} alternate`} 
            className="product-image secondary"
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        
        {product.isSale && <span className="product-badge sale-badge">Sale</span>}
        {!product.isSale && product.isBestseller && <span className="product-badge bestseller-badge">Bestseller</span>}

        {/* Quick Add Button */}
        <motion.button
          className="quick-add-btn"
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
      
      <div className="product-info">
        <h3 className="product-title">
          <Link href={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <div className="product-price-wrapper">
          {product.isSale && product.oldPrice && (
            <span className="product-old-price">${product.oldPrice.toFixed(2)}</span>
          )}
          <span className={`product-price ${product.isSale ? 'sale-price' : ''}`}>
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
