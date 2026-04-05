"use client";

import { Navbar } from '@/components/Navbar';
import { journalPosts } from '@/data/journal';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Journal() {
  const featuredPost = journalPosts[0];
  const otherPosts = journalPosts.slice(1);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container">
          <div className="max-w-4xl">
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Performance Archive</span>
            <h1 className="text-6xl md:text-9xl font-serif italic mb-8">Journal.</h1>
            <p className="text-lg text-text-muted font-light max-w-2xl leading-relaxed">
              In-depth protocols, laboratory insights, and biological strategies curated for the Monalisa community.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container">
          <Link href={`/journal/${featuredPost.slug}`} className="group flex flex-col lg:flex-row gap-16 items-center">
             <div className="flex-1 w-full aspect-[16/9] relative overflow-hidden bg-surface border border-border">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
             </div>
             <div className="flex-1 space-y-8">
                <div className="flex items-center gap-6">
                   <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold">{featuredPost.category}</span>
                   <div className="w-1 h-1 bg-border rounded-full" />
                   <span className="text-text-muted text-[10px] uppercase tracking-widest">{featuredPost.date}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight group-hover:text-gold transition-colors">{featuredPost.title}</h2>
                <p className="text-lg text-text-muted font-light leading-relaxed">
                   {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold group-hover:translate-x-4 transition-transform">
                   Read Protocol <ArrowRight size={14} className="text-gold" />
                </div>
             </div>
          </Link>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="section-padding bg-[#050505]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link href={`/journal/${post.slug}`} className="group space-y-8">
                  <div className="aspect-[16/10] relative overflow-hidden bg-surface border border-border">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold">{post.category}</span>
                      <span className="text-text-muted text-[8px] uppercase tracking-widest">{post.date}</span>
                    </div>
                    <h3 className="text-3xl font-serif leading-tight group-hover:text-gold transition-colors">{post.title}</h3>
                    <p className="text-sm text-text-muted font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-40 border-t border-border bg-black text-center">
         <div className="container max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif mb-8 italic">Never miss a protocol.</h2>
            <p className="text-text-muted font-light mb-12">Receive exclusive access to new limited-run isolates and elite performance protocols before they hit the archive.</p>
            <div className="flex flex-col md:flex-row gap-4">
               <input 
                 type="email" 
                 placeholder="ENTRUST YOUR EMAIL ADDRESS..." 
                 className="flex-1 bg-surface border border-border px-8 py-4 text-xs tracking-widest outline-none focus:border-gold transition-colors italic"
               />
               <button className="luxury-button">Subscribe</button>
            </div>
         </div>
      </section>

      <footer className="py-20 border-t border-border mt-40">
        <div className="container text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — Archive</p>
        </div>
      </footer>
    </main>
  );
}
