"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif tracking-widest uppercase flex items-center gap-2 group">
          <span className="text-gold group-hover:scale-110 transition-transform duration-300">M</span>
          <span className="tracking-[0.3em]">onalisa</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-medium">
          <Link href="/catalog" className="hover:text-gold transition-colors">Catalog</Link>
          <Link href="/collections" className="hover:text-gold transition-colors">Collections</Link>
          <Link href="/about" className="hover:text-gold transition-colors">The House</Link>
          <Link href="/concierge" className="hover:text-gold transition-colors">Concierge</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button className="hover:text-gold transition-colors"><Search size={20} /></button>
          <button className="hover:text-gold transition-colors"><User size={20} /></button>
          <button className="relative hover:text-gold transition-colors">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </button>
          <button className="md:hidden hover:text-gold transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-border"
          >
            <div className="container py-8 flex flex-col gap-6 text-sm uppercase tracking-widest">
              <Link href="/catalog" onClick={() => setIsMenuOpen(false)}>Catalog</Link>
              <Link href="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>The House</Link>
              <Link href="/concierge" onClick={() => setIsMenuOpen(false)}>Concierge</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass {
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        }
        nav {
          border-bottom: 1px solid transparent;
        }
      `}</style>
    </nav>
  );
};
