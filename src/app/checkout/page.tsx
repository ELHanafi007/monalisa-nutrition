"use client";

import { useCart } from '@/contexts/CartContext';
import { Navbar } from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ArrowRight, Shield, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
    }, 3000);
  };

  if (cart.length === 0 && !isCompleted) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="container pt-60 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-md mx-auto"
           >
             <h1 className="text-4xl font-serif mb-8 italic">Your collection is currently empty.</h1>
             <p className="text-text-muted mb-12 uppercase tracking-widest text-[10px]">Begin your performance ritual to proceed.</p>
             <Link href="/catalog" className="luxury-button">Enter The Archive</Link>
           </motion.div>
        </div>
      </main>
    );
  }

  if (isCompleted) {
    return (
      <main className="min-h-screen bg-black overflow-hidden">
        <Navbar />
        <div className="container min-h-screen flex flex-col items-center justify-center text-center relative">
           <div className="absolute inset-0 bg-gold/[0.02] pointer-events-none" />
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
             className="relative z-10"
           >
             <motion.div
               initial={{ rotate: -90, scale: 0 }}
               animate={{ rotate: 0, scale: 1 }}
               transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
               className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-12 mx-auto shadow-[0_0_50px_rgba(212,175,55,0.3)]"
             >
               <CheckCircle2 size={48} className="text-black" />
             </motion.div>
             <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Investment <span className="gold-gradient-text">Secured.</span></h1>
             <div className="w-24 h-[1px] bg-gold/30 mx-auto mb-8" />
             <p className="text-text-muted text-lg mb-16 max-w-md mx-auto font-light leading-relaxed">
               Your performance artifacts have been authenticated. Our elite concierge is preparing your dispatch for delivery within the Kingdom.
             </p>
             <Link href="/" className="luxury-button">Return to Main Terminal</Link>
           </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container pt-40 pb-40">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Main Checkout Area */}
          <div className="flex-1">
            {/* Header & Protocol Progress */}
            <div className="mb-20">
              <span className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-gold/50" />
                <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">Acquisition Protocol</span>
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-12 text-reveal">Secure Entry.</h2>
              
              <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4 shrink-0">
                    <div className={`w-12 h-12 border ${step >= s ? 'bg-gold border-gold text-black' : 'border-white/10 text-text-muted'} flex items-center justify-center text-xs font-bold transition-all duration-500`}>
                      0{s}
                    </div>
                    <span className={`text-[10px] uppercase tracking-[0.4em] ${step === s ? 'text-white font-bold' : 'text-text-muted'}`}>
                      {s === 1 ? 'IDENTITY' : s === 2 ? 'LOGISTICS' : 'INVESTMENT'}
                    </span>
                    {s < 3 && <div className={`w-12 h-[1px] transition-colors duration-1000 ${step > s ? 'bg-gold' : 'bg-white/10'} mx-4`} />}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">First Name</label>
                      <input type="text" className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" placeholder="e.g. Othman" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Last Name</label>
                      <input type="text" className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" placeholder="e.g. Bennani" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Email Address</label>
                      <input type="email" className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" placeholder="IDENTITY@MONALISA.MA" />
                    </div>
                  </div>
                  <button onClick={handleNext} className="luxury-button group">
                    Validate Identity <ArrowRight size={14} className="ml-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Primary Residence / Laboratory</label>
                      <textarea rows={3} className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all resize-none italic" placeholder="Enter full dispatch address..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">City</label>
                        <select className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-[10px] uppercase tracking-widest font-light transition-all appearance-none italic">
                          <option>Casablanca</option>
                          <option>Rabat</option>
                          <option>Marrakech</option>
                          <option>Tangier</option>
                          <option>Fes</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Secure Contact Number</label>
                        <input type="tel" className="w-full bg-surface/50 border border-white/5 focus:border-gold/30 outline-none p-5 text-sm font-light transition-all italic" placeholder="+212 ..." />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <button onClick={handleBack} className="luxury-button-outline group">
                      <ArrowLeft size={14} className="mr-4 group-hover:-translate-x-2 transition-transform" /> Modify
                    </button>
                    <button onClick={handleNext} className="luxury-button group flex-1">
                      Confirm Logistics <ArrowRight size={14} className="ml-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border border-gold/30 bg-gold/[0.03] flex items-center justify-between group cursor-pointer relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-16 h-16 bg-gold/10 -mr-8 -mt-8 rotate-45" />
                       <div className="flex items-center gap-6 relative z-10">
                          <Truck className="text-gold" size={20} />
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Cash on Delivery</p>
                            <p className="text-[8px] text-text-muted uppercase tracking-[0.2em] mt-1">Pay when you receive</p>
                          </div>
                       </div>
                       <div className="w-5 h-5 rounded-full border border-gold flex items-center justify-center p-1 relative z-10">
                          <div className="w-full h-full bg-gold rounded-full" />
                       </div>
                    </div>
                    <div className="p-8 border border-white/5 bg-white/[0.01] flex items-center justify-between cursor-not-allowed opacity-40 grayscale">
                       <div className="flex items-center gap-6">
                          <CreditCard className="text-text-muted" size={20} />
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Credit Card</p>
                            <p className="text-[8px] text-text-muted uppercase tracking-[0.2em] mt-1">Terminal Offline</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="bg-surface/50 border border-white/5 p-10 space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <Shield size={12} className="text-gold/30" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">COD Protocol</h4>
                      <p className="text-sm text-text-muted font-light leading-relaxed italic">
                        By confirming this order, you agree to pay the total amount of <span className="text-white font-bold">{totalPrice} MAD</span> in cash upon delivery. Our elite courier will contact you to coordinate the final dispatch.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <button onClick={handleBack} disabled={isProcessing} className="luxury-button-outline">Back</button>
                    <button 
                      onClick={handleComplete} 
                      disabled={isProcessing}
                      className="luxury-button group flex-1 relative overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing ? (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-4"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                            />
                            <span>Processing Order...</span>
                          </motion.div>
                        ) : (
                          <motion.span 
                            key="default"
                            className="flex items-center gap-4"
                          >
                            Confirm COD Order <Truck size={14} className="group-hover:scale-110 transition-transform" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-surface/30 border border-white/5 p-10 sticky top-32 group">
              <h3 className="text-2xl font-serif mb-10 italic">Selected Artifacts.</h3>
              <div className="space-y-8 mb-12 max-h-[40vh] overflow-y-auto pr-6 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-6 group/item">
                    <div className="w-16 h-16 bg-black border border-white/5 shrink-0 relative overflow-hidden flex items-center justify-center">
                       <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white mb-1">{item.name}</p>
                       <p className="text-[8px] text-text-muted uppercase tracking-widest">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-[10px] font-bold text-gold shrink-0">{item.price * item.quantity} MAD</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 pt-10 border-t border-white/5">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-text-muted">
                  <span>Subtotal</span>
                  <span className="text-white">{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-text-muted">
                  <span>Elite Dispatch</span>
                  <span className="text-gold">Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white">Total Investment</span>
                  <span className="text-2xl font-bold gold-gradient-text">{totalPrice} MAD</span>
                </div>
              </div>

              <div className="mt-10 p-6 bg-gold/[0.02] border border-gold/10 flex items-center gap-4">
                 <Lock size={16} className="text-gold/50" />
                 <span className="text-[8px] uppercase tracking-[0.3em] text-gold/70 leading-relaxed">
                   Protected by the Monalisa standard of terminal encryption.
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for Mobile Nav */}
      <div className="h-24 md:hidden" />
    </main>
  );
}
