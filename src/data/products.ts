export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description: string;
  benefits: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Gold Standard Whey Isolate",
    slug: "gold-standard-whey-isolate",
    brand: "Optimum Nutrition",
    price: 850,
    category: "elite-proteins",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop",
    description: "The world's most trusted protein, refined for the elite athlete. pure isolate for rapid absorption.",
    benefits: ["24g Protein per serving", "5.5g BCAA", "Zero Sugar"],
    specs: [
      { label: "Servings", value: "72" },
      { label: "Flavor", value: "Double Rich Chocolate" }
    ]
  },
  {
    id: "p2",
    name: "Nitro-Tech Elite",
    slug: "nitro-tech-elite",
    brand: "MuscleTech",
    price: 920,
    category: "elite-proteins",
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1982&auto=format&fit=crop",
    description: "Advanced muscle-building formula with creatine and amino acids.",
    benefits: ["30g Protein", "3g Creatine", "High Bioavailability"],
    specs: [
      { label: "Servings", value: "40" },
      { label: "Type", value: "Whey Peptides & Isolate" }
    ]
  },
  {
    id: "p3",
    name: "C4 Ultimate Pre-Workout",
    slug: "c4-ultimate",
    brand: "Cellucor",
    price: 550,
    category: "strength-power",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    description: "Unleash explosive energy and razor-sharp focus for your most demanding sessions.",
    benefits: ["Extreme Energy", "Intense Focus", "Pump Enhancement"],
    specs: [
      { label: "Caffeine", value: "300mg" },
      { label: "Beta-Alanine", value: "3.2g" }
    ]
  },
  {
    id: "p4",
    name: "Multivitamin Platinum",
    slug: "multivitamin-platinum",
    brand: "MuscleTech",
    price: 320,
    category: "vitality-elixirs",
    image: "https://images.unsplash.com/photo-1584017945596-fd39a111c5cb?q=80&w=2070&auto=format&fit=crop",
    description: "The essential daily ritual for the high-performance lifestyle.",
    benefits: ["20+ Vitamins", "High Potency", "Amino Acid Support"],
    specs: [
      { label: "Servings", value: "30" },
      { label: "Form", value: "Caplets" }
    ]
  },
  {
    id: "p5",
    name: "HydroPure Whey Hydrolysate",
    slug: "hydropure-whey",
    brand: "Optimum Nutrition",
    price: 1100,
    category: "elite-proteins",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085&auto=format&fit=crop",
    description: "The most advanced protein ever developed. Hydrolyzed for instant delivery.",
    benefits: ["Fastest Absorption", "Highest Purity", "Award-Winning Taste"],
    specs: [
      { label: "Protein", value: "30g" },
      { label: "BCAA", value: "8.8g" }
    ]
  },
  {
    id: "p6",
    name: "Xtend BCAA Original",
    slug: "xtend-bcaa",
    brand: "Scivation",
    price: 480,
    category: "strength-power",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    description: "Hydration and recovery in every sip. The industry leader in amino acids.",
    benefits: ["7g BCAA", "Electrolyte Blend", "Zero Carbs"],
    specs: [
      { label: "Servings", value: "30" },
      { label: "Sugar", value: "0g" }
    ]
  },
  {
    id: "p7",
    name: "Animal Pak",
    slug: "animal-pak",
    brand: "Universal Nutrition",
    price: 650,
    category: "vitality-elixirs",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f8162e6?q=80&w=2070&auto=format&fit=crop",
    description: "The complete training pack. Everything your body needs, in one powerful dose.",
    benefits: ["Complete Wellness", "Performance Support", "Digestive Enzymes"],
    specs: [
      { label: "Packs", value: "44" },
      { label: "Type", value: "Multi-System" }
    ]
  },
  {
    id: "p8",
    name: "Lipo-6 Black Ultra",
    slug: "lipo-6-black",
    brand: "Nutrex",
    price: 450,
    category: "sculpt-define",
    image: "https://images.unsplash.com/photo-1611073221763-9bc50f61769d?q=80&w=2070&auto=format&fit=crop",
    description: "Intelligent fat burning. Targeted metabolic support to redefine your physique.",
    benefits: ["Extreme Potency", "Metabolic Boost", "Appetite Control"],
    specs: [
      { label: "Capsules", value: "60" },
      { label: "Dosage", value: "1 Cap Daily" }
    ]
  },
  {
    id: "p9",
    name: "Ultimate Transformation Pack",
    slug: "transformation-pack",
    brand: "Monalisa Exclusive",
    price: 1850,
    category: "exclusive-bundles",
    image: "https://images.unsplash.com/photo-1626225967045-9c76db7b6ecd?q=80&w=2070&auto=format&fit=crop",
    description: "The definitive selection: Elite Whey, Pre-Workout, and Multivitamins.",
    benefits: ["Complete Cycle", "Expertly Curated", "Priority Support"],
    specs: [
      { label: "Includes", value: "3 Full Products" },
      { label: "Goal", value: "Lean Muscle" }
    ]
  },
  {
    id: "p10",
    name: "Creatine Monohydrate Pure",
    slug: "creatine-pure",
    brand: "Applied Nutrition",
    price: 380,
    category: "strength-power",
    image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1974&auto=format&fit=crop",
    description: "Pharmaceutical grade creatine for raw power and muscle volume.",
    benefits: ["5g Pure Creatine", "Unflavored", "Micronized"],
    specs: [
      { label: "Servings", value: "50" },
      { label: "Purity", value: "99.9%" }
    ]
  }
];
