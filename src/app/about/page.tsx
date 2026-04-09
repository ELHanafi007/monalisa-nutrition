"use client";

import { motion } from 'framer-motion';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Image from 'next/image';
import { Shield, Award, Users, MapPin } from 'lucide-react';

export default function About() {
  const stats = [
    { label: "Clients Satisfaits", value: "10k+" },
    { label: "Produits Premium", value: "500+" },
    { label: "Années d'Excellence", value: "10+" },
    { label: "Points de Vente", value: "5" }
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-luxury-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 rounded-full shadow-lg"
            >
              Notre Histoire
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]"
            >
              L'Élite de la <br />
              <span className="red-gradient-text italic">Nutrition.</span>
            </h1 >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed"
            >
              Monaliza House n'est pas seulement une boutique de suppléments. C'est un standard d'excellence, une quête de pureté et un partenaire pour chaque athlète marocain.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100"
              >
                <p className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-2">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest font-black text-luxury-red">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/the-founder.jpeg" 
                alt="Notre Vision" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-red/40 to-transparent" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Notre <span className="red-gradient-text italic">Engagement</span></h2>
              <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed">
                <p>
                  Depuis notre création, nous nous sommes donné pour mission de sourcer uniquement les molécules les plus pures des laboratoires mondiaux les plus prestigieux.
                </p>
                <p>
                  Chaque produit sur nos étagères est rigoureusement sélectionné et certifié, garantissant que chaque milligramme que vous consommez sert un but précis dans votre progression.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Shield className="text-luxury-red" />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase tracking-widest text-xs mb-1">Authenticité</h4>
                    <p className="text-sm text-gray-500">Produits 100% certifiés</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Award className="text-luxury-red" />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase tracking-widest text-xs mb-1">Qualité</h4>
                    <p className="text-sm text-gray-500">Standard International</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="localisation" className="py-32 bg-gray-50 rounded-t-[4rem]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Nos <span className="red-gradient-text italic">Points de Vente</span></h2>
            <p className="text-gray-600 font-medium">Retrouvez l'excellence Monaliza à travers le Royaume.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { city: "Casablanca", area: "Maarif", address: "123 Rue de l'Excellence" },
              { city: "Marrakech", area: "Gueliz", address: "45 Avenue de la Performance" },
              { city: "Rabat", area: "Agdal", address: "89 Boulevard de la Pureté" }
            ].map((loc, i) => (
              <div key={i} className="p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                <MapPin className="text-luxury-red mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{loc.city}</h3>
                <p className="text-luxury-red font-black uppercase tracking-widest text-[10px] mb-4">{loc.area}</p>
                <p className="text-gray-500 text-sm">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
