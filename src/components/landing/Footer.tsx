"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-border">
                <Image src="/images/logo.jpeg" alt="Monaliza House" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl text-text-main tracking-tight">Monaliza House</span>
            </Link>
            <div className="space-y-4 text-sm text-text-muted font-medium">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-luxury-red shrink-0" />
                <span>MonalizaHouse, Fès 30000, Maroc</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-luxury-red shrink-0" />
                <a href="tel:+212662599179" className="hover:text-luxury-red transition-colors">+212 662 599179</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-luxury-red shrink-0" />
                <a href="mailto:monalizahouse598@gmail.com" className="hover:text-luxury-red transition-colors text-xs lg:text-sm break-all">monalizahouse598@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-luxury-red shrink-0" />
                <div className="flex flex-col gap-1 text-[10px] uppercase font-black">
                  <span>Lun - Dim / 10H - 21H</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-black text-text-main uppercase tracking-[0.2em] text-xs mb-8 border-b-2 border-luxury-red pb-2 w-fit">Navigation</h3>
            <ul className="space-y-4 text-sm text-text-muted font-bold">
              <li><Link href="/about" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">A propos</Link></li>
              <li><Link href="/about#localisation" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Localisation</Link></li>
              <li><Link href="/catalog" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Notre Catalogue</Link></li>
              <li><Link href="/concierge" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Concierge Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="font-black text-text-main uppercase tracking-[0.2em] text-xs mb-8 border-b-2 border-luxury-red pb-2 w-fit">Aide & Support</h3>
            <ul className="space-y-4 text-sm text-text-muted font-bold">
              <li><Link href="/how-to-order" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Comment commander</Link></li>
              <li><Link href="/faq" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Questions fréquentes</Link></li>
              <li><Link href="/products" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Tous les produits</Link></li>
              <li><Link href="/privacy" className="hover:text-luxury-red transition-colors uppercase tracking-widest text-[10px]">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-black text-text-main uppercase tracking-[0.2em] text-xs mb-8 border-b-2 border-luxury-red pb-2 w-fit">Suivez-nous</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/monalizahouse" target="_blank" className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm group">
                <Facebook size={22} className="text-text-muted group-hover:text-white" />
              </a>
              <a href="https://www.instagram.com/monaliza__house/" target="_blank" className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm group">
                <Instagram size={22} className="text-text-muted group-hover:text-white" />
              </a>
              <a href="https://www.tiktok.com/@monaliza__house?_r=1&_t=ZS-95Qvxm3MA0i/" target="_blank" className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm group overflow-hidden">
                <div className="relative w-7 h-7 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image src="/tt/pastel-pink-tiktok-logo-500x281.webp" alt="TikTok" fill className="object-contain" />
                </div>
              </a>
              <a href="https://wa.me/212662599179" target="_blank" className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center hover:bg-luxury-red hover:text-white transition-all shadow-sm group">
                <MessageCircle size={22} className="text-text-muted group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted font-medium">
          <p>© 2026 Monaliza House Nutrition. Tous droits réservés.</p>
          <div className="flex gap-8">
            <span>Powered by Monalisa Tech</span>
            <div className="flex items-center gap-4">
              <span className="text-[8px] uppercase font-black">Paiement à la livraison</span>
              <div className="w-10 h-6 bg-surface-hover rounded border border-border flex items-center justify-center text-[10px] font-black text-luxury-red">COD</div>
              <div className="w-10 h-6 bg-surface-hover rounded border border-border flex items-center justify-center text-[10px] font-black">FEZ</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
