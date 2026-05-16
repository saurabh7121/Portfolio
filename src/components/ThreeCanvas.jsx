import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, Torus, Box, Cylinder, Ring, Html } from '@react-three/drei';
import * as THREE from 'three';
import RotatingCubeGrid from './RotatingCubeGrid';
import AbstractShapes from './AbstractShapes';
import Footer3D from './Footer3D';

/* ═══════════════════════════════════════════════
   SOLAR SYSTEM
   Sun + 7 planets with orbits, moons, Saturn ring
   Hover = slow + glow + label
═══════════════════════════════════════════════ */

const PLANETS = [
  { name: 'Mercury', r: 0.11, orbit: 1.6,  speed: 2.4,  color: '#9ca3af', emissive: '#6b7280', moons: 0 },
  { name: 'Venus',   r: 0.17, orbit: 2.2,  speed: 1.8,  color: '#fde68a', emissive: '#f59e0b', moons: 0 },
  { name: 'Earth',   r: 0.19, orbit: 3.0,  speed: 1.35, color: '#3b82f6', emissive: '#1d4ed8', moons: 1 },
  { name: 'Mars',    r: 0.14, orbit: 3.85, speed: 1.05, color: '#ef4444', emissive: '#b91c1c', moons: 0 },
  { name: 'Jupiter', r: 0.38, orbit: 5.0,  speed: 0.65, color: '#d97706', emissive: '#92400e', moons: 2 },
  { name: 'Saturn',  r: 0.30, orbit: 6.2,  speed: 0.45, color: '#fbbf24', emissive: '#b45309', moons: 1, ring: true },
  { name: 'Uranus',  r: 0.22, orbit: 7.3,  speed: 0.30, color: '#67e8f9', emissive: '#0e7490', moons: 0 },
];

const Planet = ({ data, solarRef, sunPos }) => {
  const meshRef  = useRef();
  const groupRef = useRef(); // orbit pivot
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angleRef.current += delta * data.speed * (hovered ? 0.1 : 1);
    const a = angleRef.current;
    if (groupRef.current) {
      groupRef.current.position.x = sunPos[0] + Math.cos(a) * data.orbit;
      groupRef.current.position.y = sunPos[1] + Math.sin(a) * data.orbit * 0.25; // slight ellipse tilt
      groupRef.current.position.z = sunPos[2] + Math.sin(a) * data.orbit * 0.6;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <Sphere
        ref={meshRef}
        args={[data.r, 32, 32]}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={hovered ? 0.7 : 0.2}
          metalness={0.1}
          roughness={0.7}
        />
      </Sphere>

      {/* Hover glow */}
      {hovered && (
        <Sphere args={[data.r * 1.6, 16, 16]}>
          <meshStandardMaterial color={data.color} transparent opacity={0.08} side={THREE.BackSide} />
        </Sphere>
      )}

      {/* Planet label on hover */}
      {hovered && (
        <Html center distanceFactor={8} position={[0, data.r + 0.3, 0]} zIndexRange={[0, 0]}>
          <div style={{
            background: 'rgba(8,8,8,0.85)',
            border: `1px solid ${data.color}40`,
            color: data.color,
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '9px',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            {data.name}
          </div>
        </Html>
      )}

      {/* Saturn ring */}
      {data.ring && (
        <>
          <Ring args={[data.r * 1.4, data.r * 2.2, 64]} rotation={[Math.PI / 5, 0.2, 0]}>
            <meshStandardMaterial color="#fbbf24" transparent opacity={0.3} side={THREE.DoubleSide} />
          </Ring>
          <Ring args={[data.r * 2.3, data.r * 2.7, 64]} rotation={[Math.PI / 5, 0.2, 0]}>
            <meshStandardMaterial color="#d97706" transparent opacity={0.15} side={THREE.DoubleSide} />
          </Ring>
        </>
      )}

      {/* Moons */}
      {data.moons > 0 && Array.from({ length: data.moons }).map((_, mi) => (
        <Moon key={mi} planetR={data.r} index={mi} total={data.moons} />
      ))}
    </group>
  );
};

/* Mini moon orbiting a planet */
const Moon = ({ planetR, index, total }) => {
  const ref = useRef();
  const angleRef = useRef((index / total) * Math.PI * 2);
  const orbitR = planetR * 2.2 + index * 0.1;
  useFrame((_, delta) => {
    angleRef.current += delta * 2.5;
    if (ref.current) {
      ref.current.position.x = Math.cos(angleRef.current) * orbitR;
      ref.current.position.y = Math.sin(angleRef.current) * orbitR * 0.3;
      ref.current.position.z = Math.sin(angleRef.current) * orbitR * 0.5;
    }
  });
  return (
    <Sphere ref={ref} args={[planetR * 0.28, 12, 12]}>
      <meshStandardMaterial color="#9ca3af" metalness={0.2} roughness={0.8} />
    </Sphere>
  );
};

/* Glowing sun */
const Sun = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.material.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.15;
    }
  });
  return (
    <group position={position}>
      {/* Core */}
      <Float speed={0.5} floatIntensity={0.2}>
        <Sphere ref={ref} args={[0.55, 64, 64]}>
          <meshStandardMaterial
            color="#fef08a"
            emissive="#f59e0b"
            emissiveIntensity={0.9}
            roughness={0.3}
            metalness={0}
          />
        </Sphere>
      </Float>

      {/* Corona glow rings */}
      {[0.85, 1.1, 1.4].map((s, i) => (
        <Sphere key={i} args={[0.55 * s, 16, 16]}>
          <meshStandardMaterial
            color="#fbbf24"
            transparent
            opacity={0.04 - i * 0.01}
            side={THREE.BackSide}
          />
        </Sphere>
      ))}

      {/* Sun point light */}
      <pointLight color="#fef08a" intensity={3.5} distance={18} decay={1.8} />
    </group>
  );
};

