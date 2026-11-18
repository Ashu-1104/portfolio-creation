'use client';

// Hero background: a field of points shaped like a gently rolling surface,
// tilted away into the distance. It ripples outward from wherever the mouse is.
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useInView, usePrefersReducedMotion, useWindowPointer, useActive3D } from './hooks';
import { useIsLight } from '../theme-toggle';

const COLS = 90;
const ROWS = 42;
const SPACING = 0.32;

function Field({ reduceMotion }: { reduceMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const pointer = useWindowPointer();
  const mouse = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector2());

  const { positions, base } = useMemo(() => {
    const base = new Float32Array(COLS * ROWS * 2);
    const positions = new Float32Array(COLS * ROWS * 3);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * SPACING;
        const z = (r - ROWS / 2) * SPACING;
        base[i * 2] = x;
        base[i * 2 + 1] = z;
        positions[i * 3] = x;
        positions[i * 3 + 2] = z;
        i++;
      }
    }
    return { positions, base };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = reduceMotion ? 0 : clock.elapsedTime;
    // mouse in field coordinates (roughly where the pointer is on screen)
    target.current.set(pointer.current.x * 12, -pointer.current.y * 5 + 2);
    mouse.current.lerp(target.current, 0.08);
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COLS * ROWS; i++) {
      const x = base[i * 2];
      const z = base[i * 2 + 1];
      const dx = x - mouse.current.x;
      const dz = z - mouse.current.y;
      const d = Math.sqrt(dx * dx + dz * dz);
      const ripple = reduceMotion ? 0 : Math.sin(d * 1.6 - t * 3) * 0.28 * Math.exp(-d * 0.22);
      pos[i * 3 + 1] = Math.sin(x * 0.45 + t * 0.6) * 0.22 + Math.cos(z * 0.5 + t * 0.4) * 0.22 + ripple;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} rotation={[-1.05, 0, 0]} position={[0, -1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#10b981" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroField() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, '0px');
  // only keep a WebGL context while near the screen (unloaded when far away)
  const active = useActive3D(box);
  const reduceMotion = usePrefersReducedMotion();
  const light = useIsLight();
  return (
    <div ref={box} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {active && (
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.2, 9], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
      >
        <fog attach="fog" args={[light ? '#f5f7fa' : '#09090b', 6, 18]} />
        <Field reduceMotion={reduceMotion} />
      </Canvas>
      )}
      {/* fade the field out behind the text and at the bottom edge */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,color-mix(in_srgb,var(--page)_85%,transparent),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--page)] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[var(--page)] to-transparent" />
    </div>
  );
}
