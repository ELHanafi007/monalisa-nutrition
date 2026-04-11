import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Compass } from 'lucide-react';
import { useRef } from 'react';

export const LocationSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const mapY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="py-20 bg-black relative overflow-hidden">
      {/* Decorative Background Elements with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" 
      />
      <motion.div 
        style={{ y: bgY }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" 
      />

      <div className="container relative z-10 px-4 md:px-8">
        <div className="mb-16">
          <span className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-gold/50" />
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">Visit our Sanctuary</span>
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">Monaliza<span className="italic gold-gradient-text text-gold">House</span>.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          {/* Info Card - The "Gold Luxury Plate" side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.7, 0, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="glass-card p-8 md:p-12 h-full border-gold/20 flex flex-col justify-between relative group overflow-hidden bg-white/[0.02] backdrop-blur-sm">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30" />
              
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gold">
                    <MapPin size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Notre Boutique</span>
                  </div>
                  <p className="text-xl font-serif text-white leading-relaxed">
                    MonalizaHouse,<br />
                    Fès 30000,<br />
                    Morocco
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gold">
                    <Clock size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Horaires d'Ouverture</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-text-muted text-xs uppercase tracking-widest">Lundi - Samedi</span>
                      <span className="text-white text-sm">10:00 — 22:00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-text-muted text-xs uppercase tracking-widest">Dimanche</span>
                      <span className="text-white text-sm">11:00 — 20:00</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gold">
                    <Compass size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Contact Rapide</span>
                  </div>
                  <div className="space-y-4">
                    <a href="tel:+212662599179" className="flex items-center gap-4 text-text-muted hover:text-white transition-colors group/link">
                      <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center group-hover/link:border-gold transition-colors">
                        <Phone size={14} className="group-hover/link:text-gold transition-colors" />
                      </div>
                      <span className="text-sm font-medium tracking-wider">+212 662 599179</span>
                    </a>
                    <a href="mailto:monalizahouse598@gmail.com" className="flex items-center gap-4 text-text-muted hover:text-white transition-colors group/link">
                      <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center group-hover/link:border-gold transition-colors">
                        <Mail size={14} className="group-hover/link:text-gold transition-colors" />
                      </div>
                      <span className="text-sm font-medium tracking-wider text-wrap break-all">monalizahouse598@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gold/10 relative z-10">
                <a 
                  href="https://maps.app.goo.gl/f9G2QVpDVVXDqVPPA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full luxury-button-outline text-[10px] py-4 flex items-center justify-center tracking-[0.2em]"
                >
                  Ouvrir dans Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map Section - The "Gold Plate" container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.7, 0, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative h-[400px] lg:h-full min-h-[400px] w-full overflow-hidden border border-white/10 grayscale-[0.8] contrast-[1.2] brightness-[0.8] hover:grayscale-0 hover:brightness-100 transition-all duration-1000 shadow-2xl">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.2744555661125!2d-4.984183499999999!3d34.011165399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f9bd08980b6a1%3A0x98e5ef89cacdfce!2sMonalizaHouse!5e0!3m2!1sar!2s!4v1775603177608!5m2!1sar!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-black/80 backdrop-blur-md border border-gold/30 p-4 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center text-gold">
                    <Compass className="animate-pulse" size={16} />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.4em] font-black text-gold">Fès Boutique</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
