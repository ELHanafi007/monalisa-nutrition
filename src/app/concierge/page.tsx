"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import { Crown, Zap, Shield, Heart, Star, Users, MessageCircle } from 'lucide-react';

export default function Concierge() {
  const benefits = [
    {
      icon: Zap,
      title: "Accès Prioritaire",
      desc: "Soyez le premier informé des nouveaux arrivages et des éditions limitées."
    },
    {
      icon: Shield,
      title: "Conseils Experts",
      desc: "Un accompagnement personnalisé par nos experts en nutrition certifiés."
    },
    {
      icon: Crown,
      title: "Service VIP",
      desc: "Une ligne directe WhatsApp pour vos commandes et questions urgentes."
    },
    {
      icon: Heart,
      title: "Offres Exclusives",
      desc: "Des tarifs préférentiels réservés uniquement aux membres du cercle Monaliza."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50 rounded-b-[4rem]">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-1.5 bg-luxury-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg">
                Service Conciergerie
              </span>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                L'Expérience <br />
                <span className="red-gradient-text italic">Elite.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
                Rejoignez le cercle exclusif Monaliza House et bénéficiez d'un accompagnement sur-mesure pour atteindre vos objectifs physiques les plus ambitieux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://wa.me/212662599179" 
                  target="_blank" 
                  className="luxury-button flex items-center gap-3"
                >
                  <MessageCircle size={18} fill="currentColor" />
                  Contacter un expert
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image 
                src="/images/concierge.jpeg" 
                alt="Service Concierge" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-red/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Vos <span className="red-gradient-text italic">Privilèges</span></h2>
            <p className="text-gray-600 font-medium">Bien plus qu'un service, une immersion totale dans l'univers de la haute performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-luxury-red/20 transition-all group"
              >
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="text-luxury-red" size={32} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Trust Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-luxury-red text-luxury-red" />)}
            </div>
            <h2 className="text-3xl md:text-4xl font-black italic text-black leading-tight">
              "Le service conciergerie a transformé ma façon de m'entraîner. Les conseils sont précis et la livraison est d'une rapidité incroyable."
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-luxury-red p-1">
                <div className="w-full h-full rounded-full bg-gray-200" />
              </div>
              <p className="font-black uppercase tracking-widest text-xs">Yassine El-M.</p>
              <p className="text-[10px] uppercase tracking-widest text-luxury-red font-black">Athlète Pro & Membre Elite</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container">
          <div className="bg-black rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/the-ritual.jpeg')] opacity-20 bg-cover bg-center grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-red/20 to-black" />
            
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
                Prêt pour votre <br />
                <span className="red-gradient-text italic">Transformation ?</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Contactez notre conciergerie dès maintenant et commencez votre voyage vers l'excellence absolue.
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://wa.me/212662599179" 
                  className="luxury-button scale-125"
                >
                  Démarrer sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
