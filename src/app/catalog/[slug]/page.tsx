"use client";

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { Navbar } from '@/components/Navbar';
import { ShoppingCart, Heart, Shield, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif mb-8">Product Not Found</h1>
        <Link href="/catalog" className="text-gold uppercase tracking-widest border-b border-gold pb-1">Back to Collections</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Image Gallery Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-surface border border-border overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center p-20">
              <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-10 border border-gold/10">
                 <span className="text-xs text-text-muted uppercase tracking-[0.4em] mb-4">{product.brand}</span>
                 <h2 className="text-3xl md:text-5xl font-serif italic text-gold mb-8">{product.name}</h2>
                 <div className="w-24 h-[1px] bg-gold/30" />
              </div>
            </div>
            <div className="absolute top-8 left-8">
              <span className="bg-gold text-black text-[10px] font-bold px-4 py-1 uppercase tracking-widest">Available</span>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="mb-8 pb-8 border-b border-border">
              <p className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-4">{product.brand}</p>
              <h1 className="text-5xl md:text-6xl font-serif mb-6">{product.name}</h1>
              <p className="text-2xl font-light tracking-widest mb-8">{product.price} MAD</p>
              <p className="text-text-muted text-lg font-light leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-6">Key Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text-muted font-light">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center border border-border px-4 py-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-gold transition-colors"><Minus size={16} /></button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-gold transition-colors"><Plus size={16} /></button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-gold text-black py-5 uppercase tracking-[0.3em] text-xs font-bold hover:bg-white transition-all duration-300"
              >
                Add to Collection
              </button>
              <button className="p-5 border border-border hover:border-gold transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 py-8 border-y border-border">
              {product.specs.map((spec, i) => (
                <div key={i}>
                  <p className="text-[8px] uppercase tracking-widest text-text-muted mb-2">{spec.label}</p>
                  <p className="text-xs font-bold uppercase tracking-widest">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <Shield size={20} className="text-gold" />
                <div className="text-[10px] uppercase tracking-widest">
                  <p className="font-bold mb-1">Authentic</p>
                  <p className="text-text-muted">ONSSA Certified</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Truck size={20} className="text-gold" />
                <div className="text-[10px] uppercase tracking-widest">
                  <p className="font-bold mb-1">Express</p>
                  <p className="text-text-muted">Morocco Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <RotateCcw size={20} className="text-gold" />
                <div className="text-[10px] uppercase tracking-widest">
                  <p className="font-bold mb-1">Concierge</p>
                  <p className="text-text-muted">24/7 Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="section-padding border-t border-border mt-20">
        <div className="container text-center">
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block">You may also like</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">The <span className="italic">Companion</span> Rituals.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((p) => (
              <Link href={`/catalog/${p.slug}`} key={p.id} className="group">
                <div className="aspect-square bg-surface border border-border p-8 mb-4 group-hover:border-gold transition-colors">
                  <div className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] text-text-muted uppercase tracking-widest mb-1">{p.brand}</span>
                    <span className="text-[10px] font-serif italic text-gold">{p.name}</span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold group-hover:text-gold transition-colors">{p.name}</p>
                <p className="text-[10px] text-text-muted tracking-widest">{p.price} MAD</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
