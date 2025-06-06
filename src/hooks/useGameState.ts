// src/hooks/useGameState.ts
import { useState } from "react";
import { GameState, GameActions } from "../types/game";

const initialGameState: GameState = {
  currentScene: "start",
  inventory: [],
  health: 100,
  maxHealth: 100,
  hasKey: false,
  hasSword: false,
  hasPotion: false,
  hasBlessing: false,
  gameOver: false,
  victory: false,
  dragonDefeated: false,
  unicornMet: false,
  score: 0,
  achievements: [],
  questsCompleted: []
};

export const useGameState = (): [GameState, GameActions, string | null, (achievement: string | null) => void] => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  const addToInventory = (item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
      ...(item === "Ancient Key" && { hasKey: true }),
      ...(item === "Enchanted Sword" && { hasSword: true }),
      ...(item === "Healing Potion" && { hasPotion: true }),
      ...(item === "Unicorn's Blessing" && { hasBlessing: true }),
    }));
  };

  const removeFromInventory = (item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(i => i !== item),
      ...(item === "Healing Potion" && { hasPotion: false }),
    }));
  };

  const takeDamage = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.max(0, prev.health - amount),
      gameOver: prev.health - amount <= 0,
    }));
  };

  const heal = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + amount),
    }));
  };

  const changeScene = (sceneId: string) => {
    setGameState(prev => ({ ...prev, currentScene: sceneId }));
  };

  const restartGame = () => {
    setGameState(initialGameState);
    setShowAchievement(null);
  };

  const addAchievement = (achievement: string) => {
    setGameState(prev => {
      if (!prev.achievements.includes(achievement)) {
        setShowAchievement(achievement);
        return {
          ...prev,
          achievements: [...prev.achievements, achievement],
          score: prev.score + 100
        };
      }
      return prev;
    });
  };

  const addScore = (points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  };

  const completeQuest = (quest: string) => {
    setGameState(prev => ({
      ...prev,
      questsCompleted: [...prev.questsCompleted, quest],
      score: prev.score + 250
    }));
  };

  const actions: GameActions = {
    addToInventory,
    removeFromInventory,
    takeDamage,
    heal,
    changeScene,
    restartGame,
    addAchievement,
    addScore,
    completeQuest
  };

  return [gameState, actions, showAchievement, setShowAchievement];
};
