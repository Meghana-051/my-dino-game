import React from 'react';
import type { ThemeType } from './ThemeBar';

interface DinoObstacleProps {
  x: number;
  y: number;
  theme: ThemeType;
}

export const DinoObstacle = ({ x, y, theme }: DinoObstacleProps) => {
  // Theme color logic
  let fill = '#2d5a2d';
  let stroke = '#1a3d1a';
  if (theme === 'space') {
    fill = '#00fff7'; stroke = '#fff';
  } else if (theme === 'underwater') {
    fill = '#ffb347'; stroke = '#ff9800';
  } else if (theme === 'cyberpunk') {
    fill = '#ff00cc'; stroke = '#00fff7';
  } else if (theme === 'halloween') {
    fill = '#ff9800'; stroke = '#222';
  } else if (theme === 'christmas') {
    fill = '#388e3c'; stroke = '#fff';
  }

  return (
    <div
      className="absolute"
      style={{
        left: x,
        bottom: y,
        width: 50,
        height: 80,
        zIndex: 3,
      }}
    >
      {/* Larger Chrome Dino style cactus */}
      <svg width={50} height={80} viewBox="0 0 50 80">
        {/* Main cactus body */}
        <rect x={20} y={16} width={10} height={64} fill={fill} stroke={stroke} strokeWidth={2} />
        {/* Left arm */}
        <rect x={10} y={32} width={10} height={8} fill={fill} stroke={stroke} strokeWidth={2} />
        {/* Right arm */}
        <rect x={30} y={40} width={10} height={8} fill={fill} stroke={stroke} strokeWidth={2} />
        {/* Top segment */}
        <rect x={16} y={0} width={18} height={16} fill={fill} stroke={stroke} strokeWidth={2} />
        {/* Cactus details/spikes */}
        <rect x={24} y={24} width={3} height={3} fill={stroke} />
        <rect x={24} y={48} width={3} height={3} fill={stroke} />
        <rect x={14} y={36} width={3} height={3} fill={stroke} />
        <rect x={34} y={54} width={3} height={3} fill={stroke} />
      </svg>
    </div>
  );
}; 