import React from 'react';
import type { ThemeType } from './ThemeBar';

interface BackgroundProps {
  theme?: ThemeType;
}

export const Background: React.FC<BackgroundProps> = ({ theme = 'default' }) => {
  if (theme === 'space') {
    return (
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-black via-blue-900 to-indigo-900" style={{ pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', left: '10%', top: '10%', fontSize: '4rem' }}>🪐</span>
        <span style={{ position: 'absolute', left: '70%', top: '20%', fontSize: '3.5rem' }}>🌠</span>
        <span style={{ position: 'absolute', left: '50%', top: '60%', fontSize: '5rem' }}>🌌</span>
        <span style={{ position: 'absolute', left: '80%', top: '70%', fontSize: '3rem' }}>⭐</span>
        <span style={{ position: 'absolute', left: '20%', top: '75%', fontSize: '3.5rem' }}>🚀</span>
      </div>
    );
  }
  if (theme === 'underwater') {
    return (
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-blue-300 via-blue-400 to-blue-700" style={{ pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', left: '12%', bottom: '8%', fontSize: '4rem' }}>🐠</span>
        <span style={{ position: 'absolute', left: '22%', bottom: '10%', fontSize: '3.5rem' }}>🐟</span>
        <span style={{ position: 'absolute', left: '60%', bottom: '12%', fontSize: '4.5rem' }}>🐡</span>
        <span style={{ position: 'absolute', left: '80%', bottom: '18%', fontSize: '3rem' }}>🦑</span>
        <span style={{ position: 'absolute', left: '70%', bottom: '5%', fontSize: '3.5rem' }}>🐬</span>
      </div>
    );
  }
  if (theme === 'cyberpunk') {
    return (
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-br from-fuchsia-900 via-blue-900 to-black" style={{ pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', left: '10%', bottom: '8%', fontSize: '5rem' }}>🌆</span>
        <span style={{ position: 'absolute', left: '80%', top: '10%', fontSize: '3.5rem' }}>💡</span>
        <span style={{ position: 'absolute', left: '60%', bottom: '10%', fontSize: '3.5rem' }}>🚦</span>
        <span style={{ position: 'absolute', left: '30%', top: '15%', fontSize: '3rem' }}>🛸</span>
        <span style={{ position: 'absolute', left: '50%', top: '60%', fontSize: '3.5rem' }}>🤖</span>
      </div>
    );
  }
  if (theme === 'halloween') {
    return (
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-orange-900 via-orange-700 to-black" style={{ pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', left: '10%', bottom: '8%', fontSize: '5rem' }}>🎃</span>
        <span style={{ position: 'absolute', left: '80%', top: '10%', fontSize: '3.5rem' }}>🦇</span>
        <span style={{ position: 'absolute', left: '60%', bottom: '10%', fontSize: '3.5rem' }}>👻</span>
        <span style={{ position: 'absolute', left: '30%', top: '15%', fontSize: '3rem' }}>🕸️</span>
        <span style={{ position: 'absolute', left: '50%', top: '60%', fontSize: '3.5rem' }}>🕷️</span>
      </div>
    );
  }
  if (theme === 'christmas') {
    return (
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-green-200 via-blue-100 to-white" style={{ pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', left: '10%', bottom: '8%', fontSize: '5rem' }}>🎄</span>
        <span style={{ position: 'absolute', left: '80%', top: '10%', fontSize: '4rem' }}>⛄</span>
        <span style={{ position: 'absolute', left: '60%', bottom: '10%', fontSize: '4rem' }}>🎅</span>
        <span style={{ position: 'absolute', left: '30%', top: '15%', fontSize: '3.5rem' }}>❄️</span>
        <span style={{ position: 'absolute', left: '70%', bottom: '5%', fontSize: '4rem' }}>🦌</span>
      </div>
    );
  }
  // Default: simple sky gradient with a few game icons
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-b from-blue-200 via-blue-100 to-white" style={{ pointerEvents: 'none' }}>
      <span style={{ position: 'absolute', left: '10%', bottom: '8%', fontSize: '4rem' }}>🎮</span>
      <span style={{ position: 'absolute', left: '80%', top: '10%', fontSize: '3.5rem' }}>🎲</span>
      <span style={{ position: 'absolute', left: '60%', bottom: '10%', fontSize: '4rem' }}>🕹️</span>
      <span style={{ position: 'absolute', left: '30%', top: '15%', fontSize: '3rem' }}>👾</span>
      <span style={{ position: 'absolute', left: '50%', top: '60%', fontSize: '3.5rem' }}>⭐</span>
    </div>
  );
};