"use client";

import { useParams } from 'next/navigation';
import { useProducts, Product } from '@/data/products';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ShoppingCart, Heart, Shield, Truck, RotateCcw, Plus, Minus, Star, Award, CheckCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const { products, loading } = useProducts();
  const params = useParams();
  const slug = params.slug as string;
  const product = useMemo(() => products.find(p => p.slug === slug), [products, slug]);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-luxury-red border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // Reset active image when product changes (navigation)
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Produit Non Trouvé</h1>
        <Link href="/catalog" className="text-luxury-red font-black uppercase tracking-widest border-b-2 border-luxury-red pb-1">Retour aux Collections</Link>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const reviews = [
    { name: "Othman B.", rating: 5, comment: "Pureté absolue. Le taux d'absorption est nettement plus élevé que tout ce qui existe sur le marché.", date: "15 Mars 2026" },
    { name: "Yasmine K.", rating: 5, comment: "Le Gold Standard pour une raison. La livraison de Monaliza était express et le service client était très utile.", date: "28 Février 2026" },
    { name: "Mehdi A.", rating: 4, comment: "Qualité exceptionnelle, on en a pour son argent. La qualité de l'isolat est inégalée.", date: "10 Février 2026" }
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      
      <div className="container pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex items-center justify-center p-12"
                >
                  <Image 
                    src={activeImage || product.image} 
                    alt={product.name} 
                    fill
                    unoptimized
                    className={`object-contain p-12 drop-shadow-2xl ${product.isRupture ? 'grayscale' : ''}`}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-8 left-8">
                <span className="bg-luxury-red text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest flex items-center gap-2 rounded-full shadow-lg">
                  <CheckCircle size={12} /> Produit Certifié
                </span>
              </div>
            </motion.div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square relative rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-luxury-red' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <Image src={img} alt={`${product.name} ${i}`} fill unoptimized className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <p className="text-luxury-red uppercase tracking-[0.3em] text-[10px] font-black bg-red-50 px-3 py-1 rounded-full">{product.brand}</p>
                <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                <div className="flex items-center gap-1">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={12} className={i < 4 ? "fill-luxury-red text-luxury-red" : "text-gray-200"} />
                   ))}
                   <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black ml-2">4.9 (124 Avis)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">{product.name}</h1>
              <p className="text-3xl font-black text-black tracking-tighter mb-8">{product.price} <span className="text-sm text-luxury-red">MAD</span></p>
              <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Product Tabs */}
            <div className="mb-12">
              <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'usage', label: 'Utilisation' },
                  { id: 'lab-reports', label: 'Qualité' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 text-[10px] uppercase tracking-widest font-black transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-luxury-red' : 'text-gray-400 hover:text-black'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-luxury-red rounded-full" />}
                  </button>
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-gray-600 font-medium leading-relaxed min-h-[120px]"
                >
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <p>Conçu pour ceux qui exigent l'excellence absolue. Cette formule subit un processus de microfiltration à plusieurs étapes pour garantir une pureté maximale et une biodisponibilité rapide.</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-luxury-red rounded-full shadow-sm" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'usage' && (
                    <p>Pour des résultats optimaux, consommez 1 portion immédiatement après votre rituel (entraînement). Mélangez avec 250 ml d'eau fraîche. Peut également être utilisé comme complément de repas pendant les périodes de protocoles intensifs.</p>
                  )}
                  {activeTab === 'lab-reports' && (
                    <div className="flex items-center gap-4 p-6 border border-red-100 bg-red-50/30 rounded-2xl">
                       <Award className="text-luxury-red" size={32} />
                       <div>
                          <p className="text-xs font-black text-black uppercase tracking-widest">Certificat d'Analyse #MZ-2026</p>
                          <p className="text-[10px] uppercase tracking-widest text-luxury-red font-black">Testé trois fois pour plus de 200 substances interdites</p>
                       </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mb-12 flex flex-col sm:row gap-6">
              <div className="flex items-center border border-gray-100 rounded-2xl px-4 py-4 bg-gray-50 shadow-inner">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-luxury-red transition-colors"><Minus size={18} /></button>
                <span className="w-12 text-center text-lg font-black">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-luxury-red transition-colors"><Plus size={18} /></button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-luxury-red text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-red-100"
              >
                Ajouter au Panier
              </button>
              <button className="p-5 border border-gray-100 rounded-2xl hover:border-luxury-red hover:text-luxury-red transition-colors bg-white shadow-sm">
                <Heart size={24} />
              </button>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 py-8 border-y border-gray-100">
              {product.specs.map((spec, i) => (
                <div key={i}>
                  <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-2 font-black">{spec.label}</p>
                  <p className="text-xs font-black uppercase tracking-tight text-black">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Shield size={24} className="text-luxury-red" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black">
                  <p className="text-black mb-1">Authentique</p>
                  <p className="text-gray-400">Certifié ONSSA</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Truck size={24} className="text-luxury-red" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black">
                  <p className="text-black mb-1">Express</p>
                  <p className="text-gray-400">Livraison Maroc</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <RotateCcw size={24} className="text-luxury-red" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-black">
                  <p className="text-black mb-1">Concierge</p>
                  <p className="text-gray-400">Support 24/7</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
            <div className="max-w-xl text-center md:text-left">
               <span className="text-luxury-red uppercase tracking-widest text-[10px] font-black mb-6 block">Témoignages Clients</span>
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Le Verdict <span className="red-gradient-text italic">Monaliza</span></h2>
               <p className="text-gray-600 font-medium leading-relaxed">Découvrez les retours de notre communauté d'élite qui a intégré le Standard Monaliza dans son quotidien.</p>
            </div>
            <div className="flex flex-col items-center p-10 bg-white border border-gray-100 rounded-3xl shadow-xl">
               <span className="text-6xl font-black text-black tracking-tighter mb-2">4.9</span>
               <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-luxury-red text-luxury-red" />)}
               </div>
               <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black">124 Avis Certifiés</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {reviews.map((review, i) => (
               <div key={i} className="p-10 bg-white border border-gray-100 rounded-3xl hover:border-luxury-red/30 transition-all shadow-sm hover:shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-black uppercase tracking-widest text-black">{review.name}</span>
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-black">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="fill-luxury-red text-luxury-red" />)}
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{review.comment}"</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-20 bg-white">
        <div className="container text-center">
          <span className="text-luxury-red uppercase tracking-widest text-[10px] font-black mb-6 block">Vous aimerez aussi</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Produits <span className="red-gradient-text italic">Complémentaires</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((p) => (
              <Link href={`/product/${p.slug}`} key={p.id} className="group flex flex-col items-center">
                <div className="aspect-square w-full bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-6 group-hover:border-luxury-red transition-all overflow-hidden relative shadow-sm hover:shadow-xl">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill
                    unoptimized
                    className={`object-contain transition-all duration-700 p-8 group-hover:scale-110 ${p.isRupture ? 'grayscale' : ''}`}
                  />
                </div>
                <p className="text-xs uppercase tracking-widest font-black text-black group-hover:text-luxury-red transition-colors text-center px-4 leading-tight mb-2">{p.name}</p>
                <p className="text-[10px] text-luxury-red font-black tracking-widest">{p.price} MAD</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <div className="h-24 md:hidden" />
    </main>
  );
}
