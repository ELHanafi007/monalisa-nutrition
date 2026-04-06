"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-serif text-gold italic relative z-10"
            >
              M
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute -bottom-4 left-0 h-[1px] bg-gold/30"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-gold/50 block">
              Initializing Protocol
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
