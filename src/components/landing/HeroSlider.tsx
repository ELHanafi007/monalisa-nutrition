"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/tt/man&girlworkingout.webp",
    title: "Performance Elite",
    subtitle: "Exprimez votre potentiel maximum avec notre sélection exclusive de suppléments."
  },
  {
    image: "/tt/healthy-eating-and-exercising-concept.webp",
    title: "Nutrition Pure",
    subtitle: "Une alimentation saine et des suppléments de qualité pour un équilibre parfait."
  },
  {
    image: "/tt/allproducts.webp",
    title: "Gamme Complète",
    subtitle: "Protéines, gainers, créatine, collagène et bien plus encore pour vos objectifs."
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[750px] overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover brightness-[0.85]"
          />
          
          {/* Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-red/20 via-transparent to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-start container mx-auto px-6 md:px-12">
            <div className="max-w-3xl text-left">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1.5 bg-luxury-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 rounded-full">
                  Monaliza Standard
                </span>
                <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                  {slides[current].title.split(' ')[0]} <br />
                  <span className="red-gradient-text italic">{slides[current].title.split(' ')[1]}</span>
                </h2>
                <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-xl leading-relaxed">
                  {slides[current].subtitle}
                </p>
                <div className="flex gap-4">
                   <button className="luxury-button">
                      Découvrir la gamme
                   </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-12 right-12 flex gap-4 z-10">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-12 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-luxury-red' : 'w-6 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};
