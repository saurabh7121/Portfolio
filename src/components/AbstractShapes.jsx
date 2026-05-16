// src/components/AbstractShapes.jsx
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cone, Octahedron, Tetrahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random shapes with positions and rotation speeds
const generateShapes = (count = 30) => {
  const shapes = [];
  for (let i = 0; i < count; i++) {
    const type = ['cone', 'octahedron', 'tetrahedron'][Math.floor(Math.random() * 3)];
    const position = [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
    ];
    const speed = (Math.random() * 0.5) + 0.1;
    const color = new THREE.Color(`hsl(${Math.random() * 360}, 70%, 60%)`).getStyle();
    shapes.push({ type, position, speed, color, key: i });
  }
  return shapes;
};

const Shape = ({ type, position, speed, color }) => {
  const ref = useRef();
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed * 0.7;
    }
  });
  const geometryProps = { args: [1, 1, 1] };
  const Mesh = type === 'cone' ? Cone : type === 'octahedron' ? Octahedron : Tetrahedron;
  return (
    <Mesh ref={ref} {...geometryProps} position={position}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        distort={0.2}
        speed={1.5}
        roughness={0.2}
        metalness={0.4}
        transparent
        opacity={0.7}
      />
    </Mesh>
  );
};

export const AbstractShapes = () => {
  const shapes = useMemo(() => generateShapes(40), []);
  return (
    <group>
      {shapes.map(({ type, position, speed, color, key }) => (
        <Shape key={key} type={type} position={position} speed={speed} color={color} />
      ))}
    </group>
  );
};

export default AbstractShapes;
