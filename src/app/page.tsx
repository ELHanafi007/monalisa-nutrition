"use client";

import { useState, useMemo } from 'react';
import { Header } from '@/components/landing/Header';
import { InfoBar } from '@/components/landing/InfoBar';
import { HeroSlider } from '@/components/landing/HeroSlider';
import { CategoryCircles } from '@/components/landing/CategoryCircles';
import { ProductSection } from '@/components/landing/ProductSection';
import { Brands } from '@/components/landing/Brands';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/landing/Footer';
import { QuickView } from '@/components/QuickView';
import { products, Product } from '@/data/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products with a better variety
  const promoPacks = products.filter(p => p.category === 'packs' || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  
  // Get a more diverse set of best sellers (not just the first few)
  const bestSellers = useMemo(() => {
    const nonPacks = products.filter(p => p.category !== 'packs');
    // Simple way to get a variety: shuffle or pick from different brands
    // For now, let's just reverse or take a slice that includes scraped products
    return [...nonPacks].reverse().slice(0, 20);
  }, [products]);

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

      {/* 8. LOCATION SECTION (MAP) */}
      <LocationSection />

      {/* 9. FOOTER */}
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
