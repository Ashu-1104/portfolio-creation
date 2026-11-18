'use client';

// Contact section backdrop: a few wireframe shapes drifting in 3D. They turn with
// the scroll position and lean toward the mouse.
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

import { useInView, usePrefersReducedMotion, useWindowPointer, useActive3D } from './hooks';
import { useIsLight } from '../theme-toggle';

const SHAPES: { pos: [number, number, number]; kind: 'ico' | 'torus' | 'octa' | 'knot'; size: number }[] = [
  { pos: [-4.9, 2.6, -1], kind: 'ico', size: 0.8 },
  { pos: [5.0, 1.0, -1], kind: 'torus', size: 0.6 },
  { pos: [-5.0, -2.4, -1], kind: 'octa', size: 0.6 },
  { pos: [4.9, -3.0, -1], kind: 'knot', size: 0.45 },
];

function Shapes({ light, reduce }: { light: boolean; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useWindowPointer();
  useFrame(() => {
    const g = group.current;
    if (!g || reduce) return;
    // the group only leans a little toward the mouse (shapes stay at the edges);
    // each shape spins with the scroll position
    g.rotation.y += (pointer.current.x * 0.12 - g.rotation.y) * 0.05;
    g.rotation.x += (-pointer.current.y * 0.08 - g.rotation.x) * 0.05;
    const scroll = window.scrollY / 600;
    meshes.current.forEach((m, i) => { if (m) m.rotation.set(scroll * (i % 2 ? 1 : -1), scroll * 0.7, 0); });
  });
  const color = light ? '#047857' : '#10b981';
  return (
    <group ref={group}>
      {SHAPES.map((s, i) => (
        <Float key={i} speed={reduce ? 0 : 1.4} rotationIntensity={reduce ? 0 : 1.2} floatIntensity={reduce ? 0 : 1.5}>
          <mesh position={s.pos} ref={(m) => { meshes.current[i] = m; }}>
            {s.kind === 'ico' && <icosahedronGeometry args={[s.size, 0]} />}
            {s.kind === 'torus' && <torusGeometry args={[s.size, s.size * 0.32, 12, 32]} />}
            {s.kind === 'octa' && <octahedronGeometry args={[s.size, 0]} />}
            {s.kind === 'knot' && <torusKnotGeometry args={[s.size, s.size * 0.28, 80, 10]} />}
            <meshBasicMaterial color={color} wireframe transparent opacity={light ? 0.35 : 0.28} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function FloatingShapes() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  // only keep a WebGL context while near the screen (unloaded when far away)
  const active = useActive3D(box);
  const reduce = usePrefersReducedMotion();
  const light = useIsLight();
  return (
    <div ref={box} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {active && (
      <Canvas frameloop={inView ? 'always' : 'never'} dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 50 }} gl={{ alpha: true, antialias: true }}>
        <Shapes light={light} reduce={reduce} />
      </Canvas>
      )}
    </div>
  );
}
