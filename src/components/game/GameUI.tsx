import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaderboard } from './Leaderboard';

interface GameUIProps {
  score: number;
  isPlaying: boolean;
  isGameOver: boolean;
  onStart: () => void;
  onRestart: () => void;
  showLeaderboard: boolean;
  onOpenLeaderboard: () => void;
  onCloseLeaderboard: () => void;
  myName: string;
  isLive?: boolean;
}

export const GameUI = ({ score, isPlaying, isGameOver, onStart, onRestart, showLeaderboard, onOpenLeaderboard, onCloseLeaderboard, myName, isLive }: GameUIProps) => {
  return (
    <>
      {/* Centered Score */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-40">
        <div className="bg-white/80 rounded-xl px-8 py-2 shadow-lg border-2 border-green-200">
          <span className="text-2xl font-bold text-green-700">Score: {score}</span>
        </div>
      </div>
      {/* Start Screen */}
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <Card className="p-8 text-center max-w-md mx-4">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-player bg-clip-text text-transparent">
              Keyboard Jump
            </h1>
            <p className="text-muted-foreground mb-6">
              Jump over obstacles and survive as long as you can!
            </p>
            <Button 
              onClick={onStart}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Game
            </Button>
            <Button 
              onClick={onOpenLeaderboard}
              size="sm"
              variant="outline"
              className="ml-4"
            >
              Leaderboard
            </Button>
          </Card>
        </div>
      )}
      {/* Game Over Screen */}
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Card className="p-8 text-center max-w-md mx-4">
            <h2 className="text-3xl font-bold mb-4 text-destructive">
              Game Over!
            </h2>
            <p className="text-xl mb-2">Final Score</p>
            <div className="text-4xl font-bold mb-6 text-primary animate-bounce-score">
              {score}
            </div>
            <Button 
              onClick={onRestart}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Play Again
            </Button>
            <Button 
              onClick={onOpenLeaderboard}
              size="sm"
              variant="outline"
              className="ml-4"
            >
              Leaderboard
            </Button>
          </Card>
        </div>
      )}
      {/* Leaderboard Modal */}
      {showLeaderboard && <Leaderboard onClose={onCloseLeaderboard} myName={myName} myScore={score} isLive={isLive} />}
    </>
  );
};