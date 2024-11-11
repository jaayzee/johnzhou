'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'

export default function SpaceScene() {
  return (
    <Canvas
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
    >
      <OrbitControls 
        enableZoom={false} 
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={1}
      />
      <Model />
    </Canvas>
  )
}