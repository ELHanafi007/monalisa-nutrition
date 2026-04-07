"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Menu, User, X, Trash2, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { SearchModal } from './SearchModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

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
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gold/20 group-hover:border-gold transition-colors duration-300">
            <Image 
              src="/images/logo.jpeg" 
              alt="Monalisa Nutrition" 
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif tracking-[0.3em] uppercase leading-none">Monalisa</span>
            <span className="text-[8px] tracking-[0.5em] uppercase text-gold">Nutrition</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] font-medium">
          <Link href="/catalog" className="hover:text-gold transition-colors">Catalog</Link>
          <Link href="/discovery" className="hover:text-gold transition-colors flex items-center gap-2">
            Discovery <span className="bg-gold/10 text-gold text-[8px] px-2 py-0.5 rounded-full">New</span>
          </Link>
          <Link href="/journal" className="hover:text-gold transition-colors">Journal</Link>
          <Link href="/about" className="hover:text-gold transition-colors">The House</Link>
          <Link href="/concierge" className="hover:text-gold transition-colors">Concierge</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-gold transition-colors"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-gold transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
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

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface z-[60] p-8 border-l border-border flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-serif">Your <span className="italic text-gold">Collection</span></h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <p className="text-text-muted uppercase tracking-widest text-xs italic mb-8">Your collection is currently empty.</p>
                    <Link 
                      href="/catalog" 
                      onClick={() => setIsCartOpen(false)}
                      className="text-gold uppercase tracking-widest text-[10px] border-b border-gold pb-1 font-bold"
                    >
                      Begin Your Ritual
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-black border border-border flex flex-col items-center justify-center p-2 relative">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className={`object-contain p-2 opacity-50 ${item.isRupture ? 'grayscale' : ''}`}
                        />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                          <span className="text-[8px] text-white uppercase text-center mb-1 bg-black/60 px-1">{item.brand}</span>
                          <span className="text-[8px] font-serif italic text-gold text-center bg-black/60 px-1">{item.name}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-[10px] uppercase tracking-widest font-bold">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-text-muted hover:text-gold transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gold uppercase tracking-widest mb-4">{item.price} MAD</p>
                        <div className="flex items-center border border-border w-fit">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-gold transition-colors"><Minus size={12} /></button>
                          <span className="w-8 text-center text-[10px] font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-gold transition-colors"><Plus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Total Investment</span>
                    <span className="text-lg font-bold">{totalPrice} MAD</span>
                  </div>
                  <Link 
                    href="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full luxury-button flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="text-[8px] text-center text-text-muted uppercase tracking-widest mt-6">
                    Complimentary express delivery for the elite.
                  </p>
                </div>
              )}
            </motion.div>
          </>
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
