"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const variants = {
  primary: {
    btn: 'group',
    content: 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border border-[var(--color-accent)] group-hover:bg-transparent group-hover:text-[var(--color-accent)] group-hover:-translate-y-[2px] group-hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.15)]',
  },
  secondary: {
    btn: 'group',
    content: 'bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)] group-hover:bg-[var(--color-background)] group-hover:border-[var(--color-foreground)]',
  },
  outline: {
    btn: 'group',
    content: 'bg-transparent text-[var(--color-foreground)] border border-[var(--color-foreground)] group-hover:bg-[var(--color-foreground)] group-hover:text-[var(--color-background)]',
  }
};

const Button = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  fullWidth = false 
}) => {
  const baseBtnClass = `${fullWidth ? 'w-full block' : 'inline-block'} [font-family:var(--font-body)] text-sm font-medium text-center cursor-pointer border-none bg-transparent p-0 no-underline ${variants[variant].btn} ${className}`;
  const contentClass = `flex items-center justify-center px-8 py-4 rounded-full w-full h-full transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${variants[variant].content}`;

  if (to) {
    return (
      <Link href={to} className={baseBtnClass}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={contentClass}
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
      className={baseBtnClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={contentClass}>{children}</span>
    </motion.button>
  );
};

export default Button;
