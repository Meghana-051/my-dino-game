import React from "react";

interface ScoreEntry {
  name: string;
  score: number;
}

interface LeaderboardProps {
  onClose: () => void;
  myName: string;
  myScore: number;
  isLive?: boolean;
}

const LEADERBOARD_KEY = "jumpgame_leaderboard";

const RANDOM_NAMES = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Skyler", "Quinn", "Avery", "Peyton",
  "Jamie", "Drew", "Cameron", "Reese", "Rowan", "Sawyer", "Emerson", "Finley", "Harper", "Dakota"
];

function getRandomLeaderboardEntries(count: number, excludeName: string): ScoreEntry[] {
  const names = RANDOM_NAMES.filter(n => n !== excludeName);
  const entries: ScoreEntry[] = [];
  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)] + (Math.random() < 0.2 ? Math.floor(Math.random() * 100) : "");
    const score = Math.floor(Math.random() * 1000) + 50;
    entries.push({ name, score });
  }
  return entries;
}

function getLeaderboard(): ScoreEntry[] {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as ScoreEntry[];
  } catch {
    return [];
  }
}

export function Leaderboard({ onClose, myName, myScore, isLive }: LeaderboardProps) {
  // Generate 5–10 random entries, inject myName/myScore, sort, and highlight mine
  const randomCount = Math.floor(Math.random() * 6) + 5; // 5–10
  let entries = getRandomLeaderboardEntries(randomCount, myName);
  entries.push({ name: myName, score: myScore });
  entries = entries.sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "white",
        padding: 24,
        borderRadius: 8,
        minWidth: 300,
        boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
      }}>
        <h2 style={{ marginBottom: 16 }}>Leaderboard</h2>
        <ol style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {entries.map((entry, idx) => {
            const isMe = entry.name === myName && entry.score === myScore;
            return (
              <li key={idx} style={{
                background: isMe ? '#d1e7dd' : undefined,
                fontWeight: isMe ? 'bold' : undefined,
                borderRadius: 4,
                padding: '4px 8px',
                marginBottom: 2,
              }}>
                <span>{idx + 1}. </span>
                <span>{entry.name}</span>
                {isMe && <span style={{ color: '#198754', marginLeft: 4 }}>
                  (You{isLive ? ', Live' : ''})
                </span>}
                <span style={{ float: 'right' }}>{entry.score}</span>
              </li>
            );
          })}
        </ol>
        <button onClick={onClose} style={{ marginTop: 16 }}>Close</button>
      </div>
    </div>
  );
}

export function addScoreToLeaderboard(name: string, score: number) {
  const leaderboard = getLeaderboard();
  leaderboard.push({ name, score });
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
} 