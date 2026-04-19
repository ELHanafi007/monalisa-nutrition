// Client-safe — types + useProducts hook only.
// Server data fetching is in @/lib/server-data.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  oldPrice?: number;
  old_price?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  isRupture?: boolean;
  is_rupture?: boolean;
}

import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (!res.ok) throw new Error('API error');
      setProducts(await res.json());
    } catch (e) {
      console.error('useProducts fetch error:', e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { products, loading, refresh: load };
};

export const products: Product[] = [];
