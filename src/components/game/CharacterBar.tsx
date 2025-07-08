import React, { useState, useRef, useEffect } from 'react';

export type CharacterType = 'dino' | 'dragon' | 'unicorn' | 'ninja';

interface CharacterBarProps {
  selected: CharacterType;
  onSelect: (type: CharacterType) => void;
}

const CHARACTERS: Array<{
  key: CharacterType;
  icon: React.ReactNode;
  name: string;
  ability: string;
}> = [
  {
    key: 'dino',
    icon: <span role="img" aria-label="Dino" className="text-2xl">🦖</span>,
    name: 'Dino',
    ability: 'No special ability',
  },
  {
    key: 'dragon',
    icon: <span role="img" aria-label="Dragon" className="text-2xl">🐉</span>,
    name: 'Dragon',
    ability: 'Glide: slower fall after jump',
  },
  {
    key: 'unicorn',
    icon: <span role="img" aria-label="Unicorn" className="text-2xl">🦄</span>,
    name: 'Unicorn',
    ability: 'Double Jump',
  },
  {
    key: 'ninja',
    icon: <span role="img" aria-label="Ninja Dino" className="text-2xl">🥷🦖</span>,
    name: 'Ninja Dino',
    ability: 'Dash: pass through one obstacle',
  },
];

export const CharacterBar: React.FC<CharacterBarProps> = ({ selected, onSelect }) => {
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

  const selectedChar = CHARACTERS.find(c => c.key === selected) || CHARACTERS[0];

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start">
      {/* Main Character Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 via-green-500 to-green-700 border-4 border-white rounded-full shadow-2xl text-5xl hover:scale-110 focus:outline-none transition relative"
        aria-label="Select Character"
        title={`${selectedChar.name}: ${selectedChar.ability}`}
      >
        <span className="drop-shadow-lg animate-pulse text-5xl text-white">{selectedChar.icon}</span>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-white bg-opacity-80 rounded px-2 py-1 text-green-800 shadow-md border border-green-200 font-bold">{selectedChar.name}</span>
      </button>
      {/* Sub-menu */}
      {open && (
        <div
          ref={menuRef}
          className="mb-2 bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-2xl border-4 border-green-300 flex flex-col items-center py-4 px-6 space-y-3 animate-fade-in z-[101] max-w-xs max-h-60 overflow-auto"
          style={{ bottom: '100%', position: 'absolute', left: 0, transform: 'translateY(-12px)' }}
        >
          {CHARACTERS.map(char => (
            <button
              key={char.key}
              onClick={() => {
                onSelect(char.key);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-green-900 font-bold text-xl bg-white/80 hover:bg-green-100 border-2 border-green-200 focus:outline-none transition w-full justify-start shadow-lg hover:scale-105 relative ${selected === char.key ? 'ring-4 ring-green-400 border-green-500 scale-110 bg-green-50' : ''}`}
              title={`${char.name}: ${char.ability}`}
            >
              <span className="flex flex-col items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 mb-1 text-2xl drop-shadow-md">{char.icon}</span>
                <span className={`font-extrabold text-green-900 text-xs px-2 rounded transition-all duration-200 mb-1 ${selected === char.key ? 'border-4 border-blue-400 bg-blue-50 shadow-lg' : 'border-2 border-transparent'}`}>{char.name}</span>
                <span className="text-[10px] text-green-700 font-normal">{char.ability}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 