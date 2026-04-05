import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=2070&auto=format&fit=crop" 
            alt="The Monalisa Laboratory" 
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
        </div>
        
        <div className="container relative z-20 text-center">
          <span className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6 block">Our Legacy</span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8">The <span className="italic">House</span> of Monalisa.</h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Founded on the principles of pharmaceutical purity and elite performance, 
            Monalisa is the definitive standard for the modern athlete.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">The Origin</span>
              <h2 className="text-5xl font-serif mb-10 leading-tight">Beyond <br /><span className="italic">Supplements.</span></h2>
              <div className="space-y-6 text-text-muted font-light leading-relaxed">
                <p>
                  In a world of mass-produced fillers and questionable sourcing, Monalisa was established as a sanctuary for the discerning athlete. We believed that nutrition should be treated with the same precision as fine medicine.
                </p>
                <p>
                  Our journey began in the pursuit of the "Perfect Molecule" — the exact isolate that provides maximum bioavailability without compromise. We spent years vetting the world's most advanced laboratories to curate a collection that we are proud to call our own.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-surface border border-border mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale opacity-50"
                  alt="Precision"
                />
              </div>
              <div className="aspect-[3/4] bg-surface border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1532187875605-2fe358511423?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale opacity-50"
                  alt="Laboratory"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-[#050505]">
        <div className="container">
          <div className="text-center mb-20">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">The Pillars</span>
            <h2 className="text-5xl font-serif italic">Our Commitments.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 border border-border hover:border-gold transition-colors duration-500">
              <span className="text-3xl font-serif text-gold mb-6 block">01</span>
              <h3 className="text-lg uppercase tracking-widest font-bold mb-6">Purity First</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Every batch is triple-tested for heavy metals, banned substances, and ingredient accuracy. If it doesn't meet the Monalisa Standard, it never leaves the lab.
              </p>
            </div>
            <div className="p-12 border border-border hover:border-gold transition-colors duration-500">
              <span className="text-3xl font-serif text-gold mb-6 block">02</span>
              <h3 className="text-lg uppercase tracking-widest font-bold mb-6">Global Sourcing</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                We don't settle for local convenience. We source our Whey from Ireland, our Creatine from Germany, and our Amino Acids from Japan to ensure the highest quality.
              </p>
            </div>
            <div className="p-12 border border-border hover:border-gold transition-colors duration-500">
              <span className="text-3xl font-serif text-gold mb-6 block">03</span>
              <h3 className="text-lg uppercase tracking-widest font-bold mb-6">Concierge Support</h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                Our relationship doesn't end at checkout. Every client has access to our elite protocols and concierge support for personalized performance optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 text-center border-t border-border">
        <div className="container">
          <h2 className="text-5xl md:text-7xl font-serif mb-12">Ready to <span className="italic text-gold">Ascend?</span></h2>
          <Link href="/catalog" className="luxury-button">
            Enter The Archive
          </Link>
        </div>
      </section>

      <footer className="py-20 border-t border-border mt-40">
        <div className="container text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — The Standard</p>
        </div>
      </footer>
    </main>
  );
}
