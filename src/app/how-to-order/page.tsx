"use client";

import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, MessageCircle, Truck, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: <Search className="text-luxury-red" />,
    title: "Parcourir le Catalogue",
    description: "Explorez notre large gamme de compléments alimentaires premium de marques mondiales."
  },
  {
    icon: <ShoppingCart className="text-luxury-red" />,
    title: "Ajouter au Panier",
    description: "Sélectionnez vos produits favoris. N'oubliez pas : dès 2 articles, la livraison est gratuite !"
  },
  {
    icon: <MessageCircle className="text-luxury-red" />,
    title: "Validation WhatsApp",
    description: "Après avoir passé votre commande sur le site, notre concierge vous contactera sur WhatsApp pour valider les détails."
  },
  {
    icon: <Truck className="text-luxury-red" />,
    title: "Livraison Rapide",
    description: "Nous expédions votre commande sous 24h à 72h. À Fès, vous pouvez même être livré le jour même."
  },
  {
    icon: <PackageCheck className="text-luxury-red" />,
    title: "Paiement à la Réception",
    description: "Payez en toute sécurité directement au livreur lorsque vous recevez vos produits."
  }
];

export default function HowToOrder() {
  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Header />
      
      <div className="container pt-40 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-16"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Comment <span className="red-gradient-text italic">Commander</span>
            </h1>
            <p className="text-text-muted font-bold uppercase tracking-widest text-xs">
              Une expérience d'achat simple et personnalisée
            </p>
          </div>

          <div className="relative space-y-8">
            {/* Connection Line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-luxury-red to-transparent hidden md:block" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-8 items-center p-8 bg-surface rounded-[2rem] border border-border group hover:shadow-2xl transition-all"
              >
                <div className="w-20 h-20 bg-bg-main rounded-[1.5rem] flex items-center justify-center shrink-0 border border-border group-hover:bg-luxury-red group-hover:text-white transition-colors relative z-10">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-black opacity-10 italic">0{index + 1}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-text-muted font-medium text-lg leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-12 bg-surface rounded-[3rem] border-2 border-luxury-red/20 text-center space-y-8">
            <div className="inline-block px-6 py-2 bg-luxury-red/10 text-luxury-red rounded-full font-black uppercase tracking-widest text-[10px]">
              Assurance Qualité
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">100% Original & Authentique</h2>
            <p className="text-text-muted font-bold max-w-2xl mx-auto leading-relaxed">
              Monaliza House garantit que tous les produits sont importés directement des marques officielles. Aucun compromis sur votre santé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <div className="px-6 py-3 bg-bg-main rounded-xl border border-border text-xs font-black uppercase tracking-widest">Paiement Cash</div>
               <div className="px-6 py-3 bg-bg-main rounded-xl border border-border text-xs font-black uppercase tracking-widest">Livraison 24H</div>
               <div className="px-6 py-3 bg-bg-main rounded-xl border border-border text-xs font-black uppercase tracking-widest">Support 7j/7</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