/* Orbit path rings */
const OrbitPath = ({ orbit, sunPos }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        sunPos[0] + Math.cos(a) * orbit,
        sunPos[1],
        sunPos[2] + Math.sin(a) * orbit * 0.6
      ));
    }
    return pts;
  }, [orbit, sunPos]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.04} transparent />
    </line>
  );
};

/* Full solar system group */
const SolarSystem = ({ mouse }) => {
  const groupRef = useRef();
  const SUN_POS = [-5, 2, -8]; // positioned far top-left background

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Very gentle mouse tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current[1] * 0.08,
      0.02
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current[0] * 0.08,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      <Sun position={SUN_POS} />
      {PLANETS.map((p) => (
        <OrbitPath key={`orbit-${p.name}`} orbit={p.orbit} sunPos={SUN_POS} />
      ))}
      {PLANETS.map((p) => (
        <Planet key={p.name} data={p} sunPos={SUN_POS} />
      ))}
    </group>
  );
};

/* ═══════════════════════════════════════════════
   SATELLITE
═══════════════════════════════════════════════ */
const Satellite = ({ mouse }) => {
  const groupRef  = useRef();
  const panelLRef = useRef();
  const panelRRef = useRef();
  const antennaRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked,  setClicked]  = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;
    groupRef.current.position.x = Math.sin(t * 0.18) * 1.8 + 2.5;
    groupRef.current.position.y = Math.cos(t * 0.12) * 1.0 + 0.5;
    groupRef.current.position.z = Math.sin(t * 0.1) * 0.5 - 1;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current[1] * 0.4, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current[0] * 0.4 + t * 0.08, 0.04);
    if (panelLRef.current) panelLRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    if (panelRRef.current) panelRRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    if (antennaRef.current) antennaRef.current.rotation.z = Math.sin(t * 0.5) * 0.08;
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered ? 0.18 + Math.sin(t * 3) * 0.06 : 0.06 + Math.sin(t * 1.5) * 0.02;
      const s = hovered ? (clicked ? 1.6 : 1.35) : 1;
      glowRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
    }
  });

  const antennaMat = <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.05} />;
  const panelMat   = <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={hovered ? 0.5 : 0.2} />;

  return (
    <group
      ref={groupRef}
      position={[2.5, 0.5, -1]}
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={() => setClicked(c => !c)}
    >
      <Sphere ref={glowRef} args={[1.2, 16, 16]}>
        <meshStandardMaterial color={hovered ? '#3b82f6' : '#ffffff'} transparent opacity={0.06} side={THREE.BackSide} />
      </Sphere>

      <Box args={[0.6, 0.4, 0.4]}>
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
      </Box>
      <Box args={[0.62, 0.02, 0.42]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.62, 0.02, 0.42]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Left panel */}
      <group ref={panelLRef}>
        <Box args={[0.48, 0.03, 0.03]} position={[-0.54, 0, 0]}>{antennaMat}</Box>
        <Box args={[0.55, 0.28, 0.02]} position={[-0.82, 0, 0]}>{panelMat}</Box>
        <Box args={[0.55, 0.28, 0.021]} position={[-0.82, 0, 0]}>
          <meshStandardMaterial color="#1e40af" metalness={0.4} roughness={0.3} wireframe />
        </Box>
      </group>

      {/* Right panel */}
      <group ref={panelRRef}>
        <Box args={[0.48, 0.03, 0.03]} position={[0.54, 0, 0]}>{antennaMat}</Box>
        <Box args={[0.55, 0.28, 0.02]} position={[0.82, 0, 0]}>{panelMat}</Box>
        <Box args={[0.55, 0.28, 0.021]} position={[0.82, 0, 0]}>
          <meshStandardMaterial color="#1e40af" metalness={0.4} roughness={0.3} wireframe />
        </Box>
      </group>

      {/* Antenna */}
      <group ref={antennaRef} position={[0, 0.28, 0]}>
        <Cylinder args={[0.01, 0.01, 0.22, 8]} position={[0, 0.11, 0]}>{antennaMat}</Cylinder>
        <Ring args={[0.06, 0.18, 24]} rotation={[Math.PI / 6, 0, 0]} position={[0, 0.24, 0]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.05} side={THREE.DoubleSide}
            emissive={hovered ? '#ef4444' : '#000'} emissiveIntensity={hovered ? 0.6 : 0} />
        </Ring>
        <Sphere args={[0.03, 8, 8]} position={[0, 0.24, 0]}>
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.5} />
        </Sphere>
      </group>

      <Cylinder args={[0.08, 0.12, 0.12, 12]} position={[0, 0, -0.26]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </Cylinder>

      {clicked && (
        <Float speed={8} floatIntensity={0.5}>
          <Sphere args={[0.08, 8, 8]} position={[0, 0, -0.44]}>
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} transparent opacity={0.85} />
          </Sphere>
        </Float>
      )}

      <Sphere args={[0.025, 8, 8]} position={[0.3, 0.21, 0.21]}>
        <meshStandardMaterial color={clicked ? '#22c55e' : '#ef4444'} emissive={clicked ? '#22c55e' : '#ef4444'} emissiveIntensity={2} />
      </Sphere>

      {hovered && [0.3, 0.5, 0.7].map((r, i) => (
        <Ring key={i} args={[r - 0.02, r, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.15 - i * 0.04} side={THREE.DoubleSide} />
        </Ring>
      ))}

      {hovered && (
        <Html center distanceFactor={8} position={[0, 0.9, 0]} zIndexRange={[0, 0]}>
          <div style={{
            background: 'rgba(8,8,8,0.85)', border: '1px solid rgba(59,130,246,0.4)',
            color: '#3b82f6', padding: '2px 8px', borderRadius: '999px',
            fontSize: '9px', fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            {clicked ? '🛸 thrusting' : '🛰 satellite'}
          </div>
        </Html>
      )}
    </group>
  );
};

/* ═══════════════════════════════════════════════
   HERO ORB
═══════════════════════════════════════════════ */
const HeroOrb = ({ mouse }) => {
  const mesh = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.current[1] * 0.3, 0.05);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mouse.current[0] * 0.3, 0.05);
    mesh.current.position.y = Math.sin(t * 0.5) * 0.2;
  });
  return (
    <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.2}>
      <Sphere ref={mesh} args={[1.6, 128, 128]} scale={isMobile ? 1.2 : 1.6}>
        <MeshDistortMaterial color="#1a1a2e" attach="material" distort={0.35} speed={1.5} roughness={0.1} metalness={0.9} />
      </Sphere>
    </Float>
  );
};

