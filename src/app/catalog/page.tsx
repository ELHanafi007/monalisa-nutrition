"use client";

import { useState, useMemo } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { products, Product } from '@/data/products';
import { categories, Category } from '@/data/categories';
import { Search, Plus, Eye, ShoppingCart, ChevronRight, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { QuickView } from '@/components/QuickView';

export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { addToCart } = useCart();

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

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 p-3 md:p-6 transition-all hover:border-luxury-red/30 hover:shadow-xl rounded-2xl"
    >
      <div className="aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        {product.isRupture && (
          <div className="absolute top-2 left-2 z-20 bg-gray-400 text-white text-[8px] px-2 py-1 font-bold uppercase tracking-widest rounded">
            Rupture
          </div>
        )}
        {product.oldPrice && (
          <div className="absolute top-2 right-2 z-20 bg-luxury-red text-white text-[8px] px-2 py-1 font-bold uppercase tracking-widest rounded">
            Promo
          </div>
        )}
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          className={`object-contain p-4 transition-transform duration-700 group-hover:scale-110 ${product.isRupture ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button onClick={() => setSelectedProduct(product)} className="w-10 h-10 bg-white text-black rounded-full shadow-lg flex items-center justify-center hover:bg-luxury-red hover:text-white transition-colors">
            <Eye size={16} />
          </button>
          <button onClick={() => addToCart(product)} className="w-10 h-10 bg-luxury-red text-white rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-colors">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[8px] text-luxury-red uppercase tracking-widest font-black">{product.brand}</p>
        <h3 className="text-[10px] md:text-sm font-bold line-clamp-2 h-8 group-hover:text-luxury-red transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs md:text-sm font-black text-black">{product.price} MAD</span>
          {product.oldPrice && (
            <span className="text-[8px] md:text-[10px] text-gray-400 line-through">{product.oldPrice} MAD</span>
          )}
        </div>
      </div>
    </motion.div>
  );

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
                  <ProductCard key={product.id} product={product} />
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

            const isExpanded = expandedCategories[category.slug];
            const displayedProducts = isExpanded ? categoryProducts : categoryProducts.slice(0, 12);

            return (
              <section key={category.id} id={category.slug} className="scroll-mt-32">
                <div className="flex items-end justify-between mb-8 border-l-4 border-luxury-red pl-6">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{category.name}</h2>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-2 font-bold">{category.description}</p>
                  </div>
                  {categoryProducts.length > 12 && (
                    <button 
                      onClick={() => toggleCategory(category.slug)}
                      className="hidden md:flex items-center gap-2 text-luxury-red text-[10px] uppercase tracking-widest font-black hover:underline"
                    >
                      {isExpanded ? 'Réduire' : 'Voir plus'} <ChevronRight size={14} className={isExpanded ? 'rotate-90' : ''} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {categoryProducts.length > 12 && (
                  <div className="mt-8 flex justify-center md:hidden">
                    <button 
                      onClick={() => toggleCategory(category.slug)}
                      className="w-full py-4 border border-gray-100 rounded-xl text-[10px] uppercase tracking-widest font-black text-luxury-red bg-gray-50"
                    >
                      {isExpanded ? 'Réduire la liste' : `Voir plus (${categoryProducts.length - 12} produits)`}
                    </button>
                  </div>
                )}
              </section>
            );
          })
        )}

        {/* Branding Info Section */}
        <section className="py-20 border-t border-gray-100 bg-gray-50 rounded-3xl overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-8 px-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Monaliza <span className="red-gradient-text italic">Nutrition</span></h2>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Le leader de la nutrition sportive au Royaume. Nous proposons une vaste sélection de compléments authentiques accrédités par les normes les plus élevées : Protéine Whey, Créatine, BCAA, Oméga 3, Mass Gainer et Multivitamines.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Partenaires Officiels</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">MuscleTech</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Dymatize</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Biotech USA</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Applied Nutrition</span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      
      <div className="h-24 md:hidden" />
    </main>
  );
}
