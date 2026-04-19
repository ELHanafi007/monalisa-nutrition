export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

const defaultCategories: Category[] = [
  {
    id: "cat_promo",
    name: "PROMO PACKS",
    slug: "packs",
    description: "Exclusive curated bundles for ultimate results.",
    image: "/images/DORIANCRAETINE.webp"
  },
  {
    id: "cat_whey",
    name: "Whey Protein",
    slug: "whey-proteine",
    description: "Rapid recovery and lean muscle building.",
    image: "/images/gold-standard-whey.webp"
  },
  {
    id: "cat_gainers",
    name: "Gainers",
    slug: "gainers",
    description: "High-calorie formulas for serious mass and weight gain.",
    image: "/images/seriousmass.webp"
  },
  {
    id: "cat_creatine",
    name: "Creatine",
    slug: "creatine",
    description: "Strength and power with pure monohydrate.",
    image: "/images/appliedcreatinemono.jpg"
  },
  {
    id: "cat_amino",
    name: "Amino Acids",
    slug: "acides-amines",
    description: "Essential recovery aminos and EAA for muscle protection.",
    image: "/images/amino-1.webp"
  },
  {
    id: "cat_preworkout",
    name: "Pre-Workout",
    slug: "pre-workout",
    description: "Energy and focus for your training.",
    image: "/images/c4ultimatepreworkout.webp"
  },
  {
    id: "cat_vitamines",
    name: "Vitamines",
    slug: "multivitamines",
    description: "Complete daily nutrient support and wellness essentials.",
    image: "/images/animal-pak.webp"
  },
  {
    id: "cat_accessories",
    name: "Accessories",
    slug: "accessoires",
    description: "High-quality gear and essentials for your fitness journey.",
    image: "/images/products/shaker-high-tech-quality.webp"
  }
];

import { useState, useEffect } from 'react';
import { getCategoriesAction } from '@/app/actions/db';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const data = await getCategoriesAction();
    if (!data || data.length === 0) return defaultCategories;
    return data;
  } catch (e) {
    console.error("Failed to load categories from MySQL:", e);
    return defaultCategories;
  }
};

// Hook for reactive access to categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };

    load();
    
    // Note: Real-time subscriptions are removed in MySQL migration.
  }, []);

  return { categories, loading };
};

// Note: This is now a dummy for backward compatibility since getCategories is async
export const categories = defaultCategories;
