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

let categoriesPromise: Promise<Category[]> | null = null;

const fetchCategories = (): Promise<Category[]> => {
  if (!categoriesPromise) {
    categoriesPromise = fetch('/api/categories')
      .then(async (res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .catch((err) => {
        categoriesPromise = null; // Reset cache on error
        throw err;
      });
  }
  return categoriesPromise;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async (forceRefresh = false) => {
    setLoading(true);
    if (forceRefresh) {
      categoriesPromise = null;
    }
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (e) {
      console.error('useCategories fetch error:', e);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return { categories, loading, refresh: () => load(true) };
};

export const categories: Category[] = [];
