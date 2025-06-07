// src/components/game/GameHeader.tsx
interface GameHeaderProps {
  gameState: GameState;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => (
  <div className="text-center mb-8">
    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
      The Enchanted Quest
    </h1>
    <p className="text-xl text-blue-200">A Mystical Text Adventure</p>
    <div className="mt-4 text-sm text-blue-300">
      <span>Level {gameState.level}</span> |
      <span> EXP: {gameState.experience}/{gameState.level * 100}</span> |
      <span> Score: {gameState.score}</span> |
      <span> Achievements: {gameState.achievements.length}</span>
    </div>
  </div>
);