/* ═══════════════════════════════════════════════
   ORBIT RINGS (hero)
═══════════════════════════════════════════════ */
const OrbitRings = () => {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    group.current.rotation.x = t * 0.08;
    group.current.rotation.y = t * 0.12;
  });
  return (
    <group ref={group}>
      <Torus args={[2.8, 0.005, 16, 120]}><meshStandardMaterial color="#3b82f6" opacity={0.25} transparent /></Torus>
      <Torus args={[3.5, 0.004, 16, 120]} rotation={[Math.PI / 3, 0, 0]}><meshStandardMaterial color="#ef4444" opacity={0.15} transparent /></Torus>
      <Torus args={[4.2, 0.003, 16, 120]} rotation={[0, Math.PI / 4, Math.PI / 6]}><meshStandardMaterial color="#ffffff" opacity={0.06} transparent /></Torus>
    </group>
  );
};

/* ═══════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════ */
const Particles = ({ mouse, isMobile }) => {
  const count = isMobile ? 40 : 120;
  const mesh  = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => Array.from({ length: count }, () => ({
    t: Math.random() * 100, factor: 8 + Math.random() * 30,
    speed: 0.004 + Math.random() * 0.008,
    xFactor: -20 + Math.random() * 40, yFactor: -20 + Math.random() * 40, zFactor: -20 + Math.random() * 40,
  })), [count]);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.t += p.speed;
      dummy.position.set(
        (p.xFactor + Math.cos(p.t / 10) * p.factor) / 5 + mouse.current[0] * 1.5,
        (p.yFactor + Math.sin(p.t / 10) * p.factor) / 5 - mouse.current[1] * 1.5,
        (p.zFactor + Math.cos(p.t / 10) * p.factor) / 5
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.022, 6, 6]} />
      <meshStandardMaterial color="#ffffff" opacity={0.35} transparent />
    </instancedMesh>
  );
};

