"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-gray-100 p-3 md:p-6 transition-all hover:border-luxury-red/30 hover:shadow-xl rounded-2xl"
    >
      <div className="aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
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
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }} 
            className="w-10 h-10 bg-white text-black rounded-full shadow-lg flex items-center justify-center hover:bg-luxury-red hover:text-white transition-colors"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }} 
            className="w-10 h-10 bg-luxury-red text-white rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-colors"
          >
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
};
