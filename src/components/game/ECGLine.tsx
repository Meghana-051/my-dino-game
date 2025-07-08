import React, { useEffect, useRef } from 'react';

interface ECGLineProps {
  isPlaying: boolean;
}

export const ECGLine: React.FC<ECGLineProps> = ({ isPlaying }) => {
  const lineRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();
  const offset = useRef(0);

  useEffect(() => {
    if (!isPlaying) return;
    function animate() {
      offset.current += 1; // Speed of scrolling
      if (lineRef.current) {
        lineRef.current.style.transform = `translateX(-${offset.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  // SVG path for a repeating ECG pulse
  // The pattern repeats horizontally
  const width = 1200; // Large enough to cover the screen and allow scrolling
  const height = 40;
  const path = `M0,20 L40,20 L50,5 L60,35 L70,20 L120,20 L130,10 L140,30 L150,20 L200,20 L210,5 L220,35 L230,20 L280,20 L290,10 L300,30 L310,20 L360,20 L370,5 L380,35 L390,20 L440,20 L450,10 L460,30 L470,20 L520,20 L530,5 L540,35 L550,20 L600,20 L610,10 L620,30 L630,20 L680,20 L690,5 L700,35 L710,20 L760,20 L770,10 L780,30 L790,20 L840,20 L850,5 L860,35 L870,20 L920,20 L930,10 L940,30 L950,20 L1000,20 L1010,5 L1020,35 L1030,20 L1080,20 L1090,10 L1100,30 L1110,20 L1160,20`;

  return (
    <svg
      ref={lineRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        left: 0,
        bottom: 32, // Just above the ground
        zIndex: 2,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    >
      <path
        d={path}
        fill="none"
        stroke="#ff3366"
        strokeWidth={4}
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(255,0,64,0.3))' }}
      />
    </svg>
  );
}; 