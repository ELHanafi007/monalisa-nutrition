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
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-black shrink-0" />
                <span>123 Avenue des Forces Armées Royales, Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-black shrink-0" />
                <span>+212 600 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-black shrink-0" />
                <span>contact@monalizanutrition.ma</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-black shrink-0" />
                <span>Lun - Dim / 11h - 21h</span>
              </div>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold text-black uppercase tracking-wider mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-black transition-colors">A propos</Link></li>
              <li><Link href="/about#localisation" className="hover:text-black transition-colors">Localisation</Link></li>
              <li><Link href="/catalog" className="hover:text-black transition-colors">Notre Catalogue</Link></li>
              <li><Link href="/concierge" className="hover:text-black transition-colors">Concierge Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="font-bold text-black uppercase tracking-wider mb-8">Aide & Support</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/how-to-order" className="hover:text-black transition-colors">Comment commander</Link></li>
              <li><Link href="/faq" className="hover:text-black transition-colors">Questions fréquentes</Link></li>
              <li><Link href="/products" className="hover:text-black transition-colors">Tous les produits</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-bold text-black uppercase tracking-wider mb-8">Suivez-nous</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <User size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Music size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <MessageCircle size={20} />
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
