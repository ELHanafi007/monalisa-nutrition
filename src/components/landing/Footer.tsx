"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Music, MessageCircle, Phone, Mail, MapPin, Clock, User } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image src="/images/logo.jpeg" alt="Monaliza House" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl text-black">Monaliza House</span>
            </Link>
            <div className="space-y-4 text-sm text-gray-600 font-medium">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-luxury-red shrink-0" />
                <span>123 Avenue des Forces Armées Royales, Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-luxury-red shrink-0" />
                <span>+212 600 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-luxury-red shrink-0" />
                <span>contact@monalizanutrition.ma</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-luxury-red shrink-0" />
                <span>Lun - Dim / 11h - 21h</span>
              </div>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-black text-black uppercase tracking-[0.2em] text-xs mb-8 border-b-2 border-luxury-red pb-2 w-fit">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li><Link href="/about" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">A propos</Link></li>
              <li><Link href="/about#localisation" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Localisation</Link></li>
              <li><Link href="/catalog" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Notre Catalogue</Link></li>
              <li><Link href="/concierge" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Concierge Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="font-black text-black uppercase tracking-[0.2em] text-xs mb-8 border-b-2 border-luxury-red pb-2 w-fit">Aide & Support</h3>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li><Link href="/how-to-order" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Comment commander</Link></li>
              <li><Link href="/faq" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Questions fréquentes</Link></li>
              <li><Link href="/products" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Tous les produits</Link></li>
              <li><Link href="/privacy" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-black text-black uppercase tracking-[0.2em] text-xs mb-8 border-b-2 border-luxury-red pb-2 w-fit">Suivez-nous</h3>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm">
                <Mail size={22} />
              </a>
              <a href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm">
                <User size={22} />
              </a>
              <a href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm">
                <Music size={22} />
              </a>
              <a href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm">
                <MessageCircle size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <p>© 2026 Monaliza House Nutrition. Tous droits réservés.</p>
          <div className="flex gap-8">
            <span>Powered by Monalisa Tech</span>
            <div className="flex gap-4">
              {/* Payment icons placeholders */}
              <div className="w-10 h-6 bg-gray-50 rounded border border-gray-100" />
              <div className="w-10 h-6 bg-gray-50 rounded border border-gray-100" />
              <div className="w-10 h-6 bg-gray-50 rounded border border-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
