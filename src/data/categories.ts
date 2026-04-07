export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cat_packs",
    name: "PACKS EN PROMO",
    slug: "packs",
    description: "Exclusive curated bundles for ultimate results.",
    image: "/images/Creatine-30-Ct.webp"
  },
  {
    id: "cat1",
    name: "Acides Aminés",
    slug: "acides-amines",
    description: "Essential and non-essential amino acids for optimal recovery.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c64b52d2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat2",
    name: "Creatine",
    slug: "creatine",
    description: "Strength and power with pure monohydrate.",
    image: "/images/creatine.webp"
  },
  {
    id: "cat3",
    name: "EAA",
    slug: "eaa",
    description: "Essential Amino Acids for muscle protection.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat4",
    name: "Gainers",
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
    image: "/images/dymatizemassgainer.webp"
  },
  {
    id: "cat7",
    name: "Multivitamines",
    slug: "multivitamines",
    description: "Daily nutrient support.",
    image: "/images/multivitamin.webp"
  },
  {
    id: "cat8",
    name: "Pre-Workout",
    slug: "pre-workout",
    description: "Energy and focus for your training.",
    image: "/images/c4ultimatepreworkout.webp"
  },
  {
    id: "cat9",
    name: "Testosterone Booster",
    slug: "testosterone-booster",
    description: "Natural support for vital hormones.",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f8162e6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat10",
    name: "Whey & Protéine",
    slug: "whey-proteine",
    description: "Rapid recovery and lean muscle building.",
    image: "/images/Gold Standard Whey Isolate.webp"
  }
];
