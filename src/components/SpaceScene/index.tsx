'use client';

import { useEffect, useState, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

const SpaceSceneContent = memo(function SpaceSceneContent({ isVisible }: { isVisible: boolean }) {
  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={true}
        autoRotate={isVisible}
        autoRotateSpeed={1}
      />
      {isVisible && <Model />}
    </>
  );
});

function SpaceScene() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    );

    const element = document.getElementById('space-canvas');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      id="space-canvas"
      camera={{
        position: [0, 8, 15],
        fov: 35,
        near: 0.1,
        far: 1000
      }}
      style={{ 
        background: 'var(--background)',
        width: '100%',
        height: '100%'
      }}
      className='cursor-all-scroll'
      performance={{ min: 0.5 }}
      dpr={[1, 2]}
    >
      <SpaceSceneContent isVisible={isVisible} />
    </Canvas>
  );
}

export default SpaceScene;