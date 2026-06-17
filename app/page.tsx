'use client';

import { AnimatedBackground } from '@/components/animated-background';
import { NeonHeader } from '@/components/neon-header';
import { NeonHero } from '@/components/neon-hero';
import { NeonAbout } from '@/components/neon-about';
import { NeonProjects } from '@/components/neon-projects';
import { NeonSkills } from '@/components/neon-skills';
import { NeonContact } from '@/components/neon-contact';
import { NeonFooter } from '@/components/neon-footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AnimatedBackground />

      {/* Content Overlay */}
      <div className="relative z-10">
        <NeonHeader />
        <NeonHero />
        <NeonAbout />
        <NeonProjects />
        <NeonSkills />
        <NeonContact />
        <NeonFooter />
      </div>
    </main>
  );
}
