"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, LayoutGrid } from 'lucide-react';
import { useCategories } from '@/data/categories';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const CategoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { categories, loading } = useCategories();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[111] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="w-full max-w-6xl pointer-events-auto bg-white p-6 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-red/10 rounded-2xl flex items-center justify-center text-luxury-red">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Nos Catégories</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Découvrez tout notre univers nutrition</p>
                  </div>
                </div>
                <button 
                  onClick={onClose} 
                  className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-300 hover:rotate-90 group"
                >
                  <X size={24} className="group-hover:text-luxury-red transition-colors" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-4 pb-6">
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    href={`/catalog/${category.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-red-100 transition-all border border-transparent hover:border-red-100"
                  >
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden p-2 relative flex-shrink-0 border border-gray-100 group-hover:border-red-50 transition-colors">
                       <Image 
                         src={category.image} 
                         alt={category.name} 
                         fill 
                         unoptimized
                         className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
                       />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-tight truncate group-hover:text-luxury-red transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover:text-luxury-red group-hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Plus de 100+ produits sélectionnés avec soin</p>
                 <Link 
                   href="/catalog" 
                   onClick={onClose}
                   className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-luxury-red transition-all flex items-center gap-3 group"
                 >
                   Voir tout le catalogue
                   <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
