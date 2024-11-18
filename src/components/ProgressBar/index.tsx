'use client'

import React, { useEffect, useState, useRef } from 'react';

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const customPath = "M46.924608,3.3628687 46.425825,28.586885 31.844924,71.251964 40.613198,80.929066 51.782485,69.799711 46.32599,40.312727 37.582099,69.742209 46.512444,79.339105 56.617018,88.985933 89.095728,84.131849 57.607613,77.016445 37.061953,95.697041 42.94623,129.61954 50.134431,95.640615 31.443486,78.098109 3.1419843,83.74947 33.696477,91.749524 44.169685,82.815591 56.571359,95.257832 43.767951,148.45827 44.409151,290.17725";

  return (
    <svg 
      viewBox="0 0 92 294" 
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <path
        d={customPath}
        fill="none"
        stroke="#ccc"
        strokeWidth="0.5"
        className="opacity-20"
      />

      <path
        ref={pathRef}
        d={customPath}
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="1"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength - ((scrollProgress / 100) * pathLength)}
        filter="url(#glow)"
        className="transition-all duration-100"
      />
    </svg>
  );
}