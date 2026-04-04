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
    image: "/categories/protein.jpg"
  },
  {
    id: "2",
    name: "Sculpt & Define",
    slug: "sculpt-define",
    description: "Advanced fat burners and metabolic enhancers to reveal your true form.",
    image: "/categories/fat-burners.jpg"
  },
  {
    id: "3",
    name: "Vitality Elixirs",
    slug: "vitality-elixirs",
    description: "Holistic wellness through essential vitamins, minerals, and restorative supplements.",
    image: "/categories/vitamins.jpg"
  },
  {
    id: "4",
    name: "Strength & Power",
    slug: "strength-power",
    description: "Explosive energy and unmatched endurance with our premium creatines and pre-workouts.",
    image: "/categories/strength.jpg"
  },
  {
    id: "5",
    name: "Exclusive Bundles",
    slug: "exclusive-bundles",
    description: "Curated collections for total transformation, designed by experts.",
    image: "/categories/bundles.jpg"
  }
];
