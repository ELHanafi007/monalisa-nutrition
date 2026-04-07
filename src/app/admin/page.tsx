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
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-surface border border-white/5 p-12 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-gold" />
          </div>
          <h1 className="text-3xl font-serif mb-2 italic">Terminal Access.</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-bold">Monalisa Internal Protocol</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold ml-1">Identifier</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-white/5 focus:border-gold/30 outline-none py-4 pl-14 pr-5 text-sm font-light transition-all italic" 
                  placeholder="ADMIN_ID"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-white/5 focus:border-gold/30 outline-none py-4 pl-14 pr-5 text-sm font-light transition-all italic" 
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
              className="text-red-500 text-[10px] uppercase tracking-widest font-bold text-center"
            >
              {error}
            </motion.p>
          )}

          <button type="submit" className="w-full luxury-button group">
            Authenticate Access <ArrowRight size={14} className="ml-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[8px] uppercase tracking-[0.5em] text-text-muted leading-relaxed">
            Unauthorized access attempts are logged <br /> and reported to the main terminal.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