/* ═══════════════════════════════════════════════
   MAIN CANVAS
═══════════════════════════════════════════════ */
const ThreeCanvas = () => {
  const mouse = useRef([0, 0]);
  // Detect mobile — Lighthouse uses a mobile profile (Moto G Power)
  // Reduce GPU/CPU load significantly on mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[#080808]"
      style={{ zIndex: 0 }}
      onMouseMove={(e) => {
        mouse.current = [
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        ];
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{
          antialias: !isMobile,       // disable AA on mobile — big perf win
          powerPreference: 'high-performance',
          alpha: false,               // opaque canvas — avoids compositing cost
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}  // cap pixel ratio on mobile
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, -8, -8]} intensity={0.5} color="#3b82f6" />
        {!isMobile && (
          <pointLight position={[5, 3, 0]} intensity={1.0} color="#ffffff" />
        )}

        <Stars
          radius={120}
          depth={80}
          count={isMobile ? 2000 : 6000}   // 2/3 fewer stars on mobile
          factor={3}
          saturation={0}
          fade
          speed={0.4}
        />

        <HeroOrb mouse={mouse} />
        <RotatingCubeGrid />
        <OrbitRings />
        <Particles mouse={mouse} isMobile={isMobile} />
        {!isMobile && <AbstractShapes />}
        {!isMobile && <Satellite mouse={mouse} />}
        {!isMobile && <Footer3D />}

        {/* 🌌 SOLAR SYSTEM — desktop only, too heavy for mobile */}
        {!isMobile && <SolarSystem mouse={mouse} />}

        <fog attach="fog" args={['#080808', 14, 40]} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;

