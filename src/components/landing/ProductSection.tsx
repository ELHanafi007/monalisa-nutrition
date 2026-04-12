"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-luxury-red text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg">
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50/50 p-6 flex items-center justify-center cursor-pointer" onClick={() => onQuickView(product)}>
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-luxury-red/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
             className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl hover:bg-luxury-red hover:text-white transition-all duration-300"
           >
             <Eye size={20} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart(product); }}
             className="w-12 h-12 bg-white text-luxury-red rounded-full flex items-center justify-center shadow-xl hover:bg-luxury-red hover:text-white transition-all duration-300"
           >
             <Plus size={20} />
           </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] text-luxury-red font-black uppercase tracking-[0.2em] mb-2">{product.brand}</p>
        <Link href={`/product/${product.slug}`} className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-luxury-red transition-colors mb-4 flex-1 leading-tight">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[10px] text-gray-400 line-through font-bold">{product.oldPrice} MAD</span>
            )}
            <span className="text-lg font-black text-black tracking-tighter">{product.price} <span className="text-xs text-luxury-red">MAD</span></span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-12 h-12 bg-gray-50 text-luxury-red rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all duration-500 shadow-sm"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProductSectionProps {
  title: string;
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ProductSection = ({ title, products, onQuickView }: ProductSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter relative">
            {title.split(' ')[0]} <span className="red-gradient-text italic">{title.split(' ').slice(1).join(' ')}</span>
            <span className="absolute -bottom-3 left-0 w-16 h-1.5 bg-luxury-red rounded-full" />
          </h2>
          <Link href="/catalog" className="text-sm font-black text-luxury-red hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest">
            Voir tout
            <Plus size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
