"use client";

import { useState, useMemo, useEffect } from 'react';
import { ProductSection } from '@/components/landing/ProductSection';
import { QuickView } from '@/components/QuickView';
import type { Product } from '@/data/products';

function ProductSectionsSkeleton() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="h-10 w-64 bg-gray-100 rounded-lg mb-12 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export const HomeClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const promoPacks = useMemo(() => {
    return products
      .filter((p) => p.category === 'packs' || (p.oldPrice && p.oldPrice > p.price))
      .slice(0, 4);
  }, [products]);

  const bestSellers = useMemo(() => {
    const nonPacks = products.filter((p) => p.category !== 'packs');
    return [...nonPacks].reverse().slice(0, 8);
  }, [products]);

  if (loading) {
    return (
      <>
        <ProductSectionsSkeleton />
        <ProductSectionsSkeleton />
      </>
    );
  }

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
