// Client-safe — types + useCategories hook only.
// Server data fetching is in @/lib/server-data.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

import { useState, useEffect } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories', { cache: 'no-store' });
      if (!res.ok) throw new Error('API error');
      setCategories(await res.json());
    } catch (e) {
      console.error('useCategories fetch error:', e);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { categories, loading, refresh: load };
};

export const categories: Category[] = [];
