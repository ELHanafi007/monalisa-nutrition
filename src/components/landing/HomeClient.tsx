"use client";

import { useState, useMemo } from 'react';
import { ProductSection } from '@/components/landing/ProductSection';
import { QuickView } from '@/components/QuickView';
import type { Product } from '@/data/products';

interface HomeClientProps {
  products: Product[];
}

export const HomeClient = ({ products }: HomeClientProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const promoPacks = useMemo(() => {
    return products
      .filter((p) => p.category === 'packs' || (p.oldPrice && p.oldPrice > p.price))
      .slice(0, 4);
  }, [products]);

  const bestSellers = useMemo(() => {
    const nonPacks = products.filter((p) => p.category !== 'packs');
    return [...nonPacks].reverse().slice(0, 8);
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
      <ProductSection
        title="Packs en promo"
        products={promoPacks}
        onQuickView={setSelectedProduct}
      />
      <ProductSection
        title="Best Vente"
        products={bestSellers}
        onQuickView={setSelectedProduct}
      />
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};
