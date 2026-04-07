"use client";

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { products, Product } from '@/data/products';
import { categories } from '@/data/categories';
import { Search, Filter, X, Heart, Plus, ChevronDown, Check, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { QuickView } from '@/components/QuickView';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      
      {/* QuickView Modal */}
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Header */}
      <section className="pt-40 pb-20 border-b border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-xl">
              <span className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-gold/50" />
                <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">The Archive</span>
              </span>
              <h1 className="text-6xl md:text-8xl font-serif italic">Artifacts.</h1>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                <input 
                  type="text" 
                  placeholder="SEARCH THE ARCHIVE..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface/50 border border-white/5 w-full pl-12 pr-4 py-4 text-[10px] uppercase tracking-[0.3em] outline-none focus:border-gold/30 transition-all italic"
                />
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-3 px-8 py-4 border border-white/5 hover:border-gold/30 transition-all text-[10px] uppercase tracking-[0.3em] font-bold ${isFilterOpen ? 'bg-gold text-black border-gold' : 'bg-surface/50'}`}
              >
                <Filter size={14} /> {isFilterOpen ? 'Close' : 'Filter'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Advanced Filtration System */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-surface/30 border border-white/5 p-8 md:p-12 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {/* By Category */}
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-8">Departments</h4>
                    <div className="space-y-4">
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className="flex items-center gap-3 group text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                      >
                        <div className={`w-4 h-4 border border-white/10 flex items-center justify-center transition-colors ${!selectedCategory ? 'bg-gold border-gold' : 'group-hover:border-gold'}`}>
                          {!selectedCategory && <Check size={10} className="text-black" />}
                        </div>
                        <span className={!selectedCategory ? 'text-white' : 'text-text-muted'}>All Departments</span>
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className="flex items-center gap-3 group text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                        >
                          <div className={`w-4 h-4 border border-white/10 flex items-center justify-center transition-colors ${selectedCategory === cat.slug ? 'bg-gold border-gold' : 'group-hover:border-gold'}`}>
                            {selectedCategory === cat.slug && <Check size={10} className="text-black" />}
                          </div>
                          <span className={selectedCategory === cat.slug ? 'text-white' : 'text-text-muted'}>{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* By Brand */}
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-8">Manufacturers</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {brands.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                          className="flex items-center gap-3 group text-[10px] uppercase tracking-[0.2em] font-medium transition-colors text-left"
                        >
                          <div className={`w-4 h-4 border border-white/10 flex items-center justify-center transition-colors ${selectedBrand === brand ? 'bg-gold border-gold' : 'group-hover:border-gold'}`}>
                            {selectedBrand === brand && <Check size={10} className="text-black" />}
                          </div>
                          <span className={selectedBrand === brand ? 'text-white' : 'text-text-muted'}>{brand}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                       <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold mb-8">Active State</h4>
                       <p className="text-[10px] text-text-muted uppercase tracking-widest italic">
                         Displaying {filteredProducts.length} artifacts matching your protocol criteria.
                       </p>
                    </div>
                    <button 
                      onClick={() => {setSelectedCategory(null); setSelectedBrand(null); setSearchQuery('');}}
                      className="text-[10px] uppercase tracking-[0.4em] text-gold border-b border-gold/20 pb-2 font-bold hover:border-gold transition-all w-fit mt-12"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Category Pills - Always Visible */}
        {!isFilterOpen && (
          <div className="flex items-center gap-4 overflow-x-auto pb-8 mb-8 no-scrollbar">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`whitespace-nowrap px-8 py-3 text-[8px] uppercase tracking-[0.3em] font-bold transition-all border ${!selectedCategory ? 'bg-gold text-black border-gold' : 'border-white/10 text-text-muted hover:border-gold/30'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`whitespace-nowrap px-8 py-3 text-[8px] uppercase tracking-[0.3em] font-bold transition-all border ${selectedCategory === cat.slug ? 'bg-gold text-black border-gold' : 'border-white/10 text-text-muted hover:border-gold/30'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-12">
          {filteredProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.7, 0, 0.3, 1] }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[4/5] glass-card overflow-hidden relative group-hover:border-gold/30">
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center hover:text-gold transition-colors border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                  >
                    <Eye size={14} />
                  </button>
                </div>
                
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full h-full flex items-center justify-center relative cursor-pointer"
                >
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-contain transition-transform duration-1000 group-hover:scale-110 p-6 md:p-12"
                  />
                </div>

                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-0 left-0 w-full bg-gold text-black py-4 md:py-6 uppercase tracking-[0.3em] text-[8px] md:text-[10px] font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 flex items-center justify-center gap-2 md:gap-3 z-40"
                >
                  <Plus size={12} /> Add to Collection
                </button>
              </div>

              <div className="mt-6 space-y-2 px-1">
                <p className="text-[8px] md:text-[10px] text-gold uppercase tracking-[0.3em] font-bold">{product.brand}</p>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xs md:text-lg font-serif group-hover:text-gold transition-colors duration-500 leading-tight">{product.name}</h3>
                  <p className="text-[10px] md:text-sm font-bold tracking-widest text-gold/80 whitespace-nowrap">{product.price} MAD</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-xl font-serif italic text-text-muted mb-8">No artifacts match your selected protocol.</p>
            <button 
              onClick={() => {setSelectedCategory(null); setSelectedBrand(null); setSearchQuery('');}}
              className="luxury-button-outline"
            >
              Clear All Protocol Filters
            </button>
          </div>
        )}
      </div>

      <footer className="py-20 border-t border-white/5 bg-[#050505] text-center">
        <div className="container">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — The Standard</p>
        </div>
      </footer>

      {/* Simplified Mobile Footer Spacing */}
      <div className="h-24 md:hidden" />
    </main>
  );
}
