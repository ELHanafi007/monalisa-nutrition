"use client";

import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { useCategories } from '@/data/categories';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Collections() {
  const categories = useCategories();
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-luxury-red uppercase tracking-[0.3em] text-[10px] font-black mb-6 block"
          >
            Les Archives Monaliza
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.8]"
          >
            Nos <span className="red-gradient-text italic">Univers.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Explorez nos départements méticuleusement sélectionnés, chacun conçu pour servir un pilier spécifique de votre performance.
          </motion.p>
        </div>
      </section>

      {/* Collections List */}
      <section className="py-32">
        <div className="container">
          <div className="space-y-40 md:space-y-64">
            {categories.map((category, index) => (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
              >
                <div className="flex-1 w-full aspect-square bg-gray-50 rounded-[3rem] relative group overflow-hidden shadow-2xl border-8 border-white">
                   <div className="absolute inset-0 bg-luxury-red/10 group-hover:bg-luxury-red/5 transition-colors duration-700 z-10" />
                   <Image 
                     src={category.image} 
                     alt={category.name} 
                     fill
                     unoptimized
                     className="object-contain p-12 group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute inset-0 flex items-end justify-start p-12 z-20 pointer-events-none">
                      <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl">
                         <span className="text-[10px] text-luxury-red uppercase tracking-[0.3em] font-black mb-2 block">Département</span>
                         <h2 className="text-3xl font-black uppercase tracking-tighter text-black">{category.name}</h2>
                      </div>
                   </div>
                   <Link 
                     href={`/catalog?category=${category.slug}`}
                     className="absolute inset-0 z-30"
                   />
                </div>
                
                <div className="flex-1 space-y-10">
                  <span className="red-gradient-text font-black text-7xl md:text-9xl opacity-20 italic leading-none">0{index + 1}</span>
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{category.name}</h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link 
                      href={`/catalog?category=${category.slug}`} 
                      className="luxury-button"
                    >
                      Découvrir la Collection
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
