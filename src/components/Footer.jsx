"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Droplet, Flower2, Heart, ShieldCheck } from 'lucide-react';
import LogoSvg from '../assets/S LOGO (name)-01.svg';

const Instagram = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Facebook = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const features = [
  { i: Droplet, t: 'Sustainable Materials', d: 'Eco-friendly fabrics\nfor a better tomorrow.' },
  { i: Flower2, t: 'Crafted with Care', d: 'Precision in every stitch\nfor lasting quality.' },
  { i: Heart, t: 'Loved by Thousands', d: 'Join our community\nof happy customers.' },
  { i: ShieldCheck, t: 'Secure Payments', d: '100% secure checkout\nfor your peace of mind.' }
];

const links = [
  { t: 'Shop', l: ['Women', 'Men', 'New Arrivals', 'Sale'] },
  { t: 'Company', l: ['About Us', 'Our Story', 'Careers', 'Press'] },
  { t: 'Support', l: ['Help Center', 'Shipping & Returns', 'Size Guide', 'Privacy Policy'] }
];

const socials = [Instagram, Facebook];

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] pt-16 pb-8 mt-auto font-[family-name:var(--font-body)] text-[#333]">
      <div className="container mx-auto px-4">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-16 border-b border-[#E5E5E5]">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="p-3 border border-[#E5E5E5] rounded-full shrink-0 text-[#8B7A5E]"><f.i size={24} strokeWidth={1.5} /></div>
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-[0.95rem]">{f.t}</h4>
                <p className="text-[0.8rem] text-[#666] leading-relaxed whitespace-pre-line">{f.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Banner */}
        <div className="bg-[#F5F4F0] rounded-lg p-8 md:p-12 mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-display)]">Join the Sagasa Community</h3>
            <p className="text-[0.85rem] text-[#666]">Sign up for early access, exclusive offers and style updates.</p>
          </div>
          <form className="flex w-full md:w-1/2 max-w-md gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-white border border-[#E5E5E5] rounded-md outline-none text-[0.85rem]" />
            <button className="px-6 py-3 bg-[#222] text-white font-semibold rounded-md text-[0.85rem] whitespace-nowrap transition-colors hover:bg-[#444]">Subscribe</button>
          </form>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="w-[220px] h-[35px] overflow-hidden flex items-center justify-center -ml-2">
              <Image src={LogoSvg} alt="Sagasa Logo" className="w-[220px] h-auto object-contain" />
            </div>
            <p className="text-[0.85rem] text-[#666] leading-relaxed max-w-[250px] mt-1">Modern clothing for the modern you.<br/>Designed to inspire. Made to last.</p>
            <div className="flex gap-4 mt-2 text-[#666]">
              {socials.map((Icon, i) => <a key={i} href="#" className="transition-colors hover:text-[#222]"><Icon size={20} strokeWidth={1.5} /></a>)}
            </div>
          </div>
          {links.map((col, i) => (
            <div key={i} className="flex flex-col gap-4">
              <h4 className="font-bold text-[0.95rem]">{col.t}</h4>
              <div className="flex flex-col gap-3 mt-1">
                {col.l.map(link => <Link key={link} href="#" className="text-[0.85rem] text-[#666] transition-colors hover:text-[#222]">{link}</Link>)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E5E5E5] text-[0.75rem] text-[#666] gap-4">
          <p>&copy; {new Date().getFullYear()} Sagasa. All rights reserved.</p>
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Cookies'].map(l => <Link key={l} href="#" className="transition-colors hover:text-[#222]">{l}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
