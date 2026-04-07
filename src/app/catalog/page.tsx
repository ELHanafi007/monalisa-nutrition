"use client";

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { products, Product } from '@/data/products';
import { categories, Category } from '@/data/categories';
import { Search, Plus, Eye, ShoppingCart, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { QuickView } from '@/components/QuickView';

export default function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-surface/30 border border-white/5 p-3 md:p-6 transition-all hover:border-gold/30"
    >
      <div className="aspect-square relative mb-4 bg-black/40 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        {product.isRupture && (
          <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[8px] px-2 py-1 font-bold uppercase tracking-widest">
            Rupture
          </div>
        )}
        {product.oldPrice && (
          <div className="absolute top-2 right-2 z-20 bg-gold text-black text-[8px] px-2 py-1 font-bold uppercase tracking-widest">
            Promo
          </div>
        )}
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button onClick={() => setSelectedProduct(product)} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gold transition-colors">
            <Eye size={16} />
          </button>
          <button onClick={() => addToCart(product)} className="w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[8px] text-gold uppercase tracking-widest font-bold">{product.brand}</p>
        <h3 className="text-[10px] md:text-sm font-serif line-clamp-2 h-8 group-hover:text-gold transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs md:text-sm font-bold">{product.price} Dhs</span>
          {product.oldPrice && (
            <span className="text-[8px] md:text-[10px] text-text-muted line-through">{product.oldPrice} Dhs</span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Header Banner */}
      <section className="pt-32 pb-12 border-b border-white/5 bg-[#080808]">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-serif italic mb-4">Monalisa <span className="text-gold">Nutrition</span></h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Distributeur Officiel des Plus Grandes Marques</p>
        </div>
      </section>

      {/* Category Slider */}
      <div className="sticky top-[72px] z-30 bg-black/90 backdrop-blur-md border-b border-white/5 overflow-x-auto no-scrollbar py-4">
        <div className="container flex items-center gap-4">
          {categories.map(cat => (
            <a 
              key={cat.id} 
              href={`#${cat.slug}`}
              className="whitespace-nowrap px-6 py-2 text-[10px] uppercase tracking-widest font-bold border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      <div className="container py-12 space-y-24">
        {categories.map(category => {
          const categoryProducts = products.filter(p => p.category === category.slug);
          if (categoryProducts.length === 0) return null;

          const isExpanded = expandedCategories[category.slug];
          const displayedProducts = isExpanded ? categoryProducts : categoryProducts.slice(0, 3);

          return (
            <section key={category.id} id={category.slug} className="scroll-mt-32">
              <div className="flex items-end justify-between mb-8 border-l-4 border-gold pl-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-serif uppercase tracking-wider">{category.name}</h2>
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.3em] mt-2">{category.description}</p>
                </div>
                {categoryProducts.length > 3 && (
                  <button 
                    onClick={() => toggleCategory(category.slug)}
                    className="hidden md:flex items-center gap-2 text-gold text-[10px] uppercase tracking-widest font-bold hover:underline"
                  >
                    {isExpanded ? 'Réduire' : 'Voir plus'} <ChevronRight size={14} className={isExpanded ? 'rotate-90' : ''} />
                  </button>
                )}
              </div>

              {/* Grid: 2 columns on mobile, 3 on tablets, 4 on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {categoryProducts.length > 3 && (
                <div className="mt-8 flex justify-center md:hidden">
                  <button 
                    onClick={() => toggleCategory(category.slug)}
                    className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-gold"
                  >
                    {isExpanded ? 'Réduire la liste' : `Voir plus (${categoryProducts.length - 3} produits)`}
                  </button>
                </div>
              )}
            </section>
          );
        })}

        {/* Branding Info Section */}
        <section className="py-20 border-t border-white/5 bg-[#050505]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-serif italic text-gold">Monalisa Nutrition</h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Le leader de la nutrition sportive au Maroc. Nous proposons un vaste choix de compléments alimentaires authentiques et accrédités par l’ONSSA : Whey Protein, Creatine, BCAA, Omega 3, Mass Gainer et Multivitamines.
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-widest">Optimum Nutrition</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">MuscleTech</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Dymatize</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Biotech USA</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Applied Nutrition</span>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-12 border-t border-white/5 bg-black text-center">
        <p className="text-[8px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — The Standard of Excellence</p>
      </footer>
      
      <div className="h-24 md:hidden" />
    </main>
  );
}
