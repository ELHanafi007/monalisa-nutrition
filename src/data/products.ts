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
}

const defaultProducts: Product[] = [
  // WHEY
  {
    id: "p1",
    name: "Gold Standard Whey Isolate",
    slug: "gold-standard-whey-isolate",
    brand: "Optimum Nutrition",
    price: 1199,
    oldPrice: 1300,
    category: "whey-proteine",
    image: "/images/gold-standard-whey.webp",
    description: "The world's most trusted protein, refined for the elite athlete.",
    benefits: ["24g Protein per serving", "5.5g BCAA", "Zero Sugar"],
    specs: [{ label: "Weight", value: "2.27kg" }]
  },
  {
    id: "p2",
    name: "Nitro-Tech Elite",
    slug: "nitro-tech-elite",
    brand: "MuscleTech",
    price: 849,
    oldPrice: 999,
    category: "whey-proteine",
    image: "/images/nitrotechelite.webp",
    description: "Advanced muscle-building formula with creatine and amino acids.",
    benefits: ["30g Protein", "3g Creatine", "High Bioavailability"],
    specs: [{ label: "Weight", value: "2.27kg" }]
  },
  {
    id: "p11",
    name: "Platinum Hydro Whey",
    slug: "hydro-whey",
    brand: "Optimum Nutrition",
    price: 829,
    oldPrice: 1000,
    category: "whey-proteine",
    image: "/images/hydro-whey.webp",
    description: "Fastest absorbing protein.",
    benefits: ["Hydrolyzed Isolate"],
    specs: [{ label: "Weight", value: "800g" }]
  },
  {
    id: "p12",
    name: "ISO 100 Hydrolysed Whey",
    slug: "iso-100",
    brand: "Dymatize",
    price: 949,
    oldPrice: 1200,
    category: "whey-proteine",
    image: "/images/iso-100.webp",
    description: "Ultra-pure isolate.",
    benefits: ["Zero Fat", "Low Carb"],
    specs: [{ label: "Weight", value: "1.4kg" }],
    isRupture: true
  },

  // CREATINE
  {
    id: "p10",
    name: "Creatine Monohydrate Pure",
    slug: "creatine-pure",
    brand: "Applied Nutrition",
    price: 349,
    oldPrice: 400,
    category: "creatine",
    image: "/images/appliedcreatinemono.jpg",
    description: "Pharmaceutical grade creatine.",
    benefits: ["5g Pure Creatine"],
    specs: [{ label: "Servings", value: "50" }]
  },
  {
    id: "p13",
    name: "100% Creatine Monohydrate",
    slug: "creatine-biotech",
    brand: "Biotech USA",
    price: 349,
    oldPrice: 400,
    category: "creatine",
    image: "/images/creatine.webp",
    description: "High quality creatine.",
    benefits: ["Pure Monohydrate"],
    specs: [{ label: "Weight", value: "300g" }]
  },
  {
    id: "p20",
    name: "Creatine Gummies",
    slug: "creatine-gummies",
    brand: "Monalisa Edition",
    price: 299,
    oldPrice: 350,
    category: "creatine",
    image: "/images/creatinegummies.webp",
    description: "Convenient and delicious creatine delivery.",
    benefits: ["No Water Needed", "Great Taste"],
    specs: [{ label: "Gummies", value: "60" }]
  },

  // GAINERS
  {
    id: "p5",
    name: "Serious Mass",
    slug: "serious-mass",
    brand: "Optimum Nutrition",
    price: 1099,
    oldPrice: 1200,
    category: "gainers",
    image: "/images/seriousmass.webp",
    description: "High-calorie weight gain formula.",
    benefits: ["1,250 Calories", "50g Protein"],
    specs: [{ label: "Weight", value: "5.44kg" }]
  },
  {
    id: "p21",
    name: "Big Monster Gainer",
    slug: "big-monster",
    brand: "Big Monster",
    price: 899,
    oldPrice: 1000,
    category: "gainers",
    image: "/images/bigmonster.webp",
    description: "Heavyweight mass building formula.",
    benefits: ["Massive Protein", "Complex Carbs"],
    specs: [{ label: "Weight", value: "5kg" }]
  },
  {
    id: "p22",
    name: "Super Gainer",
    slug: "super-gainer",
    brand: "Nutrition Plus",
    price: 799,
    oldPrice: 950,
    category: "gainers",
    image: "/images/super-gainer.jpg",
    description: "Affordable and effective mass gainer.",
    benefits: ["High Calories", "Easy Mixing"],
    specs: [{ label: "Weight", value: "4kg" }]
  },
  {
    id: "p14",
    name: "Critical Mass Lean Gainer",
    slug: "critical-mass",
    brand: "Applied Nutrition",
    price: 949,
    oldPrice: 1100,
    category: "gainers",
    image: "/images/critical-mass.webp",
    description: "Lean mass building formula.",
    benefits: ["High Protein", "Quality Carbs"],
    specs: [{ label: "Weight", value: "6kg" }]
  },
  {
    id: "p15",
    name: "Mutant Mass Extreme 2500",
    slug: "mutant-mass-extreme",
    brand: "Mutant",
    price: 1149,
    oldPrice: 1300,
    category: "gainers",
    image: "/images/mutantmassextrem2500.webp",
    description: "The ultimate hard gainer formula.",
    benefits: ["2500 Calories", "High Protein"],
    specs: [{ label: "Weight", value: "5.44kg" }]
  },

  // PRE-WORKOUT
  {
    id: "p3",
    name: "C4 Ultimate Pre-Workout",
    slug: "c4-ultimate",
    brand: "Cellucor",
    price: 550,
    oldPrice: 650,
    category: "pre-workout",
    image: "/images/c4ultimatepreworkout.webp",
    description: "Explosive energy.",
    benefits: ["Extreme Energy"],
    specs: [{ label: "Caffeine", value: "300mg" }]
  },
  {
    id: "p16",
    name: "Vapor X5 Pre-Workout",
    slug: "vapor-x5",
    brand: "MuscleTech",
    price: 599,
    oldPrice: 700,
    category: "pre-workout",
    image: "/images/vapor-x5.webp",
    description: "Five-in-one pre-workout formula.",
    benefits: ["Neurosensory Experience", "Explosive Energy"],
    specs: [{ label: "Weight", value: "263g" }]
  },

  // AMINO ACIDS
  {
    id: "p17",
    name: "Amino 1",
    slug: "amino-1",
    brand: "MusclePharm",
    price: 449,
    oldPrice: 550,
    category: "acides-amines",
    image: "/images/amino-1.webp",
    description: "Hydration and recovery formula.",
    benefits: ["BCAA 3:1:2 Ratio", "Coconut Water"],
    specs: [{ label: "Servings", value: "32" }]
  },
  {
    id: "p18",
    name: "EAA Zero",
    slug: "eaa-zero",
    brand: "Biotech USA",
    price: 399,
    oldPrice: 450,
    category: "acides-amines",
    image: "/images/eaa-zero.webp",
    description: "Essential amino acids with no sugar.",
    benefits: ["Optimal EAA Ratio", "Sugar Free"],
    specs: [{ label: "Weight", value: "350g" }]
  },

  // VITAMINES
  {
    id: "p19",
    name: "Animal Pak",
    slug: "animal-pak",
    brand: "Universal Nutrition",
    price: 649,
    oldPrice: 750,
    category: "multivitamines",
    image: "/images/animal-pak.webp",
    description: "The ultimate training pack.",
    benefits: ["Vitamins & Minerals", "Performance Complex"],
    specs: [{ label: "Packs", value: "44" }]
  },

  // PROMO
  {
    id: "pack1",
    name: "Pack Creatine Monohydrate Dorian Yates + Essentials",
    slug: "pack-creatine-dorian",
    brand: "Monalisa Special",
    price: 899,
    oldPrice: 1100,
    category: "packs",
    image: "/images/DORIANCRAETINE.webp",
    description: "Complete muscle building pack.",
    benefits: ["Monohydrate", "Multivitamins"],
    specs: [{ label: "Includes", value: "Creatine + Vitamins" }]
  }
  ,

  // --- SCRAPED PRODUCTS (Migrated) ---
  {
    id: "scraped-1775770011601-911",
    name: "Melatonin Extra 10mg 100 Capsules – Now food",
    slug: "melatonin-extra-10mg-100-capsules-now-food",
    brand: "Now Foods",
    price: 349,
    oldPrice: 500,
    category: "multivitamines",
    image: "/images/products/melatonin-extra-10mg-100-capsules-now-food.webp",
    description: "Bed time : ...",
    benefits: ["Date D’expiration : 04/2028 .","Ce produit aide à :","Favoriser un endormissement plus rapide.","Améliorer la qualité du sommeil et le repos nocturne.","Réduire les effets du décalage horaire (jet lag)."],
    specs: [{"label":"Format","value":"Original"}]
  },
  {
    id: "scraped-1775770012850-970",
    name: "Vitamin C1000 90 Capsules – Ostrovit",
    slug: "vitamin-c1000-90-capsules-ostrovit",
    brand: "Ostrovit",
    price: 249,
    oldPrice: 400,
    category: "multivitamines",
    image: "/images/products/vitamin-c1000-90-capsules-ostrovit.webp",
    description: "...",
    benefits: ["Date D’expiration : 04/2027 .","-Contribue au fonctionnement normal du système immunitaire.","-Aide à réduire la fatigue et l’épuisement.","-Protège les cellules contre le stress oxydatif.","-Participe à la formation normale du collagène (peau, os, cartilages, dents, gencives)."],
    specs: [{"label":"Format","value":"Original"}]
  },
  {
    id: "scraped-1775770035505-371",
    name: "BANDE DE POIGNET HIGH TECH QUALITY – BIOTECH",
    slug: "bande-de-poignet-high-tech-quality-biotech",
    brand: "Biotech USA",
    price: 49,
    oldPrice: 60,
    category: "accessories",
    image: "/images/products/bande-de-poignet-high-tech-quality-biotech.jpg",
    description: "...",
    benefits: ["Date d’éxpiration: 04/2027","Highlights :"],
    specs: [{"label":"Format","value":"Original"}]
  }
  // ... more products exist, but we focus on category mapping
];

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return defaultProducts;
  
  const savedInventory = localStorage.getItem('monalisa_inventory_v1');

  if (savedInventory) {
    try {
      return JSON.parse(savedInventory);
    } catch (e) {
      console.error("Failed to parse monalisa_inventory_v1", e);
    }
  }

  // Fallback / Initial setup
  const legacyDynamic = localStorage.getItem('monalisa_dynamic_products');
  let currentProducts = defaultProducts;
  if (legacyDynamic) {
    try {
      const dynamic = JSON.parse(legacyDynamic);
      currentProducts = [...defaultProducts, ...dynamic];
    } catch (e) {}
  }
  
  if (typeof window !== 'undefined' && !savedInventory) {
    localStorage.setItem('monalisa_inventory_v1', JSON.stringify(currentProducts));
  }
  
  return currentProducts;
};

import { useState, useEffect } from 'react';

// ... (keep getProducts and defaultProducts as they are)

// Hook for reactive access to products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(typeof window === 'undefined' ? defaultProducts : getProducts());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        setProducts(getProducts());
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('monalisa_data_refresh', handleStorageChange);

      setProducts(getProducts());

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('monalisa_data_refresh', handleStorageChange);
      };
    }
  }, []);

  return products;
};

// For backward compatibility - Note: this will be stale on client-side navigation!
export const products = typeof window === 'undefined' ? defaultProducts : getProducts();
