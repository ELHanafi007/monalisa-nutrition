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
    image: "/products/on-whey.jpg",
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
    image: "/products/nitro-tech.jpg",
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
    image: "/products/c4-ultimate.jpg",
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
    image: "/products/multivitamin.jpg",
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
    image: "/products/hydrowhey.jpg",
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
    image: "/products/xtend.jpg",
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
    image: "/products/animal-pak.jpg",
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
    image: "/products/lipo6.jpg",
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
    image: "/products/bundle-1.jpg",
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
    image: "/products/creatine.jpg",
    description: "Pharmaceutical grade creatine for raw power and muscle volume.",
    benefits: ["5g Pure Creatine", "Unflavored", "Micronized"],
    specs: [
      { label: "Servings", value: "50" },
      { label: "Purity", value: "99.9%" }
    ]
  }
];
