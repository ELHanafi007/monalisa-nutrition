"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User, Crown, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export const MobileNav = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { icon: Home, label: 'Ritual', path: '/' },
    { icon: ShoppingBag, label: 'Archive', path: '/catalog' },
    { icon: Crown, label: 'Elite', path: '/concierge', special: true },
    { icon: Compass, label: 'Sanctuary', path: '/about' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100]">
      {/* Luxury Dock Container */}
      <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
        {/* Subtle Gold Reflection on the Dock */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-white/5 opacity-50 pointer-events-none" />
        
        <div className="flex justify-between items-center relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            if (item.special) {
              return (
                <Link key={item.path} href={item.path} className="relative -top-2">
                  <motion.div
                    whileTap={{ scale: 0.9, y: 5 }}
                    className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border-2 border-black group/special"
                  >
                    <Crown size={24} className="text-black" />
                    
                    {/* Animated Gold Ring around the special button */}
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 border border-gold rounded-full"
                    />
                  </motion.div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.3em] font-black text-gold">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link key={item.path} href={item.path} className="relative flex flex-col items-center gap-1">
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className={`${isActive ? 'text-gold' : 'text-text-muted'} transition-all duration-500`}
                >
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                  
                  {isActive && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full shadow-[0_0_10px_#d4af37]"
                    />
                  )}
                </motion.div>
                <span className={`text-[7px] uppercase tracking-[0.2em] font-bold ${isActive ? 'text-gold' : 'text-text-muted'} transition-colors duration-500`}>
                  {item.label}
                </span>
                
                {item.label === 'Archive' && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black border border-black">
                    {totalItems}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
