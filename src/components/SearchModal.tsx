"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

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
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[101] flex flex-col items-center pt-20 px-8 pointer-events-none"
          >
            <div className="w-full max-w-4xl pointer-events-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
                <Search className="text-black" size={32} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="bg-transparent border-none outline-none text-2xl md:text-4xl font-black w-full px-8 placeholder:text-gray-200 uppercase tracking-tighter"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-12 max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">
                {results.length > 0 ? (
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-8 block">Résultats de recherche</span>
                    <div className="space-y-4">
                      {results.map(product => (
                        <Link 
                          key={product.id} 
                          href={`/catalog/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between group p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden p-2 relative">
                               <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">{product.brand}</p>
                              <h3 className="text-lg font-black uppercase tracking-tight">{product.name}</h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className="font-black text-black">{product.price} MAD</span>
                             <ArrowRight className="text-black opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : query.length > 1 ? (
                   <p className="text-center text-gray-400 font-bold py-20 uppercase tracking-widest">Aucun produit trouvé.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6 block">Catégories Populaires</span>
                       <div className="space-y-4 text-xl font-black uppercase tracking-tighter">
                         <Link href="/catalog?category=whey-proteine" onClick={onClose} className="block hover:translate-x-2 transition-transform">Proteines</Link>
                         <Link href="/catalog?category=gainers" onClick={onClose} className="block hover:translate-x-2 transition-transform">Gainers</Link>
                         <Link href="/catalog?category=creatine" onClick={onClose} className="block hover:translate-x-2 transition-transform">Creatine</Link>
                         <Link href="/catalog?category=pre-workout" onClick={onClose} className="block hover:translate-x-2 transition-transform">Pre-workout</Link>
                       </div>
                    </div>
                    <div>
                       <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6 block">Recherches Suggérées</span>
                       <div className="flex flex-wrap gap-3">
                         {['Whey Isolate', 'Pre-workout', 'Serious Mass', 'Creatine', 'Vitamines'].map(s => (
                           <button 
                             key={s} 
                             onClick={() => setQuery(s)}
                             className="px-4 py-2 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
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
