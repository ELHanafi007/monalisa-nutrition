"use client";

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { products } from '@/data/products';
import { ShoppingCart, Heart, Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CategorySection />
      
      {/* Featured Products */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-center md:text-left">
            <div className="w-full">
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Seasonal Edit</span>
              <h2 className="text-5xl md:text-6xl font-serif">The <span className="italic">Elite</span> Selection.</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-[4/5] bg-surface overflow-hidden relative border border-border group-hover:border-gold transition-all duration-500">
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                    <button className="bg-black/50 backdrop-blur-md p-2 hover:text-gold transition-colors">
                      <Heart size={18} />
                    </button>
                    <Link href={`/catalog/${product.slug}`} className="bg-black/50 backdrop-blur-md p-2 hover:text-gold transition-colors">
                      <Eye size={18} />
                    </Link>
                  </div>
                  
                  {/* Product Image */}
                  <div className="w-full h-full flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700 relative">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      className="object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 transition-opacity p-8"
                    />
                  </div>

                  {/* Add to Cart Overlay */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 w-full bg-gold text-black py-4 uppercase tracking-[0.3em] text-[10px] font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> Add to Collection
                  </button>
                </div>

                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-gold uppercase tracking-widest font-bold mb-1">{product.brand}</p>
                    <h3 className="text-sm uppercase tracking-wider font-medium group-hover:text-gold transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-sm font-bold tracking-wider">{product.price} MAD</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-black border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square">
               <img 
                 src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                 alt="The Monalisa Standard" 
                 className="w-full h-full object-cover grayscale opacity-60"
               />
               <div className="absolute -top-10 -right-10 w-64 h-64 border border-gold/20 hidden lg:block" />
            </div>
            <div className="text-center lg:text-left">
              <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Our Ethos</span>
              <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">The <span className="italic">Monalisa</span> Standard.</h2>
              <div className="space-y-8 text-lg text-text-muted font-light leading-relaxed">
                <p>
                  At the heart of the Maghreb, we recognized a void. The athlete's journey was cluttered with mediocre formulas and mass-produced fillers. Monalisa was born to bridge this gap.
                </p>
                <p>
                  We source only the purest molecules from the world's leading laboratories, ensuring that every milligram serves a purpose. No compromises. No shortcuts. Just pure, unadulterated performance.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-12">
                <div>
                  <p className="text-4xl font-serif text-gold mb-2">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted">Certified Purity</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-gold mb-2">24h</p>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted">Elite Concierge</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-gold mb-2">Exp.</p>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted">Global Sourcing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#050505] border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="text-2xl font-serif tracking-widest uppercase flex items-center gap-2 mb-8">
                <span className="text-gold">M</span>
                <span className="tracking-[0.3em]">onalisa</span>
              </Link>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                The premier destination for luxury sports nutrition in the Kingdom of Morocco. Elevating performance through purity.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-8">Departments</h4>
              <ul className="space-y-4 text-sm font-light text-text-muted">
                <li><Link href="/catalog?cat=elite-proteins" className="hover:text-gold transition-colors">Elite Proteins</Link></li>
                <li><Link href="/catalog?cat=sculpt-define" className="hover:text-gold transition-colors">Sculpt & Define</Link></li>
                <li><Link href="/catalog?cat=vitality-elixirs" className="hover:text-gold transition-colors">Vitality Elixirs</Link></li>
                <li><Link href="/catalog?cat=strength-power" className="hover:text-gold transition-colors">Strength & Power</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-8">The House</h4>
              <ul className="space-y-4 text-sm font-light text-text-muted">
                <li><Link href="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
                <li><Link href="/concierge" className="hover:text-gold transition-colors">Concierge Service</Link></li>
                <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-8">Newsletter</h4>
              <p className="text-sm text-text-muted font-light mb-6">Receive exclusive access to new collections and elite performance protocols.</p>
              <div className="flex border-b border-border pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent border-none text-sm outline-none w-full font-light" />
                <button className="text-[10px] uppercase tracking-widest font-bold text-gold">Join</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/10 text-[10px] uppercase tracking-[0.2em] text-text-muted">
            <p>© 2026 Monalisa Nutrition. All Rights Reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="#">Instagram</Link>
              <Link href="#">Facebook</Link>
              <Link href="#">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
