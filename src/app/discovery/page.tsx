"use client";

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Shield, Heart, ArrowRight, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  {
    id: 'goal',
    question: "What is your primary physiological objective?",
    options: [
      { id: 'muscle', label: 'Hypertrophy & Lean Muscle', icon: Zap, category: 'elite-proteins' },
      { id: 'sculpt', label: 'Sculpt & Define', icon: Target, category: 'sculpt-define' },
      { id: 'power', label: 'Explosive Power', icon: Shield, category: 'strength-power' },
      { id: 'wellness', label: 'Holistic Vitality', icon: Heart, category: 'vitality-elixirs' }
    ]
  },
  {
    id: 'experience',
    question: "How would you describe your current ritual status?",
    options: [
      { id: 'initiate', label: 'Initiate (Beginner)', description: 'Seeking a foundation.' },
      { id: 'adept', label: 'Adept (Intermediate)', description: 'Refining the protocol.' },
      { id: 'elite', label: 'Elite (Advanced)', description: 'Pushing biological limits.' }
    ]
  }
];

export default function Discovery() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleAnswer = (stepId: string, value: string, category?: string) => {
    const newAnswers = { ...answers, [stepId]: value };
    if (category) newAnswers.category = category;
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      startAnalysis(newAnswers);
    }
  };

  const startAnalysis = (finalAnswers: any) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const recommendedProduct = products.find(p => p.category === finalAnswers.category) || products[0];
      setRecommendation(recommendedProduct);
      setIsAnalyzing(false);
    }, 2500);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container pt-40 pb-20">
        <div className="max-w-4xl mx-auto">
          {!recommendation && !isAnalyzing && (
            <div className="text-center mb-20">
              <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">The Discovery Protocol</span>
              <h1 className="text-6xl font-serif italic mb-8">Identify Your <span className="text-white">Artifact.</span></h1>
              <div className="w-24 h-[1px] bg-gold/30 mx-auto mb-12" />
              
              <div className="flex justify-center gap-4 mb-12">
                {steps.map((_, i) => (
                  <div key={i} className={`w-12 h-1 ${i <= currentStep ? 'bg-gold' : 'bg-border'} transition-colors duration-500`} />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-20 h-20 border-t-2 border-gold rounded-full mx-auto mb-12"
                />
                <h2 className="text-2xl font-serif italic uppercase tracking-widest">Analyzing Biological Intent...</h2>
                <p className="text-text-muted mt-4 font-light">Consulting the Monalisa archives for your perfect match.</p>
              </motion.div>
            ) : recommendation ? (
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-gold/20 p-12 md:p-20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                  <div className="w-full md:w-1/2 aspect-square relative bg-black/40 border border-border p-8">
                    <Image 
                      src={recommendation.image} 
                      alt={recommendation.name} 
                      fill
                      className="object-contain mix-blend-lighten p-8"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-4 mb-6">
                      <CheckCircle2 className="text-gold" size={20} />
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Protocol Match Found</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">{recommendation.name}</h2>
                    <p className="text-text-muted font-light leading-relaxed mb-10 italic">
                      Based on your objective for <span className="text-white font-medium">{answers.goal === 'muscle' ? 'Hypertrophy' : answers.goal}</span>, 
                      this artifact is engineered to optimize your biological transition.
                    </p>
                    <div className="flex flex-col gap-4">
                      <Link href={`/catalog/${recommendation.slug}`} className="luxury-button text-center">
                        Secure This Artifact
                      </Link>
                      <button onClick={reset} className="text-[10px] uppercase tracking-widest text-text-muted hover:text-gold transition-colors flex items-center justify-center gap-2">
                        <RefreshCcw size={12} /> Restart Protocol
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <h3 className="text-3xl font-serif text-center mb-12">{steps[currentStep].question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {steps[currentStep].options.map((option: any) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(steps[currentStep].id, option.id, option.category)}
                      className="group p-10 border border-border hover:border-gold bg-surface hover:bg-gold/5 transition-all duration-500 text-left relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        {option.icon && <option.icon className="text-gold mb-6 group-hover:scale-110 transition-transform" size={32} />}
                        <h4 className="text-lg uppercase tracking-widest font-bold mb-2">{option.label}</h4>
                        {option.description && <p className="text-sm text-text-muted font-light">{option.description}</p>}
                      </div>
                      <ArrowRight className="absolute bottom-10 right-10 text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={20} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
