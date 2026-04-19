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
import { supabase } from '@/lib/supabase';

export const getProducts = async (): Promise<Product[]> => {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn("Supabase error:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      console.log("No products found in database.");
      return [];
    }

    // If Supabase is connected, it is the EXCLUSIVE source of truth.
    return (data || []).map(p => ({
      ...p,
      id: p.id.toString(),
      oldPrice: p.old_price,
      isRupture: p.is_rupture,
      isSynced: true
    }));
  } catch (e) {
    console.error("Failed to load products from Supabase:", e);
    return [];
  }
};

// Hook for reactive access to products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };

    load();

    // Real-time subscription - Use a unique channel name per instance to avoid conflicts
    const channelId = Math.random().toString(36).substring(7);
    const channel = supabase
      .channel(`products-db-changes-${channelId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        load();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading };
};

