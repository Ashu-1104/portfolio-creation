'use client';

import { ProHeader } from '@/components/pro-header';
import { ProHero } from '@/components/pro-hero';
import { ProAbout } from '@/components/pro-about';
import { ProExperience } from '@/components/pro-experience';
import { ProProjects } from '@/components/pro-projects';
import { ProSkills } from '@/components/pro-skills';
import { ProContact } from '@/components/pro-contact';
import { ProFooter } from '@/components/pro-footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ProHeader />
      <ProHero />
      <ProAbout />
      <ProExperience />
      <ProProjects />
      <ProSkills />
      <ProContact />
      <ProFooter />
    </main>
  );
}
