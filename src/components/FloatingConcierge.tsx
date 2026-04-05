"use client";

import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingConcierge = () => {
  return (
    <motion.a
      href="https://wa.me/212600000000"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-10 right-10 z-[40] bg-gold text-black p-4 rounded-full shadow-2xl flex items-center gap-3 group"
    >
      <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
        <span className="text-[10px] uppercase tracking-widest font-bold px-2">Live Concierge</span>
      </div>
      <MessageSquare size={24} />
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20 pointer-events-none" />
    </motion.a>
  );
};
