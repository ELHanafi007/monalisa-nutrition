"use client";

import { useState, useMemo } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { useProducts, Product } from '@/data/products';
import { useCategories, Category } from '@/data/categories';
import { Search, ChevronLeft, Filter, X, ChevronDown, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { QuickView } from '@/components/QuickView';
import { ProductCard } from '@/components/ProductCard';

interface PageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: PageProps) {
  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const categorySlug = params.category;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = useMemo(() => {
    return categories.find(c => c.slug === categorySlug);
  }, [categories, categorySlug]);

  const categoryProducts = useMemo(() => {
    return products.filter(p => p.category === categorySlug);
  }, [products, categorySlug]);

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

  if (categoriesLoading || productsLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-red border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

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

      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-gray-100 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-luxury-red/20 to-transparent" />
        </div>
        <div className="container relative z-10">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-gray-500 hover:text-white mb-12 transition-colors">
            <ChevronLeft size={14} /> Back to Archive
          </Link>
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-8 bg-luxury-red" />
              <span className="text-luxury-red text-[10px] font-black uppercase tracking-[0.4em]">{categoryProducts.length} Exclusive Items</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.85]"
            >
              {category.name} <br />
              <span className="italic red-gradient-text">Collection.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 font-medium max-w-2xl leading-relaxed"
            >
              {category.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Advanced Filter Interface */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container">
          <div className="h-20 flex items-center justify-between gap-8">
            {/* Filter Toggle */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-3 px-6 h-12 rounded-full bg-black text-white hover:bg-luxury-red transition-all duration-300 shadow-lg group"
            >
              <SlidersHorizontal size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] uppercase tracking-widest font-black">Refine Selection</span>
              <div className="w-[1px] h-4 bg-white/20 mx-2" />
              <span className="text-[10px] font-bold text-white/60">{selectedBrand || 'All Brands'}</span>
            </button>

            {/* Live Search */}
            <div className="flex-1 max-w-xl relative hidden md:block">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder={`Search within ${category.name}...`} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-14 pr-14 text-[11px] font-bold uppercase tracking-wider focus:bg-white focus:border-luxury-red/30 focus:shadow-inner outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-8">
               <div className="text-right">
                 <span className="block text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-1">Price Range</span>
                 <span className="block text-[10px] font-black uppercase tracking-wider">Premium Selection</span>
               </div>
               <div className="h-8 w-[1px] bg-gray-100" />
               <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 hover:border-black transition-colors">
                  <LayoutGrid size={18} />
               </button>
            </div>
          </div>
        </div>

        {/* Sophisticated Filter Reveal */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-gray-50 border-t border-gray-100"
            >
              <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  {/* Category Selection */}
                  <div className="md:col-span-3">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">Switch Department</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map(cat => (
                        <Link 
                          key={cat.id}
                          href={`/catalog/${cat.slug}`}
                          className={`px-4 py-3 rounded-xl border text-[9px] uppercase tracking-widest font-black transition-all flex items-center justify-between group ${cat.slug === categorySlug ? 'bg-black border-black text-white shadow-xl' : 'bg-white border-gray-100 text-gray-500 hover:border-luxury-red/50 hover:text-luxury-red'}`}
                        >
                          {cat.name}
                          <div className={`w-1.5 h-1.5 rounded-full ${cat.slug === categorySlug ? 'bg-luxury-red' : 'bg-gray-100 group-hover:bg-luxury-red/50'}`} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Brand Selection */}
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">Select Brand</span>
                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-4 custom-scrollbar">
                      <button 
                        onClick={() => { setSelectedBrand(null); setIsFilterOpen(false); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${!selectedBrand ? 'bg-luxury-red text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        All Master Brands
                      </button>
                      {brands.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => { setSelectedBrand(brand); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${selectedBrand === brand ? 'bg-luxury-red text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container py-20 min-h-[600px]">
        {/* Mobile Search */}
        <div className="md:hidden mb-8 relative">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
           <input 
             type="text" 
             placeholder="Search collection..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-14 pr-6 text-[11px] font-bold uppercase tracking-wider outline-none"
           />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-8">
               <X size={32} className="text-gray-200" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-gray-300">No matches found</h3>
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-12">Refine your filters or search query</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedBrand(null);}} 
              className="px-12 py-4 bg-black text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-black hover:bg-luxury-red transition-all shadow-xl"
            >
              Reset Archive
            </button>
          </div>
        )}
      </div>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8b0000;
        }
      `}</style>
    </main>
  );
}
