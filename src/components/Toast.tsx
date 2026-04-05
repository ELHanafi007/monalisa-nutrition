"use client";

import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-[100] bg-gold text-black px-8 py-4 flex items-center gap-4 shadow-2xl border border-white/20"
        >
          <CheckCircle size={18} />
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
