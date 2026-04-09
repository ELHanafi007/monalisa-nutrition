"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { SearchModal } from '../SearchModal';

export const Header = () => {
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-full">
            <Image 
              src="/images/logo.jpeg" 
              alt="Monaliza House" 
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-xl text-black tracking-tight hidden sm:block">Monaliza House</span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group" onClick={() => setIsSearchOpen(true)}>
            <input 
              type="text" 
              placeholder="Rechercher un produit" 
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all cursor-pointer"
              readOnly
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" size={18} />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={22} />
          </button>
          <Link href="/account" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full hidden sm:block">
            <User size={22} />
          </Link>
          <Link href="/checkout" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative group">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full md:hidden">
            <Menu size={22} />
          </button>
        </div>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
