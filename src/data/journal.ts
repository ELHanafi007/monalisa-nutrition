export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

export const journalPosts: JournalPost[] = [
  {
    id: "j1",
    title: "The Isolate Paradox: Why Purity Defines Performance",
    slug: "isolate-paradox",
    category: "Science",
    date: "April 2, 2026",
    excerpt: "Exploring the molecular difference between standard whey and the Monalisa isolate standard.",
    image: "https://images.unsplash.com/photo-1532187875605-2fe358511423?q=80&w=2070&auto=format&fit=crop",
    content: "Content for the elite journal article..."
  },
  {
    id: "j2",
    title: "Circadian Nutrition: Timing Your Rituals",
    slug: "circadian-nutrition",
    category: "Protocol",
    date: "March 28, 2026",
    excerpt: "How to align your supplement intake with your body's natural hormonal peaks.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop",
    content: "Content for the elite journal article..."
  },
  {
    id: "j3",
    title: "The Maghreb Athlete: Adapting to Arid Environments",
    slug: "maghreb-athlete-hydration",
    category: "Regional",
    date: "March 15, 2026",
    excerpt: "Advanced hydration and electrolyte protocols for the unique climate of the Kingdom.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c64b52d2?q=80&w=2070&auto=format&fit=crop",
    content: "Content for the elite journal article..."
  }
];
