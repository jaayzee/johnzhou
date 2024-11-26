'use client';

import { memo } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';

const SceneContent = memo(function SceneContent() {
  return (
    <>
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]}/>
      <Environment preset="city" />
    </>
  );
});

function Scene() {
  return (
    <Canvas
      style={{background: 'var(--background)'}}
      performance={{ min: 0.5 }}
      dpr={[1, 2]}
    >
      <SceneContent />
    </Canvas>
  );
}

export default Scene;