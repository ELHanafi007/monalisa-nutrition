"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { ArrowRight } from 'lucide-react';

export const CategorySection = () => {
  return (
    <section className="section-padding bg-black overflow-hidden relative">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-gold/50" />
              <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">Curated Selections</span>
            </span>
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9]">
              The <span className="italic">Pillars</span> of <br /> 
              <span className="gold-gradient-text">Performance.</span>
            </h2>
          </div>
          <Link href="/catalog" className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:text-gold transition-all duration-500">
            Explore All Departments 
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              href={`/catalog?cat=${category.slug}`}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.7, 0, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] overflow-hidden bg-surface"
              >
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-[0.7, 0, 0.3, 1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-12 z-20">
                  <span className="text-gold font-serif text-3xl italic mb-4 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-700">0{index + 1}</span>
                  <h3 className="text-4xl font-serif mb-6 group-hover:text-gold transition-colors duration-500">{category.name}</h3>
                  <div className="h-0 group-hover:h-20 overflow-hidden transition-all duration-700 ease-in-out">
                    <p className="text-sm text-text-muted font-light leading-relaxed mb-8">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[1px] bg-gold group-hover:w-20 transition-all duration-700" />
                    <span className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">View Artifacts</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
