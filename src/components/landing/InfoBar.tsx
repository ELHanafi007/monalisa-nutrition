"use client";

import { Menu, Truck, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const InfoBar = () => {
  return (
    <div className="bg-gray-100 py-3 border-b border-gray-200">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm font-medium">
        {/* Categories Menu */}
        <button className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors">
          <Menu size={20} className="text-black" />
          <span className="uppercase tracking-wide">Catégories des produits</span>
        </button>

        {/* Delivery Info */}
        <div className="flex items-center gap-2 text-gray-600">
          <Truck size={20} className="text-black" />
          <span>Livraison partout au Maroc</span>
        </div>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/212600000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm"
        >
          <MessageCircle size={18} fill="currentColor" className="text-white" />
          <span className="font-bold">Contactez-nous</span>
        </a>
      </div>
    </div>
  );
};
