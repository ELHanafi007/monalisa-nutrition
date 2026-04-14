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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[111] flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-white border border-gray-100 w-full max-w-2xl pointer-events-auto relative overflow-hidden flex flex-col md:flex-row rounded-[2.5rem] shadow-2xl">
              <div className="flex-1 p-10 md:p-12 space-y-8">
                <div className="flex items-center gap-3">
                   <Sparkles className="text-luxury-red" size={18} />
                   <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-red">Accès Exclusif</span>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.9]">Rejoignez le Cercle <span className="red-gradient-text italic">Elite.</span></h2>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Confiez-nous vos coordonnées pour recevoir en priorité les notifications sur nos arrivages limités et nos protocoles de performance avancés.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="VOTRE ADRESSE EMAIL" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-[10px] font-black tracking-widest outline-none focus:border-luxury-red transition-all"
                  />
                  <button onClick={handleClose} className="w-full luxury-button py-5 rounded-2xl shadow-xl shadow-red-100">
                    Demander l'Adhésion
                  </button>
                </div>
                <button 
                  onClick={handleClose}
                  className="text-[8px] uppercase tracking-[0.3em] text-gray-400 hover:text-luxury-red font-black transition-colors block mx-auto pt-4"
                >
                  Je préfère le parcours standard
                </button>
              </div>
              
              <div className="hidden md:block w-1/3 bg-gray-50 relative overflow-hidden border-l border-gray-100">
                <div className="absolute inset-0 opacity-10">
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-luxury-red to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-luxury-red/10 font-black text-9xl italic rotate-90 opacity-20">M</span>
                </div>
              </div>

              <button 
                onClick={handleClose}
                className="absolute top-8 right-8 text-gray-300 hover:text-luxury-red transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
