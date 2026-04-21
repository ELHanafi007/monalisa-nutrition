"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: [0.7, 0, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-luxury-red rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-luxury-red rounded-full blur-[120px]"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-32 h-32 md:w-48 md:h-48 mb-8"
            >
              <div className="absolute inset-0 rounded-full border-2 border-luxury-red/10 animate-ping" />
              <div className="absolute inset-0 rounded-full border border-luxury-red/20 scale-110" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="Monaliza House" 
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            {/* Text Loading */}
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-black mb-2"
              >
                Monaliza <span className="red-gradient-text italic">House</span>
              </motion.h1>
              
              <div className="relative h-[2px] w-48 mx-auto bg-gray-100 overflow-hidden rounded-full">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-luxury-red"
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 text-[10px] uppercase tracking-[0.5em] text-luxury-red font-black"
              >
                L'excellence en mouvement
              </motion.p>
            </div>
          </div>

          {/* Luxury Corner Accents */}
          <motion.div 
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-luxury-red/20 hidden md:block"
          />
          <motion.div 
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-luxury-red/20 hidden md:block"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
