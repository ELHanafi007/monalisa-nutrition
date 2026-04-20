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


      {/* 1. HEADER (TOP BAR) */}
      <Header />

      {/* 2. INFO BAR (UNDER HEADER) */}
      <InfoBar />

      {/* 3. HERO SECTION */}
      <HeroSlider />

      {/* 4. CATEGORIES SECTION (CIRCLES) */}
      <CategoryCircles />

      {/* Loading State */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-luxury-red border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-luxury-red font-black uppercase tracking-[0.3em] text-xs animate-pulse">
            Chargement de l'excellence...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="py-20 px-4 container mx-auto">
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
            <p className="text-red-600 font-bold mb-2">Impossible de charger les produits</p>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-bold"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {!loading && products.length > 0 && (
        <>
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
        </>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Aucun produit trouvé</p>
        </div>
      )}

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
