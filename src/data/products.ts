export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  benefits: string[];
  specs: {
    label: string;
    value: string;
  }[];
  isRupture?: boolean;
  isSynced?: boolean; // New property to track if it's in DB
}

import { useState, useEffect } from 'react';
import { getProductsAction } from '@/app/actions/db';

export const getProducts = async (): Promise<Product[]> => {
  return await getProductsAction();
};

// Hook for reactive access to products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getProductsAction();
      setProducts(data);
      setLoading(false);
    };

    load();
    
    // Note: Real-time subscriptions are removed in MySQL migration.
    // If needed, implement polling or WebSockets.
  }, []);

  return { products, loading };
};

