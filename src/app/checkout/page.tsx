"use client";

import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { sendOrderEmail } from '../actions/order';
import { createOrder } from '../actions/order-db';

export default function Checkout() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Delivery costs: 35 MAD fixed, Free for 2+ articles
  const deliveryFee = totalItems >= 2 ? 0 : 35;
  const grandTotal = totalPrice + deliveryFee;

  const handleOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Veuillez remplir toutes les informations de livraison.');
      return;
    }

    setIsOrdering(true);
    
    try {
      // 1. Save to MySQL (Centralized Database)
      await createOrder({
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        items: cart,
        total_amount: grandTotal
      });

      // 2. Send Email via Resend
      await sendOrderEmail(customerInfo, cart, grandTotal);

      // 3. Success State
      setIsSuccess(true);
      // Optional: You might want to clear the cart here if your CartContext supports it
    } catch (error) {
      console.error('Order Error:', error);
      alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
    } finally {
      setIsOrdering(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-bg-main text-text-main">
        <Header />
        <div className="container py-40 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto space-y-8 bg-surface p-16 rounded-[3rem] border border-border shadow-2xl"
          >
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={48} className="text-green-500" />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Commande <span className="red-gradient-text italic">Confirmée</span></h1>
            <p className="text-text-muted font-medium leading-relaxed text-lg">
              Merci {customerInfo.name} ! Votre commande a été enregistrée avec succès. <br />
              Notre équipe vous contactera sous peu pour confirmer la livraison.
            </p>
            <div className="pt-8">
              <Link href="/catalog" className="luxury-button px-12">
                Continuer mes achats
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-bg-main text-text-main">
        <Header />
        <div className="container py-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto space-y-8"
          >
            <div className="w-24 h-24 bg-surface-hover rounded-full flex items-center justify-center mx-auto">
              <Trash2 size={40} className="text-text-muted opacity-50" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Votre Panier est Vide</h1>
            <p className="text-text-muted font-medium leading-relaxed">
              Il semble que vous n'ayez pas encore ajouté de produits à votre collection.
            </p>
            <Link href="/catalog" className="luxury-button w-full">
              Découvrir le Catalogue
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Header />

      <div className="container pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Order Details */}
          <div className="flex-1 space-y-12">
            <div className="border-b border-border pb-8">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Finaliser <span className="red-gradient-text italic">Commande</span></h1>
              <p className="text-luxury-red font-black uppercase tracking-widest text-[10px] mt-2">Vous avez {totalItems} articles dans votre panier</p>
            </div>

            <div className="space-y-6">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-surface rounded-3xl border border-border group transition-all hover:shadow-xl"
                >
                  <div className="relative w-24 h-24 bg-white rounded-2xl overflow-hidden p-2 shadow-sm shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-[10px] text-luxury-red font-black uppercase tracking-widest mb-1">{item.brand}</p>
                    <h3 className="font-black uppercase tracking-tight text-sm leading-tight mb-2 text-text-main">{item.name}</h3>
                    <p className="text-lg font-black text-text-main">{item.price} MAD</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-border rounded-xl bg-surface-hover p-1">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-2 hover:text-luxury-red transition-colors text-text-main"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-black text-text-main">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-luxury-red transition-colors text-text-main"><Plus size={14} /></button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-muted hover:text-luxury-red transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Delivery Info Form Placeholder */}
            <div className="p-10 bg-surface rounded-[2.5rem] border border-border space-y-8">
               <h2 className="text-2xl font-black uppercase tracking-tighter">Informations de <span className="red-gradient-text italic">Livraison</span></h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-muted ml-4">Nom Complet</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Ahmed El Amrani" 
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full bg-bg-main border border-border rounded-2xl py-4 px-6 focus:border-luxury-red outline-none font-bold text-text-main placeholder:text-text-muted/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-muted ml-4">Téléphone</label>
                    <input 
                      type="tel" 
                      placeholder="+212 6..." 
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full bg-bg-main border border-border rounded-2xl py-4 px-6 focus:border-luxury-red outline-none font-bold text-text-main placeholder:text-text-muted/50" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-text-muted ml-4">Adresse de Livraison</label>
                    <textarea 
                      placeholder="Votre adresse exacte à Casablanca, Marrakech, etc." 
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full bg-bg-main border border-border rounded-2xl py-4 px-6 focus:border-luxury-red outline-none font-bold text-text-main placeholder:text-text-muted/50 min-h-[120px]" 
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:w-[400px]">
            <div className="sticky top-32 p-10 bg-surface text-text-main rounded-[2.5rem] shadow-2xl space-y-10 relative overflow-hidden border border-border">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-luxury-red/10 to-transparent opacity-50" />
              
              <h2 className="text-2xl font-black uppercase tracking-tighter relative z-10">Résumé de la <span className="red-gradient-text italic">Commande</span></h2>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center text-text-muted text-sm font-bold">
                  <span className="uppercase tracking-widest">Sous-total</span>
                  <span>{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between items-center text-text-muted text-sm font-bold">
                  <span className="uppercase tracking-widest">Livraison</span>
                  <span>{deliveryFee === 0 ? 'GRATUIT' : `${deliveryFee} MAD`}</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-lg font-black uppercase tracking-tighter">Total</span>
                  <span className="text-3xl font-black text-text-main tracking-tighter">{grandTotal} MAD</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 relative z-10">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-text-muted">
                  <ShieldCheck size={16} className="text-luxury-red" />
                  Produits 100% Authentiques
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-text-muted">
                  <Truck size={16} className="text-luxury-red" />
                  Livraison 24h/72h au Maroc
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-text-muted">
                  <CreditCard size={16} className="text-luxury-red" />
                  Paiement à la Livraison
                </div>
              </div>

              <button 
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full luxury-button py-6 relative z-10 scale-105 shadow-xl shadow-red-900/20"
              >
                {isOrdering ? 'Traitement...' : 'Confirmer la Commande'}
              </button>
              
              <p className="text-[8px] text-center text-text-muted uppercase tracking-widest font-black relative z-10">
                En cliquant sur confirmer, votre commande sera enregistrée et envoyée à notre équipe logistique pour traitement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
