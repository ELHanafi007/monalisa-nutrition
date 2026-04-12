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
  const [activeImage, setActiveImage] = useState(product?.image || '');

  // Reset active image when product changes
  useState(() => {
    if (product) setActiveImage(product.image);
  });

  if (!product) return null;

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[121] flex items-center justify-center p-4 md:p-12 pointer-events-none"
          >
            <div className="bg-white border border-gray-100 w-full max-w-5xl pointer-events-auto relative rounded-3xl overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-auto overflow-y-auto md:overflow-hidden shadow-2xl">
              {/* Product Visual */}
              <div className="flex-1 bg-gray-50 p-12 relative flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                <div className="absolute top-8 left-8 z-10 flex gap-2">
                  <div className="bg-white border border-border px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
                    <Shield size={14} className="text-luxury-red" />
                    <span className="text-[10px] font-black uppercase tracking-widest">100% Original</span>
                  </div>
                </div>
                
                <div className="relative w-full flex-1 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={activeImage} 
                        alt={product.name} 
                        fill
                        className={`object-contain p-8 ${product.isRupture ? 'grayscale' : ''}`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-3 w-full max-w-sm mt-8">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`aspect-square relative rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-luxury-red' : 'border-white hover:border-gray-200'}`}
                      >
                        <Image src={img} alt={`${product.name} ${i}`} fill className="object-contain p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 p-12 flex flex-col justify-between text-black">
                <button 
                  onClick={onClose}
                  className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-luxury-red uppercase tracking-widest text-[10px] font-black">{product.brand}</span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">{product.name}</h2>
                    <p className="text-3xl font-black text-black">{product.price} <span className="text-sm text-luxury-red">MAD</span></p>
                  </div>

                  <div className="w-16 h-1.5 bg-luxury-red rounded-full" />

                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {product.benefits.slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-luxury-red rounded-full shadow-sm" />
                        <span className="text-[10px] uppercase tracking-widest text-gray-800 font-black">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-12 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 shadow-inner">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-luxury-red transition-colors"><Minus size={14} /></button>
                      <span className="w-10 text-center text-sm font-black">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-luxury-red transition-colors"><Plus size={14} /></button>
                    </div>
                    <button 
                      onClick={() => {
                        addToCart(product, quantity);
                        onClose();
                      }}
                      className="flex-1 bg-luxury-red text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-100"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-bold pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-2"><Shield size={14} className="text-luxury-red" /> 100% Authentique</span>
                    <span className="flex items-center gap-2"><Zap size={14} className="text-luxury-red" /> Livraison Express</span>
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
