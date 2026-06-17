'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, ArrowRight } from 'lucide-react';

export function CreativeContact() {
  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'ashutoshtiwari110504@gmail.com',
      link: 'mailto:ashutoshtiwari110504@gmail.com',
      color: 'text-primary',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      value: '+91 9096452696',
      link: 'https://wa.me/919096452696',
      color: 'text-secondary',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Mumbai, Maharashtra',
      link: '#',
      color: 'text-accent',
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">Contact</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tight">Let&apos;s Build <span className="text-muted-foreground">Something Great</span></h3>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl hover:border-primary/30 transition-all"
              >
                <div className={`p-4 rounded-2xl bg-background border border-border/50 ${info.color} group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">{info.label}</p>
                  <p className="text-foreground font-bold truncate group-hover:text-primary transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact CTA Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 p-10 md:p-16 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl border border-primary/20 rounded-[3rem] relative overflow-hidden group"
          >
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h4 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  Interested in <br/> <span className="text-primary">working together?</span>
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  I&apos;m currently open to new opportunities. Let&apos;s discuss your vision and how I can help you achieve it.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="mailto:ashutoshtiwari110504@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 group/btn"
                >
                  <Send size={20} />
                  Send a Message
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.a>
                
                <motion.a
                  href="https://wa.me/919096452696"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-background/50 backdrop-blur-md border border-border rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-primary/50 transition-colors"
                >
                  <MessageCircle size={20} className="text-primary" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}