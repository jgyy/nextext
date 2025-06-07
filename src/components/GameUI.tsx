// src/components/GameUI.tsx
import React from "react";
import { GameState } from "../types/game";

interface StatusPanelProps {
  title: string;
  children: React.ReactNode;
  color?: string;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ title, children, color = "blue" }) => (
  <div className={`bg-gradient-to-r from-${color}-800/40 to-${color}-700/40 rounded-lg p-4 mb-4 border border-${color}-400/30`}>
    <h3 className={`text-lg font-bold text-${color}-300 mb-3`}>{title}</h3>
    {children}
  </div>
);

const ProgressBar: React.FC<{ current: number; max: number; color: string }> = ({ current, max, color }) => (
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div 
      className={`h-2 rounded-full bg-${color}-400 transition-all duration-300`}
      style={{ width: `${(current / max) * 100}%` }}
    />
  </div>
);

export const GameStatus: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const healthPercent = (gameState.health / gameState.maxHealth) * 100;
  const healthColor = healthPercent > 75 ? 'green' : healthPercent > 50 ? 'yellow' : healthPercent > 25 ? 'orange' : 'red';

  return (
    <StatusPanel title="Character Status" color="purple">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Health</div>
          <div className={`text-xl font-bold text-${healthColor}-400`}>{gameState.health}/{gameState.maxHealth}</div>
          <ProgressBar current={gameState.health} max={gameState.maxHealth} color={healthColor} />
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Score</div>
          <div className="text-xl font-bold text-yellow-300">{gameState.score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Level</div>
          <div className="text-xl font-bold text-purple-300">{gameState.level}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">EXP</div>
          <div className="text-xl font-bold text-blue-300">{gameState.experience}/{gameState.level * 100}</div>
        </div>
      </div>
    </StatusPanel>
  );
};

export const SkillsDisplay: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <StatusPanel title="Skills" color="green">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Object.entries(gameState.skills).map(([skill, level]) => (
        <div key={skill} className="text-center">
          <div className="text-sm text-gray-300 capitalize">{skill}</div>
          <div className="text-lg font-bold text-green-400">{level}</div>
          <ProgressBar current={level} max={100} color="green" />
        </div>
      ))}
    </div>
  </StatusPanel>
);

export const InventoryDisplay: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  if (gameState.inventory.length === 0) return null;
  
  return (
    <StatusPanel title="Inventory" color="yellow">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {gameState.inventory.map((item, index) => (
          <div key={index} className="bg-black/30 rounded-md p-2 border border-yellow-500/20">
            <div className="text-sm font-medium text-yellow-300">{item}</div>
          </div>
        ))}
      </div>
    </StatusPanel>
  );
};

export const AchievementNotification: React.FC<{ achievement: string; onClose: () => void }> = ({ achievement, onClose }) => {
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
