'use client';

import { memo, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import { Environment } from '@react-three/drei';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import LoadingSpinner from '../LoadingSpinner';
import { motion } from 'framer-motion';

const SceneContent = memo(function SceneContent() {
  return (
    <>
      <Model />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />
    </>
  );
});

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetErrorBoundary();
      if (error) {
        window.location.reload();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [error, resetErrorBoundary]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <LoadingSpinner />
    </div>
  );
}

function Scene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onReset={() => {
          console.log('Error boundary reset');
        }}
        onError={(error) => {
          console.error('Scene Error:', error);
        }}
      >
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <LoadingSpinner />
            </div>
          }
        >
          <Canvas
            style={{ background: 'var(--background)' }}
            performance={{ min: 0.5 }}
            dpr={[1, 2]}
            className="absolute inset-0"
          >
            <SceneContent />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </motion.div>
  );
}

export default Scene;
