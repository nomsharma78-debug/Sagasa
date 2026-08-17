"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Search, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchOverlay from './SearchOverlay';
import SLogo from '../assets/S LOGO 2-01.svg';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Women', href: '/shop?category=women' },
  { name: 'Men', href: '/shop?category=men' },
  { name: 'New Arrivals', href: '/shop?category=new-arrivals' },
  { name: 'Sale', href: '/shop?category=sale' }
];

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    let active = true;

    const checkAuth = async () => {
      if (typeof window !== 'undefined' && active) {
        setIsLoggedIn(localStorage.getItem('sagasa_auth') === '1');
      }
      try {
        const res = await fetch('/api/user/profile');
        if (active) {
          setIsLoggedIn(res.ok);
          if (typeof window !== 'undefined') {
            res.ok ? localStorage.setItem('sagasa_auth', '1') : localStorage.removeItem('sagasa_auth');
          }
        }
      } catch {
        if (active) setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener('auth-change', checkAuth);

    const onScroll = () => setScrollProgress(Math.min(Math.max(window.scrollY / 90, 0), 1));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      active = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full h-[90px] z-[100] flex items-center"
        style={{
          background: `linear-gradient(to bottom, rgba(255, 255, 255, ${0.4 + 0.55 * scrollProgress}) 0%, rgba(255, 255, 255, ${0.95 * Math.min(scrollProgress * 1.2, 1)}) ${Math.max(scrollProgress * 100, 15)}%, rgba(255, 255, 255, ${0.95 * scrollProgress}) 100%)`,
          backdropFilter: scrollProgress > 0.05 ? `blur(${scrollProgress * 12}px)` : 'none',
          WebkitBackdropFilter: scrollProgress > 0.05 ? `blur(${scrollProgress * 12}px)` : 'none',
          boxShadow: scrollProgress > 0.8 ? '0 1px 3px 0 rgba(0, 0, 0, 0.05)' : 'none',
          borderBottom: scrollProgress > 0.05 ? `1px solid rgba(234, 234, 234, ${scrollProgress})` : 'none'
        }}
      >
        <div className="w-full flex items-center justify-between h-full px-6 md:px-12">
          {/* Left: Logo & Links */}
          <div className="flex items-center gap-12 w-full md:w-1/2">
            <Link href="/" className="z-[101] shrink-0" aria-label="Sagasa Home">
              <Image src={SLogo} alt="Sagasa" width={30} height={40} className="w-auto h-[40px] object-contain" />
            </Link>
            <nav className="hidden gap-8 lg:flex items-center">
              {NAV_LINKS.map(link => (
                <Link key={link.name} href={link.href} className="text-[0.8rem] font-bold text-[#333] hover:text-[#000] transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Search & Actions */}
          <div className="flex items-center justify-end gap-6 w-full md:w-1/2">
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

            <div className="flex items-center gap-5">
              {mounted ? (
                isLoggedIn ? (
                  <Link href="/profile" className="text-[#333] hover:text-[#000]" aria-label="Profile"><User size={22} strokeWidth={1.5} /></Link>
                ) : (
                  <Link href="/login" className="text-[0.8rem] font-bold text-[#333] hover:text-[#000]" aria-label="Login">Login</Link>
                )
              ) : <div className="w-[36px] h-[22px]" />}

              <Link href="/wishlist" className="text-[#333] hover:text-[#000]" aria-label="Wishlist"><Heart size={22} strokeWidth={1.5} /></Link>
              
              <button className="relative text-[#333] hover:text-[#000]" aria-label="Cart">
                <ShoppingBag size={22} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1.5 bg-[#4B4B4B] text-white text-[0.6rem] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </button>
              
              <button className="block lg:hidden text-[#333] ml-2" onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div className="fixed inset-0 bg-black/50 z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute top-0 right-0 w-4/5 max-w-[400px] h-screen bg-[#FCFBF8] p-8 flex flex-col" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              <div className="flex justify-between items-center mb-12">
                <Image src={SLogo} alt="Sagasa" width={30} height={40} className="w-auto h-[32px] object-contain" />
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#333]"><X size={24} strokeWidth={1.5} /></button>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map(link => (
                  <Link key={link.name} href={link.href} className="font-[family:var(--font-display)] text-2xl font-medium text-[#333]">
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-[#EAEAEA] flex flex-col gap-4">
                  {mounted && (isLoggedIn ? (
                    <Link href="/profile" className="font-[family:var(--font-display)] text-xl font-medium text-[#333] flex items-center gap-3"><User size={20} strokeWidth={1.5} /> My Profile</Link>
                  ) : (
                    <Link href="/login" className="font-[family:var(--font-display)] text-xl font-medium text-[#333]">Login / Register</Link>
                  ))}
                  <Link href="/wishlist" className="font-[family:var(--font-display)] text-xl font-medium text-[#333] flex items-center gap-3"><Heart size={20} strokeWidth={1.5} /> Wishlist</Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
