export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

const defaultCategories: Category[] = [
  {
    id: "cat_packs",
    name: "PROMO PACKS",
    slug: "packs",
    description: "Exclusive curated bundles for ultimate results.",
    image: "/images/DORIANCRAETINE.webp"
  },
  {
    id: "cat1",
    name: "Amino Acids",
    slug: "acides-amines",
    description: "BCAA, Glutamine and other essential recovery aminos.",
    image: "/images/amino-1.webp"
  },
  {
    id: "cat2",
    name: "Creatine",
    slug: "creatine",
    description: "Strength and power with pure monohydrate.",
    image: "/images/appliedcreatinemono.jpg"
  },
  {
    id: "cat3",
    name: "EAA",
    slug: "eaa",
    description: "Essential Amino Acids for muscle protection.",
    image: "/images/eaa-zero.webp"
  },
  {
    id: "cat4",
    name: "Mass Gainers",
    slug: "gainers",
    description: "High-calorie formulas for serious mass.",
    image: "/images/seriousmass.webp"
  },
  {
    id: "cat5",
    name: "Hard Gainer",
    slug: "hard-gainer",
    description: "Massive calorie intake for extreme hardgainers.",
    image: "/images/mutantmassextrem2500.webp"
  },
  {
    id: "cat6",
    name: "Lean Gainer",
    slug: "lean-gainer",
    description: "Quality weight gain with controlled calories.",
    image: "/images/critical-mass.webp"
  },
  {
    id: "cat7",
    name: "Multivitamins",
    slug: "multivitamines",
    description: "Complete daily nutrient support.",
    image: "/images/animal-pak.webp"
  },
  {
    id: "cat8",
    name: "Pre-Workout",
    slug: "pre-workout",
    description: "Energy and focus for your training.",
    image: "/images/c4ultimatepreworkout.webp"
  },
  {
    id: "cat10",
    name: "Whey & Protein",
    slug: "whey-proteine",
    description: "Rapid recovery and lean muscle building.",
    image: "/images/gold-standard-whey.webp"
  },
  {
    id: "cat11",
    name: "Accessoires",
    slug: "accessoires",
    description: "High-quality gear and essentials for your fitness journey.",
    image: "/images/products/shaker-high-tech-quality.webp"
  },
  {
    id: "cat12",
    name: "Health & Wellness",
    slug: "supplements",
    description: "Natural supplements for your overall well-being and health.",
    image: "/images/products/melatonin-extra-10mg-100-capsules-now-food.webp"
  },
  {
    id: "cat13",
    name: "Vitamins & Minerals",
    slug: "vitamins-minerals",
    description: "Specific vitamins and minerals for targeted health support.",
    image: "/images/products/vitamin-c1000-90-capsules-ostrovit.webp"
  }
];

export const getCategories = (): Category[] => {
  if (typeof window === 'undefined') return defaultCategories;
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
