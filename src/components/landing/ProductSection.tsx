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
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-6 flex items-center justify-center cursor-pointer" onClick={() => onQuickView(product)}>
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <button 
             onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
             className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg hover:bg-black hover:text-white transition-colors"
           >
             <Eye size={18} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart(product); }}
             className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
           >
             <Plus size={18} />
           </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">{product.brand}</p>
        <Link href={`/catalog/${product.slug}`} className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-black transition-colors mb-2 flex-1">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">{product.oldPrice} MAD</span>
            )}
            <span className="text-lg font-black text-black">{product.price} MAD</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="w-10 h-10 bg-gray-100 text-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
          >
            <ShoppingCart size={18} />
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight relative">
            {title}
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-black rounded-full" />
          </h2>
          <Link href="/catalog" className="text-sm font-bold text-gray-500 hover:text-black transition-colors flex items-center gap-2">
            Voir tout
            <Plus size={14} />
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
