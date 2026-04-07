export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Elite Proteins",
    slug: "elite-proteins",
    description: "The gold standard of muscle synthesis and recovery. Sourced from the finest isolates.",
    image: "/images/Gold Standard Whey Isolate.webp"
  },
  {
    id: "2",
    name: "Sculpt & Define",
    slug: "sculpt-define",
    description: "Advanced fat burners and metabolic enhancers to reveal your true form.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Vitality Elixirs",
    slug: "vitality-elixirs",
    description: "Holistic wellness through essential vitamins, minerals, and restorative supplements.",
    image: "/images/multivitamin.webp"
  },
  {
    id: "4",
    name: "Strength & Power",
    slug: "strength-power",
    description: "Explosive energy and unmatched endurance with our premium creatines and pre-workouts.",
    image: "/images/c4ultimatepreworkout.webp"
  },
  {
    id: "5",
    name: "Exclusive Bundles",
    slug: "exclusive-bundles",
    description: "Curated collections for total transformation, designed by experts.",
    image: "https://images.unsplash.com/photo-1626225967045-9c76db7b6ecd?q=80&w=2070&auto=format&fit=crop"
  }
];
