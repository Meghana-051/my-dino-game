import { useState, useEffect, useCallback, useRef } from 'react';
import { Player } from './Player';
import { Obstacle } from './Obstacle';
import { Background } from './Background';
import { GameUI } from './GameUI';
import { useToast } from '@/hooks/use-toast';
import { addScoreToLeaderboard } from './Leaderboard';
import { DinoObstacle } from './DinoObstacle';
import { PowerUpHUD, PowerUpType } from './PowerUpHUD';
import { PowerUpBar } from './PowerUpBar';
import { CharacterBar, CharacterType } from './CharacterBar';
import { ThemeBar, ThemeType } from './ThemeBar';
import { PowerUpItem } from './PowerUpItem';

interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  score: number;
  obstacles: Array<{ id: number; x: number; passed: boolean }>;
  playerY: number;
  isJumping: boolean;
}

const GAME_SPEED = 5;
const OBSTACLE_SPAWN_RATE = 0.02;
const JUMP_HEIGHT = 120;
const JUMP_DURATION = 500;
const PLAYER_X = 100;
const GROUND_Y = 160;

const POWER_UP_TYPES: PowerUpType[] = ['shield', 'speed', 'magnet'];
const POWER_UP_DURATION = 5; // seconds
const POWER_UP_SPAWN_RATE = 0.005; // lower = rarer

// Helper for power-up count
type PowerUpCount = Record<PowerUpType, number>;

