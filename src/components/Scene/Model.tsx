'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PresentationControls, MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Color } from 'three';
import { useControls } from 'leva';

export default function Model() {
    const { nodes } = useGLTF("/medias/star.glb");
    const { viewport } = useThree();
    const star = useRef<Mesh>(null);
    
    const [bgColor, setBgColor] = useState(new Color(getComputedStyle(document.documentElement).getPropertyValue('--background')));
    const [textColor, setTextColor] = useState(new Color(getComputedStyle(document.documentElement).getPropertyValue('--foreground')));
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const updateColors = () => {
            const newBgColor = new Color(getComputedStyle(document.documentElement).getPropertyValue('--background'));
            const newTextColor = new Color(getComputedStyle(document.documentElement).getPropertyValue('--foreground'));
            const newIsDarkMode = document.documentElement.classList.contains('dark');
            
            setBgColor(newBgColor);
            setTextColor(newTextColor);
            setIsDarkMode(newIsDarkMode);
        };

        // run initially
        updateColors();

        // watch for theme changes
        const observer = new MutationObserver(updateColors);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // watch for visibility changes
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateColors();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // mesh transmission controls
    // const materialProps = useControls({
    //     thickness: { value: 0.15, min: 0, max: 3, step: 0.05 },
    //     roughness: { value: 0.3, min: 0, max: 1, step: 0.1 },
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    //     chromaticAberration: { value: 0.10, min: 0, max: 1},
    //     backside: { value: true },
    // })

    const materialProps = {
        thickness: 0.15,
        roughness: 0.3,
        transmission: 1,
        ior: 1.2,
        chromaticAberration: 0.1,
        backside: true,
    }
    
    // mesh auto-rotation
    useFrame(({}) => {
        if (star.current) {
            star.current.rotation.y += 0.005;
            star.current.rotation.z += 0.005;
        }
    })

    return (
        <group>
            <Text 
                font={isDarkMode ? '/fonts/BICRODE.otf' : '/fonts/Estrella-Early.otf'}
                position={[0, 0, -1]}
                fontSize={0.5}
                color={textColor}
                anchorX="center"
                anchorY="middle"
                scale={isDarkMode ? viewport.width / 6 : viewport.width / 4}
            >
                ✦ JOHN {isDarkMode ? '' : '  '}✦ ZHOU ✦ {/* Estrella fontface requires additional spaces for proper look */}
            </Text>
            <PresentationControls
                global={false}
                cursor={true}
                speed={1}
                zoom={1}
                polar={[-Infinity, Infinity]}
                azimuth={[-Infinity, Infinity]}
                config={{ mass: 5, tension: 1000 }}
                snap={true}
            >
                <mesh 
                    ref={star} 
                    {...nodes.star}
                    scale={viewport.width / 5}
                >
                    <MeshTransmissionMaterial 
                        {...materialProps}
                        background={bgColor}
                    />
                </mesh>
            </PresentationControls>
        </group>
    )
}