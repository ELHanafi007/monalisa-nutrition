"use client";

import Link from 'next/link';

const brands = [
  "JNX Sports",
  "Muscletech",
  "Nutrend",
  "Scitec Nutrition",
  "Optimum Nutrition"
];

export const Brands = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter text-center mb-16">
          Meilleures <span className="red-gradient-text italic">Marques</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="px-10 py-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:border-luxury-red transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl group"
            >
              <span className="text-sm md:text-xl font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-luxury-red transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
