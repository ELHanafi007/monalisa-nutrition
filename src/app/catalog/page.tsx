"use client";

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Search, Filter, X, Heart, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
                className={`p-4 border border-border hover:border-gold transition-colors ${isFilterOpen ? 'bg-gold text-black border-gold' : ''}`}
              >
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
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
                
                <Link href={`/catalog/${product.slug}`} className="w-full h-full flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                  <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-4">
                     <span className="text-[10px] text-text-muted uppercase tracking-widest mb-2">{product.brand}</span>
                     <span className="text-sm font-serif italic text-gold">{product.name}</span>
                     <div className="mt-4 w-12 h-[1px] bg-border" />
                  </div>
                </Link>

                <button className="absolute bottom-0 left-0 w-full bg-gold text-black py-4 uppercase tracking-[0.2em] text-[10px] font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2">
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
