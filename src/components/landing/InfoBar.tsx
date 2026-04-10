"use client";

import { Menu, Truck, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const InfoBar = () => {
  return (
    <div className="bg-gray-100 py-3 border-b border-gray-200">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm font-medium">
        {/* Categories Menu */}
        <button className="flex items-center gap-3 text-black hover:text-luxury-red transition-colors group">
          <Menu size={22} className="text-luxury-red group-hover:scale-110 transition-transform" />
          <span className="uppercase tracking-[0.2em] font-black text-xs">Catégories des produits</span>
        </button>

        {/* Delivery Info */}
        <div className="flex items-center gap-3 text-gray-500">
          <Truck size={22} className="text-luxury-red" />
          <span className="uppercase tracking-widest text-[10px] font-bold">Livraison Gratuite dès 2 articles</span>
        </div>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/212662802351" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white transition-all bg-luxury-red px-6 py-2.5 rounded-full shadow-lg shadow-red-100 hover:scale-105"
        >
          <MessageCircle size={20} fill="currentColor" />
          <span className="font-black uppercase tracking-widest text-xs">Contactez-nous</span>
        </a>
      </div>
    </div>
  );
};
