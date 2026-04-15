"use client";
import { useState, useMemo } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { useProducts, Product } from '@/data/products';
import { useCategories, Category } from '@/data/categories';
import { Search, ChevronRight, X, SlidersHorizontal, LayoutGrid, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { QuickView } from '@/components/QuickView';
import { ProductCard } from '@/components/ProductCard';

export default function Catalog() {
  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand);
    return Array.from(new Set(allBrands)).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand ? p.brand === selectedBrand : true;
      return matchesSearch && matchesBrand;
    });
  }, [products, searchQuery, selectedBrand]);

  if (categoriesLoading || productsLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-red border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Modern Catalog Hero */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-gold/50" />
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">The Complete Archive</span>
            <div className="h-[1px] w-12 bg-gold/50" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-8 leading-none"
          >
            Monalisa <br />
            <span className="gold-gradient-text italic font-serif">Catalogue.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm uppercase tracking-widest font-medium leading-loose"
          >
            Official Distributor of the World's Leading Performance Brands. <br />
            Explore 13 specialized departments and {products.length} premium products.
          </motion.p>
        </div>
      </section>

      {/* Advanced Filter Interface */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="container">
          <div className="h-20 flex items-center justify-between gap-8">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-3 px-6 h-12 rounded-full bg-black text-white hover:bg-gold hover:text-black transition-all duration-500 shadow-lg group"
            >
              <SlidersHorizontal size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] uppercase tracking-widest font-black">Explore Filters</span>
              <div className="w-[1px] h-4 bg-white/20 group-hover:bg-black/20 mx-2" />
              <span className="text-[10px] font-bold opacity-60 group-hover:opacity-100">{selectedBrand || 'All Collections'}</span>
            </button>

            <div className="flex-1 max-w-xl relative hidden md:block">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search the entire archive..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-4 pl-14 pr-14 text-[11px] font-bold uppercase tracking-wider focus:bg-white focus:border-gold/30 focus:shadow-inner outline-none transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"><X size={14} /></button>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-8">
               <div className="text-right">
                 <span className="block text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-1">Stock Status</span>
                 <span className="block text-[10px] font-black uppercase tracking-wider">Verified Authentic</span>
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
                  <div className="md:col-span-3">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">Quick Jump to Department</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map(cat => (
                        <Link 
                          key={cat.id}
                          href={`/catalog/${cat.slug}`}
                          className="px-4 py-3 rounded-xl border border-gray-100 bg-white text-[9px] uppercase tracking-widest font-black text-gray-500 hover:border-gold hover:text-black transition-all flex items-center justify-between group"
                        >
                          {cat.name}
                          <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-6">Master Brands</span>
                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-4 custom-scrollbar">
                      <button 
                        onClick={() => { setSelectedBrand(null); setIsFilterOpen(false); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${!selectedBrand ? 'bg-gold text-black shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        All Master Brands
                      </button>
                      {brands.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => { setSelectedBrand(brand); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all ${selectedBrand === brand ? 'bg-gold text-black shadow-lg' : 'hover:bg-gray-100 text-gray-600'}`}
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

      <div className="container py-20">
        {(searchQuery || selectedBrand) ? (
          <section className="scroll-mt-32">
            <div className="mb-12 flex items-end justify-between border-l-4 border-gold pl-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                  {searchQuery ? `Search: "${searchQuery}"` : selectedBrand}
                </h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-4 font-bold italic">
                  Filtering {filteredProducts.length} items from the archive
                </p>
              </div>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedBrand(null);}}
                className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-gold hover:border-gold transition-colors"
              >
                Clear Filters
              </button>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-8">
                    <X size={32} className="text-gray-200" />
                 </div>
                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-gray-300">No results found</h3>
                 <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-12 italic">Try adjusting your filters or search terms</p>
              </div>
            )}
          </section>
        ) : (
          <div className="space-y-32">
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.category === category.slug);
              if (categoryProducts.length === 0) return null;

              const displayedProducts = categoryProducts.slice(0, 8);

              return (
                <section key={category.id} className="scroll-mt-32">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                    <div className="border-l-4 border-gold pl-8 max-w-2xl">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">{category.name}</h2>
                      <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold italic leading-loose">{category.description}</p>
                    </div>
                    <Link 
                      href={`/catalog/${category.slug}`}
                      className="group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-black transition-all duration-500 shadow-xl"
                    >
                      Enter Department <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12">
                    {displayedProducts.map(product => (
                      <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
                    ))}
                  </div>

                  <div className="mt-16 flex justify-center">
                    <Link 
                      href={`/catalog/${category.slug}`}
                      className="w-full md:w-auto px-16 py-5 border border-gray-100 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 bg-gray-50 hover:bg-black hover:text-white hover:border-black transition-all duration-700 text-center shadow-sm"
                    >
                      Browse full {category.name} collection ({categoryProducts.length} items)
                    </Link>
                  </div>
                </section>
              );
            })}
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
          background: #d4af37;
        }
      `}</style>
    </main>
  );
}
