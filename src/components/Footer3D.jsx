// src/components/Footer3D.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Cylinder, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Island = ({ position, scale, color = "#1a1a1a" }) => {
  return (
    <group position={position} scale={scale}>
      {/* Base */}
      <Cylinder args={[1, 1.2, 0.5, 6]} rotation={[0, Math.random() * Math.PI, 0]}>
        <meshStandardMaterial color={color} roughness={1} />
      </Cylinder>
      {/* Decoration */}
      <Box args={[0.2, 0.6, 0.2]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </Box>
    </group>
  );
};

export const Footer3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2 - 2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]}>
      <Island position={[-3, 0, 0]} scale={0.8} />
      <Island position={[3, 0.5, -2]} scale={1.2} color="#0f172a" />
      <Island position={[0, -0.5, -4]} scale={1.5} color="#080808" />
      
      {/* Floating lights */}
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[0.05, 8, 8]} position={[(Math.random() - 0.5) * 10, Math.random() * 2, (Math.random() - 0.5) * 5]}>
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

export default Footer3D;
