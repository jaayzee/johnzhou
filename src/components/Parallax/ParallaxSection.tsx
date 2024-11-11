'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

type ParallaxSectionProps = {
  children?: React.ReactNode;
  scene: React.ReactNode;
}

export default function ParallaxSection({ scene, children }: ParallaxSectionProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className='relative flex items-center justify-center h-screen overflow-hidden'
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className='relative z-10 p-10 mix-blend-difference text-white w-full h-full flex flex-col justify-between pointer-events-none'>
        {children}
      </div>
      <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
        <motion.div style={{ y }} className='relative w-full h-full'>
          {scene}
        </motion.div>
      </div>
    </div>
  );
}