"use client";

import { useCart } from '@/contexts/CartContext';
import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

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
    }, 2500);
  };

  if (cart.length === 0 && !isCompleted) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="container pt-60 text-center">
           <h1 className="text-4xl font-serif mb-8 italic">Your collection is empty.</h1>
           <Link href="/catalog" className="luxury-button">Return to Archive</Link>
        </div>
      </main>
    );
  }

  if (isCompleted) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar />
        <div className="container pt-60 flex flex-col items-center text-center">
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-12"
           >
             <CheckCircle2 size={48} className="text-black" />
           </motion.div>
           <h1 className="text-6xl font-serif mb-6 italic">Investment Secured.</h1>
           <p className="text-text-muted text-lg mb-12 max-w-md mx-auto">
             Your performance protocol has been initiated. Our elite concierge will dispatch your artifacts within 24 hours.
           </p>
           <Link href="/" className="luxury-button">Continue Journey</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container pt-40 pb-40">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Main Checkout Area */}
          <div className="flex-1">
            {/* Steps Indicator */}
            <div className="flex items-center gap-4 mb-20 overflow-x-auto pb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4 shrink-0">
                  <div className={`w-10 h-10 border ${step >= s ? 'bg-gold border-gold text-black' : 'border-border text-text-muted'} flex items-center justify-center text-xs font-bold transition-colors`}>
                    0{s}
                  </div>
                  <span className={`text-[10px] uppercase tracking-[0.3em] ${step === s ? 'text-gold font-bold' : 'text-text-muted'}`}>
                    {s === 1 ? 'Information' : s === 2 ? 'Shipping' : 'Payment'}
                  </span>
                  {s < 3 && <div className="w-12 h-[1px] bg-border mx-4" />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <h2 className="text-4xl font-serif">Client <span className="italic">Information.</span></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted">First Name</label>
                      <input type="text" className="w-full bg-surface border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted">Last Name</label>
                      <input type="text" className="w-full bg-surface border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted">Email Address</label>
                      <input type="email" className="w-full bg-surface border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                    </div>
                  </div>
                  <button onClick={handleNext} className="luxury-button flex items-center gap-3">
                    Next Phase <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <h2 className="text-4xl font-serif">Delivery <span className="italic">Destinations.</span></h2>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted">Full Address</label>
                      <textarea rows={3} className="w-full bg-surface border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors resize-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-muted">City</label>
                        <input type="text" placeholder="e.g. Casablanca" className="w-full bg-surface border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-muted">Phone Number</label>
                        <input type="tel" className="w-full bg-surface border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <button onClick={handleBack} className="luxury-button-outline">Back</button>
                    <button onClick={handleNext} className="luxury-button flex items-center gap-3 flex-1 justify-center">
                      Confirm Logistics <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <h2 className="text-4xl font-serif">Secure <span className="italic">Investment.</span></h2>
                  
                  <div className="space-y-8">
                    <div className="p-8 border border-gold/30 bg-gold/5 flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-6">
                          <CreditCard className="text-gold" />
                          <div>
                            <p className="text-xs uppercase tracking-widest font-bold">Credit / Debit Card</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest">Encrypted via Monalisa Secure</p>
                          </div>
                       </div>
                       <div className="w-4 h-4 rounded-full border border-gold flex items-center justify-center p-1">
                          <div className="w-full h-full bg-gold rounded-full" />
                       </div>
                    </div>
                    <div className="p-8 border border-border hover:border-gold/30 transition-colors flex items-center justify-between cursor-pointer opacity-50 grayscale">
                       <div className="flex items-center gap-6">
                          <Truck className="text-text-muted" />
                          <div>
                            <p className="text-xs uppercase tracking-widest font-bold">Cash on Delivery</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-widest">Available for Kingdom Elite only</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="p-8 bg-surface border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-muted">Cardholder Name</label>
                        <input type="text" className="w-full bg-black/50 border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-muted">Card Number</label>
                        <input type="text" placeholder="**** **** **** ****" className="w-full bg-black/50 border border-border focus:border-gold outline-none p-4 text-sm font-light transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <button onClick={handleBack} className="luxury-button-outline">Back</button>
                    <button 
                      onClick={handleComplete} 
                      disabled={isProcessing}
                      className="luxury-button flex items-center gap-3 flex-1 justify-center relative overflow-hidden"
                    >
                      {isProcessing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        />
                      ) : (
                        <>Finalize Collection <Shield size={14} /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-surface border border-border p-8 sticky top-32">
              <h3 className="text-xl font-serif mb-8 italic">Your Selection.</h3>
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                       <p className="text-[10px] uppercase tracking-widest font-bold">{item.name}</p>
                       <p className="text-[10px] text-text-muted uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[10px] font-bold shrink-0">{item.price * item.quantity} MAD</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-border">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-muted">
                  <span>Subtotal</span>
                  <span>{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-muted">
                  <span>Elite Delivery</span>
                  <span className="text-gold">Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border mt-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Total Investment</span>
                  <span className="text-xl font-bold">{totalPrice} MAD</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 p-4 bg-gold/5 border border-gold/10">
                 <Shield size={16} className="text-gold" />
                 <span className="text-[8px] uppercase tracking-widest text-gold leading-relaxed">
                   Your transaction is protected by the Monalisa Standard of Encryption.
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
