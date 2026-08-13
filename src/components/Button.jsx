"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

import './Button.css';

const Button = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  fullWidth = false 
}) => {
  const baseClassName = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`;

  if (to) {
    return (
      <Link href={to} className={baseClassName}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-content"
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="btn-content">{children}</span>
    </motion.button>
  );
};

export default Button;
