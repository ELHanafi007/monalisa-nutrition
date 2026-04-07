"use client";

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { products } from '@/data/products';
import { ShoppingCart, Heart, Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { QuickView } from '@/components/QuickView';
import { LocationSection } from '@/components/LocationSection';
import { useState } from 'react';
import { Product } from '@/data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <CategorySection />
      
      {/* QuickView Component */}
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Featured Products */}
      <section className="section-padding bg-black relative">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-24 text-center md:text-left gap-8"
          >
            <div className="max-w-xl">
              <span className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <div className="w-8 h-[1px] bg-gold/50" />
                <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">Seasonal Edit</span>
              </span>
              <h2 className="text-6xl md:text-8xl font-serif leading-tight">The <span className="italic">Elite</span> <br />Selection.</h2>
            </div>
            <p className="text-text-muted max-w-xs font-light text-sm leading-relaxed mb-4">
              A curated archive of the most potent biological artifacts currently in existence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.7, 0, 0.3, 1] }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[4/5] glass-card overflow-hidden relative group-hover:border-gold/30">
                  {/* Quick Actions */}
                  <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 flex flex-col gap-3">
                    <button className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center hover:text-gold transition-colors border border-white/5">
                      <Heart size={16} />
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center hover:text-gold transition-colors border border-white/5"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 z-30">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-gold/50 py-1 px-3 border border-gold/20 backdrop-blur-sm">Artifact {product.id}</span>
                  </div>
                  
                  {/* Product Image */}
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full h-full flex items-center justify-center relative cursor-pointer"
                  >
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      priority={index < 4}
                      className={`object-contain transition-transform duration-1000 group-hover:scale-110 p-12 ${product.isRupture ? 'grayscale' : ''}`}
                    />
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.7,0,0.3,1] z-40">
                    <div className="bg-black/90 backdrop-blur-md p-6 border-t border-gold/20">
                      <div className="space-y-3 mb-6">
                        {product.benefits.slice(0, 2).map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gold rounded-full" />
                            <span className="text-[8px] uppercase tracking-widest text-text-muted">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-gold text-black py-4 uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-white transition-colors flex items-center justify-center gap-3"
                      >
                        <Plus size={14} /> Add to Collection
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2 px-2">
                  <div className="flex justify-between items-end">
                    <div className="cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <p className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-2">{product.brand}</p>
                      <h3 className="text-lg font-serif group-hover:text-gold transition-colors duration-500">{product.name}</h3>
                    </div>
                    <p className="text-sm font-bold tracking-widest text-gold/80">{product.price} MAD</p>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 group-hover:bg-gold/30 transition-colors duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] lg:aspect-[3/4]"
            >
               <div className="absolute inset-0 border border-gold/20 translate-x-8 translate-y-8 pointer-events-none" />
               <div className="relative w-full h-full overflow-hidden">
                 <img 
                   src="/images/the-community.jpeg" 
                   alt="The Monalisa Standard" 
                   className="w-full h-full object-cover  brightness-75 hover:scale-105 transition-transform duration-[2s]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
               </div>
               
               {/* Floating Luxury Label requested by user */}
               <div className="absolute -bottom-16 -right-16 bg-surface border border-white/5 p-12 hidden md:block group">
                  <div className="relative">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute -top-6 left-0 w-full h-[1px] bg-gold/30 origin-left"
                    />
                    <p className="text-gold font-serif text-6xl italic mb-4 leading-none relative">
                      100%
                      <span className="absolute -top-2 -right-4 text-[10px] not-italic text-gold/40">★</span>
                    </p>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.6em] font-black text-white">Purity</p>
                      <p className="text-[8px] uppercase tracking-[0.4em] font-medium text-text-muted">Laboratory Guaranteed</p>
                    </div>
                    {/* Decorative Corner */}
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-gold/20 group-hover:border-gold/50 transition-colors duration-700" />
                  </div>
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.7, 0, 0.3, 1] }}
              viewport={{ once: true }}
              className="space-y-12 text-center lg:text-left"
            >
              <div className="space-y-6">
                <span className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-8 h-[1px] bg-gold/50" />
                  <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">The Monalisa Ethos</span>
                </span>
                <h2 className="text-6xl md:text-8xl font-serif leading-[0.9]">The <span className="italic">Standard</span> of <br /><span className="gold-gradient-text">Excellence.</span></h2>
              </div>

              <div className="space-y-8 text-xl text-text-muted font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                <p>
                  At the heart of the Maghreb, we recognized a void. The athlete's journey was cluttered with mediocre formulas and mass-produced fillers. Monalisa was born to bridge this gap.
                </p>
                <p className="italic">
                  "We source only the purest molecules from the world's leading laboratories, ensuring that every milligram serves a purpose."
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12">
                <div>
                  <p className="text-3xl font-serif text-white mb-2">100%</p>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Certified Purity</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-white mb-2">24h</p>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Elite Concierge</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-3xl font-serif text-white mb-2">Exp.</p>
                  <p className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Global Sourcing</p>
                </div>
              </div>

              <div className="pt-12">
                <Link href="/about" className="luxury-button-outline">
                  Discover Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LocationSection />

      {/* Footer (Simplified for home) */}
      <footer className="py-20 bg-[#050505] border-t border-white/5 text-center">
        <div className="container">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — The Standard</p>
        </div>
      </footer>
    </main>
  );
}
