'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OverlayCardsProps {
  leftChild: ReactNode;
  rightChild: ReactNode;
}

type CardPosition = 'left' | 'right';

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

const OverlayCards: React.FC<OverlayCardsProps> = ({
  leftChild,
  rightChild,
}) => {
  const [activeCard, setActiveCard] = useState<CardPosition>('left');
  const { width } = useWindowSize();

  const backX = Math.min(width * 0.1, 200);
  const hoverX = backX + 60;

  const cardVariants = {
    front: {
      x: -backX + 40,
      y: 40,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      zIndex: 20,
    },
    back: { x: backX, y: 0, scale: 0.95, zIndex: 10 },
    hover: {
      x: hoverX,
      y: -30,
      scale: 0.95,
      rotate: 20,
      zIndex: 10,
      cursor: 'pointer',
    },
  };

  return (
    <div className=" select-none relative h-full w-full max-w-md perspective-[1000px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key="left"
          initial={activeCard === 'left' ? 'front' : 'back'}
          animate={activeCard === 'left' ? 'front' : 'back'}
          variants={cardVariants}
          whileHover={activeCard !== 'left' ? 'hover' : undefined}
          className="absolute w-11/12 bg-foreground-transparent backdrop-blur rounded-2xl shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
          onClick={() => activeCard !== 'left' && setActiveCard('left')}
        >
          {leftChild}
        </motion.div>
        <motion.div
          key="right"
          initial={activeCard === 'right' ? 'front' : 'back'}
          animate={activeCard === 'right' ? 'front' : 'back'}
          variants={cardVariants}
          whileHover={activeCard !== 'right' ? 'hover' : undefined}
          className="absolute w-11/12 bg-foreground-transparent backdrop-blur rounded-2xl shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
          onClick={() => activeCard !== 'right' && setActiveCard('right')}
        >
          {rightChild}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OverlayCards;
