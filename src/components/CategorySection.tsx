"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/data/categories';
import { ArrowRight, MoveRight } from 'lucide-react';
import { useRef } from 'react';

export const CategorySection = () => {
  const categories = useCategories();
  return (
    <section className="section-padding bg-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-luxury-red/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-gold/50" />
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">The Elite Departments</span>
            <div className="h-[1px] w-12 bg-gold/50" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8"
          >
            The <span className="italic">Performance</span> <br /> 
            <span className="gold-gradient-text uppercase tracking-tighter">Pillars.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-xl text-sm font-light tracking-wide leading-relaxed"
          >
            Explore our curated selection of premium supplements, organized into specialized departments for your specific performance goals.
          </motion.p>
        </div>

        {/* Sophisticated Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 h-auto md:h-[1200px]">
          {/* Featured Large Item (1) */}
          <div className="md:col-span-8 md:row-span-2">
            <CategoryCard category={categories.find(c => c.slug === 'whey-proteine') || categories[0]} index={0} />
          </div>

          {/* Secondary Items (2 & 3) */}
          <div className="md:col-span-4 md:row-span-1">
            <CategoryCard category={categories.find(c => c.slug === 'creatine') || categories[1]} index={1} />
          </div>
          <div className="md:col-span-4 md:row-span-1">
            <CategoryCard category={categories.find(c => c.slug === 'packs') || categories[2]} index={2} />
          </div>

          {/* Tertiary Items (4, 5, 6) */}
          <div className="md:col-span-4 md:row-span-1">
            <CategoryCard category={categories.find(c => c.slug === 'gainers') || categories[3]} index={3} />
          </div>
          <div className="md:col-span-4 md:row-span-2">
            <CategoryCard category={categories.find(c => c.slug === 'vitamins-minerals') || categories[4]} index={4} />
          </div>
          <div className="md:col-span-4 md:row-span-1">
            <CategoryCard category={categories.find(c => c.slug === 'pre-workout') || categories[5]} index={5} />
          </div>
          
          <div className="md:col-span-4 md:row-span-1">
            <Link href="/catalog" className="h-full w-full group flex flex-col items-center justify-center border border-white/10 hover:border-gold transition-all duration-700 bg-surface/30 backdrop-blur-sm rounded-2xl p-12 text-center gap-6">
               <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold transition-all duration-700">
                  <ArrowRight size={32} className="text-gold group-hover:text-black transition-colors" />
               </div>
               <div>
                 <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white group-hover:text-gold transition-colors block mb-2">Complete Archive</span>
                 <span className="text-[8px] uppercase tracking-[0.2em] text-text-muted font-bold block">Explore All 13 Departments</span>
               </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category, index }: { category: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="h-full w-full group relative overflow-hidden rounded-2xl bg-surface cursor-pointer"
    >
      <Link href={`/catalog/${category.slug}`} className="block h-full w-full">
        <Image 
          src={category.image}
          alt={category.name}
          fill
          unoptimized
          className="object-cover brightness-50 group-hover:scale-110 group-hover:brightness-40 transition-all duration-[2s] ease-out"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 border border-white/5 group-hover:border-gold/30 transition-colors duration-700 rounded-2xl" />

        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
          <div className="overflow-hidden mb-4">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-gold font-serif text-2xl italic block"
            >
              0{index + 1}
            </motion.span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-serif mb-4 group-hover:text-gold transition-colors duration-500">
            {category.name}
          </h3>
          
          <p className="text-xs text-text-muted font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
            {category.description}
          </p>

          <div className="flex items-center gap-4 mt-8">
            <div className="w-8 h-[1px] bg-gold/50 group-hover:w-16 transition-all duration-700" />
            <span className="text-[8px] uppercase tracking-[0.4em] font-black text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700">Enter Department</span>
          </div>
        </div>

        {/* Dynamic Accents */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
      </Link>
    </motion.div>
  );
};
