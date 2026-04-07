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
    category: "whey-proteine",
    image: "/images/Gold Standard Whey Isolate.webp",
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
    category: "whey-proteine",
    image: "/images/nitrotechelite.webp",
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
    category: "pre-workout",
    image: "/images/c4ultimatepreworkout.webp",
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
    category: "multivitamines",
    image: "/images/multivitamin.webp",
    description: "The essential daily ritual for the high-performance lifestyle.",
    benefits: ["20+ Vitamins", "High Potency", "Amino Acid Support"],
    specs: [
      { label: "Servings", value: "30" },
      { label: "Form", value: "Caplets" }
    ]
  },
  {
    id: "p5",
    name: "Serious Mass",
    slug: "serious-mass",
    brand: "Optimum Nutrition",
    price: 750,
    category: "gainers",
    image: "/images/seriousmass.webp",
    description: "High-calorie weight gain formula for those who find it hard to pack on size.",
    benefits: ["1,250 Calories", "50g Protein", "25 Vitamins & Minerals"],
    specs: [
      { label: "Weight", value: "5.44kg" },
      { label: "Servings", value: "16" }
    ]
  },
  {
    id: "p6",
    name: "Dymatize Super Mass Gainer",
    slug: "super-mass-gainer",
    brand: "Dymatize",
    price: 780,
    category: "lean-gainer",
    image: "/images/dymatizemassgainer.webp",
    description: "One of the most effective mass gainers on the market, loaded with BCAAs and glutamine.",
    benefits: ["1280 Calories", "52g Protein", "10.7g BCAAs"],
    specs: [
      { label: "Weight", value: "5.4kg" },
      { label: "Flavor", value: "Gourmet Vanilla" }
    ]
  },
  {
    id: "p7",
    name: "Mutant Mass Extreme 2500",
    slug: "mutant-mass-extreme",
    brand: "Mutant",
    price: 820,
    category: "hard-gainer",
    image: "/images/mutantmassextrem2500.webp",
    description: "Engineered for extreme hardgainers who need massive calorie intake.",
    benefits: ["2540 Calories", "92g Protein", "Real Whole Food Carbs"],
    specs: [
      { label: "Weight", value: "5.44kg" },
      { label: "Servings", value: "12" }
    ]
  },
  {
    id: "p8",
    name: "Xtend BCAA Original",
    slug: "xtend-bcaa",
    brand: "Scivation",
    price: 480,
    category: "acides-amines",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    description: "Hydration and recovery in every sip. The industry leader in amino acids.",
    benefits: ["7g BCAA", "Electrolyte Blend", "Zero Carbs"],
    specs: [
      { label: "Servings", value: "30" },
      { label: "Sugar", value: "0g" }
    ]
  },
  {
    id: "p9",
    name: "Animal Pak",
    slug: "animal-pak",
    brand: "Universal Nutrition",
    price: 650,
    category: "testosterone-booster",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f8162e6?q=80&w=2070&auto=format&fit=crop",
    description: "The complete training pack. Everything your body needs, in one powerful dose.",
    benefits: ["Complete Wellness", "Performance Support", "Digestive Enzymes"],
    specs: [
      { label: "Packs", value: "44" },
      { label: "Type", value: "Multi-System" }
    ]
  },
  {
    id: "p10",
    name: "Creatine Monohydrate Pure",
    slug: "creatine-pure",
    brand: "Applied Nutrition",
    price: 380,
    category: "creatine",
    image: "/images/creatine.webp",
    description: "Pharmaceutical grade creatine for raw power and muscle volume.",
    benefits: ["5g Pure Creatine", "Unflavored", "Micronized"],
    specs: [
      { label: "Servings", value: "50" },
      { label: "Purity", value: "99.9%" }
    ]
  }
];
