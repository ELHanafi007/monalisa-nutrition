export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Acides Aminés",
    slug: "acides-amines",
    description: "Essential and non-essential amino acids for optimal recovery and muscle growth.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c64b52d2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat2",
    name: "Creatine",
    slug: "creatine",
    description: "The most researched supplement for strength, power, and muscle volume.",
    image: "/images/creatine.webp"
  },
  {
    id: "cat3",
    name: "EAA",
    slug: "eaa",
    description: "Essential Amino Acids to fuel your performance and protect your gains.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat4",
    name: "Gainers",
    slug: "gainers",
    description: "High-calorie formulas designed to help you pack on serious mass.",
    image: "/images/seriousmass.webp"
  },
  {
    id: "cat5",
    name: "Hard Gainer",
    slug: "hard-gainer",
    description: "Extremely high-calorie blends for those with ultra-fast metabolisms.",
    image: "/images/mutantmassextrem2500.webp"
  },
  {
    id: "cat6",
    name: "Lean Gainer",
    slug: "lean-gainer",
    description: "Controlled-calorie mass gainers for adding size without excessive fat.",
    image: "/images/dymatizemassgainer.webp"
  },
  {
    id: "cat7",
    name: "Multivitamines",
    slug: "multivitamines",
    description: "Complete daily nutrient support for the elite performer.",
    image: "/images/multivitamin.webp"
  },
  {
    id: "cat8",
    name: "Pre-Workout",
    slug: "pre-workout",
    description: "Explosive energy and laser-sharp focus for your most intense sessions.",
    image: "/images/c4ultimatepreworkout.webp"
  },
  {
    id: "cat9",
    name: "Testosterone Booster",
    slug: "testosterone-booster",
    description: "Natural support for your body's most vital performance hormone.",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f8162e6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat10",
    name: "Whey & Protéine",
    slug: "whey-proteine",
    description: "Premium protein sources for rapid recovery and lean muscle synthesis.",
    image: "/images/Gold Standard Whey Isolate.webp"
  }
];
