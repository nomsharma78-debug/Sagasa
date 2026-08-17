"use client";

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import SLogo from '../assets/S LOGO 2-01.svg';

export default function SagasaLoader() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#FAF9F6] flex flex-col items-center justify-center select-none">
      <style>{`
        @keyframes sMorph {
          0% { transform: translateX(-100px) rotateY(0deg) scale(0.9); opacity: 0; }
          10%, 36% { transform: translateX(0) rotateY(0deg) scale(1); opacity: 1; }
          48%, 100% { transform: translateX(0) rotateY(90deg) scale(0.95); opacity: 0; }
        }
        @keyframes cartMorph {
          0%, 47.9% { transform: translateX(0) rotateY(-90deg) scale(0.95); opacity: 0; }
          48% { opacity: 1; }
          60%, 72% { transform: translateX(0) rotateY(0deg) scale(1); opacity: 1; }
          88%, 100% { transform: translateX(100px) rotateY(0deg) scale(0.9); opacity: 0; }
        }
        .s-anim { animation: sMorph 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .cart-anim { animation: cartMorph 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 relative flex items-center justify-center mb-4" style={{ perspective: 1000 }}>
          <div className="s-anim absolute inset-0 flex items-center justify-center pointer-events-none [transform-style:preserve-3d] [backface-visibility:hidden]">
            <div className="w-12 h-12 relative">
              <Image src={SLogo} alt="Sagasa" fill priority className="object-contain" />
            </div>
          </div>
          <div className="cart-anim absolute inset-0 flex items-center justify-center text-[#222] pointer-events-none [transform-style:preserve-3d] [backface-visibility:hidden]">
            <ShoppingBag size={42} strokeWidth={1.5} />
          </div>
        </div>
        <span className="animate-pulse font-[family-name:var(--font-display)] tracking-[0.3em] uppercase text-[0.8rem] font-semibold text-[#333]">
          SAGASA
        </span>
      </div>
    </div>
  );
}
