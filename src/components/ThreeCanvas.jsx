import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════
   CYBER-CORE (Center Holographic Geometry)
═══════════════════════════════════════════════ */
const OrbitalNode = ({ radius, speed, color, angleOffset = 0 }) => {
  const ref = useRef();
  const angle = useRef(angleOffset);

  useFrame((state, delta) => {
    angle.current += delta * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * radius;
      ref.current.position.y = Math.sin(angle.current) * radius * 0.35;
      ref.current.position.z = Math.sin(angle.current) * radius * 0.85;
    }
  });

  return (
    <Sphere ref={ref} args={[0.06, 8, 8]}>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
};

const CyberCore = ({ mouse, isMobile }) => {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const geodesicRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, mouse.current[1] * 0.3, 0.05);
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, mouse.current[0] * 0.3 + t * 0.1, 0.05);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15;
      ring1Ref.current.rotation.y = t * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.12;
      ring2Ref.current.rotation.z = t * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -t * 0.08;
      ring3Ref.current.rotation.z = -t * 0.12;
    }
    if (geodesicRef.current) {
      geodesicRef.current.rotation.y = -t * 0.03;
      geodesicRef.current.rotation.x = t * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Core Sphere (Glowing energy source) */}
      <Sphere ref={coreRef} args={[1.1, 64, 64]} scale={isMobile ? 1.0 : 1.35}>
        <MeshDistortMaterial
          color="#0b0f19"
          emissive="#ef4444"
          emissiveIntensity={0.8}
          distort={0.28}
          speed={1.6}
          roughness={0.15}
          metalness={0.95}
        />
      </Sphere>

      {/* 2. Concentric Gyroscopic Rings */}
      <group ref={ring1Ref}>
        <Torus args={[2.0, 0.015, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} />
        </Torus>
      </group>
      <group ref={ring2Ref}>
        <Torus args={[2.35, 0.01, 8, 100]} rotation={[0, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ef4444" transparent opacity={0.18} />
        </Torus>
      </group>
      <group ref={ring3Ref}>
        <Torus args={[2.7, 0.008, 8, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </Torus>
      </group>

      {/* 3. Geodesic Wireframe Overlay */}
      <mesh ref={geodesicRef} scale={isMobile ? 2.5 : 3.1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* 4. Orbiting Code Nodes */}
      {!isMobile && (
        <>
          <OrbitalNode radius={3.2} speed={0.6} color="#3b82f6" angleOffset={0} />
          <OrbitalNode radius={3.9} speed={-0.4} color="#ef4444" angleOffset={Math.PI / 3} />
          <OrbitalNode radius={4.6} speed={0.3} color="#ffffff" angleOffset={Math.PI * (2 / 3)} />
        </>
      )}

      {/* Internal Point Light */}
      <pointLight color="#ef4444" intensity={2} distance={8} decay={2} />
    </group>
  );
};

/* ═══════════════════════════════════════════════
   PLEXUS (Interactive Cybernetic Data Grid)
═══════════════════════════════════════════════ */
const Plexus = ({ mouse, isMobile }) => {
  const count = isMobile ? 30 : 90;
  const maxDistance = 3.6;
  const tempPos = new THREE.Vector3();

  // Generate node list with unique speeds and vectors
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 22
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006
        ),
      });
    }
    return data;
  }, [count]);

  const pointsRef = useRef();
  const linesRef = useRef();

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    const lineArray = linesRef.current.geometry.attributes.position.array;
    let lineIdx = 0;
    const maxLines = isMobile ? 40 : 160;

    // Update node positions and apply soft boundaries
    particles.forEach((p, idx) => {
      p.position.add(p.velocity);

      if (Math.abs(p.position.x) > 13) p.velocity.x *= -1;
      if (Math.abs(p.position.y) > 13) p.velocity.y *= -1;
      if (Math.abs(p.position.z) > 13) p.velocity.z *= -1;

      // Mouse interactive pull
      tempPos.set(mouse.current[0] * 4, mouse.current[1] * 4, 0);
      const distToMouse = p.position.distanceTo(tempPos);
      if (distToMouse < 6) {
        const force = (6 - distToMouse) * 0.00015;
        p.position.addScaledVector(tempPos.clone().sub(p.position), force);
      }

      positions[idx * 3] = p.position.x;
      positions[idx * 3 + 1] = p.position.y;
      positions[idx * 3 + 2] = p.position.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Draw connecting lines between close nodes
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position);
        if (dist < maxDistance && lineIdx < maxLines) {
          lineArray[lineIdx * 6] = particles[i].position.x;
          lineArray[lineIdx * 6 + 1] = particles[i].position.y;
          lineArray[lineIdx * 6 + 2] = particles[i].position.z;

          lineArray[lineIdx * 6 + 3] = particles[j].position.x;
          lineArray[lineIdx * 6 + 4] = particles[j].position.y;
          lineArray[lineIdx * 6 + 5] = particles[j].position.z;
          lineIdx++;
        }
      }
    }

    // Reset remaining buffer
    for (let i = lineIdx; i < maxLines; i++) {
      lineArray[i * 6] = 0;
      lineArray[i * 6 + 1] = 0;
      lineArray[i * 6 + 2] = 0;
      lineArray[i * 6 + 3] = 0;
      lineArray[i * 6 + 4] = 0;
      lineArray[i * 6 + 5] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
  });

  const floatArray = useMemo(() => new Float32Array(count * 3), [count]);
  const maxLineConnections = isMobile ? 40 : 160;
  const lineFloatArray = useMemo(() => new Float32Array(maxLineConnections * 2 * 3), [maxLineConnections]);

  return (
    <group>
      {/* Drifting nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[floatArray, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#3b82f6"
          size={isMobile ? 0.08 : 0.12}
          sizeAttenuation
          transparent
          opacity={0.5}
        />
      </points>

      {/* Connecting lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineFloatArray, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={isMobile ? 0.06 : 0.12}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};

/* ═══════════════════════════════════════════════
   MAIN CANVAS COMPONENT
═══════════════════════════════════════════════ */
const ThreeCanvas = ({ onReady }) => {
  const mouse = useRef([0, 0]);
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
      onTouchMove={(e) => {
        if (e.touches && e.touches[0]) {
          mouse.current = [
            (e.touches[0].clientX / window.innerWidth) * 2 - 1,
            -(e.touches[0].clientY / window.innerHeight) * 2 + 1,
          ];
        }
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        onCreated={() => {
          if (onReady) onReady();
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.25} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[0, 8, 2]} intensity={0.8} color="#ef4444" />

        {/* Backdrop Stars */}
        <Stars
          radius={120}
          depth={80}
          count={isMobile ? 1500 : 5000}
          factor={3.5}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Redesigned 3D elements */}
        <CyberCore mouse={mouse} isMobile={isMobile} />
        <Plexus mouse={mouse} isMobile={isMobile} />

        {/* Global fog for depth */}
        <fog attach="fog" args={['#080808', 12, 38]} />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
