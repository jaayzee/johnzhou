'use client';

import { memo, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import LoadingSpinner from '../LoadingSpinner';

const SceneContent = memo(function SceneContent() {
  return (
    <Suspense fallback={null}>
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
    </Suspense>
  );
});

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    // attempt to reset after 1 seconds
    const timer = setTimeout(() => {
      resetErrorBoundary();
      // if reset doesn't work, force a page reload
      if (error) {
        window.location.reload();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [error, resetErrorBoundary]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

function Scene() {
  return (
    <div className="relative w-full h-full">
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onReset={() => {
          // reset the state of your app here if needed
          console.log('Error boundary reset');
        }}
        onError={(error) => {
          console.error('Scene Error:', error);
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
