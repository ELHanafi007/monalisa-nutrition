"use client";

import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { HelpCircle, Truck, ShieldCheck, CreditCard, ShoppingBag, Clock } from 'lucide-react';

const faqs = [
  {
    icon: <ShoppingBag className="text-luxury-red" />,
    question: "Comment commander ?",
    answer: "Pour commander, il vous suffit de parcourir notre catalogue, d'ajouter les produits souhaités à votre panier et de finaliser votre commande. Vous serez ensuite redirigé vers notre service client WhatsApp pour confirmer les détails de livraison."
  },
  {
    icon: <Clock className="text-luxury-red" />,
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais de livraison chez Monaliza House au Maroc sont généralement de 24 à 72 heures selon votre ville. Pour la ville de Fès, la livraison peut être effectuée le jour même pour les commandes passées avant l'heure limite de préparation."
  },
  {
    icon: <Truck className="text-luxury-red" />,
    question: "Quels sont les frais de livraison ?",
    answer: "Les frais de livraison sont fixes à 35 dh pour toutes les commandes. À partir de 2 articles d'achat, la livraison est gratuite partout au Maroc."
  },
  {
    icon: <ShieldCheck className="text-luxury-red" />,
    question: "Les produits sont-ils originaux ?",
    answer: "Oui, tous les compléments alimentaires vendus par Monaliza House sont 100% originaux et authentiques. Nous travaillons directement avec les marques officielles, sans intermédiaires, afin de garantir la qualité, la traçabilité et l'authenticité de chaque produit importé via des circuits officiels."
  },
  {
    icon: <CreditCard className="text-luxury-red" />,
    question: "Quels sont les modes de paiement ?",
    answer: "Le paiement à la livraison (Cash on Delivery) est disponible partout au Maroc chez Monaliza House. Vous pouvez régler votre commande directement au livreur lors de la réception de vos compléments alimentaires."
  }
];

export default function FAQ() {
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
              Questions <span className="red-gradient-text italic">Fréquentes</span>
            </h1>
            <p className="text-text-muted font-bold uppercase tracking-widest text-xs">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-surface rounded-[2rem] border border-border hover:border-luxury-red/50 transition-all group"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-bg-main rounded-2xl flex items-center justify-center shrink-0 border border-border group-hover:scale-110 transition-transform">
                    {faq.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black uppercase tracking-tight">{faq.question}</h3>
                    <p className="text-text-muted font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-luxury-red rounded-[2.5rem] p-10 text-white text-center space-y-6 shadow-2xl shadow-red-900/20">
            <HelpCircle size={48} className="mx-auto" />
            <h2 className="text-3xl font-black uppercase tracking-tighter">Encore des questions ?</h2>
            <p className="font-bold opacity-90 max-w-md mx-auto">
              Notre équipe de concierge est à votre disposition pour vous conseiller et répondre à toutes vos interrogations sur WhatsApp.
            </p>
            <a 
              href="https://wa.me/212662599179"
              target="_blank"
              className="inline-block bg-white text-luxury-red px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Contactez-nous
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
