"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Search, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import SearchOverlay from './SearchOverlay';
import './Navbar.css';

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
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container container">
          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="Sagasa Home">
            <Logo hideText={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar-links">
            <Link href="/shop?category=men" className="nav-link">Men</Link>
            <Link href="/shop?category=women" className="nav-link">Women</Link>
            <Link href="/shop?category=sales" className="nav-link">Sales</Link>
            <Link href="/shop?category=bestsellers" className="nav-link">Bestsellers</Link>
          </nav>

          {/* Actions */}
          <div className="navbar-actions">
            <div 
              className="nav-search-box"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={16} strokeWidth={2} />
              <span>Search...</span>
            </div>
            <Link href="/profile" className="icon-action" aria-label="User Profile">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" className="icon-action" aria-label="Wishlist">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <button className="cart-button" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="cart-badge">0</span>
            </button>
            <button 
              className="mobile-menu-btn" 
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
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-header">
                <span className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Logo hideText={true} height="32px" />
                  Sagasa
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="close-menu-btn"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="mobile-menu-links">
                <Link href="/shop?category=men">Men</Link>
                <Link href="/shop?category=women">Women</Link>
                <Link href="/shop?category=sales">Sales</Link>
                <Link href="/shop?category=bestsellers">Bestsellers</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
