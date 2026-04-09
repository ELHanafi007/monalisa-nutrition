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
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: ShoppingBag, label: 'Boutique', path: '/catalog' },
    { icon: Crown, label: 'Elite', path: '/concierge', special: true },
    { icon: Compass, label: 'Infos', path: '/about' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100]">
      {/* Light Modern Dock Container */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl px-6 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden group">
        <div className="flex justify-between items-center relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            if (item.special) {
              return (
                <Link key={item.path} href={item.path} className="relative -top-2">
                  <motion.div
                    whileTap={{ scale: 0.9, y: 5 }}
                    className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-4 border-white group/special"
                  >
                    <Crown size={24} className="text-white" />
                    
                    {/* Animated Pulse around the special button */}
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 border-2 border-black rounded-full"
                    />
                  </motion.div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest font-black text-black">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link key={item.path} href={item.path} className="relative flex flex-col items-center gap-1">
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className={`${isActive ? 'text-black' : 'text-gray-400'} transition-all duration-300`}
                >
                  <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                  
                  {isActive && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full"
                    />
                  )}
                </motion.div>
                <span className={`text-[8px] uppercase tracking-widest font-black ${isActive ? 'text-black' : 'text-gray-400'} transition-colors duration-300`}>
                  {item.label}
                </span>
                
                {item.label === 'Boutique' && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-black border-2 border-white">
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
