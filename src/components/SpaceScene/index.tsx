'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model';

export default function Index() {
  return (
    <Canvas style={{ background: 'var(--foreground)' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Model />
    </Canvas>
  )
}