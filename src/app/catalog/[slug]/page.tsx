"use client";

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { Navbar } from '@/components/Navbar';
import { ShoppingCart, Heart, Shield, Truck, RotateCcw, Plus, Minus, Star, Award, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif mb-8">Product Not Found</h1>
        <Link href="/catalog" className="text-gold uppercase tracking-widest border-b border-gold pb-1">Back to Collections</Link>
      </div>
    );
  }

  const reviews = [
    { name: "Othman B.", rating: 5, comment: "Absolute purity. The absorption rate is noticeably higher than anything else on the market.", date: "March 15, 2026" },
    { name: "Yasmine K.", rating: 5, comment: "The Gold Standard for a reason. Monalisa delivery was express and the concierge was very helpful.", date: "February 28, 2026" },
    { name: "Mehdi A.", rating: 4, comment: "Expensive, but you get what you pay for. The quality of the isolate is unmatched.", date: "February 10, 2026" }
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-surface border border-border overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center p-12">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain mix-blend-lighten p-12"
              />
            </div>
            <div className="absolute top-8 left-8">
              <span className="bg-gold text-black text-[10px] font-bold px-4 py-1 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle size={10} /> Certified Artifact
              </span>
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
              <div className="flex items-center gap-4 mb-4">
                <p className="text-gold uppercase tracking-[0.5em] text-xs font-bold">{product.brand}</p>
                <div className="w-1 h-1 bg-border rounded-full" />
                <div className="flex items-center gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={10} className={i < 4 ? "fill-gold text-gold" : "text-border"} />
                   ))}
                   <span className="text-[10px] text-text-muted uppercase tracking-widest ml-2">4.9 (124 Reviews)</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-6">{product.name}</h1>
              <p className="text-2xl font-light tracking-widest mb-8">{product.price} MAD</p>
              <p className="text-text-muted text-lg font-light leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Product Tabs */}
            <div className="mb-12">
              <div className="flex gap-8 border-b border-border mb-8">
                {['description', 'usage', 'lab-reports'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative ${activeTab === tab ? 'text-gold' : 'text-text-muted hover:text-white'}`}
                  >
                    {tab.replace('-', ' ')}
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />}
                  </button>
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-text-muted font-light leading-relaxed min-h-[100px]"
                >
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <p>Engineered for those who demand absolute excellence. This formula undergoes a multi-stage microfiltration process to ensure maximum purity and rapid bio-availability.</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-1 h-1 bg-gold rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'usage' && (
                    <p>For optimal results, consume 1 serving immediately post-ritual (training). Mix with 250ml of chilled crystalline water. Can also be utilized as a meal companion during periods of high-intensity protocols.</p>
                  )}
                  {activeTab === 'lab-reports' && (
                    <div className="flex items-center gap-4 p-4 border border-gold/20 bg-gold/5">
                       <Award className="text-gold" />
                       <div>
                          <p className="text-xs font-bold text-white uppercase tracking-widest">Certificate of Analysis #MZ-2026</p>
                          <p className="text-[10px] uppercase tracking-widest text-gold">Triple-Tested for 200+ Banned Substances</p>
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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

      {/* Reviews Section */}
      <section className="section-padding bg-[#050505] border-y border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
            <div className="max-w-xl">
               <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Client Testimonials</span>
               <h2 className="text-5xl font-serif italic mb-6">The Monalisa Verdict.</h2>
               <p className="text-text-muted font-light leading-relaxed">Hear from the elite community who have integrated the Monalisa Standard into their performance protocols.</p>
            </div>
            <div className="flex flex-col items-center p-8 border border-gold/10 bg-black/50">
               <span className="text-5xl font-serif text-gold mb-2">4.9</span>
               <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
               </div>
               <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">124 Elite Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {reviews.map((review, i) => (
               <div key={i} className="p-10 border border-border hover:border-gold/30 transition-colors">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest">{review.name}</span>
                    <span className="text-[8px] uppercase tracking-widest text-text-muted">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} className="fill-gold text-gold" />)}
                  </div>
                  <p className="text-sm text-text-muted font-light leading-relaxed italic">"{review.comment}"</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="section-padding">
        <div className="container text-center">
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block">You may also like</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">The <span className="italic">Companion</span> Rituals.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((p) => (
              <Link href={`/catalog/${p.slug}`} key={p.id} className="group">
                <div className="aspect-square bg-surface border border-border p-4 mb-4 group-hover:border-gold transition-colors overflow-hidden relative">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill
                    className="object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 p-4"
                  />
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
