'use client';

import { memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const SceneContent = memo(function SceneContent() {
  return (
    <Suspense fallback={null}>
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
    </Suspense>
  );
});

function FallbackComponent({ error }: FallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p>Loading 3D scene...</p>
    </div>
  );
}

function Scene() {
  return (
    <div className="relative w-full h-full">
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onReset={() => {
          // Reset any state if needed
        }}
      >
        <Canvas
          style={{ background: 'var(--background)' }}
          performance={{ min: 0.5 }}
          dpr={[1, 2]}
        >
          <SceneContent />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

export default Scene;
