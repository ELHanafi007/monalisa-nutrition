export interface JournalEntry {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: "j1",
    title: "Protocol 01: Hypertrophy for the Elite",
    slug: "protocol-01",
    category: "Science",
    date: "MARCH 20, 2026",
    image: "/images/protocol-01.jpeg",
    excerpt: "Exploring the cellular mechanisms of muscle synthesis through precision nutrition and intensity protocols."
  },
  {
    id: "j2",
    title: "The Morning Ritual: Precision & Mindset",
    slug: "morning-ritual",
    category: "Lifestyle",
    date: "MARCH 15, 2026",
    image: "/images/the-ritual.jpeg",
    excerpt: "How the world's highest performers structure their first hour for maximum physical and cognitive output."
  },
  {
    id: "j3",
    title: "Molecular Purity: The Monalisa Standard",
    slug: "molecular-purity",
    category: "Philosophy",
    date: "MARCH 10, 2026",
    image: "/images/the-laboratory.jpeg",
    excerpt: "Behind the scenes of our quality control process and our commitment to unparalleled supplement purity."
  }
];
