// src/types/game.ts
export interface GameState {
  currentScene: string;
  inventory: string[];
  health: number;
  hasKey: boolean;
  hasSword: boolean;
  hasPotion: boolean;
  hasBlessing: boolean;
  gameOver: boolean;
  victory: boolean;
  dragonDefeated: boolean;
  unicornMet: boolean;
}

export interface Choice {
  text: string;
  action: () => void;
  condition?: () => boolean;
}

export interface Scene {
  title: string;
  description: string;
  choices: Choice[];
}

export interface GameActions {
  addToInventory: (item: string) => void;
  removeFromInventory: (item: string) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  changeScene: (sceneId: string) => void;
  restartGame: () => void;
}
