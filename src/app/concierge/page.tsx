"use client";

import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import { Send, Crown, Zap, ShieldCheck } from 'lucide-react';

export default function Concierge() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    experience: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Request received. Our elite protocol experts will contact you within 24 hours.");
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-40 pb-20 border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/concierge.jpeg" 
            alt="Concierge" 
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
        </div>
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Reserved for the Elite</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Concierge Service.</h1>
            <p className="text-lg text-text-muted font-light leading-relaxed mb-12">
              Beyond standard supplementation lies the path of the professional. 
              Our Concierge Service provides bespoke performance protocols tailored to your unique physiology and ambitions.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left side: Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif mb-8 underline underline-offset-[12px] decoration-gold/30">The Protocol Advantage</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-surface border border-gold/20 flex items-center justify-center shrink-0">
                       <Crown size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Bespoke Curation</h4>
                      <p className="text-sm text-text-muted font-light leading-relaxed">We don't just sell products; we design results. Receive a curated selection of isolates perfectly timed for your metabolic window.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-surface border border-gold/20 flex items-center justify-center shrink-0">
                       <Zap size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Priority Access</h4>
                      <p className="text-sm text-text-muted font-light leading-relaxed">Be the first to receive new limited-run formulas and international imports before they hit the main archive.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-surface border border-gold/20 flex items-center justify-center shrink-0">
                       <ShieldCheck size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Expert Consultation</h4>
                      <p className="text-sm text-text-muted font-light leading-relaxed">Direct communication with our team of nutritional scientists to fine-tune your stack as your physique evolves.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 bg-[#050505] border border-border">
                <p className="text-sm font-light italic text-text-muted leading-relaxed">
                  "Monalisa's concierge service changed the game for my competition prep. The precision of their isolate recommendations was the missing link."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Elite Athlete #402</span>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="bg-surface p-12 border border-border shadow-2xl">
              <h3 className="text-2xl font-serif mb-10">Request a <span className="italic text-gold">Protocol</span></h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">Full Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-black/50 border-b border-border focus:border-gold outline-none py-3 text-sm font-light transition-colors" 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">Email Address</label>
                    <input 
                      required
                      type="email" 
                      className="w-full bg-black/50 border-b border-border focus:border-gold outline-none py-3 text-sm font-light transition-colors" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Primary Goal</label>
                  <select 
                    className="w-full bg-black/50 border-b border-border focus:border-gold outline-none py-3 text-sm font-light transition-colors appearance-none"
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                  >
                    <option value="">Select a goal...</option>
                    <option value="lean-muscle">Hypertrophy & Lean Muscle</option>
                    <option value="sculpt">Sculpt & Define</option>
                    <option value="endurance">Peak Endurance</option>
                    <option value="recovery">Elite Recovery</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-muted">Brief Introduction</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your current training regime..."
                    className="w-full bg-black/50 border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors resize-none" 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="w-full luxury-button flex items-center justify-center gap-3">
                  <Send size={14} /> Submit Application
                </button>
                <p className="text-[8px] text-center text-text-muted uppercase tracking-[0.2em]">
                  Your data is handled with the utmost discretion.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-border mt-40">
        <div className="container text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Monalisa Nutrition — Concierge</p>
        </div>
      </footer>
    </main>
  );
}