export const JumpGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: true,
    isGameOver: false,
    score: 0,
    obstacles: [],
    playerY: GROUND_Y,
    isJumping: false,
  });
  const [paused, setPaused] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [hasSavedScore, setHasSavedScore] = useState(false);
  const [powerUps, setPowerUps] = useState<Array<{ id: number; x: number; y: number; type: PowerUpType }>>([]);
  const [activePowerUps, setActivePowerUps] = useState<Array<{ type: PowerUpType; remaining: number; total: number }>>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>('dino');
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('default');
  const jumpStartTime = useRef<number | null>(null);
  const [powerUpCount, setPowerUpCount] = useState<PowerUpCount>({ shield: 0, speed: 0, magnet: 0 });
  const [myName, setMyName] = useState<string>(() => localStorage.getItem('jumpgame_myname') || 'Player');

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      isGameOver: false,
      score: 0,
      obstacles: [],
      playerY: GROUND_Y,
      isJumping: false,
    });
  }, []);

  const gameOver = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false, isGameOver: true }));
    toast({
      title: "Game Over!",
      description: `Final Score: ${gameState.score}`,
      variant: "destructive",
    });
  }, [gameState.score, toast]);

  const jump = useCallback(() => {
    if (!gameState.isPlaying || gameState.isJumping) return;
    setGameState(prev => ({ ...prev, isJumping: true }));
    jumpStartTime.current = performance.now();
  }, [gameState.isPlaying, gameState.isJumping]);

  // Smooth jump animation
  useEffect(() => {
    if (!gameState.isJumping) return;
    let animationFrame: number;
    const animate = (now: number) => {
      if (jumpStartTime.current === null) return;
      const elapsed = now - jumpStartTime.current;
      // Parabolic jump: y = GROUND_Y - JUMP_HEIGHT * 4 * (t/T) * (1 - t/T)
      // t: elapsed, T: JUMP_DURATION
      const t = Math.min(elapsed, JUMP_DURATION);
      const T = JUMP_DURATION;
      const jumpOffset = JUMP_HEIGHT * 4 * (t / T) * (1 - t / T);
      setGameState(prev => ({ ...prev, playerY: GROUND_Y + jumpOffset }));
      if (elapsed < JUMP_DURATION) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setGameState(prev => ({ ...prev, isJumping: false, playerY: GROUND_Y }));
        jumpStartTime.current = null;
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [gameState.isJumping]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (paused) return;
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        if (gameState.isGameOver) {
          startGame();
        } else if (gameState.isPlaying) {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isGameOver, gameState.isPlaying, jump, startGame, paused]);

  // Calculate speed multiplier based on score
  const speedMultiplier = 1 + Math.floor(gameState.score / 200) * 0.18;

  // Game loop for obstacle and power-up movement, spawning, collision, and scoring
  useEffect(() => {
    if (paused) return;
    if (!gameState.isPlaying) return;
    const gameLoop = setInterval(() => {
      setGameState(prev => {
        // Move obstacles
        const newObstacles = prev.obstacles.map(ob => ({ ...ob, x: ob.x - GAME_SPEED * speedMultiplier }));
        const visibleObstacles = newObstacles.filter(ob => ob.x > -40);
        let newScore = prev.score;
        visibleObstacles.forEach(ob => {
          if (!ob.passed && ob.x < PLAYER_X - 40) {
            ob.passed = true;
            newScore += 10;
          }
        });
        // Spawn new obstacles
        const shouldSpawn = Math.random() < OBSTACLE_SPAWN_RATE;
        if (shouldSpawn && (visibleObstacles.length === 0 || visibleObstacles[visibleObstacles.length - 1].x < window.innerWidth - 300)) {
          visibleObstacles.push({
            id: Date.now(),
            x: window.innerWidth,
            passed: false,
          });
        }
        // Collision detection (shield disables collision)
        const hasShield = activePowerUps.some(pu => pu.type === 'shield');
        const playerRect = {
          x: PLAYER_X,
          y: prev.isJumping ? GROUND_Y - JUMP_HEIGHT : GROUND_Y,
          width: 40,
          height: 40,
        };
        for (const ob of visibleObstacles) {
          const obstacleRect = {
            x: ob.x,
            y: GROUND_Y,
            width: 30,
            height: 40,
          };
          if (
            playerRect.x < obstacleRect.x + obstacleRect.width &&
            playerRect.x + playerRect.width > obstacleRect.x &&
            playerRect.y < obstacleRect.y + obstacleRect.height &&
            playerRect.y + playerRect.height > obstacleRect.y
          ) {
            if (!hasShield) {
              return { ...prev, isPlaying: false, isGameOver: true };
            }
          }
        }
        return {
          ...prev,
          obstacles: visibleObstacles,
          score: newScore,
        };
      });
      // Power-up movement and spawning
      setPowerUps(prev => {
        // Move power-ups
        const moved = prev.map(pu => ({ ...pu, x: pu.x - GAME_SPEED * speedMultiplier }));
        // Remove off-screen
        const onscreen = moved.filter(pu => pu.x > -40);
        // Spawn new power-up
        if (Math.random() < POWER_UP_SPAWN_RATE) {
          const type = POWER_UP_TYPES[Math.floor(Math.random() * POWER_UP_TYPES.length)];
          onscreen.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            x: window.innerWidth,
            y: GROUND_Y + 10,
            type,
          });
        }
        return onscreen;
      });
      // Power-up collection
      setPowerUps(prev => {
        return prev.filter(pu => {
          const playerRect = {
            x: PLAYER_X,
            y: gameState.isJumping ? GROUND_Y - JUMP_HEIGHT : GROUND_Y,
            width: 40,
            height: 40,
          };
          const puRect = {
            x: pu.x,
            y: pu.y,
            width: 32,
            height: 32,
          };
          const collides =
            playerRect.x < puRect.x + puRect.width &&
            playerRect.x + playerRect.width > puRect.x &&
            playerRect.y < puRect.y + puRect.height &&
            playerRect.y + playerRect.height > puRect.y;
          if (collides) {
            // Activate power-up
            setActivePowerUps(current => [
              ...current.filter(p => p.type !== pu.type),
              { type: pu.type, remaining: POWER_UP_DURATION, total: POWER_UP_DURATION },
            ]);
            setPowerUpCount(counts => ({ ...counts, [pu.type]: counts[pu.type] + 1 }));
            return false;
          }
          return true;
        });
      });
      // Power-up timers
      setActivePowerUps(prev =>
        prev
          .map(pu => ({ ...pu, remaining: pu.remaining - 0.016 }))
          .filter(pu => pu.remaining > 0)
      );
    }, 16);
    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying, gameState.isJumping, speedMultiplier, paused]);

  // Prompt for name and save score after game over
  useEffect(() => {
    if (gameState.isGameOver && gameState.score > 0 && !hasSavedScore) {
      setTimeout(() => {
        let name = window.prompt('Enter your name for the leaderboard:', 'Player');
        if (!name) name = 'Player';
        addScoreToLeaderboard(name, gameState.score);
        setHasSavedScore(true);
        setShowLeaderboard(true);
      }, 300);
    }
    if (!gameState.isGameOver) {
      setHasSavedScore(false);
    }
  }, [gameState.isGameOver, gameState.score, hasSavedScore]);

  // Power-up activation from bar
  const handleActivatePowerUp = (type: PowerUpType) => {
    if (activePowerUps.some(p => p.type === type)) return;
    setActivePowerUps(current => [
      ...current,
      { type, remaining: POWER_UP_DURATION, total: POWER_UP_DURATION },
    ]);
  };

  const handleRestart = useCallback(() => {
    setGameState({
      isPlaying: true,
      isGameOver: false,
      score: 0,
      obstacles: [],
      playerY: GROUND_Y,
      isJumping: false,
    });
    setPowerUps([]);
    setActivePowerUps([]);
    setHasSavedScore(false);
    setPowerUpCount({ shield: 0, speed: 0, magnet: 0 });
  }, []);

  // Ability logic (stub for now)
  // TODO: Implement unique abilities for each character

  // Theme class logic
  const themeClass =
    selectedTheme === 'space' ? 'theme-space' :
    selectedTheme === 'underwater' ? 'theme-underwater' :
    selectedTheme === 'cyberpunk' ? 'theme-cyberpunk' :
    selectedTheme === 'halloween' ? 'theme-halloween' :
    selectedTheme === 'christmas' ? 'theme-christmas' :
    '';

  // Pause overlay and button
  const PauseButton = () => (
    <button
      className="bg-white/90 border-2 border-green-400 rounded-full p-3 shadow-lg text-green-700 text-2xl hover:bg-green-100 focus:outline-none"
      onClick={() => setPaused(paused => !paused)}
      aria-label={paused ? "Resume Game" : "Pause Game"}
      style={{ transition: 'none' }}
    >
      {paused ? (
        // Play icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
          <polygon points="8,5 20,12 8,19" fill="currentColor" />
        </svg>
      ) : (
        // Pause icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </svg>
      )}
    </button>
  );

  const ResumeOverlay = () => (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70" style={{ transition: 'none' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-12 flex flex-col items-center border-4 border-green-300" style={{ transition: 'none' }}>
        <span className="text-4xl font-extrabold mb-8 text-green-700 tracking-wide">Game Paused</span>
        <div className="flex gap-10 mt-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-xl focus:outline-none"
            onClick={() => setPaused(false)}
            style={{ transition: 'none' }}
          >
            Resume
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-xl focus:outline-none"
            onClick={() => {
              setPaused(false);
              handleRestart();
            }}
            style={{ transition: 'none' }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );

  // Keyboard shortcuts for pause/resume (P) and restart (R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyP') {
        setPaused(prev => !prev);
      }
      if (e.code === 'KeyR') {
        handleRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRestart]);

  return (
    <div className={`flex items-end justify-center w-full h-screen overflow-hidden bg-white ${themeClass}`}>
      {/* Pause button: always visible */}
      <div className="fixed top-6 left-8 z-[400]">
        <PauseButton />
      </div>
      {/* Pause overlay: always takes priority */}
      {paused && <ResumeOverlay />}
      {/* Other UI (PowerUpHUD, Background, Game Container, GameUI) */}
      <div className="fixed top-6 right-8 z-[200] flex flex-row items-center gap-4">
        <PowerUpHUD activePowerUps={activePowerUps} powerUpCount={powerUpCount} />
      </div>
      <Background theme={selectedTheme} />
      <div className="relative w-[800px] h-[360px] overflow-hidden bg-transparent select-none mb-12" style={{ bottom: 0 }}>
        {/* Hide player, obstacles, and power-ups on game over */}
        {!gameState.isGameOver && (
          <>
            <Player 
              x={PLAYER_X} 
              y={gameState.playerY}
              isJumping={gameState.isJumping}
              character={selectedCharacter}
              theme={selectedTheme}
            />
            {/* Obstacles */}
            {gameState.obstacles.map(obstacle => (
              <DinoObstacle key={obstacle.id} x={obstacle.x} y={GROUND_Y} theme={selectedTheme} />
            ))}
            {/* Power-Ups (randomly spawned, can be kept or removed as desired) */}
            {powerUps.map(pu => (
              <PowerUpItem key={pu.id} x={pu.x} y={pu.y} type={pu.type} />
            ))}
          </>
        )}
        {/* Power-Up Bar (player can click to activate) */}
        <PowerUpBar 
          onActivate={handleActivatePowerUp} 
          activePowerUps={activePowerUps.map(p => p.type)} 
        />
        {/* Character Bar (player can select character) */}
        <CharacterBar 
          selected={selectedCharacter} 
          onSelect={setSelectedCharacter} 
        />
        {/* Theme Bar (player can select theme) */}
        <ThemeBar 
          selected={selectedTheme} 
          onSelect={setSelectedTheme} 
        />
      </div>
      {/* GameUI overlays (Start/Game Over/Leaderboard) are only shown if not paused */}
      {!paused && (
        <GameUI
          score={gameState.score}
          isPlaying={gameState.isPlaying}
          isGameOver={gameState.isGameOver}
          onStart={handleRestart}
          onRestart={handleRestart}
          showLeaderboard={showLeaderboard}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onCloseLeaderboard={() => setShowLeaderboard(false)}
          myName={myName}
          isLive={!gameState.isGameOver && gameState.isPlaying}
        />
      )}
    </div>
  );
};