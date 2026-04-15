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

export const getCategories = (): Category[] => {
  if (typeof window === 'undefined') return defaultCategories;
  
  try {
    const saved = localStorage.getItem('monalisa_dynamic_categories');
    if (saved) {
      const dynamic = JSON.parse(saved) as Category[];
      // Use defaultCategories as base, but override with dynamic versions if ID matches
      const merged = [...defaultCategories];
      
      dynamic.forEach(dyn => {
        const index = merged.findIndex(m => m.id === dyn.id);
        if (index !== -1) {
          merged[index] = dyn;
        } else {
          merged.push(dyn);
        }
      });
      
      return merged;
    }
  } catch (e) {
    console.error("Failed to load dynamic categories:", e);
  }
  return defaultCategories;
};

// Hook for reactive access to categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(typeof window === 'undefined' ? defaultCategories : getCategories());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCategories(getCategories());
    }
  }, []);

  return categories;
};

// For backward compatibility - Note: this will be stale on client-side navigation!
export const categories = typeof window === 'undefined' ? defaultCategories : getCategories();
