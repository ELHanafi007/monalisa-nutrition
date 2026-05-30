"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/tt/hero-performance.webp",
    title: "Performance Elite",
    subtitle: "Exprimez votre potentiel maximum avec notre sélection exclusive de suppléments."
  },
  {
    image: "/tt/hero-products.webp",
    title: "Nutrition Pure",
    subtitle: "Une alimentation saine et des suppléments de qualité pour un équilibre parfait."
  },
  {
    image: "/tt/hero-nutrition.webp",
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

  const slide = slides[current];
  const titleParts = slide.title.split(' ');
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(' ');

  return (
    <section className="relative h-[500px] md:h-[750px] overflow-hidden bg-gray-900">
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === current ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            loading={i === 0 ? 'eager' : 'lazy'}
            unoptimized
            sizes="100vw"
            className="object-cover brightness-[0.85]"
          />
        </div>
      ))}

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-luxury-red/20 via-transparent to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-20 flex items-center justify-start container mx-auto px-6 md:px-12">
        <div className="max-w-3xl text-left">
          <span className="inline-block px-4 py-1.5 bg-luxury-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 rounded-full">
            Monaliza Standard
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
            {titleFirst} <br />
            {titleRest ? (
              <span className="red-gradient-text italic">{titleRest}</span>
            ) : null}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="flex gap-4">
            <button className="luxury-button" aria-label="Découvrir la gamme de nutrition">
              Découvrir la gamme
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex gap-4 z-20">
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
          aria-label="Image suivante"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-12 left-12 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className="h-1 w-12 rounded-full bg-white/30 overflow-hidden"
            aria-label={`Aller à la diapositive ${i + 1}`}
            aria-current={current === i ? 'true' : 'false'}
          >
            <span
              className={`block h-full rounded-full bg-luxury-red transition-transform duration-500 origin-left ${
                current === i ? 'scale-x-100' : 'scale-x-[0.5] opacity-50'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
