'use client';

// A small 3D desk: laptop typing out code about me, a coffee mug with steam,
// a plant and a desk lamp. The scene turns gently toward the mouse.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

import { useInView, usePrefersReducedMotion, useWindowPointer, useActive3D } from './hooks';
import { useIsLight } from '../theme-toggle';

const CODE = [
  ['const ', 'k'], ['ashutosh', 'v'], [' = {', 'p'], ['\n', ''],
  ['  role', 'v'], [': ', 'p'], ["'Full-Stack Developer'", 's'], [',\n', 'p'],
  ['  stack', 'v'], [': [', 'p'], ["'React'", 's'], [', ', 'p'], ["'Next.js'", 's'], [', ', 'p'], ["'Node.js'", 's'], ['],\n', 'p'],
  ['  building', 'v'], [': ', 'p'], ["'SecLayer firewall'", 's'], [',\n', 'p'],
  ['  location', 'v'], [': ', 'p'], ["'Mumbai, India'", 's'], [',\n', 'p'],
  ['};', 'p'], ['\n\n', ''],
  ['ship', 'f'], ['(ashutosh.', 'p'], ['ideas', 'v'], [');', 'p'],
] as const;
const COLORS: Record<string, string> = { k: '#c084fc', v: '#7dd3fc', s: '#6ee7b7', p: '#e4e4e7', f: '#fcd34d', '': '#e4e4e7' };
const TOTAL = CODE.reduce((n, [t]) => n + t.length, 0);

// draws the code typed so far onto the laptop screen texture
function useCodeScreen(reduce: boolean) {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 320;
    return c;
  }, []);
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [canvas]);
  const typed = useRef(reduce ? TOTAL : 0);
  const draw = (count: number, blink: boolean) => {
    const g = canvas.getContext('2d')!;
    g.fillStyle = '#0b1120';
    g.fillRect(0, 0, 512, 320);
    g.fillStyle = '#111827';
    g.fillRect(0, 0, 512, 26);
    ['#ef4444', '#eab308', '#22c55e'].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.arc(16 + i * 16, 13, 5, 0, 7); g.fill(); });
    g.fillStyle = '#64748b';
    g.font = '12px monospace';
    g.fillText('about.ts', 70, 17);
    g.font = '17px monospace';
    let x = 18, y = 58, left = count;
    for (const [text, kind] of CODE) {
      for (const ch of text) {
        if (left-- <= 0) break;
        if (ch === '\n') { x = 18; y += 26; continue; }
        g.fillStyle = COLORS[kind];
        g.fillText(ch, x, y);
        x += 10.2;
      }
      if (left <= 0) break;
    }
    if (blink) { g.fillStyle = '#10b981'; g.fillRect(x + 1, y - 15, 9, 19); }
    texture.needsUpdate = true;
  };
  useEffect(() => draw(typed.current, true), []); // eslint-disable-line react-hooks/exhaustive-deps
  return { texture, typed, draw };
}


export type Phase = 'morning' | 'day' | 'evening' | 'night';

