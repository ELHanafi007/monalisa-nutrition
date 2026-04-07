"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Background with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: [0.7, 0, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image 
            src="/images/the-ritual.jpeg" 
            alt="Elite Performance" 
            fill
            priority
            className="object-cover  contrast-125 brightness-75"
          />
        </motion.div>
      </div>

      <div className="container relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="flex items-center gap-4 mb-8 overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
                className="w-12 h-[1px] bg-gold"
              />
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.7, 0, 0.3, 1] }}
                className="text-gold uppercase tracking-[0.6em] text-[10px] md:text-xs font-bold block"
              >
                The Standard of Absolute Purity
              </motion.span>
            </span>

            <h1 className="text-7xl md:text-[120px] font-serif leading-[0.9] mb-12">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.7, 0, 0.3, 1] }}
                  className="block"
                >
                  Refined <span className="italic gold-gradient-text">Elite.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl text-text-muted mb-16 max-w-xl font-light leading-relaxed tracking-wide"
            >
              Monalisa is more than nutrition. It is a philosophy of excellence, 
              curating only the world's most potent isolates for the Moroccan athlete.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-8"
            >
              <Link href="/catalog" className="luxury-button group">
                Enter The Archive
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vertical Accents */}
      <div className="absolute bottom-20 left-12 hidden lg:flex flex-col gap-8 items-center z-20">
        <div className="h-24 w-[1px] bg-gradient-to-b from-gold to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold rotate-180 [writing-mode:vertical-lr]">SINCE MMXXVI</span>
      </div>

      <div className="absolute right-12 bottom-20 hidden lg:block z-20">
        <div className="flex items-center gap-6">
           <span className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Scroll to Explore</span>
           <motion.div 
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="w-[1px] h-12 bg-gold/30"
           />
        </div>
      </div>
    </div>
  );
};
