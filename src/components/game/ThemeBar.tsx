import React, { useState, useRef, useEffect } from 'react';

export type ThemeType = 'default' | 'space' | 'underwater' | 'cyberpunk' | 'halloween' | 'christmas';

interface ThemeBarProps {
  selected: ThemeType;
  onSelect: (type: ThemeType) => void;
}

const THEMES: Array<{
  key: ThemeType;
  icon: React.ReactNode;
  name: string;
}> = [
  { key: 'default', icon: <span className="text-2xl">🎮</span>, name: 'Default' },
  { key: 'space', icon: <span className="text-2xl">🌌</span>, name: 'Space' },
  { key: 'underwater', icon: <span className="text-2xl">🐠</span>, name: 'Underwater' },
  { key: 'cyberpunk', icon: <span className="text-2xl">🌆</span>, name: 'Cyberpunk' },
  { key: 'halloween', icon: <span className="text-2xl">🎃</span>, name: 'Halloween' },
  { key: 'christmas', icon: <span className="text-2xl">🎄</span>, name: 'Christmas' },
];

export const ThemeBar: React.FC<ThemeBarProps> = ({ selected, onSelect }) => {
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
    <div className="fixed bottom-36 right-8 z-[100] flex flex-col items-end">
      {/* Main Theme Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center p-4 bg-gradient-to-br from-green-500 via-green-400 to-green-700 text-white rounded-full shadow-2xl text-3xl hover:scale-110 focus:outline-none transition relative border-4 border-white hover:border-green-300"
        aria-label="Themes"
      >
        <span className="text-3xl text-green-900">🎨</span>
      </button>
      {/* Sub-menu */}
      {open && (
        <div
          ref={menuRef}
          className="mb-2 bg-gradient-to-br from-green-100 via-white to-green-300 rounded-2xl shadow-2xl border-4 border-green-400 flex flex-col items-center py-4 px-6 space-y-3 animate-fade-in max-w-xs max-h-60 overflow-auto z-[101]"
          style={{ bottom: '100%', position: 'absolute', right: 0, transform: 'translateY(-12px)' }}
        >
          {THEMES.map(theme => (
            <button
              key={theme.key}
              onClick={() => {
                onSelect(theme.key);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-green-900 font-bold text-xl bg-white/80 hover:bg-green-100 border-2 border-green-200 focus:outline-none transition w-full justify-start shadow-lg hover:scale-105 relative ${selected === theme.key ? 'ring-4 ring-green-400 border-green-500 scale-110 bg-green-50' : ''}`}
            >
              <span className="text-2xl text-green-700">{theme.icon}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 