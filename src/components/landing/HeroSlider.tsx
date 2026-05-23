"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/tt/hero-performance.jpg",
    title: "Performance Elite",
    subtitle: "Exprimez votre potentiel maximum avec notre sélection exclusive de suppléments."
  },
  {
    image: "/tt/hero-products.jpg",
    title: "Nutrition Pure",
    subtitle: "Une alimentation saine et des suppléments de qualité pour un équilibre parfait."
  },
  {
    image: "/tt/hero-nutrition.jpg",
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
  const slide = slides[current];
  return (
    <section className="relative h-[500px] md:h-[750px] overflow-hidden bg-neutral-900">
      {/* First slide stays mounted for fast LCP — no fade-in on initial paint */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${current === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        aria-hidden={current !== 0}
      >
        <Image
          src={slides[0].image}
          alt={slides[0].title}
          fill
          priority
          fetchPriority="high"
          unoptimized
          sizes="100vw"
          className="object-cover brightness-[0.85]"
        />
      </div>

      {current !== 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              loading="lazy"
              unoptimized
              sizes="100vw"
              className="object-cover brightness-[0.85]"
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-red/20 via-transparent to-transparent z-20 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-start container mx-auto px-6 md:px-12 z-30">
        <div className="max-w-3xl text-left">
          <span className="inline-block px-4 py-1.5 bg-luxury-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 rounded-full">
            Monaliza Standard
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
            {slide.title.split(' ')[0]} <br />
            <span className="red-gradient-text italic">{slide.title.split(' ')[1]}</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>
          <button className="luxury-button" aria-label="Découvrir la gamme de nutrition">
            Découvrir la gamme
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex gap-4 z-30">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
          aria-label="Image suivante"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-12 left-12 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${current === i ? 'w-12 bg-luxury-red' : 'w-6 bg-white/30 hover:bg-white/50'}`}
            aria-label={`Aller à la diapositive ${i + 1}`}
            aria-current={current === i ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
};
