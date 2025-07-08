import React from 'react';
import type { CharacterType } from './CharacterBar';
import type { ThemeType } from './ThemeBar';

interface PlayerProps {
  x: number;
  y: number;
  isJumping: boolean;
  character: CharacterType;
  theme: ThemeType;
}

export const Player = ({ x, y, isJumping, character, theme }: PlayerProps) => {
  // Use a simple running animation by alternating leg positions
  const [runFrame, setRunFrame] = React.useState(0);
  React.useEffect(() => {
    if (!isJumping) {
      const interval = setInterval(() => {
        setRunFrame(f => (f + 1) % 2);
      }, 120);
      return () => clearInterval(interval);
    }
  }, [isJumping]);

  // Theme color helpers
  const getAccent = () => {
    switch (theme) {
      case 'space': return '#00fff7';
      case 'underwater': return '#ffb347';
      case 'cyberpunk': return '#ff00cc';
      case 'halloween': return '#ff9800';
      case 'christmas': return '#388e3c';
      default: return undefined;
    }
  };
  const accent = getAccent();
  const outline = theme === 'space' ? '#fff' : theme === 'cyberpunk' ? '#00fff7' : theme === 'halloween' ? '#222' : theme === 'christmas' ? '#fff' : '#222';

  // Animation helpers
  const tilt = isJumping ? -18 : 0;
  const tailWag = runFrame === 0 ? -10 : 10;
  const wingFlap = runFrame === 0 ? -18 : 18;
  const maneShift = runFrame === 0 ? 0 : 3;
  const bandFlutter = runFrame === 0 ? 0 : 4;

  let sprite: React.ReactNode;
  if (character === 'dragon') {
    sprite = (
      <svg width={120} height={90} viewBox="0 0 64 48">
        <g transform={`rotate(${tilt} 32 32)`}>
          <ellipse cx={32} cy={32} rx={18} ry={10} fill={accent || '#b22222'} stroke={outline} strokeWidth={2} />
          <ellipse cx={52} cy={24} rx={8} ry={7} fill={accent || '#b22222'} stroke={outline} strokeWidth={2} />
          <circle cx={57} cy={22} r={1.5} fill="#fff" />
          <g transform={`rotate(${wingFlap} 20 32)`}>
            <path d="M20 32 Q10 10 32 20 Q28 28 20 32" fill={accent || '#e57373'} opacity=".7" />
          </g>
          <rect x={10} y={36} width={12} height={3} fill={accent || '#b22222'} transform={`rotate(${tailWag} 10 36)`} />
          {isJumping ? (
            <rect x={28} y={40} width={4} height={8} fill="#800000" />
          ) : runFrame === 0 ? (
            <>
              <rect x={28} y={40} width={4} height={8} fill="#800000" />
              <rect x={36} y={40} width={4} height={8} fill="#800000" />
            </>
          ) : (
            <>
              <rect x={30} y={42} width={4} height={8} fill="#800000" />
              <rect x={34} y={40} width={4} height={8} fill="#800000" />
            </>
          )}
        </g>
      </svg>
    );
  } else if (character === 'unicorn') {
    sprite = (
      <svg width={120} height={90} viewBox="0 0 64 48">
        <g transform={`rotate(${tilt} 32 32)`}>
          <ellipse cx={32} cy={32} rx={16} ry={9} fill="#fff" stroke={accent || '#e0e0e0'} strokeWidth={2} />
          <ellipse cx={50} cy={24} rx={7} ry={6} fill="#fff" stroke={accent || '#e0e0e0'} strokeWidth={2} />
          <circle cx={54} cy={22} r={1.5} fill={accent || '#222'} />
          <rect x={56} y={14} width={2} height={10} fill={accent || '#ffd700'} transform="rotate(-10 56 14)" />
          <circle cx={57} cy={14} r={runFrame === 0 ? 1 : 2} fill={accent || '#ffd700'} opacity=".7" />
          <ellipse cx={44 + maneShift} cy={28} rx={3} ry={6} fill={accent || '#ba68c8'} />
          <rect x={16} y={38} width={10} height={3} fill={accent || '#ba68c8'} transform={`rotate(${tailWag} 16 38)`} />
          {isJumping ? (
            <rect x={28} y={40} width={3} height={8} fill={accent || '#bdbdbd'} />
          ) : runFrame === 0 ? (
            <>
              <rect x={28} y={40} width={3} height={8} fill={accent || '#bdbdbd'} />
              <rect x={36} y={40} width={3} height={8} fill={accent || '#bdbdbd'} />
            </>
          ) : (
            <>
              <rect x={30} y={42} width={3} height={8} fill={accent || '#bdbdbd'} />
              <rect x={34} y={40} width={3} height={8} fill={accent || '#bdbdbd'} />
            </>
          )}
        </g>
      </svg>
    );
  } else if (character === 'ninja') {
    sprite = (
      <svg width={120} height={90} viewBox="0 0 64 48">
        <g transform={`rotate(${tilt} 32 32)`}>
          <ellipse cx={32} cy={32} rx={16} ry={9} fill={accent || '#222'} stroke={outline} strokeWidth={2} />
          <ellipse cx={50} cy={24} rx={7} ry={6} fill={accent || '#222'} stroke={outline} strokeWidth={2} />
          <rect x={46} y={20 - bandFlutter} width={8} height={4} fill={accent || '#e53935'} />
          <circle cx={54} cy={22} r={1.5} fill="#fff" />
          <rect x={40} y={32} width={8} height={2} fill={accent || '#444'} />
          <rect x={16} y={38} width={10} height={3} fill={accent || '#444'} transform={`rotate(${tailWag} 16 38)`} />
          {isJumping ? (
            <rect x={28} y={40} width={3} height={8} fill={accent || '#444'} />
          ) : runFrame === 0 ? (
            <>
              <rect x={28} y={40} width={3} height={8} fill={accent || '#444'} />
              <rect x={36} y={40} width={3} height={8} fill={accent || '#444'} />
            </>
          ) : (
            <>
              <rect x={30} y={42} width={3} height={8} fill={accent || '#444'} />
              <rect x={34} y={40} width={3} height={8} fill={accent || '#444'} />
            </>
          )}
        </g>
      </svg>
    );
  } else {
    // Default: dino
    sprite = (
      <svg width={120} height={90} viewBox="0 0 64 48">
        <g transform={`rotate(${tilt} 32 32)`}>
          <rect x={14} y={20} width={24} height={18} fill={accent || '#3cb371'} stroke={outline} strokeWidth={2} />
          <rect x={32} y={12} width={14} height={12} fill={accent || '#3cb371'} stroke={outline} strokeWidth={2} />
          <rect x={42} y={16} width={3} height={3} fill={accent || '#222'} />
          <rect x={8} y={30} width={8} height={6} fill={accent || '#3cb371'} transform={`rotate(${tailWag} 8 30)`} />
          <rect x={36} y={30} width={8} height={3} fill={accent || '#388e5a'} />
          {isJumping ? (
            <rect x={20} y={38} width={6} height={10} fill={accent || '#388e5a'} />
          ) : runFrame === 0 ? (
            <>
              <rect x={20} y={38} width={6} height={10} fill={accent || '#388e5a'} />
              <rect x={30} y={38} width={6} height={10} fill={accent || '#388e5a'} />
            </>
          ) : (
            <>
              <rect x={22} y={40} width={6} height={10} fill={accent || '#388e5a'} />
              <rect x={28} y={38} width={6} height={10} fill={accent || '#388e5a'} />
            </>
          )}
        </g>
      </svg>
    );
  }

  return (
    <div
      className="absolute"
      style={{
        left: x,
        bottom: y,
        width: 120,
        height: 90,
        zIndex: 10,
      }}
    >
      {sprite}
    </div>
  );
};