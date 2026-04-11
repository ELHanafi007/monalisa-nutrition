"use client";

import Image from 'next/image';

const brands = [
  { name: "Biotech USA", logo: "/tt/biotechlogo.svg" },
  { name: "Optimum Nutrition", logo: "/tt/optimiumlogo.webp" },
  { name: "MuscleTech", logo: "/tt/muscletech-logo-2022.webp" },
  { name: "Dymatize", logo: "/tt/Dymatize logo.png" },
  { name: "Applied Nutrition", logo: "/tt/applied_nutrition_logo_white_no-bg.webp" },
  { name: "Now Foods", logo: "/tt/nowfoodlogo.webp" },
  { name: "Dorian Yates", logo: "/tt/dorian yates logo.webp" },
  { name: "Lazar Angelov", logo: "/tt/Lazar Angelov.webp" },
  { name: "JNX Sports", logo: "/tt/jnxsport.webp" },
  { name: "Universal Nutrition", logo: "/tt/prod-logo-universal.webp" }
];

export const Brands = () => {
  return (
    <section className="py-24 bg-surface border-y border-border overflow-hidden relative">
      {/* Subtle Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap">PREMIUM BRANDS</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
           <span className="text-luxury-red text-[10px] font-black uppercase tracking-[0.5em]">Nos Partenaires</span>
           <h2 className="text-4xl md:text-6xl font-black text-text-main uppercase tracking-tighter">
             Meilleures <span className="red-gradient-text italic">Marques</span>
           </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
          {brands.map((brand, i) => (
            <div 
              key={i} 
              className="group relative p-8 bg-surface border border-border rounded-[2.5rem] flex items-center justify-center hover:border-luxury-red transition-all duration-700 cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative w-full aspect-[3/2] grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110">
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  fill 
                  className="object-contain"
                />
              </div>
              
              {/* Tooltip-like label */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-luxury-red text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 shadow-lg">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
