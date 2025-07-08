interface ObstacleProps {
  x: number;
  y: number;
}

export const Obstacle = ({ x, y }: ObstacleProps) => {
  return (
    <div
      className="absolute animate-move-obstacle"
      style={{
        left: x,
        bottom: `calc(100vh - ${y}px)`,
        width: 60,
        height: 40,
        animationDuration: '3s',
      }}
    >
      {/* ECG Pulse Line Obstacle */}
      <svg
        viewBox="0 0 60 40"
        width={60}
        height={40}
        className="block mx-auto"
      >
        <polyline
          points="0,20 10,20 15,5 20,35 25,20 35,20 40,10 45,30 50,20 60,20"
          fill="none"
          stroke="#ff3366"
          strokeWidth="3"
          strokeLinejoin="round"
          className="ecg-pulse"
        />
      </svg>
      <style>{`
        .ecg-pulse {
          filter: drop-shadow(0 2px 8px rgba(255,0,64,0.3));
          animation: ecg-pulse-glow 1s infinite;
        }
        @keyframes ecg-pulse-glow {
          0%, 100% { stroke: #ff3366; filter: drop-shadow(0 2px 8px rgba(255,0,64,0.3)); }
          50% { stroke: #ff6699; filter: drop-shadow(0 4px 16px rgba(255,0,64,0.5)); }
        }
      `}</style>
    </div>
  );
};