import React from 'react';
import { JumpGame } from '@/components/game/JumpGame';

export const Game = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <JumpGame />
    </div>
  );
};

export default Game; 