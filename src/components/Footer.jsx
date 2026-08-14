"use client";
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-surface)] pt-[var(--spacing-xl)] pb-[var(--spacing-md)] mt-auto">
      <div className="container">
        <div className="flex flex-col gap-12 mb-[var(--spacing-lg)] lg:flex-row lg:justify-between">
          <div className="max-w-[300px]">
            <Link href="/" aria-label="Sagasa Home">
              <Logo width="160px" height="auto" />
            </Link>
            <p className="text-[var(--color-text-muted)] text-[0.9rem] mt-4">
              Modern Clothing for Women and Men. Timeless design, comfort, and quality fabrics.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-[0.05em]">Shop</h3>
              <Link href="/shop?category=men" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Men</Link>
              <Link href="/shop?category=women" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Women</Link>
              <Link href="/shop?category=sales" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Sales</Link>
              <Link href="/shop?category=bestsellers" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Bestsellers</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-[0.05em]">Company</h3>
              <Link href="/about" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">About Us</Link>
              <Link href="#" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Careers</Link>
              <Link href="/journal" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Journal</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold mb-2 uppercase tracking-[0.05em]">Support</h3>
              <Link href="/faq" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Help Center</Link>
              <Link href="/shipping-returns" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Shipping & Returns</Link>
              <Link href="/terms" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Terms of Service</Link>
              <Link href="/privacy" className="text-[var(--color-text-muted)] text-sm transition-colors duration-200 hover:text-[var(--color-foreground)]">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 py-[var(--spacing-lg)] border-y border-[var(--color-border)] mb-[var(--spacing-lg)] md:flex-row md:justify-between md:items-center">
          <div>
            <h3 className="text-xl mb-2">Join our newsletter</h3>
            <p className="text-[var(--color-text-muted)] text-sm">Get 10% off your first order and stay updated.</p>
          </div>
          <form className="flex w-full max-w-[400px] border-b border-[var(--color-foreground)]" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required className="flex-1 bg-transparent border-none py-3 [font-family:var(--font-body)] text-sm outline-none" />
            <button type="submit" aria-label="Subscribe" className="bg-transparent border-none cursor-pointer text-[var(--color-foreground)] px-2 transition-transform duration-200 hover:translate-x-1">
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </form>
        </div>
        
        <div className="flex flex-col-reverse gap-6 items-center text-sm text-[var(--color-text-muted)] md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Sagasa. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" aria-label="Instagram" className="transition-colors duration-200 hover:text-[var(--color-foreground)]">Instagram</a>
            <a href="#" aria-label="Twitter" className="transition-colors duration-200 hover:text-[var(--color-foreground)]">Twitter</a>
            <a href="#" aria-label="Pinterest" className="transition-colors duration-200 hover:text-[var(--color-foreground)]">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
