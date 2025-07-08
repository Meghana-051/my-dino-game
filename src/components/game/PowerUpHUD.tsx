import React from 'react';

export type PowerUpType = 'shield' | 'speed' | 'magnet';

type PowerUpCount = Record<PowerUpType, number>;

interface PowerUpHUDProps {
  activePowerUps: Array<{
    type: PowerUpType;
    remaining: number; // seconds
    total: number; // seconds
  }>;
  powerUpCount: PowerUpCount;
}

const ICONS: Record<PowerUpType, React.ReactNode> = {
  shield: <span role="img" aria-label="Shield" className="text-2xl">🛡️</span>,
  speed: <span role="img" aria-label="Speed" className="text-2xl">🚀</span>,
  magnet: <span role="img" aria-label="Magnet" className="text-2xl">🧲</span>,
};

export const PowerUpHUD: React.FC<PowerUpHUDProps> = ({ activePowerUps, powerUpCount }) => {
  if (!activePowerUps.length) return null;
  return (
    <div className="fixed top-6 right-8 z-50 flex flex-col items-end space-y-3">
      {activePowerUps.map((pu, idx) => {
        const percent = Math.max(0, Math.min(1, pu.remaining / pu.total));
        return (
          <div key={pu.type} className="relative flex items-center group">
            <div className="rounded-full bg-white shadow-lg p-2 border-2 border-green-400 animate-pulse">
              <span className="drop-shadow-lg">
                {ICONS[pu.type]}
                {powerUpCount && powerUpCount[pu.type] > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-0.5 border-2 border-white shadow-lg">
                    {powerUpCount[pu.type]}
                  </span>
                )}
              </span>
              {/* Glow effect */}
              <span className="absolute inset-0 rounded-full pointer-events-none animate-pulse bg-green-300 opacity-20" />
            </div>
            {/* Timer bar */}
            <div className="ml-2 w-20 h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-200"
                style={{ width: `${percent * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}; 