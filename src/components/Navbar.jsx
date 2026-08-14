"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Search, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-[var(--header-height)] z-[100] flex items-center transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-[10px] border-b border-[var(--color-border)]' : 'bg-transparent'}`}>
        <div className="flex justify-between items-center w-full container">
          {/* Logo */}
          <Link href="/" className="font-[family:var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[var(--color-foreground)] z-[101]" aria-label="Sagasa Home">
            <Logo hideText={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden gap-8 md:flex">
            <Link href="/shop?category=men" className="text-sm font-medium text-[var(--color-foreground)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[var(--color-foreground)] after:transition-all after:duration-300 hover:after:w-full">Men</Link>
            <Link href="/shop?category=women" className="text-sm font-medium text-[var(--color-foreground)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[var(--color-foreground)] after:transition-all after:duration-300 hover:after:w-full">Women</Link>
            <Link href="/shop?category=sales" className="text-sm font-medium text-[var(--color-foreground)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[var(--color-foreground)] after:transition-all after:duration-300 hover:after:w-full">Sales</Link>
            <Link href="/shop?category=bestsellers" className="text-sm font-medium text-[var(--color-foreground)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[var(--color-foreground)] after:transition-all after:duration-300 hover:after:w-full">Bestsellers</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border)] py-2 px-4 rounded-full cursor-pointer text-[var(--color-text-muted)] text-sm transition-all duration-200 w-auto md:w-[200px] hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={16} strokeWidth={2} />
              <span>Search...</span>
            </div>
            <Link href="/profile" className="bg-transparent border-none cursor-pointer text-[var(--color-foreground)] flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 hover:bg-[var(--color-surface)]" aria-label="User Profile">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" className="bg-transparent border-none cursor-pointer text-[var(--color-foreground)] flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 hover:bg-[var(--color-surface)]" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <button className="bg-transparent border-none cursor-pointer relative text-[var(--color-foreground)] flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 hover:bg-[var(--color-surface)]" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute top-1 right-0.5 bg-[var(--color-accent)] text-[var(--color-accent-foreground)] text-[0.65rem] font-semibold w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </button>
            <button 
              className="block bg-transparent border-none cursor-pointer text-[var(--color-foreground)] md:hidden" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        
        {/* Search Overlay mounted below header */}
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed top-0 left-0 w-full h-screen bg-black/50 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute top-0 right-0 w-4/5 max-w-[400px] h-screen bg-[var(--color-background)] p-8 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-[family:var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-[var(--color-foreground)] z-[101]" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Logo hideText={true} height="32px" />
                  Sagasa
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-transparent border-none cursor-pointer text-[var(--color-foreground)]"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                <Link href="/shop?category=men" className="font-[family:var(--font-display)] text-2xl font-medium text-[var(--color-foreground)]">Men</Link>
                <Link href="/shop?category=women" className="font-[family:var(--font-display)] text-2xl font-medium text-[var(--color-foreground)]">Women</Link>
                <Link href="/shop?category=sales" className="font-[family:var(--font-display)] text-2xl font-medium text-[var(--color-foreground)]">Sales</Link>
                <Link href="/shop?category=bestsellers" className="font-[family:var(--font-display)] text-2xl font-medium text-[var(--color-foreground)]">Bestsellers</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
