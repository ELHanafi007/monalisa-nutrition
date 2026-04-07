"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Shield, Zap, Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { useState } from 'react';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickView = ({ product, onClose }: QuickViewProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[120]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[121] flex items-center justify-center p-4 md:p-12 pointer-events-none"
          >
            <div className="bg-surface border border-white/10 w-full max-w-5xl pointer-events-auto relative overflow-hidden flex flex-col md:flex-row h-full max-h-[80vh] md:max-h-auto overflow-y-auto md:overflow-hidden">
              {/* Product Visual */}
              <div className="flex-1 bg-[#050505] p-12 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="absolute top-8 left-8">
                   <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-gold/50">Artifact Examination</span>
                </div>
                <div className="relative w-full h-full min-h-[300px]">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-contain p-8"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 p-12 flex flex-col justify-between">
                <button 
                  onClick={onClose}
                  className="absolute top-8 right-8 text-text-muted hover:text-gold transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">{product.brand}</span>
                    <h2 className="text-4xl md:text-5xl font-serif">{product.name}</h2>
                    <p className="text-xl font-light tracking-widest text-white/90">{product.price} MAD</p>
                  </div>

                  <div className="w-12 h-[1px] bg-gold/30" />

                  <p className="text-sm text-text-muted font-light leading-relaxed italic">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    {product.benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-gold rounded-full" />
                        <span className="text-[10px] uppercase tracking-widest text-white/70">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-12 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-white/10 px-4 py-3 bg-black/40">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-gold transition-colors"><Minus size={14} /></button>
                      <span className="w-10 text-center text-[10px] font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-gold transition-colors"><Plus size={14} /></button>
                    </div>
                    <button 
                      onClick={() => {
                        addToCart(product, quantity);
                        onClose();
                      }}
                      className="flex-1 luxury-button"
                    >
                      Add to Collection
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center text-[8px] uppercase tracking-[0.3em] text-text-muted font-bold pt-4 border-t border-white/5">
                    <span className="flex items-center gap-2"><Shield size={12} className="text-gold/50" /> Laboratory Certified</span>
                    <span className="flex items-center gap-2"><Zap size={12} className="text-gold/50" /> Rapid Bio-Uptake</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
