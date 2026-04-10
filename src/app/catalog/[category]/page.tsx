"use client";

import { useState, useMemo, use } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { products, Product } from '@/data/products';
import { categories, Category } from '@/data/categories';
import { Search, ChevronLeft, Filter, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { QuickView } from '@/components/QuickView';
import { ProductCard } from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const category = useMemo(() => {
    return categories.find(c => c.slug === categorySlug);
  }, [categorySlug]);

  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === categorySlug);
  }, [categorySlug]);

  const brands = useMemo(() => {
    const allBrands = categoryProducts.map(p => p.brand);
    return Array.from(new Set(allBrands)).sort();
  }, [categoryProducts]);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
      return matchesSearch && matchesBrand;
    });
  }, [categoryProducts, searchQuery, selectedBrand]);

  if (!category) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Header />
        <div className="container py-40 text-center">
          <h1 className="text-4xl font-black uppercase mb-8">Catégorie non trouvée</h1>
          <Link href="/catalog" className="text-luxury-red uppercase tracking-widest font-black border-b-2 border-luxury-red">
            Retour au catalogue
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Header Section */}
      <section className="pt-32 pb-12 border-b border-gray-100 bg-gray-50">
        <div className="container">
          <Link href="/catalog" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-400 hover:text-luxury-red mb-8 transition-colors">
            <ChevronLeft size={14} /> Retour au catalogue
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                {category.name} <span className="red-gradient-text italic">Elite</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">{category.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                {categoryProducts.length} Produits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Category Switcher */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2">Catégories:</span>
               {categories.map(cat => (
                 <Link 
                   key={cat.id}
                   href={`/catalog/${cat.slug}`}
                   className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-widest font-black border rounded-full transition-all ${cat.slug === categorySlug ? 'bg-black border-black text-white' : 'border-gray-200 hover:border-luxury-red/50 text-gray-500'}`}
                 >
                   {cat.name}
                 </Link>
               ))}
            </div>

            {/* Brand Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2">Marques:</span>
              <button 
                onClick={() => setSelectedBrand(null)}
                className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-widest font-black border rounded-full transition-all ${!selectedBrand ? 'bg-luxury-red border-luxury-red text-white' : 'border-gray-200 hover:border-luxury-red/50 text-gray-500'}`}
              >
                Toutes
              </button>
              {brands.map(brand => (
                <button 
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`whitespace-nowrap px-4 py-2 text-[10px] uppercase tracking-widest font-black border rounded-full transition-all ${selectedBrand === brand ? 'bg-luxury-red border-luxury-red text-white' : 'border-gray-200 hover:border-luxury-red/50 text-gray-500'}`}
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
                placeholder={`Rechercher dans ${category.name}...`} 
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

      <div className="container py-12">
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
      </div>

      <Footer />
    </main>
  );
}
