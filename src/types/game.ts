// src/types/game.ts
export interface GameState {
  currentScene: string;
  inventory: string[];
  health: number;
  maxHealth: number;
  hasKey: boolean;
  hasSword: boolean;
  hasPotion: boolean;
  hasBlessing: boolean;
  gameOver: boolean;
  victory: boolean;
  dragonDefeated: boolean;
  unicornMet: boolean;
  score: number;
  achievements: string[];
  questsCompleted: string[];
}

export interface Choice {
  text: string;
  action: () => void;
  condition?: () => boolean;
  skillCheck?: {
    type: 'wisdom' | 'courage' | 'stealth' | 'strength';
    difficulty: number;
  };
}

export interface Scene {
  title: string;
  description: string;
  choices: Choice[];
  backgroundImage?: string;
}

export interface GameActions {
  addToInventory: (item: string) => void;
  removeFromInventory: (item: string) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  changeScene: (sceneId: string) => void;
  restartGame: () => void;
  addAchievement: (achievement: string) => void;
  addScore: (points: number) => void;
  completeQuest: (quest: string) => void;
}
