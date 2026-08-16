"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Search, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchOverlay from './SearchOverlay';
import SLogo from '../assets/S LOGO 2-01.svg'; // Using the 'S' logo

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
      <header className={`fixed top-0 left-0 w-full h-[90px] z-[100] flex items-center transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-[10px] shadow-sm' : 'bg-gradient-to-b from-white/40 to-transparent'}`}>
        {/* On desktop, the container matches the 50/50 split. 
            Left side (logo + links) takes 50%. Right side (search + icons) takes 50%. */}
        <div className="w-full flex items-center justify-between h-full px-6 md:px-12">
          
          {/* LEFT 50% */}
          <div className="flex items-center gap-12 w-full md:w-1/2">
            {/* Logo */}
            <Link href="/" className="z-[101] shrink-0" aria-label="Sagasa Home">
              <Image src={SLogo} alt="Sagasa" width={30} height={40} className="w-auto h-[40px] object-contain" />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden gap-8 lg:flex items-center">
              {[
                { name: 'Home', href: '/' },
                { name: 'Women', href: '/shop?category=women' },
                { name: 'Men', href: '/shop?category=men' },
                { name: 'New Arrivals', href: '/shop?category=new-arrivals' },
                { name: 'Sale', href: '/shop?category=sale' }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-[0.8rem] font-bold text-[#333] transition-colors hover:text-[#000]">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT 50% */}
          <div className="flex items-center justify-end gap-6 w-full md:w-1/2">
            {/* Search Pill */}
            <div 
              className="hidden lg:flex items-center justify-between bg-[#EFECE8] hover:bg-[#E5E2DE] cursor-pointer rounded-full px-5 py-2.5 w-[280px] transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <div className="flex items-center gap-3">
                <Search size={16} className="text-[#666]" strokeWidth={2} />
                <span className="text-[0.85rem] text-[#666]">Search...</span>
              </div>
              <Search size={16} className="text-[#666]" strokeWidth={2} />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5">
              <Link href="/profile" className="text-[#333] transition-colors hover:text-[#000]" aria-label="User Profile">
                <User size={22} strokeWidth={1.5} />
              </Link>
              <Link href="/wishlist" className="text-[#333] transition-colors hover:text-[#000]" aria-label="Wishlist">
                <Heart size={22} strokeWidth={1.5} />
              </Link>
              <button className="relative text-[#333] transition-colors hover:text-[#000]" aria-label="Cart">
                <ShoppingBag size={22} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1.5 bg-[#4B4B4B] text-white text-[0.6rem] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </button>
              
              <button 
                className="block lg:hidden text-[#333] ml-2" 
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Search Overlay mounted below header */}
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute top-0 right-0 w-4/5 max-w-[400px] h-screen bg-[#FCFBF8] p-8 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-12">
                <Image src={SLogo} alt="Sagasa" width={30} height={40} className="w-auto h-[32px] object-contain" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#333]"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Women', href: '/shop?category=women' },
                  { name: 'Men', href: '/shop?category=men' },
                  { name: 'New Arrivals', href: '/shop?category=new-arrivals' },
                  { name: 'Sale', href: '/shop?category=sale' }
                ].map((link) => (
                  <Link key={link.name} href={link.href} className="font-[family:var(--font-display)] text-2xl font-medium text-[#333]">
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
