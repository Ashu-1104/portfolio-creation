'use client';

import { DeveloperHeader } from '@/components/developer-header';
import { DeveloperHero } from '@/components/developer-hero';
import { DeveloperExperience } from '@/components/developer-experience';
import { DeveloperProjects } from '@/components/developer-projects';
import { DeveloperSkills } from '@/components/developer-skills';
import { DeveloperContact } from '@/components/developer-contact';
import { DeveloperFooter } from '@/components/developer-footer';
import { CursorGlow } from '@/components/cursor-glow';

export default function Home() {
  return (
    <main className="bg-[#09090b] selection:bg-emerald-500/30 selection:text-emerald-500">
      <CursorGlow />
      <DeveloperHeader />
      <DeveloperHero />
      <DeveloperExperience />
      <DeveloperProjects />
      <DeveloperSkills />
      <DeveloperContact />
      <DeveloperFooter />
    </main>
  );
}
