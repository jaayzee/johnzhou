import { useRef } from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Mesh } from 'three';

export default function Model() {
  const sphereRef = useRef<Mesh>(null);

  return (
    <>
      <Sphere ref={sphereRef} args={[1, 64, 64]} position={[0, 0, 0]} scale={1.5}>
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>
    </>
  );
}