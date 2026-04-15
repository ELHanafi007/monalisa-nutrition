"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/data/categories';

export const CategoryCircles = () => {
  const { categories, loading } = useCategories();

  if (loading || categories.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex justify-between md:justify-center gap-6 md:gap-12 min-w-max md:min-w-0">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/catalog/${cat.slug}`}
              className="flex flex-col items-center gap-4 group transition-transform hover:scale-105"
            >
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-gray-50 p-3 bg-white shadow-sm flex items-center justify-center overflow-hidden group-hover:border-luxury-red transition-all duration-500 group-hover:shadow-xl group-hover:shadow-red-100">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50 group-hover:bg-white transition-colors">
                   <Image 
                     src={cat.image} 
                     alt={cat.name} 
                     fill 
                     unoptimized
                     className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                   />
                </div>
              </div>
              <span className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest text-center group-hover:text-luxury-red transition-colors max-w-[120px] line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
