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
        <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
          Meilleures Marques
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="px-8 py-4 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer shadow-sm group"
            >
              <span className="text-sm md:text-lg font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
