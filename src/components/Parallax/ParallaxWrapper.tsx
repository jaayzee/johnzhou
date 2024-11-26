'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';

type ParallaxWrapperProps = {
  children: React.ReactNode;
};

export default function ParallaxWrapper({ children }: ParallaxWrapperProps) {
  const container = useRef<HTMLDivElement>(null);

  // smooth scrolling
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // parallax effect
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);

  return (
    <div ref={container} className="h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="relative h-full">
        {children}
      </motion.div>
    </div>
  );
}
