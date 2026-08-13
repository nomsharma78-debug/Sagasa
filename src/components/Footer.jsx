"use client";
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Sagasa Home">
              <Logo width="160px" height="auto" />
            </Link>
            <p className="footer-tagline" style={{ marginTop: '1rem' }}>
              Modern Clothing for Women and Men. Timeless design, comfort, and quality fabrics.
            </p>
          </div>
          
          <div className="footer-links-group">
            <div className="footer-column">
              <h3>Shop</h3>
              <Link href="/shop?category=men">Men</Link>
              <Link href="/shop?category=women">Women</Link>
              <Link href="/shop?category=sales">Sales</Link>
              <Link href="/shop?category=bestsellers">Bestsellers</Link>
            </div>
            
            <div className="footer-column">
              <h3>Company</h3>
              <Link href="/about">About Us</Link>
              <Link href="#">Careers</Link>
              <Link href="/journal">Journal</Link>
            </div>
            
            <div className="footer-column">
              <h3>Support</h3>
              <Link href="/faq">Help Center</Link>
              <Link href="/shipping-returns">Shipping & Returns</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-newsletter">
          <div className="newsletter-text">
            <h3>Join our newsletter</h3>
            <p>Get 10% off your first order and stay updated.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </form>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sagasa. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="Pinterest">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