// time of day in Mumbai (IST), whatever the visitor's own time zone is
export function mumbaiPhase(d = new Date()): Phase {
  const h = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }).format(d));
  if (h >= 6 && h < 10) return 'morning';
  if (h >= 10 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

const LOOK: Record<Phase, { ambient: number; sun: number; sunColor: string; lamp: number; screen: number }> = {
  morning: { ambient: 0.85, sun: 1.6, sunColor: '#fed7aa', lamp: 0, screen: 2 },
  day: { ambient: 1.0, sun: 2.0, sunColor: '#ffffff', lamp: 0, screen: 1.5 },
  evening: { ambient: 0.6, sun: 1.1, sunColor: '#fb923c', lamp: 3, screen: 3 },
  night: { ambient: 0.35, sun: 0, sunColor: '#93c5fd', lamp: 6, screen: 4.5 },
};

// the view through the window, drawn for each time of day
function windowTexture(phase: Phase) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 320;
  const g = c.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 0, 320);
  const stops: Record<Phase, [string, string]> = {
    morning: ['#fbcfe8', '#fde68a'], day: ['#38bdf8', '#bae6fd'], evening: ['#7c3aed', '#fb923c'], night: ['#020617', '#1e1b4b'],
  };
  sky.addColorStop(0, stops[phase][0]); sky.addColorStop(1, stops[phase][1]);
  g.fillStyle = sky; g.fillRect(0, 0, 256, 320);
  if (phase === 'night') {
    for (let i = 0; i < 60; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * 0.8})`; g.fillRect(Math.random() * 256, Math.random() * 180, 1.5, 1.5); }
    g.fillStyle = '#f8fafc'; g.beginPath(); g.arc(190, 60, 18, 0, 7); g.fill();
    g.fillStyle = '#020617'; g.beginPath(); g.arc(198, 54, 16, 0, 7); g.fill();
  } else {
    const sunY = phase === 'day' ? 70 : phase === 'morning' ? 200 : 230;
    g.fillStyle = phase === 'evening' ? '#fdba74' : '#fef3c7';
    g.beginPath(); g.arc(70, sunY, 24, 0, 7); g.fill();
    if (phase !== 'evening') { g.fillStyle = 'rgba(255,255,255,0.85)'; [[150, 90], [60, 130], [200, 150]].forEach(([x, y]) => { g.beginPath(); g.ellipse(x, y, 34, 12, 0, 0, 7); g.fill(); }); }
  }
  // Mumbai skyline, windows lit after dark
  let x = 0;
  while (x < 256) {
    const w = 18 + Math.random() * 26, h = 70 + Math.random() * 120;
    g.fillStyle = phase === 'night' ? '#0f172a' : phase === 'evening' ? '#3b0764' : '#64748b';
    g.fillRect(x, 320 - h, w, h);
    if (phase === 'night' || phase === 'evening') {
      for (let wy = 320 - h + 6; wy < 316; wy += 9) for (let wx = x + 3; wx < x + w - 4; wx += 6)
        if (Math.random() > 0.55) { g.fillStyle = Math.random() > 0.3 ? '#fde68a' : '#7dd3fc'; g.fillRect(wx, wy, 2.5, 4); }
    }
    x += w + 2;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// a capsule stretched between two points (arms)
function Limb({ from, to, r, color }: { from: [number, number, number]; to: [number, number, number]; r: number; color: string }) {
  const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const len = a.distanceTo(b);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  return (
    <mesh position={mid} quaternion={q}>
      <capsuleGeometry args={[r, Math.max(0.01, len - r * 2), 6, 12]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

const SKIN = '#c98d68', HAIR = '#2a201a', BLAZER = '#1d2a47', SHIRT = '#f4f4f2', TROUSERS = '#111827';

// me, seated at the desk and typing (built facing +z, then turned to face the laptop)
function Person({ reduce }: { reduce: boolean }) {
  const head = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const handL = useRef<THREE.Mesh>(null);
  const handR = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (reduce) return;
    const t = clock.elapsedTime;
    // typing: hands tap alternately, pause now and then to "think"
    const typing = Math.sin(t * 0.5) > -0.6;
    if (handL.current) handL.current.position.y = 0.2 + (typing ? Math.max(0, Math.sin(t * 13)) * 0.04 : 0);
    if (handR.current) handR.current.position.y = 0.2 + (typing ? Math.max(0, Math.sin(t * 13 + 1.7)) * 0.04 : 0);
    if (head.current) {
      head.current.rotation.x = 0.12 + Math.sin(t * 1.4) * 0.03;
      head.current.rotation.y = typing ? Math.sin(t * 0.7) * 0.08 : 0.35; // glances at the mug while thinking
    }
    if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.008; // breathing
  });
  return (
    <group>
      {/* chair */}
      <mesh position={[0, -0.88, 0.05]}>
        <boxGeometry args={[1.35, 0.12, 1.2]} />
        <meshStandardMaterial color="#27272a" roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.15, -0.62]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.3, 1.25, 0.12]} />
        <meshStandardMaterial color="#27272a" roughness={0.6} />
      </mesh>
      <mesh position={[0, -1.5, 0.05]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2]} />
        <meshStandardMaterial color="#52525b" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* legs (thighs forward under the desk) */}
      <mesh position={[-0.27, -0.68, 0.45]}>
        <boxGeometry args={[0.42, 0.3, 1.05]} />
        <meshStandardMaterial color={TROUSERS} roughness={0.8} />
      </mesh>
      <mesh position={[0.27, -0.68, 0.45]}>
        <boxGeometry args={[0.42, 0.3, 1.05]} />
        <meshStandardMaterial color={TROUSERS} roughness={0.8} />
      </mesh>
      {/* torso: navy blazer leaning slightly toward the laptop */}
      <group ref={torso} position={[0, -0.75, 0]} rotation={[0.16, 0, 0]}>
        <RoundedBox args={[1.25, 1.2, 0.62]} radius={0.18} position={[0, 0.62, 0]}>
          <meshStandardMaterial color={BLAZER} roughness={0.75} />
        </RoundedBox>
        {/* white collar */}
        <mesh position={[0, 1.2, 0.08]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.24, 0.12, 20]} />
          <meshStandardMaterial color={SHIRT} roughness={0.6} />
        </mesh>
        {/* neck + head */}
        <mesh position={[0, 1.3, 0.06]}>
          <cylinderGeometry args={[0.13, 0.14, 0.22, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        <group ref={head} position={[0, 1.62, 0.1]}>
          <mesh scale={[0.92, 1.06, 0.98]}>
            <sphereGeometry args={[0.34, 32, 32]} />
            <meshStandardMaterial color={SKIN} roughness={0.6} />
          </mesh>
          {[-1, 1].map((sx) => (
            <mesh key={sx} position={[sx * 0.31, 0, 0]} scale={[0.4, 0.8, 0.5]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial color={SKIN} roughness={0.6} />
            </mesh>
          ))}
          {/* hair: thick, dark, swept up and back */}
          <mesh position={[0, 0.1, -0.04]} scale={[1.0, 0.86, 1.04]}>
            <sphereGeometry args={[0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.3, 0.12]} scale={[0.85, 0.42, 0.7]}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.1} />
          </mesh>
          <mesh position={[0, -0.02, -0.12]} scale={[0.95, 0.75, 0.75]}>
            <sphereGeometry args={[0.34, 24, 24]} />
            <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.1} />
          </mesh>
        </group>
      </group>
      {/* arms: shoulder -> elbow -> hand on the keyboard */}
      {/* elbows at desk height and forearms resting above the laptop (not through its base) */}
      <Limb from={[-0.6, 0.35, 0.18]} to={[-0.74, 0.2, 0.72]} r={0.15} color={BLAZER} />
      <Limb from={[-0.74, 0.2, 0.72]} to={[-0.62, 0.24, 1.36]} r={0.11} color={BLAZER} />
      <Limb from={[0.6, 0.35, 0.18]} to={[0.62, 0.2, 0.74]} r={0.15} color={BLAZER} />
      <Limb from={[0.62, 0.2, 0.74]} to={[0.12, 0.24, 1.36]} r={0.11} color={BLAZER} />
      {/* white shirt cuffs */}
      {([[-0.62, 0.24, 1.38], [0.12, 0.24, 1.38]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.08, 16]} />
          <meshStandardMaterial color={SHIRT} />
        </mesh>
      ))}
      <mesh ref={handL} position={[-0.6, 0.2, 1.5]} scale={[1, 0.55, 1.25]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      <mesh ref={handR} position={[0.1, 0.2, 1.5]} scale={[1, 0.55, 1.25]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Desk({ light, reduce, phase }: { light: boolean; reduce: boolean; phase: Phase }) {
  const view = useMemo(() => windowTexture(phase), [phase]);
  useEffect(() => () => view.dispose(), [view]); // free the old window image when the time of day changes
  const look = LOOK[phase];
  const scene = useRef<THREE.Group>(null);
  const steam = useRef<THREE.Points>(null);
  const pointer = useWindowPointer();
  const { texture, typed, draw } = useCodeScreen(reduce);
  const last = useRef(0);
  const steamPos = useMemo(() => {
    const a = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) { a[i * 3] = (Math.random() - 0.5) * 0.12; a[i * 3 + 1] = Math.random() * 0.7; a[i * 3 + 2] = (Math.random() - 0.5) * 0.12; }
    return a;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const g = scene.current;
    if (g && !reduce) {
      g.rotation.y += (pointer.current.x * 0.25 + 0.5 - g.rotation.y) * 0.05;
      g.rotation.x += (-pointer.current.y * 0.08 + 0.05 - g.rotation.x) * 0.05;
      g.position.y = Math.sin(t * 0.8) * 0.04;
    }
    // type a character every ~70ms, pause, then start over
    if (!reduce && t - last.current > 0.07) {
      last.current = t;
      typed.current = typed.current > TOTAL + 40 ? 0 : typed.current + 1;
      draw(Math.min(typed.current, TOTAL), Math.floor(t * 2) % 2 === 0);
    }
    const s = steam.current;
    if (s) s.visible = phase === 'morning' || phase === 'day';
    if (s && !reduce && s.visible) {
      const a = s.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 40; i++) {
        a[i * 3 + 1] += 0.006;
        a[i * 3] += Math.sin(t * 2 + i) * 0.0015;
        if (a[i * 3 + 1] > 0.7) { a[i * 3 + 1] = 0; a[i * 3] = (Math.random() - 0.5) * 0.1; }
      }
      s.geometry.attributes.position.needsUpdate = true;
    }
  });

  const wood = light ? '#cbb59a' : '#3b2f2a';
  const metal = light ? '#cbd5e1' : '#3f3f46';
  return (
    <group ref={scene} position={[0, -0.6, 0]}>
      {/* desk top + legs */}
      <RoundedBox args={[5.2, 0.16, 2.6]} radius={0.05} position={[0, -0.08, 0]}>
        <meshStandardMaterial color={wood} roughness={0.7} />
      </RoundedBox>
      {[[-2.4, -1.15], [2.4, -1.15], [-2.4, 1.15], [2.4, 1.15]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -1.1, z]}>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <meshStandardMaterial color={metal} metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      {/* laptop: base, keyboard area, hinge, screen */}
      <group position={[-0.3, 0, 0.1]}>
        <RoundedBox args={[2.2, 0.07, 1.45]} radius={0.03} position={[0, 0.035, 0]}>
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.072, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.9, 0.75]} />
          <meshStandardMaterial color="#1f2937" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.072, 0.58]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>
        <group position={[0, 0.07, -0.72]} rotation={[-0.25, 0, 0]}>
          <RoundedBox args={[2.2, 1.4, 0.05]} radius={0.03} position={[0, 0.7, 0]}>
            <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, 0.72, 0.027]}>
            <planeGeometry args={[2.04, 1.26]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
        </group>
      </group>
      {/* coffee mug with steam */}
      <group position={[1.45, 0, 0.55]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.17, 0.15, 0.4, 24]} />
          <meshStandardMaterial color="#10b981" roughness={0.4} />
        </mesh>
        <mesh position={[0.19, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.025, 8, 16]} />
          <meshStandardMaterial color="#10b981" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.39, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.15, 24]} />
          <meshStandardMaterial color="#3f2a1e" />
        </mesh>
        <points ref={steam} position={[0, 0.45, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[steamPos, 3]} />
          </bufferGeometry>
          <pointsMaterial size={0.05} color={light ? '#94a3b8' : '#e4e4e7'} transparent opacity={0.35} depthWrite={false} />
        </points>
      </group>
      {/* plant */}
      <group position={[-2.05, 0, -0.6]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.16, 0.44, 20]} />
          <meshStandardMaterial color={light ? '#e2e8f0' : '#27272a'} roughness={0.6} />
        </mesh>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.14, 0.62 + (i % 3) * 0.12, Math.sin(a) * 0.14]} rotation={[Math.sin(a) * 0.6, a, Math.cos(a) * 0.6]} scale={[0.09, 0.32, 0.04]}>
              <sphereGeometry args={[1, 12, 12]} />
              <meshStandardMaterial color={i % 2 ? '#15803d' : '#16a34a'} roughness={0.6} />
            </mesh>
          );
        })}
      </group>
      {/* desk lamp */}
      <group position={[1.75, 0, -0.75]}>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.28, 0.3, 0.06, 24]} />
          <meshStandardMaterial color={metal} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.025, 0.025, 1.15]} />
          <meshStandardMaterial color={metal} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[-0.3, 1.12, 0]} rotation={[0, 0, -2.1]}>
          <coneGeometry args={[0.22, 0.32, 24, 1, true]} />
          <meshStandardMaterial color="#10b981" side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[-0.42, 1.0, 0]} intensity={look.lamp} distance={4} color="#fde68a" />
        {look.lamp > 0 && (
          <mesh position={[-0.38, 1.02, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#fef3c7" />
          </mesh>
        )}
      </group>
      {/* back wall with a window onto Mumbai (sky follows the time of day) */}
      <mesh position={[0, 1.2, -1.75]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color={light ? '#e2e8f0' : '#1f1f23'} roughness={0.9} />
      </mesh>
      <group position={[1.7, 1.55, -1.72]}>
        <mesh>
          <boxGeometry args={[1.75, 2.05, 0.08]} />
          <meshStandardMaterial color={light ? '#f8fafc' : '#3f3f46'} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.55, 1.85]} />
          <meshBasicMaterial map={view} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[0.05, 1.85, 0.02]} />
          <meshStandardMaterial color={light ? '#f8fafc' : '#3f3f46'} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[1.55, 0.05, 0.02]} />
          <meshStandardMaterial color={light ? '#f8fafc' : '#3f3f46'} />
        </mesh>
      </group>
      {/* light coming in through the window */}
      <directionalLight position={[2.5, 3, -1]} intensity={look.sun} color={look.sunColor} />
      <ambientLight intensity={look.ambient * 0.4} />

      {/* me, working on the laptop */}
      <group position={[-0.05, 0, 1.75]} rotation={[0, Math.PI, 0]}>
        <Person reduce={reduce} />
      </group>
      <ContactShadows position={[0, 0.001, 0]} opacity={0.35} scale={6} blur={2.4} far={1.5} />
    </group>
  );
}

export default function DevDesk() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  // only keep a WebGL context while near the screen (unloaded when far away)
  const active = useActive3D(box);
  const reduce = usePrefersReducedMotion();
  const light = useIsLight();
  const [auto, setAuto] = useState<Phase>('day');
  const [pick, setPick] = useState<Phase | null>(null);
  const [clock, setClock] = useState('');
  useEffect(() => {
    const tick = () => {
      setAuto(mumbaiPhase());
      setClock(new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  const phase = pick ?? auto;
  const look = LOOK[phase];
  return (
    <div ref={box} className="relative w-full h-full" role="group" aria-label="3D desk with me typing code on a laptop">
      {active && (
      <Canvas frameloop={inView ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 2.7, 5.5], fov: 40 }} shadows={false}>
        <ambientLight intensity={(light ? 1 : 0.75) * look.ambient} />
        <hemisphereLight args={['#e0f2fe', '#1c1917', (light ? 0.8 : 0.6) * look.ambient]} />
        {/* rim light from behind so my outline stands out */}
        <directionalLight position={[-3, 3, 6]} intensity={1.4} color="#a7f3d0" />
        {/* soft blue glow from the laptop screen onto me (stronger at night) */}
        <pointLight position={[-0.3, 0.9, -0.2]} intensity={look.screen} color="#93c5fd" distance={3.5} />
        <directionalLight position={[3, 5, 4]} intensity={(light ? 1.4 : 1.1) * look.ambient} />
        <pointLight position={[-3, 2, 2]} intensity={6} color="#10b981" distance={8} />
        <Desk light={light} reduce={reduce} phase={phase} />
      </Canvas>
      )}
      {/* Mumbai clock + preview buttons */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full bg-zinc-950/70 border border-zinc-800 font-mono text-[10px] text-zinc-300 backdrop-blur">
          Mumbai · {clock} · {auto}
        </span>
        <span className="flex gap-1 pointer-events-auto">
          {(['morning', 'day', 'evening', 'night'] as Phase[]).map((p) => (
            <button
              key={p}
              onClick={() => setPick(pick === p ? null : p)}
              className={`px-2 py-1 rounded-full font-mono text-[10px] border transition-colors ${phase === p ? 'bg-emerald-500 text-zinc-950 border-emerald-500' : 'bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:text-emerald-400'}`}
              aria-pressed={phase === p}
            >
              {p === 'morning' ? '🌅' : p === 'day' ? '☀️' : p === 'evening' ? '🌇' : '🌙'}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
