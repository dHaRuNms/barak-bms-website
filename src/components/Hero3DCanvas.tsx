import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Point-Cloud / Silicon Mesh Geometry
const ParticleMatrix = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const meshRef = useRef<THREE.Group>(null!);

  // Generate 3D grid and point cloud
  const { positions, colors } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyanColor = new THREE.Color('#06B6D4');
    const emeraldColor = new THREE.Color('#10B981');
    const darkSlate = new THREE.Color('#404040');

    for (let i = 0; i < count; i++) {
      // Create layered silicon wafer planar distribution
      const u = (Math.random() - 0.5) * 8;
      const v = (Math.random() - 0.5) * 8;
      const layer = (Math.floor(Math.random() * 4) - 1.5) * 0.6;
      
      pos[i * 3] = u;
      pos[i * 3 + 1] = layer + (Math.sin(u * 2) * Math.cos(v * 2) * 0.15);
      pos[i * 3 + 2] = v;

      // Color distribution: mostly dark circuit node, with glowing cyan/emerald hot traces
      const rand = Math.random();
      let chosenColor = darkSlate;
      if (rand > 0.85) chosenColor = cyanColor;
      else if (rand > 0.75) chosenColor = emeraldColor;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  // Frame rotation & wave modulation
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.08;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.3, 0]}>
      {/* Central Silicon Microchip Core Wireframe */}
      <mesh rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
        <boxGeometry args={[3.2, 0.08, 3.2]} />
        <meshBasicMaterial 
          color="#06B6D4" 
          wireframe 
          transparent 
          opacity={0.18} 
        />
      </mesh>

      {/* Internal Core Die */}
      <mesh rotation={[-Math.PI / 4, 0, Math.PI / 6]} position={[0, 0.02, 0]}>
        <boxGeometry args={[1.6, 0.12, 1.6]} />
        <meshBasicMaterial 
          color="#10B981" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export const Hero3DCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-90">
      <Canvas
        camera={{ position: [0, 2.8, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleMatrix />
      </Canvas>
    </div>
  );
};
