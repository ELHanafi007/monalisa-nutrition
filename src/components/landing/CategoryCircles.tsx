"use client";

import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: "Whey", slug: "whey-proteine", image: "/images/gold-standard-whey.webp" },
  { name: "Gainers", slug: "gainers", image: "/images/seriousmass.webp" },
  { name: "Creatine", slug: "creatine", image: "/images/creatine.webp" },
  { name: "Vitamines", slug: "multivitamines", image: "/images/multivitamin.webp" },
  { name: "Acides Aminés", slug: "acides-amines", image: "/images/amino-1.webp" },
  { name: "Pre-workout", slug: "pre-workout", image: "/images/c4ultimatepreworkout.webp" },
  { name: "Accessoires", slug: "accessoires", image: "/images/logo.jpeg" }, // Using logo as placeholder for accessoires
];

export const CategoryCircles = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex justify-between md:justify-center gap-6 md:gap-12 min-w-max md:min-w-0">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={`/catalog?category=${cat.slug}`}
              className="flex flex-col items-center gap-4 group transition-transform hover:scale-105"
            >
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-gray-50 p-3 bg-white shadow-sm flex items-center justify-center overflow-hidden group-hover:border-luxury-red transition-all duration-500 group-hover:shadow-xl group-hover:shadow-red-100">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50 group-hover:bg-white transition-colors">
                   <Image 
                     src={cat.image} 
                     alt={cat.name} 
                     fill 
                     className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                   />
                </div>
              </div>
              <span className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest text-center group-hover:text-luxury-red transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
