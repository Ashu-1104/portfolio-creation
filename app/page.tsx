'use client';

import { CreativeHeader } from '@/components/creative-header';
import { CreativeHero } from '@/components/creative-hero';
import { CreativeExperience } from '@/components/creative-experience';
import { CreativeProjects } from '@/components/creative-projects';
import { CreativeSkills } from '@/components/creative-skills';
import { CreativeContact } from '@/components/creative-contact';
import { CreativeFooter } from '@/components/creative-footer';

export default function Home() {
  return (
    <main className="bg-background">
      <CreativeHeader />
      <CreativeHero />
      <CreativeExperience />
      <CreativeProjects />
      <CreativeSkills />
      <CreativeContact />
      <CreativeFooter />
    </main>
  );
}
