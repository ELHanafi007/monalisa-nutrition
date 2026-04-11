"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, User, Menu, Moon, Sun } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { SearchModal } from '../SearchModal';
import { CategoryModal } from '../CategoryModal';
import { useTheme } from '@/providers/ThemeProvider';

export const Header = () => {
  const { totalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border">
            <Image 
              src="/images/logo.jpeg" 
              alt="Monaliza House" 
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-xl text-text-main tracking-tight hidden sm:block">Monaliza House</span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group" onClick={() => setIsSearchOpen(true)}>
            <input 
              type="text" 
              placeholder="Rechercher un produit" 
              className="w-full bg-surface-hover border border-border rounded-full py-2.5 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-luxury-red/5 focus:border-luxury-red transition-all cursor-pointer text-text-main placeholder:text-text-muted"
              readOnly
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-luxury-red transition-colors" size={18} />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-text-muted hover:bg-surface-hover hover:text-luxury-red rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>
          <button 
            className="md:hidden p-2 text-text-muted hover:bg-surface-hover rounded-full"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={22} />
          </button>
          <Link href="/account" className="p-2 text-text-muted hover:bg-red-50 hover:text-luxury-red rounded-full hidden sm:block transition-colors">
            <User size={22} />
          </Link>
          <Link href="/checkout" className="p-2 text-text-muted hover:bg-red-50 hover:text-luxury-red rounded-full relative group transition-colors">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-luxury-red text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-surface group-hover:scale-110 transition-transform shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="p-2 text-text-muted hover:bg-surface-hover rounded-full md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
    </header>
  );
};
