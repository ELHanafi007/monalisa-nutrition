export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  description: string;
  benefits: string[];
  specs: {
    label: string;
    value: string;
  }[];
  isRupture?: boolean;
}

export const products: Product[] = [
  // WHEY & PROTEINE
  {
    id: "p1",
    name: "Gold Standard Whey Isolate",
    slug: "gold-standard-whey-isolate",
    brand: "Optimum Nutrition",
    price: 1199,
    oldPrice: 1300,
    category: "whey-proteine",
    image: "/images/Gold Standard Whey Isolate.webp",
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
    image: "/images/Gold Standard Whey Isolate.webp", // Fallback
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
    image: "/images/dymatizemassgainer.webp", // Fallback
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
    image: "/images/creatine.webp",
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
    id: "p14",
    name: "Critical Mass Lean Gainer",
    slug: "critical-mass",
    brand: "Applied Nutrition",
    price: 949,
    oldPrice: 1100,
    category: "lean-gainer",
    image: "/images/dymatizemassgainer.webp",
    description: "Lean mass building formula.",
    benefits: ["High Protein", "Quality Carbs"],
    specs: [{ label: "Weight", value: "6kg" }]
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

  // PACKS (New Category needed in categories.ts)
  {
    id: "pack1",
    name: "Pack Creatine Monohydrate Dorian Yates + Essentials",
    slug: "pack-creatine-dorian",
    brand: "Monalisa Special",
    price: 899,
    oldPrice: 1100,
    category: "packs",
    image: "/images/Creatine-30-Ct.webp",
    description: "Complete muscle building pack.",
    benefits: ["Monohydrate", "Multivitamins"],
    specs: [{ label: "Includes", value: "Creatine + Vitamins" }]
  }
];
