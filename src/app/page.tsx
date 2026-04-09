"use client";

import { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { InfoBar } from '@/components/landing/InfoBar';
import { HeroSlider } from '@/components/landing/HeroSlider';
import { CategoryCircles } from '@/components/landing/CategoryCircles';
import { ProductSection } from '@/components/landing/ProductSection';
import { Brands } from '@/components/landing/Brands';
import { Footer } from '@/components/landing/Footer';
import { QuickView } from '@/components/QuickView';
import { products, Product } from '@/data/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products
  const promoPacks = products.filter(p => p.category === 'packs' || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  const bestSellers = products.filter(p => p.category !== 'packs').slice(0, 8);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 1. HEADER (TOP BAR) */}
      <Header />

      {/* 2. INFO BAR (UNDER HEADER) */}
      <InfoBar />

      {/* 3. HERO SECTION */}
      <HeroSlider />

      {/* 4. CATEGORIES SECTION (CIRCLES) */}
      <CategoryCircles />

      {/* 5. PROMO PACKS SECTION */}
      <ProductSection 
        title="Packs en promo" 
        products={promoPacks} 
        onQuickView={(product) => setSelectedProduct(product)}
      />

      {/* 6. BEST SELLERS SECTION */}
      <ProductSection 
        title="Best Vente" 
        products={bestSellers} 
        onQuickView={(product) => setSelectedProduct(product)}
      />

      {/* 7. BRANDS SECTION */}
      <Brands />

      {/* 8. FOOTER */}
      <Footer />

      {/* QuickView Component (Functionality kept) */}
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Custom Styles for no-scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
