'use client';

// The tech stack as labels on a slowly spinning sphere. Drag to spin it
// (on desktop); labels on the far side fade back.
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { useInView, useIsTouch, usePrefersReducedMotion, useActive3D } from './hooks';
import { useIsLight } from '../theme-toggle';

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Redux',
  'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'MySQL', 'PHP', 'Perl', 'Python',
  'Linux', 'Docker', 'Nginx', 'Git', 'Vercel', 'Three.js', 'Server-Sent Events',
  'REST APIs', 'Security', 'C++',
];

const RADIUS = 2.3;

function Labels({ light }: { light: boolean }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  // evenly spread points on a sphere (Fibonacci lattice)
  const spots = useMemo(
    () =>
      SKILLS.map((_, i) => {
        const y = 1 - (i / (SKILLS.length - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = Math.PI * (3 - Math.sqrt(5)) * i;
        return new THREE.Vector3(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS);
      }),
    []
  );
  const world = useMemo(() => new THREE.Vector3(), []);
  const group = useRef<THREE.Group>(null);

  // fade and shrink the labels that are on the far side
  const camDir = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    camDir.copy(camera.position).normalize();
    spots.forEach((spot, i) => {
      const el = refs.current[i];
      if (!el || !group.current) return;
      world.copy(spot).applyMatrix4(group.current.matrixWorld);
      const facing = world.normalize().dot(camDir);
      const minOpacity = light ? 0.5 : 0.25;
      el.style.opacity = String(minOpacity + (1 - minOpacity) * ((facing + 1) / 2));
      el.style.transform = `scale(${0.8 + 0.25 * ((facing + 1) / 2)})`;
    });
  });

  return (
    <group ref={group}>
      {spots.map((spot, i) => (
        <Html key={SKILLS[i]} position={spot} center zIndexRange={[10, 0]}>
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`block whitespace-nowrap px-3 py-1 rounded-full font-mono text-[11px] select-none transition-colors ${
              light
                ? 'border border-emerald-700/40 bg-white text-emerald-800 shadow-sm'
                : 'border border-emerald-500/30 bg-zinc-950/80 text-emerald-300'
            }`}
          >
            {SKILLS[i]}
          </span>
        </Html>
      ))}
    </group>
  );
}

function Globe({ light }: { light: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[RADIUS * 0.93, 2]} />
      <meshBasicMaterial color={light ? '#047857' : '#10b981'} wireframe transparent opacity={light ? 0.28 : 0.08} />
    </mesh>
  );
}

function AutoSpin({ on, children }: { on: boolean; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (on && g.current) g.current.rotation.y += Math.min(delta, 0.05) * 0.35; });
  return <group ref={g}>{children}</group>;
}

export default function TechSphere() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  // only keep a WebGL context while near the screen (unloaded when far away)
  const active = useActive3D(box);
  const touch = useIsTouch();
  const reduceMotion = usePrefersReducedMotion();
  const light = useIsLight();
  return (
    <div ref={box} className="relative w-full h-full" aria-label="Technologies I work with" role="img">
      {active && (
      <Canvas frameloop={inView ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 7.4], fov: 45 }}>
        {touch ? (
          // touch screens: no drag controls (they would block page scrolling); the globe spins by itself
          <AutoSpin on={!reduceMotion}>
            <Globe light={light} />
            <Labels light={light} />
          </AutoSpin>
        ) : (
          <>
            <Globe light={light} />
            <Labels light={light} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduceMotion} autoRotateSpeed={1.1} rotateSpeed={0.6} />
          </>
        )}
      </Canvas>
      )}
    </div>
  );
}
