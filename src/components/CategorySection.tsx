"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { ArrowRight } from 'lucide-react';

export const CategorySection = () => {
  return (
    <section className="section-padding bg-black overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Curated Selections</span>
            <h2 className="text-5xl md:text-7xl font-serif">A Sanctuary of <br /> <span className="italic">Pure Supplements.</span></h2>
          </div>
          <Link href="/catalog" className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] hover:text-gold transition-colors">
            Explore All Departments <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.slice(0, 3).map((category, index) => (
            <Link
              key={category.id}
              href={`/catalog?cat=${category.slug}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] group overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10" />
                <div className="relative w-full h-full group-hover:scale-110 transition-all duration-1000">
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover grayscale-0 group-hover:grayscale-[0.5]"
                  />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-10 z-20">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-bold mb-2">Department {index + 1}</span>
                  <h3 className="text-3xl font-serif mb-4 group-hover:text-gold transition-colors">{category.name}</h3>
                  <p className="text-sm text-text-muted mb-8 line-clamp-2 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.description}
                  </p>
                  <div className="w-10 h-[1px] bg-gold group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
