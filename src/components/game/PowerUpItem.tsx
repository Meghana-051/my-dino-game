import React from 'react';
import { PowerUpType } from './PowerUpHUD';

interface PowerUpItemProps {
  x: number;
  y: number;
  type: PowerUpType;
}

const ICONS: Record<PowerUpType, React.ReactNode> = {
  shield: <span role="img" aria-label="Shield" className="text-3xl">🛡️</span>,
  speed: <span role="img" aria-label="Speed" className="text-3xl">🚀</span>,
  magnet: <span role="img" aria-label="Magnet" className="text-3xl">🧲</span>,
};

export const PowerUpItem: React.FC<PowerUpItemProps> = ({ x, y, type }) => {
  return (
    <div
      className="absolute animate-bounce-slow"
      style={{
        left: x,
        bottom: y,
        width: 48,
        height: 48,
        zIndex: 5,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 12px gold) drop-shadow(0 0 8px #fff8)'
      }}
    >
      <div className="flex items-center justify-center w-full h-full rounded-full bg-yellow-100 border-4 border-yellow-400 shadow-xl">
        <span className="text-4xl">{ICONS[type]}</span>
      </div>
    </div>
  );
}; 