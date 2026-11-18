'use client';

import { useEffect, useState } from 'react';
import { DeveloperHeader } from '@/components/developer-header';
import { DeveloperHero } from '@/components/developer-hero';
import { DeveloperExperience } from '@/components/developer-experience';
import { DeveloperProjects } from '@/components/developer-projects';
import { DeveloperSkills } from '@/components/developer-skills';
import { DeveloperContact } from '@/components/developer-contact';
import { DeveloperFooter } from '@/components/developer-footer';
import { CursorGlow } from '@/components/cursor-glow';
import { SmoothScroll } from '@/components/smooth-scroll';
import { IntroLoader } from '@/components/intro-loader';
import { DeveloperStats } from '@/components/developer-stats';
import { DeveloperTerminal } from '@/components/developer-terminal';
import { DeveloperAbout } from '@/components/developer-about';
import { DeveloperServices } from '@/components/developer-services';
import { ResumeBook } from '@/components/resume-book';
import { TimeMachine } from '@/components/time-machine';
import { CursorRing, Section3D, SpotlightTracker } from '@/components/interactions';
import { CommandPalette } from '@/components/command-palette';
import { BusinessCard } from '@/components/business-card';
import { RecruiterView } from '@/components/recruiter-view';
import { SectionDots } from '@/components/section-dots';
import { LoadProgress } from '@/components/load-progress';
import { ChessGame } from '@/components/chess-game';
import { MatrixMode } from '@/components/matrix-mode';
import { SoundEffects } from '@/components/sound-effects';
import dynamic from 'next/dynamic';

const SpaceWarp = dynamic(() => import('@/components/three/space-warp'), { ssr: false });

// the background starts once the page is idle, so it never delays the first paint
function DeferredWarp() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    else setTimeout(() => setReady(true), 800);
  }, []);
  return ready ? <SpaceWarp /> : null;
}

export default function Home() {
  return (
    <main className="overflow-x-clip selection:bg-emerald-500/30 selection:text-emerald-500">
      <DeferredWarp />
      <IntroLoader />
      <SmoothScroll />
      <CursorGlow />
      <CursorRing />
      <SpotlightTracker />
      <SoundEffects />
      <CommandPalette />
      <BusinessCard />
      <RecruiterView />
      <SectionDots />
      <LoadProgress />
      <ChessGame />
      <MatrixMode />
      <DeveloperHeader />
      <DeveloperHero />
      <DeveloperStats />
      <Section3D><DeveloperAbout /></Section3D>
      <Section3D><DeveloperServices /></Section3D>
      <Section3D><DeveloperExperience /></Section3D>
      <TimeMachine />
      <Section3D><DeveloperProjects /></Section3D>
      <Section3D><DeveloperSkills /></Section3D>
      <Section3D><DeveloperTerminal /></Section3D>
      <Section3D><ResumeBook /></Section3D>
      <Section3D><DeveloperContact /></Section3D>
      <DeveloperFooter />
    </main>
  );
}
