// src/components/GameUI.tsx
import React from "react";
import { GameState } from "../types/game";

interface GameStatusProps {
  gameState: GameState;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameState }) => {
  const healthPercentage = (gameState.health / gameState.maxHealth) * 100;
  const healthColor = healthPercentage > 75 ? 'text-green-400' : 
                     healthPercentage > 50 ? 'text-yellow-400' : 
                     healthPercentage > 25 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="bg-black/30 rounded-lg p-4 mb-6 border border-blue-400/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-red-400 font-semibold mb-1">Health</div>
          <div className={`text-xl font-bold ${healthColor}`}>
            {gameState.health}/{gameState.maxHealth}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                healthPercentage > 75 ? 'bg-green-400' : 
                healthPercentage > 50 ? 'bg-yellow-400' : 
                healthPercentage > 25 ? 'bg-orange-400' : 'bg-red-400'
              }`}
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-yellow-400 font-semibold mb-1">Score</div>
          <div className="text-xl font-bold text-yellow-300">{gameState.score}</div>
        </div>

        {gameState.achievements.length > 0 && (
          <div className="text-center">
            <div className="text-purple-400 font-semibold mb-1">Achievements</div>
            <div className="text-sm text-purple-300">{gameState.achievements.length}</div>
          </div>
        )}

        {(gameState.unicornMet || gameState.dragonDefeated || gameState.hasBlessing) && (
          <div className="text-center">
            <div className="text-green-400 font-semibold mb-1">Status</div>
            <div className="text-xs">
              {[
                gameState.unicornMet && "🦄 Unicorn Met",
                gameState.dragonDefeated && "🐉 Dragon Defeated", 
                gameState.hasBlessing && "✨ Blessed"
              ].filter(Boolean).map((status, i) => (
                <div key={i} className="text-green-300">{status}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const GameHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
        The Enchanted Quest
      </h1>
      <p className="text-xl text-blue-200">A Mystical Text Adventure</p>
      <div className="mt-4 text-sm text-gray-300">
        Make wise choices, gather allies, and discover your destiny
      </div>
    </div>
  );
};

const getItemIcon = (item: string) => {
  const icons: Record<string, string> = {
    "Ancient Key": "🗝️",
    "Enchanted Sword": "⚔️",
    "Healing Potion": "🧪",
    "Unicorn's Blessing": "✨",
    "Crystal of Visions": "🔮",
    "Wolf's Guidance": "🐺",
    "Fairy Strength": "🧚",
    "Fairy Ward": "🛡️",
    "Fairy Wisdom": "📚",
    "Ancient Wisdom": "📜",
    "Forest Guardian": "🌳",
    "Wolf's Blessing": "🌟",
    "Crystal Harmony": "💎",
    "Hermit's Blessing": "🙏"
  };
  return icons[item] || "📦";
};

const getItemDescription = (item: string) => {
  const descriptions: Record<string, string> = {
    "Ancient Key": "Opens ancient locks",
    "Enchanted Sword": "Glows with magic",
    "Healing Potion": "Restores health",
    "Unicorn's Blessing": "Divine protection",
    "Crystal of Visions": "Shows hidden truths",
    "Wolf's Guidance": "Ancient wisdom",
    "Fairy Strength": "Enhanced power",
    "Fairy Ward": "Magical protection",
    "Fairy Wisdom": "Insight and knowledge",
    "Ancient Wisdom": "Forgotten lore",
    "Forest Guardian": "Nature's ally",
    "Wolf's Blessing": "Spirit protection",
    "Crystal Harmony": "Inner peace",
    "Hermit's Blessing": "Elder's wisdom"
  };
  return descriptions[item] || "Mysterious item";
};

interface InventoryDisplayProps {
  gameState: GameState;
}

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({ gameState }) => {
  if (gameState.inventory.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-800/40 to-blue-800/40 rounded-lg p-4 mb-6 border border-purple-400/30">
      <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
        <span className="mr-2">🎒</span> Inventory
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {gameState.inventory.map((item, index) => (
          <div key={index} className="bg-black/30 rounded-md p-2 border border-purple-500/20">
            <div className="text-sm font-medium text-yellow-300">{getItemIcon(item)} {item}</div>
            <div className="text-xs text-gray-400 mt-1">{getItemDescription(item)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SceneDisplayProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SceneDisplay: React.FC<SceneDisplayProps> = ({ title, description, children }) => {
  return (
    <div className="bg-gradient-to-br from-black/50 to-purple-900/30 rounded-lg p-6 mb-6 border border-purple-400/20 backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-4 text-yellow-200">{title}</h2>
      <div className="text-lg leading-relaxed mb-6 text-gray-100 whitespace-pre-wrap">
        {description}
      </div>
      {children}
    </div>
  );
};

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  index: number;
  skillCheck?: {
    type: 'wisdom' | 'courage' | 'stealth' | 'strength';
    difficulty: number;
  };
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({ text, onClick, index, skillCheck }) => {
  const getSkillIcon = (type: string) => {
    const icons: Record<string, string> = {
      wisdom: "🧠",
      courage: "❤️",
      stealth: "👤",
      strength: "💪"
    };
    return icons[type] || "⚡";
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg border border-blue-400 mb-2"
    >
      <div className="flex items-center">
        <span className="text-yellow-300 font-semibold mr-3">→</span>
        <div className="flex-1">
          <div>{text}</div>
          {skillCheck && (
            <div className="text-xs text-blue-200 mt-1">
              {getSkillIcon(skillCheck.type)} {skillCheck.type.charAt(0).toUpperCase() + skillCheck.type.slice(1)} Check (Difficulty: {skillCheck.difficulty})
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

interface GameFooterProps {
  currentScene: string;
  gameState: GameState;
}

export const GameFooter: React.FC<GameFooterProps> = ({ currentScene, gameState }) => {
  return (
    <div className="text-center text-blue-300 mt-6">
      <p className="text-lg">Choose your path wisely, adventurer...</p>
      <div className="flex justify-center space-x-6 mt-4 text-sm text-blue-400">
        <span>Scene: {currentScene}</span>
        <span>Score: {gameState.score}</span>
        <span>Health: {gameState.health}/{gameState.maxHealth}</span>
      </div>
    </div>
  );
};

interface AchievementNotificationProps {
  achievement: string;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({ achievement, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
      <div className="font-bold">🏆 Achievement Unlocked!</div>
      <div className="text-sm">{achievement}</div>
    </div>
  );
};
