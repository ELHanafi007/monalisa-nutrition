"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          {/* Using a high-end dark nutrition placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop" 
            alt="Elite Performance" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </motion.div>
      </div>

      <div className="container relative z-20 mt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-sm font-semibold mb-6 block">
              The pinnacle of performance
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8">
              Refined Nutrition <br /> 
              <span className="italic">For The Elite.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-12 max-w-xl font-light leading-relaxed">
              Monalisa is more than nutrition. It is a philosophy of excellence, 
              curating only the world's most potent isolates for the Moroccan athlete.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/catalog" className="inline-block bg-gold text-black px-12 py-5 uppercase tracking-widest text-sm font-bold hover:bg-white transition-all duration-300">
                Shop The Collection
              </Link>
              <Link href="/concierge" className="inline-block border border-gold text-gold px-12 py-5 uppercase tracking-widest text-sm font-bold hover:bg-gold/10 transition-all duration-300">
                Personalized Protocol
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 left-10 hidden lg:block z-20">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-[1px] bg-gold" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold rotate-90 origin-left">EST. 2026</span>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-to-r {
          background: linear-gradient(to right, #000 0%, rgba(0,0,0,0.6) 40%, transparent 100%);
        }
      `}</style>
    </div>
  );
};
