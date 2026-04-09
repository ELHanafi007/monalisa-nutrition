"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/images/the-ritual.jpeg",
    title: "Performance Elite",
    subtitle: "Découvrez notre nouvelle collection"
  },
  {
    image: "/images/the-laboratory.jpeg",
    title: "Pureté Garantie",
    subtitle: "Sourcing global des meilleurs ingrédients"
  },
  {
    image: "/images/the-community.jpeg",
    title: "Communauté Monalisa",
    subtitle: "Rejoignez l'élite du fitness au Maroc"
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
    <section className="relative h-[400px] md:h-[600px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tighter">
                {slides[current].title}
              </h2>
              <p className="text-lg md:text-2xl text-white/80 font-medium">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-10"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-10"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};
