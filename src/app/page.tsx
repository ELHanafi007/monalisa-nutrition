"use client";

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/landing/Header';
import { InfoBar } from '@/components/landing/InfoBar';
import { HeroSlider } from '@/components/landing/HeroSlider';
import { CategoryCircles } from '@/components/landing/CategoryCircles';
import { ProductSection } from '@/components/landing/ProductSection';
import { Brands } from '@/components/landing/Brands';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/landing/Footer';
import { QuickView } from '@/components/QuickView';
import { useProducts, Product } from '@/data/products';

export default function Home() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Show connection status
  useEffect(() => {
    console.log("Connection check - Loading:", loading, "Error:", error);
    if (!loading) {
      if (error) {
        console.error("DB Connection Failed:", error);
        alert("❌ Database Connection Failed: " + error);
      } else {
        console.log("DB Connected Successfully");
        alert("✅ Connected to Remote Database (MySQL @ Hostinger)");
      }
    }
  }, [loading, error]);

  // Filter products with a better variety
  const promoPacks = useMemo(() => {
    return products.filter(p => p.category === 'packs' || (p.oldPrice && p.oldPrice > p.price)).slice(0, 4);
  }, [products]);
  
  // Get a more diverse set of best sellers (not just the first few)
  const bestSellers = useMemo(() => {
    const nonPacks = products.filter(p => p.category !== 'packs');
    // Simple way to get a variety: shuffle or pick from different brands
    return [...nonPacks].reverse().slice(0, 20);
  }, [products]);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Detailed DB Connection Status Block */}
      {!loading && (
        <div className="pt-32 pb-10 px-4 max-w-4xl mx-auto z-50 relative">
          <div className={`p-8 border-2 rounded-xl ${error ? 'bg-red-50 border-red-500 text-red-900' : 'bg-green-50 border-green-500 text-green-900'}`}>
            <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
              {error ? '❌ Database Connection Failed' : '✅ Database Connection Successful'}
            </h2>
            <div className="font-mono text-sm bg-white p-4 rounded border overflow-x-auto whitespace-pre-wrap">
              <p className="font-bold mb-2 text-gray-700">Detailed Status Message:</p>
              {error ? error : "Connected to remote Hostinger MySQL Database (u356188292_monalisaDb)."}
            </div>
          </div>
        </div>
      )}

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
    </main>
  );
}
