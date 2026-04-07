import { Navbar } from '@/components/Navbar';
import { categories } from '@/data/categories';
import Link from 'next/link';

export default function Collections() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20">
        <div className="container">
          <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">The Monalisa Archive</span>
          <h1 className="text-6xl md:text-9xl font-serif italic mb-8">Curations.</h1>
          <p className="text-lg text-text-muted font-light max-w-2xl leading-relaxed">
            Explore our meticulously curated departments, each designed to serve a specific pillar of your performance.
          </p>
        </div>
      </section>

      {/* Collections List */}
      <section className="pb-40">
        <div className="container">
          <div className="space-y-40">
            {categories.map((category, index) => (
              <div key={category.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}>
                <div className="flex-1 w-full aspect-[16/9] lg:aspect-square bg-surface border border-border relative group overflow-hidden">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                   <img 
                     src={category.image} 
                     alt={category.name} 
                     className="w-full h-full object-cover  group-hover:-0 group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="text-center">
                         <span className="text-[10px] text-gold uppercase tracking-[0.5em] mb-4 block">Department</span>
                         <h2 className="text-4xl md:text-6xl font-serif italic text-white">{category.name}</h2>
                      </div>
                   </div>
                   <Link 
                     href={`/catalog?cat=${category.slug}`}
                     className="absolute inset-0 z-30"
                   />
                </div>
                
                <div className="flex-1 space-y-8">
                  <span className="text-gold font-serif text-4xl italic">0{index + 1}</span>
                  <h3 className="text-4xl md:text-5xl font-serif">{category.name}</h3>
                  <p className="text-lg text-text-muted font-light leading-relaxed">
                    {category.description}
                  </p>
                  <div className="pt-6">
                    <Link 
                      href={`/catalog?cat=${category.slug}`} 
                      className="text-xs uppercase tracking-[0.4em] font-bold text-gold border-b border-gold/30 pb-2 hover:border-gold transition-colors"
                    >
                      View Collection
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-border mt-40">
        <div className="container text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — Curations</p>
        </div>
      </footer>
    </main>
  );
}
