"use client";

import { useState, useMemo } from 'react';
import { ProductSection } from '@/components/landing/ProductSection';
import { DeferredSection } from '@/components/DeferredSection';
import dynamic from 'next/dynamic';
import type { Product } from '@/data/products';

const QuickView = dynamic(
  () => import('@/components/QuickView').then((m) => ({ default: m.QuickView })),
  { ssr: false }
);

interface HomeClientProps {
  products: Product[];
}

export const HomeClient = ({ products }: HomeClientProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const promoPacks = useMemo(() => {
    return products
      .filter((p) => p.category === 'packs' || (p.oldPrice && p.oldPrice > p.price))
      .slice(0, 3);
  }, [products]);

  const bestSellers = useMemo(() => {
    const nonPacks = products.filter((p) => p.category !== 'packs');
    return [...nonPacks].reverse().slice(0, 3);
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">
          Aucun produit trouvé
        </p>
      </div>
    );
  }

  return (
    <>
      <DeferredSection
        rootMargin="300px"
        fallback={<div className="min-h-[520px] bg-white" aria-hidden />}
      >
        <ProductSection
          title="Packs en promo"
          products={promoPacks}
          onQuickView={setSelectedProduct}
        />
      </DeferredSection>
      <DeferredSection
        fallback={<div className="min-h-[480px] bg-white" aria-hidden />}
      >
        <ProductSection
          title="Best Vente"
          products={bestSellers}
          onQuickView={setSelectedProduct}
        />
      </DeferredSection>
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};
