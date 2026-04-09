"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication for prototype
    if (username === 'admin' && password === 'monalisa2026') {
      // Set a secure cookie for the middleware to check
      document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Strict";
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants invalides. Accès refusé.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-red rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white border border-gray-100 p-12 relative z-10 shadow-2xl rounded-[2.5rem]"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-luxury-red" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Accès <span className="red-gradient-text italic">Terminal.</span></h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-black">Protocole Interne Monaliza</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-red font-black ml-4">Identifiant</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-red outline-none py-4 pl-14 pr-5 text-sm font-bold transition-all rounded-2xl" 
                  placeholder="ID_ADMINISTRATEUR"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-luxury-red font-black ml-4">Clé de Sécurité</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 focus:border-luxury-red outline-none py-4 pl-14 pr-5 text-sm font-bold transition-all rounded-2xl" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-luxury-red text-[10px] uppercase tracking-widest font-black text-center"
            >
              {error}
            </motion.p>
          )}

          <button type="submit" className="w-full luxury-button group py-6 rounded-2xl">
            Authentifier l'Accès <ArrowRight size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-[8px] uppercase tracking-[0.5em] text-gray-400 font-black leading-relaxed">
            Toutes les tentatives d'accès non autorisées sont <br /> enregistrées et signalées au terminal central.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
