import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-pink-200 relative overflow-hidden">
      {/* Animated Confetti or Bubbles */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-pulse">
        {/* Simple animated circles for fun effect */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-green-300 rounded-full opacity-30 animate-bounce" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-300 rounded-full opacity-20 animate-bounce delay-200" />
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-yellow-300 rounded-full opacity-20 animate-bounce delay-500" />
      </div>
      <Card className="p-10 text-center max-w-lg mx-4 shadow-2xl z-10 bg-white/90 backdrop-blur-md border-2 border-green-200">
        {/* Game Logo/Title */}
        <div className="mb-8 flex flex-col items-center">
          <svg width={120} height={120} viewBox="0 0 80 80" className="mb-2 drop-shadow-lg">
            {/* Dino body */}
            <rect x={18} y={26} width={32} height={24} fill="#3cb371" />
            {/* Dino head */}
            <rect x={42} y={16} width={18} height={16} fill="#3cb371" />
            {/* Dino eye */}
            <rect x={56} y={22} width={4} height={4} fill="#222" />
            {/* Dino tail */}
            <rect x={10} y={40} width={10} height={8} fill="#3cb371" />
            {/* Dino arms */}
            <rect x={48} y={40} width={10} height={4} fill="#388e5a" />
            {/* Dino legs */}
            <rect x={26} y={50} width={8} height={12} fill="#388e5a" />
            <rect x={36} y={50} width={8} height={12} fill="#388e5a" />
          </svg>
          <h1 className="text-5xl font-extrabold mb-1 text-green-700 tracking-tight drop-shadow-md">
            Dino Runner
          </h1>
          <span className="text-lg text-green-800 font-semibold tracking-wide mb-2">
            The Classic Endless Runner
          </span>
        </div>
        {/* Fun Tagline */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Welcome!
          </h2>
          <p className="text-gray-600 mb-4 text-base">
            Jump over cacti, beat your high score, and have fun!
          </p>
        </div>
        {/* Start Button */}
        <Button 
          onClick={handleStartGame}
          size="lg" 
          className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-2xl font-bold rounded-full shadow-lg mb-6 animate-bounce"
        >
          Start Game
        </Button>
        {/* Footer */}
        <div className="mt-6 text-xs text-gray-400">
          Inspired by Chrome's T-Rex game
        </div>
      </Card>
    </div>
  );
}; 