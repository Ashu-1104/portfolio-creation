'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

export function CreativeContact() {
  return (
    <section id="contact" className="py-32 px-6 bg-background relative overflow-hidden dot-grid">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.5em] text-primary font-bold">Contact</h2>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                ESTABLISH <br/>
                <span className="text-outline">CONNECTION.</span>
              </h3>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary shadow-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol: Email</p>
                  <p className="text-xl font-bold">ashutoshtiwari110504@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-secondary shadow-xl">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol: Direct</p>
                  <p className="text-xl font-bold">+91 9096452696</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">System online — Available for new projects</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-12 md:p-16 bg-zinc-900/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] space-y-10 relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">secure_uplink.sh</span>
                </div>
                <h4 className="text-4xl font-black tracking-tight leading-tight">
                  READY TO <br/> <span className="text-primary">INITIALIZE?</span>
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Send an encrypted packet or connect via the secure channel for high-priority engineering inquiries.
                </p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:ashutoshtiwari110504@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-3 transition-transform group/btn"
                >
                  SEND ENCRYPTED MESSAGE
                  <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                </motion.a>
                
                <motion.a
                  href="https://wa.me/919096452696"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 border border-white/10 hover:border-primary/50 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all"
                >
                  <MessageCircle size={20} className="text-primary" />
                  WHATSAPP UPLINK
                </motion.a>
              </div>

              {/* Decorative bit-pattern */}
              <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/5 select-none pointer-events-none whitespace-pre">
                10101010101010101010 <br/>
                01010101010101010101 <br/>
                11001100110011001100 <br/>
                00110011001100110011
              </div>
            </div>
            
            {/* Glowing orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10 group-hover:bg-primary/40 transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
