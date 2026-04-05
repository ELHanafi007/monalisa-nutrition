"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';

export const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('monalisa-subscribed');
    if (!hasSubscribed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 15000); // Show after 15 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Don't show again in this session
    localStorage.setItem('monalisa-subscribed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[111] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-surface border border-gold/20 w-full max-w-2xl pointer-events-auto relative overflow-hidden flex flex-col md:flex-row">
              <div className="flex-1 p-12 space-y-8">
                <div className="flex items-center gap-3">
                   <Sparkles className="text-gold" size={16} />
                   <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold">Exclusive Access</span>
                </div>
                <h2 className="text-4xl font-serif">Join the <span className="italic">Elite</span> Circle.</h2>
                <p className="text-sm text-text-muted font-light leading-relaxed">
                  Entrust us with your coordinates to receive priority notifications for limited-run laboratory isolates and advanced performance protocols.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    className="w-full bg-black/50 border border-border p-4 text-[10px] tracking-widest outline-none focus:border-gold transition-colors italic"
                  />
                  <button onClick={handleClose} className="w-full luxury-button">
                    Request Entry
                  </button>
                </div>
                <button 
                  onClick={handleClose}
                  className="text-[8px] uppercase tracking-[0.3em] text-text-muted hover:text-white transition-colors block mx-auto pt-4"
                >
                  I prefer the standard path
                </button>
              </div>
              
              <div className="hidden md:block w-1/3 bg-[#0a0a0a] relative overflow-hidden border-l border-border">
                <div className="absolute inset-0 opacity-20">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold/20 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-gold/10 font-serif text-9xl italic rotate-90">M</span>
                </div>
              </div>

              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 text-text-muted hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
