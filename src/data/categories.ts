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
    slug: "promo",
    description: "Exclusive curated bundles for ultimate results.",
    image: "/images/DORIANCRAETINE.webp"
  },
  {
    id: "cat_whey",
    name: "Whey Protein",
    slug: "whey",
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
    slug: "amino",
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
    slug: "vitamines",
    description: "Complete daily nutrient support and wellness essentials.",
    image: "/images/animal-pak.webp"
  },
  {
    id: "cat_accessories",
    name: "Accessories",
    slug: "accessories",
    description: "High-quality gear and essentials for your fitness journey.",
    image: "/images/products/shaker-high-tech-quality.webp"
  }
];

export const getCategories = (): Category[] => {
  if (typeof window === 'undefined') return defaultCategories;
  
  // Check for migration
  const migrationDone = localStorage.getItem('monalisa_category_migration_v2');
  if (!migrationDone) {
    // Clear dynamic categories to reset to new defaults if they are legacy
    localStorage.removeItem('monalisa_dynamic_categories');
    localStorage.setItem('monalisa_category_migration_v2', 'true');
  }

  const saved = localStorage.getItem('monalisa_dynamic_categories');
  if (saved) {
    try {
      const dynamic = JSON.parse(saved);
      return [...defaultCategories, ...dynamic];
    } catch (e) {
      return defaultCategories;
    }
  }
  return defaultCategories;
};

export const categories = getCategories();
