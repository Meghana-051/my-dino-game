import React, { useState, useRef, useEffect } from 'react';
import { PowerUpType } from './PowerUpHUD';

interface PowerUpBarProps {
  onActivate: (type: PowerUpType) => void;
  activePowerUps: PowerUpType[];
}

const ICONS: Record<PowerUpType, React.ReactNode> = {
  shield: <span role="img" aria-label="Shield" className="text-2xl">🛡️</span>,
  speed: <span role="img" aria-label="Speed" className="text-2xl">🚀</span>,
  magnet: <span role="img" aria-label="Magnet" className="text-2xl">🧲</span>,
};

const LABELS: Record<PowerUpType, string> = {
  shield: 'Shield',
  speed: 'Speed',
  magnet: 'Magnet',
};

export const PowerUpBar: React.FC<PowerUpBarProps> = ({ onActivate, activePowerUps }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Main Power-Up Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center p-5 bg-gradient-to-br from-yellow-400 via-green-400 to-green-700 text-white rounded-full shadow-2xl text-4xl hover:scale-110 focus:outline-none transition relative border-4 border-white hover:border-yellow-300"
        aria-label="Power-Ups"
      >
        ⚡
      </button>
      {/* Sub-menu */}
      {open && (
        <div
          ref={menuRef}
          className="mt-2 bg-gradient-to-br from-yellow-50 via-white to-green-100 rounded-2xl shadow-2xl border-4 border-yellow-300 flex flex-col items-center py-4 px-6 space-y-3 animate-fade-in"
        >
          {(['shield', 'speed', 'magnet'] as PowerUpType[]).map(type => (
            <button
              key={type}
              onClick={() => {
                if (!activePowerUps.includes(type)) {
                  onActivate(type);
                  setOpen(false);
                }
              }}
              disabled={activePowerUps.includes(type)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-yellow-900 font-bold text-xl bg-white/80 hover:bg-yellow-100 border-2 border-yellow-200 focus:outline-none transition w-full justify-start shadow-lg hover:scale-105 relative ${activePowerUps.includes(type) ? 'opacity-50 cursor-not-allowed' : 'hover:ring-4 hover:ring-yellow-300'} ${activePowerUps.includes(type) ? '' : 'hover:border-yellow-400'}`}
              title={LABELS[type]}
            >
              <span className="text-4xl drop-shadow-md animate-bounce-slow">{ICONS[type]}</span>
              <span className="flex flex-col items-start">
                <span className="font-extrabold text-yellow-900">{LABELS[type]}</span>
                <span className="text-xs text-yellow-700 font-normal capitalize">{type}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 