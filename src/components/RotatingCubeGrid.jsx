// src/components/RotatingCubeGrid.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

// Generate a grid of cube positions
const generateGrid = (cols = 8, rows = 8, spacing = 2) => {
  const positions = [];
  const startX = -((cols - 1) * spacing) / 2;
  const startZ = -((rows - 1) * spacing) / 2;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push([startX + i * spacing, 0, startZ + j * spacing]);
    }
  }
  return positions;
};

const Cube = ({ position }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Box
      args={[1, 1, 1]}
      position={position}
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <meshStandardMaterial
        color={hovered ? '#3b82f6' : '#1e1e1e'}
        emissive={hovered ? '#3b82f6' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
        metalness={0.2}
        roughness={0.8}
      />
    </Box>
  );
};

export const RotatingCubeGrid = () => {
  const positions = useMemo(() => generateGrid(9, 9, 2.5), []);
  return (
    <group>
      {positions.map((pos, idx) => (
        <Cube key={idx} position={pos} />
      ))}
    </group>
  );
};

export default RotatingCubeGrid;
