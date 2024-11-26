'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Image from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import Crying from '/public/medias/crying.svg';
import Kissing from '/public/medias/kissing.svg';

interface PhotoData {
  id: string;
  src: string;
  caption?: string;
  position: { x: number; y: number; rotate: number };
  priority?: boolean;
}

const photos: PhotoData[] = [
  {
    id: 'climb',
    src: '/medias/photos/climb.jpg',
    caption: 'sky high',
    position: { x: 0.6, y: 0.35, rotate: 3 },
    priority: true,
  },
  {
    id: 'fitty',
    src: '/medias/photos/fitty.jpg',
    caption: 'fitty lan',
    position: { x: 0.8, y: 0.5, rotate: -25 },
  },
  {
    id: 'mount',
    src: '/medias/photos/mount.jpg',
    caption: 'brain hurty',
    position: { x: 0.0, y: 0.35, rotate: 20 },
    priority: true,
  },
  {
    id: 'slaves',
    src: '/medias/photos/slaves.jpg',
    caption: 'work work work work work',
    position: { x: 0.35, y: 0.4, rotate: 25 },
    priority: true,
  },
  {
    id: 'lab',
    src: '/medias/photos/lab.jpg',
    caption: 'lithium poisoning',
    position: { x: 0.4, y: -0.05, rotate: 10 },
    priority: true,
  },
  {
    id: 'little',
    src: '/medias/photos/little.jpg',
    caption: 'wahahaha',
    position: { x: 0.0, y: 0.6, rotate: 5 },
    priority: true,
  },
  {
    id: 'young',
    src: '/medias/photos/young.jpg',
    caption: 'day ONE',
    position: { x: 0.2, y: 0.4, rotate: -8 },
  },
  {
    id: 'kittens',
    src: '/medias/photos/kittens.jpg',
    caption: 'monsters!',
    position: { x: 0.7, y: 0.0, rotate: -8 },
  },
  {
    id: 'concert',
    src: '/medias/photos/concert.jpg',
    caption: 'the shell in sd :)',
    position: { x: 0.55, y: 0.4, rotate: 8 },
  },
  {
    id: 'lover',
    src: '/medias/photos/lover.jpg',
    caption: 'renny :>',
    position: { x: 0.1, y: 0.1, rotate: -5 },
  },
];

const imageDimensionsCache = new Map<
  string,
  { width: number; height: number }
>();

function useImageDimensions(
  src: string
): { width: number; height: number } | undefined {
  const [dimensions, setDimensions] = useState<
    { width: number; height: number } | undefined
  >(() => {
    return imageDimensionsCache.get(src);
  });

  useEffect(() => {
    if (imageDimensionsCache.has(src)) {
      setDimensions(imageDimensionsCache.get(src));
    } else {
      let isMounted = true;
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        const maxWidth = 300;
        const width = Math.min(maxWidth, img.width);
        const dims = { width, height: width / (img.width / img.height) };
        imageDimensionsCache.set(src, dims);
        if (isMounted) {
          setDimensions(dims);
        }
      };
      return () => {
        isMounted = false;
      };
    }
  }, [src]);

  return dimensions;
}

function useContainerSize(containerId: string) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const updateSize = () => {
      setSize({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();

    return () => resizeObserver.disconnect();
  }, [containerId]);

  return size;
}

interface PolaroidProps {
  photo: PhotoData;
  containerSize: { width: number; height: number };
  initialZIndex: number;
  getTopZIndex: () => number;
}

const PolaroidComponent = React.memo(function PolaroidComponent({
  photo,
  containerSize,
  initialZIndex,
  getTopZIndex,
}: PolaroidProps) {
  const x = useMotionValue(photo.position.x * containerSize.width);
  const y = useMotionValue(photo.position.y * containerSize.height);
  const [zIndex, setZIndex] = useState<number>(initialZIndex);

  useEffect(() => {
    x.set(photo.position.x * containerSize.width);
    y.set(photo.position.y * containerSize.height);
  }, [
    containerSize.width,
    containerSize.height,
    photo.position.x,
    photo.position.y,
    x,
    y,
  ]);

  const handleDragStart = useCallback(() => {
    setZIndex(getTopZIndex());
  }, [getTopZIndex]);

  const dimensions = useImageDimensions(photo.src);
  if (!dimensions) return null;

  return (
    <motion.div
      className="absolute select-none cursor-grab active:cursor-grabbing"
      style={{ x, y, rotate: photo.position.rotate, zIndex }}
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.02 }}
      whileDrag={{ scale: 1.1 }}
      onDragStart={handleDragStart}
    >
      <div
        className="relative bg-background p-4 shadow-[0_10px_15px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden group 
                  before:transition-opacity before:duration-500 before:ease-in-out
                  hover:before:opacity-100 before:opacity-30 before:absolute before:inset-0 before:z-10 
                  before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] 
                  after:absolute after:inset-0 after:z-20 after:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_10%,transparent_70%)]"
        style={{
          width: dimensions.width + 32,
          height: dimensions.height + 84,
        }}
      >
        <div
          className="relative pointer-events-none"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <Image
            src={photo.src}
            alt={photo.caption || ''}
            fill
            className="object-cover"
            draggable={false}
            loading={photo.priority ? 'eager' : 'lazy'}
            sizes="(max-width: 300px) 100vw, 300px"
          />
        </div>
        {photo.caption && (
          <div className="mt-4 text-xl text-center font-bulgatti text-foreground relative z-30">
            {photo.caption}
          </div>
        )}
      </div>
    </motion.div>
  );
});

function PolaroidScene() {
  const zIndexRef = useRef(photos.length);
  const getTopZIndex = useCallback(() => {
    zIndexRef.current += 1;
    return zIndexRef.current;
  }, []);

  const containerSize = useContainerSize('polaroid-container');

  const memoizedPolaroids = useMemo(
    () =>
      photos.map((photo, i) => (
        <PolaroidComponent
          key={photo.id}
          photo={photo}
          containerSize={containerSize}
          initialZIndex={i}
          getTopZIndex={getTopZIndex}
        />
      )),
    [containerSize, getTopZIndex]
  );

  return (
    <div className="h-screen relative">
      <div id="polaroid-container" className="w-full h-full relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <p className="select-none absolute bg-foreground p-10 left-12 text-2xl rounded-b-2xl text-background font-theme shadow-[0_10px_15px_rgba(0,0,0,0.3)]">
            Place anywhere
          </p>
          <Crying className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 dark:hidden" />
          <Kissing className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 hidden dark:block fill-foreground" />
        </div>
        {memoizedPolaroids}
      </div>
    </div>
  );
}

export default PolaroidScene;
