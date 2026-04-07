"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { ArrowRight, MoveRight } from 'lucide-react';
import { useRef } from 'react';

export const CategorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-padding bg-black overflow-hidden relative">
      {/* Decorative background number */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[30vw] font-serif italic text-white/[0.02] pointer-events-none select-none z-0">
        Pillars
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="flex items-center gap-4 mb-6">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 1 }}
                className="h-[1px] bg-gold/50" 
              />
              <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">The Performance Pillars</span>
            </span>
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9]">
              The <span className="italic">Elite</span> <br /> 
              <span className="gold-gradient-text">Departments.</span>
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-6 group">
            <span className="text-[8px] uppercase tracking-[0.4em] text-text-muted">Swipe to Explore</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors overflow-hidden">
               <motion.div
                 animate={{ x: [-20, 20] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               >
                 <MoveRight size={16} className="text-gold" />
               </motion.div>
            </div>
          </div>
        </div>

        {/* Draggable Slider Container */}
        <motion.div 
          ref={scrollRef}
          className="flex gap-8 md:gap-12 overflow-x-auto pb-12 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalog?cat=${category.slug}`}
              className="min-w-[85vw] md:min-w-[450px] lg:min-w-[500px] snap-center group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface glass-card border-none">
                <div className="absolute inset-0 z-0 transition-transform duration-[2s] ease-[0.7,0,0.3,1] group-hover:scale-110">
                  <Image 
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-50 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                  <div className="mb-6 overflow-hidden">
                    <span className="text-gold font-serif text-3xl italic block translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-serif mb-6 group-hover:text-gold transition-colors duration-500">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-text-muted font-light leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center gap-4 group/btn">
                    <div className="w-10 h-[1px] bg-gold group-hover:w-20 transition-all duration-700" />
                    <span className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">Enter Department</span>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
              </div>
            </Link>
          ))}
          
          {/* Final Call to Action Slide */}
          <div className="min-w-[85vw] md:min-w-[450px] lg:min-w-[500px] snap-center flex items-center justify-center">
             <Link href="/catalog" className="flex flex-col items-center gap-8 group">
                <div className="w-32 h-32 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-700 relative">
                   <ArrowRight size={32} className="text-gold group-hover:text-black transition-colors" />
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                     className="absolute inset-0 border-t border-gold rounded-full"
                   />
                </div>
                <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white group-hover:text-gold transition-colors">Complete Archive</span>
             </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
