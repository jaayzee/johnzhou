'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Model() {
  const pointsRef = useRef<THREE.Points>(null)
  const [starColor, setStarColor] = useState(new THREE.Color('#ffffff'))
  
  // watch for theme changes
  useEffect(() => {
    const updateColors = () => {
      const newStarColor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--foreground'))
      setStarColor(newStarColor)
    }

    // instantiate update
    updateColors()

    // watcher for theme changes
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // watcher for visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateColors()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
  
  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, 256, 256)
    ctx.fillStyle = '#ffffff'
    ctx.font = '200px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦', 128, 128)
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.premultiplyAlpha = true
    return texture
  }, [])

  const gridSize = 100
  const spacing = 0.25
  const radius = 12
  const points: number[] = []
  const sizes: number[] = []
  const opacities: number[] = []
  const initialPositions: number[] = []
  
  const fadeStartRadius = radius * 0.5
  const fadeEndRadius = radius * 0.9
  const fadeExponent = 2.5
  const valleyFadeThreshold = -0.5
  const valleyFadeRange = 1.0

  for(let i = -gridSize/2; i < gridSize/2; i++) {
    for(let j = -gridSize/2; j < gridSize/2; j++) {
      const x = i * spacing
      const z = j * spacing
      const distFromCenter = Math.sqrt(x * x + z * z)
      
      if(distFromCenter <= radius) {
        points.push(x, 0, z)
        initialPositions.push(x, 0, z)
        
        const sizeVariation = Math.random() * 0.3 + 2.0
        sizes.push(sizeVariation)
        
        let edgeOpacity
        if (distFromCenter < fadeStartRadius) {
          edgeOpacity = 1.0
        } else {
          const fadeProgress = (distFromCenter - fadeStartRadius) / (fadeEndRadius - fadeStartRadius)
          edgeOpacity = Math.max(0, 1 - Math.pow(fadeProgress, fadeExponent))
        }
        
        opacities.push(edgeOpacity)
      }
    }
  }

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const opacity = pointsRef.current.geometry.attributes.opacity.array as Float32Array
    const time = clock.elapsedTime * 0.5
    
    const waveSpeed = 0.1
    const waveDirX = Math.sin(time * 0.5)
    const waveDirZ = Math.cos(time * 0.5)
    
    for (let i = 0; i < positions.length; i += 3) {
      const originalX = initialPositions[i]
      const originalZ = initialPositions[i + 2]
      const dist = Math.sqrt(originalX * originalX + originalZ * originalZ)
      
      if (dist <= radius) {
        const wavePhaseX = (originalX * waveDirX + originalZ * waveDirZ) * 0.5
        const wavePhaseZ = (originalX * -waveDirZ + originalZ * waveDirX) * 0.5
        
        const mainWave = 
          Math.sin(wavePhaseX + time * waveSpeed) * 0.8 +
          Math.cos(wavePhaseZ + time * waveSpeed * 1.1) * 0.6

        const secondaryWave = 
          Math.sin(wavePhaseX * 2 - time * waveSpeed * 1.3) * 0.3 +
          Math.cos(wavePhaseZ * 2 - time * waveSpeed * 0.7) * 0.2

        const edgeDroop = Math.pow(dist / radius, 2) * 2
        const height = (mainWave + secondaryWave) * Math.max(0, 1 - dist / radius * 0.8) - edgeDroop

        const xOffset = Math.sin(wavePhaseX * 0.5 + time) * 0.1
        const zOffset = Math.cos(wavePhaseZ * 0.5 + time) * 0.1

        positions[i] = originalX + xOffset * (1 - dist / radius)
        positions[i + 1] = height
        positions[i + 2] = originalZ + zOffset * (1 - dist / radius)

        const newDist = Math.sqrt(
          positions[i] * positions[i] + 
          positions[i + 2] * positions[i + 2]
        )
        
        let edgeOpacity
        if (newDist < fadeStartRadius) {
          edgeOpacity = 1.0
        } else {
          const fadeProgress = (newDist - fadeStartRadius) / (fadeEndRadius - fadeStartRadius)
          edgeOpacity = Math.max(0, 1 - Math.pow(fadeProgress, fadeExponent))
        }
        
        let valleyOpacity = 1.0
        if (positions[i + 1] < valleyFadeThreshold) {
          valleyOpacity = Math.max(0, 1 - (valleyFadeThreshold - positions[i + 1]) / valleyFadeRange)
        }
        
        opacity[i / 3] = edgeOpacity * valleyOpacity
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true

    // update for dark/light mode
    if (pointsRef.current.material instanceof THREE.ShaderMaterial) {
      pointsRef.current.material.uniforms.starColor.value = starColor
    }
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
  geometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1))
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      starTexture: { value: starTexture },
      starColor: { value: starColor }
    },
    vertexShader: `
      attribute float size;
      attribute float opacity;
      varying float vOpacity;
      
      void main() {
        vOpacity = opacity;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * 300.0 / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D starTexture;
      uniform vec3 starColor;
      varying float vOpacity;
      
      void main() {
        vec4 texColor = texture2D(starTexture, gl_PointCoord);
        gl_FragColor = vec4(starColor, texColor.a * vOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}