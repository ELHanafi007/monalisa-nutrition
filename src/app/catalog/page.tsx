"use client";

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Search, Filter, X, Heart, Plus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToCart } = useCart();

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">The Complete Archive</span>
              <h1 className="text-6xl md:text-8xl font-serif italic">Collections.</h1>
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by brand or type..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface border border-border w-full pl-12 pr-4 py-4 text-xs uppercase tracking-widest outline-none focus:border-gold transition-colors"
                />
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-6 py-4 border border-border hover:border-gold transition-colors text-[10px] uppercase tracking-widest font-bold ${isFilterOpen ? 'bg-gold text-black border-gold' : ''}`}
              >
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Expanded Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12 border-b border-border/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-6">By Brand</h4>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button 
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`px-4 py-2 text-[8px] uppercase tracking-widest border ${selectedBrand === brand ? 'bg-gold text-black border-gold' : 'border-border text-text-muted hover:border-gold'}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-6">Price Range</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-gold bg-surface h-1"
                  />
                  <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest text-text-muted">
                    <span>Up to {priceRange[1]} MAD</span>
                  </div>
                </div>
                <div className="flex items-end">
                   <button 
                     onClick={() => {setSelectedCategory(null); setSelectedBrand(null); setPriceRange([0, 2000]); setSearchQuery('');}}
                     className="text-[10px] uppercase tracking-[0.4em] text-gold border-b border-gold/30 pb-1 font-bold hover:border-gold transition-all"
                   >
                     Reset All Artifacts
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filter Desktop */}
        <div className="hidden lg:flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 ${!selectedCategory ? 'bg-gold text-black' : 'border border-border text-text-muted hover:text-gold hover:border-gold'}`}
          >
            All Departments
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 ${selectedCategory === cat.slug ? 'bg-gold text-black' : 'border border-border text-text-muted hover:text-gold hover:border-gold'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[4/5] bg-surface overflow-hidden relative border border-border group-hover:border-gold transition-all duration-500">
                <div className="absolute top-4 right-4 z-10">
                  <button className="bg-black/50 backdrop-blur-md p-2 hover:text-gold transition-colors opacity-0 group-hover:opacity-100 duration-300">
                    <Heart size={18} />
                  </button>
                </div>
                
                <Link href={`/catalog/${product.slug}`} className="w-full h-full flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700 relative">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 transition-opacity p-8"
                  />
                </Link>

                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-0 left-0 w-full bg-gold text-black py-4 uppercase tracking-[0.2em] text-[10px] font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add to Collection
                </button>
              </div>

              <div className="mt-6 flex justify-between items-start px-2">
                <div>
                  <p className="text-[10px] text-gold uppercase tracking-widest font-bold mb-1">{product.brand}</p>
                  <h3 className="text-sm uppercase tracking-wider font-medium group-hover:text-gold transition-colors">{product.name}</h3>
                </div>
                <p className="text-sm font-bold tracking-wider">{product.price} MAD</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-text-muted uppercase tracking-widest text-sm italic">No items found matching your criteria.</p>
            <button onClick={() => {setSelectedCategory(null); setSearchQuery('');}} className="mt-8 text-gold uppercase tracking-widest text-xs border-b border-gold pb-1">Reset Filters</button>
          </div>
        )}
      </div>

      {/* Footer (Simplified) */}
      <footer className="py-20 border-t border-border mt-40">
        <div className="container text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — The Standard</p>
        </div>
      </footer>
    </main>
  );
}
