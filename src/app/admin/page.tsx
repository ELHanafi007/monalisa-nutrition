"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authenticateAdmin } from '@/app/actions/auth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');
    
    try {
      const result = await authenticateAdmin(username, password);
      
      if (result.success) {
        router.push('/admin/dashboard');
      } else {
        setError(result.error || 'IDENTIFIANTS INVALIDES');
        setIsAuthenticating(false);
      }
    } catch (err) {
      setError('ERREUR SYSTÈME LORS DE L\'AUTHENTIFICATION');
      setIsAuthenticating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Matrix-like Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-luxury-red/10 via-transparent to-transparent opacity-50" />
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-luxury-red/5 rounded-full blur-[150px] animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-black/40 backdrop-blur-3xl border border-white/5 p-16 relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden group"
      >
        {/* Decorative corner lines */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-luxury-red/20 rounded-tl-[3rem]" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-luxury-red/20 rounded-br-[3rem]" />

        <div className="text-center mb-16">
          <motion.div 
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-black border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(139,0,0,0.2)] group-hover:shadow-[0_0_70px_rgba(139,0,0,0.4)] transition-all duration-700"
          >
            <ShieldCheck size={48} className="text-luxury-red" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">
            Elite <span className="red-gradient-text italic">Terminal.</span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-white/10" />
            <p className="text-[9px] uppercase tracking-[0.6em] text-white/40 font-black">Protocole Monaliza v.4.0</p>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-8">Identifiant_Alpha</label>
              <div className="relative group">
                <User className="absolute left-7 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-luxury-red transition-colors" size={20} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red/50 outline-none py-6 pl-16 pr-8 text-sm font-bold tracking-widest text-white transition-all rounded-2xl placeholder:text-white/10" 
                  placeholder="ID_ROOT_ACCESS"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-luxury-red font-black ml-8">Clé_Cryptographique</label>
              <div className="relative group">
                <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-luxury-red transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-luxury-red/50 outline-none py-6 pl-16 pr-8 text-sm font-bold tracking-[0.5em] text-white transition-all rounded-2xl placeholder:tracking-widest placeholder:text-white/10" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-luxury-red/10 border border-luxury-red/20 py-4 px-6 rounded-xl flex items-center justify-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-luxury-red animate-ping" />
                <p className="text-luxury-red text-[9px] uppercase tracking-widest font-black">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={isAuthenticating}
            className={`w-full relative py-6 rounded-2xl overflow-hidden transition-all duration-500 group ${isAuthenticating ? 'bg-luxury-red/50 cursor-not-allowed' : 'bg-luxury-red hover:bg-red-500 hover:scale-[1.02] shadow-[0_20px_40px_rgba(139,0,0,0.3)]'}`}
          >
            <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white">
              {isAuthenticating ? 'Validation...' : 'Authentifier Session'}
              {!isAuthenticating && <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />}
            </span>
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>
        </form>

        <div className="mt-16 pt-10 border-t border-white/5 text-center relative">
          <Cpu className="absolute -top-3 left-1/2 -translate-x-1/2 text-white/5 bg-black px-2" size={24} />
          <p className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-black leading-relaxed">
            ACCÈS RÉSERVÉ AU PERSONNEL ALPHA <br /> SURVEILLANCE BIOMÉTRIQUE ACTIVÉE
          </p>
        </div>
      </motion.div>
    </main>
  );
}
