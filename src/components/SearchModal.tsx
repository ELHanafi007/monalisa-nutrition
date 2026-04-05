"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

export const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  
  const results = query.length > 1 
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[101] flex flex-col items-center pt-40 px-8 pointer-events-none"
          >
            <div className="w-full max-w-4xl pointer-events-auto">
              <div className="flex items-center justify-between mb-8 border-b border-gold/30 pb-4">
                <Search className="text-gold" size={32} />
                <input
                  autoFocus
                  type="text"
                  placeholder="SEARCH THE ARCHIVE..."
                  className="bg-transparent border-none outline-none text-3xl md:text-5xl font-serif w-full px-8 placeholder:text-gold/20 uppercase italic"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-12">
                {results.length > 0 ? (
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8 block">Top Results</span>
                    <div className="space-y-4">
                      {results.map(product => (
                        <Link 
                          key={product.id} 
                          href={`/catalog/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between group p-6 hover:bg-white/5 transition-colors border border-transparent hover:border-gold/10"
                        >
                          <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-surface border border-border flex flex-col items-center justify-center p-2">
                               <span className="text-[6px] text-text-muted uppercase text-center">{product.brand}</span>
                               <span className="text-[6px] font-serif italic text-gold text-center">{product.name}</span>
                            </div>
                            <div>
                              <p className="text-[10px] text-gold uppercase tracking-widest font-bold mb-1">{product.brand}</p>
                              <h3 className="text-xl font-serif">{product.name}</h3>
                            </div>
                          </div>
                          <ArrowRight className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : query.length > 1 ? (
                   <p className="text-center text-text-muted italic text-lg py-20 uppercase tracking-widest">No matching artifacts found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-12">
                    <div>
                       <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8 block">Popular Departments</span>
                       <div className="space-y-4 text-2xl font-serif italic">
                         <Link href="/catalog?cat=elite-proteins" onClick={onClose} className="block hover:text-gold transition-colors">Elite Proteins</Link>
                         <Link href="/catalog?cat=sculpt-define" onClick={onClose} className="block hover:text-gold transition-colors">Sculpt & Define</Link>
                         <Link href="/catalog?cat=vitality-elixirs" onClick={onClose} className="block hover:text-gold transition-colors">Vitality Elixirs</Link>
                       </div>
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8 block">Suggested Searches</span>
                       <div className="flex flex-wrap gap-4">
                         {['Whey Isolate', 'Pre-workout', 'Fat Burner', 'Creatine', 'Vitamins'].map(s => (
                           <button 
                             key={s} 
                             onClick={() => setQuery(s)}
                             className="px-6 py-2 border border-border hover:border-gold transition-colors text-[10px] uppercase tracking-widest"
                           >
                             {s}
                           </button>
                         ))}
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
