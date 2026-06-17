'use client';

import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export function CreativeContact() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ashutoshtiwari110504@gmail.com',
      link: 'mailto:ashutoshtiwari110504@gmail.com',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+91 9096452696',
      link: 'https://wa.me/919096452696',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mumbai, MH',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Let&apos;s Work Together
          </span>
        </h2>
        <p className="text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
          Have a project in mind? I&apos;d love to hear about it. Get in touch with me to discuss how I can help bring your ideas to life.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-6 bg-card border border-border rounded-xl hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">{info.label}</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center pt-8">
          <h3 className="text-2xl font-bold mb-4">Ready to collaborate?</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Pick your preferred way to connect and let&apos;s discuss how I can help with your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919096452696"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Message on WhatsApp
            </a>
            <a
              href="mailto:ashutoshtiwari110504@gmail.com"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
