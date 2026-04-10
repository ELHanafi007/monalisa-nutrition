"use client";

import { useState, useMemo } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { products, Product } from '@/data/products';
import { categories, Category } from '@/data/categories';
import { Search, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { QuickView } from '@/components/QuickView';
import { ProductCard } from '@/components/ProductCard';

export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand);
    return Array.from(new Set(allBrands)).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
      return matchesSearch && matchesBrand;
    });
  }, [searchQuery, selectedBrand]);

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Header Banner */}
      <section className="pt-20 pb-12 border-b border-gray-100 bg-gray-50">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Monaliza <span className="red-gradient-text italic">Catalogue</span></h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">Distributeur Officiel des Plus Grandes Marques Mondiales</p>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Brand Filter */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              <button 
                onClick={() => setSelectedBrand(null)}
                className={`whitespace-nowrap px-6 py-2 text-[10px] uppercase tracking-widest font-black border rounded-full transition-all ${!selectedBrand ? 'bg-luxury-red border-luxury-red text-white' : 'border-gray-200 hover:border-luxury-red/50 text-gray-500'}`}
              >
                Toutes les Marques
              </button>
              {brands.map(brand => (
                <button 
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`whitespace-nowrap px-6 py-2 text-[10px] uppercase tracking-widest font-black border rounded-full transition-all ${selectedBrand === brand ? 'bg-luxury-red border-luxury-red text-white' : 'border-gray-200 hover:border-luxury-red/50 text-gray-500'}`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-full py-3 pl-12 pr-6 text-xs font-bold focus:border-luxury-red/30 outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 space-y-24">
        {(searchQuery || selectedBrand) ? (
          <section className="scroll-mt-32">
            <div className="mb-8 border-l-4 border-luxury-red pl-6">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
                {searchQuery ? `Résultats pour "${searchQuery}"` : selectedBrand}
              </h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2 font-bold">
                Affichage de {filteredProducts.length} produits trouvés
              </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center">
                <p className="text-gray-400 font-bold text-2xl uppercase tracking-tighter">Aucun produit ne correspond à vos critères.</p>
                <button onClick={() => {setSearchQuery(''); setSelectedBrand(null);}} className="text-luxury-red uppercase tracking-[0.5em] text-[10px] font-black mt-8 border-b-2 border-luxury-red pb-1">Réinitialiser les filtres</button>
              </div>
            )}
          </section>
        ) : (
          categories.map(category => {
            const categoryProducts = products.filter(p => p.category === category.slug);
            if (categoryProducts.length === 0) return null;

            const displayedProducts = categoryProducts.slice(0, 8);

            return (
              <section key={category.id} id={category.slug} className="scroll-mt-32">
                <div className="flex items-end justify-between mb-8 border-l-4 border-luxury-red pl-6">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{category.name}</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2 font-bold">{category.description}</p>
                  </div>
                  <Link 
                    href={`/catalog/${category.slug}`}
                    className="flex items-center gap-2 text-luxury-red text-[10px] uppercase tracking-widest font-black hover:underline"
                  >
                    Voir tout <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {displayedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Link 
                    href={`/catalog/${category.slug}`}
                    className="w-full md:w-auto px-12 py-4 border border-gray-100 rounded-xl text-[10px] uppercase tracking-widest font-black text-luxury-red bg-gray-50 hover:bg-luxury-red hover:text-white transition-all text-center"
                  >
                    Découvrir l'univers {category.name} ({categoryProducts.length} produits)
                  </Link>
                </div>
              </section>
            );
          })
        )}
      </div>

      <Footer />
    </main>
  );
}
