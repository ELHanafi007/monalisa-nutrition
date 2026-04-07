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
    <section ref={containerRef} className="section-padding bg-black relative overflow-hidden">
      {/* Decorative Background Elements with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" 
      />
      <motion.div 
        style={{ y: bgY }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" 
      />

      <div className="container relative z-10">
...
          {/* Map Section - The "Gold Plate" container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{ y: mapY }}
            transition={{ duration: 1, delay: 0.4, ease: [0.7, 0, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative group"
          >
          <span className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gold/50" />
            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-bold">Visit the Sanctuary</span>
            <div className="w-8 h-[1px] bg-gold/50" />
          </span>
          <h2 className="text-6xl md:text-8xl font-serif leading-tight">Monaliza<span className="italic gold-gradient-text">House</span>.</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Info Card - The "Gold Luxury Plate" side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.7, 0, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div className="glass-card p-10 h-full border-gold/20 flex flex-col justify-between relative group overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30" />
              
              <div className="space-y-12 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gold">
                    <MapPin size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Location</span>
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
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Hours of Operation</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-text-muted text-xs uppercase tracking-widest">Mon - Fri</span>
                      <span className="text-white text-sm">09:00 — 21:00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-text-muted text-xs uppercase tracking-widest">Saturday</span>
                      <span className="text-white text-sm">10:00 — 20:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-muted text-xs uppercase tracking-widest">Sunday</span>
                      <span className="text-gold text-[10px] uppercase tracking-widest font-bold">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gold">
                    <Compass size={18} />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Contact</span>
                  </div>
                  <div className="space-y-3">
                    <a href="tel:+212662802351" className="flex items-center gap-3 text-text-muted hover:text-white transition-colors group/link">
                      <Phone size={14} className="group-hover/link:text-gold transition-colors" />
                      <span className="text-sm">+212 662 802351</span>
                    </a>
                    <a href="mailto:monalizahouse598@gmail.com" className="flex items-center gap-3 text-text-muted hover:text-white transition-colors group/link">
                      <Mail size={14} className="group-hover/link:text-gold transition-colors" />
                      <span className="text-sm">monalizahouse598@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gold/10 relative z-10">
                <a 
                  href="https://maps.app.goo.gl/f9G2QVpDVVXDqVPPA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full luxury-button-outline text-[10px] py-4 flex items-center justify-center"
                >
                  Get Directions
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
            className="lg:col-span-8 relative group"
          >
            {/* The Luxury Frame */}
            <div className="absolute inset-0 border border-gold/20 translate-x-4 translate-y-4 pointer-events-none transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6" />
            
            <div className="relative h-full min-h-[500px] w-full overflow-hidden border border-white/10 grayscale-[0.8] contrast-[1.2] brightness-[0.8] hover:grayscale-0 hover:brightness-100 transition-all duration-1000">
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
              
              {/* Gold Overlay for styling */}
              <div className="absolute inset-0 pointer-events-none bg-gold/5 mix-blend-color" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 z-20">
                <div className="bg-black/80 backdrop-blur-md border border-gold/30 p-6 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold">
                    <Compass className="animate-pulse" size={20} />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.4em] font-black text-gold">Flagship House</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
