"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export const MobileNav = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ShoppingBag, label: 'Catalog', path: '/catalog' },
    { icon: Crown, label: 'Concierge', path: '/concierge' },
    { icon: User, label: 'House', path: '/about' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-t border-white/5 pb-safe px-4">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="relative flex flex-col items-center gap-1 min-w-[64px]">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`${isActive ? 'text-gold' : 'text-text-muted'} transition-colors duration-300`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              </motion.div>
              <span className={`text-[8px] uppercase tracking-widest font-bold ${isActive ? 'text-gold' : 'text-text-muted'} transition-colors duration-300`}>
                {item.label}
              </span>
              
              {item.label === 'Catalog' && totalItems > 0 && (
                <span className="absolute -top-1 right-2 bg-gold text-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}

              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -top-4 w-8 h-[1px] bg-gold"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
