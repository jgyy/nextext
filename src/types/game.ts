// src/types/game.ts
export interface GameState {
  currentScene: string;
  health: number;
  maxHealth: number;
  level: number;
  experience: number;
  score: number;
  characterClass: string;
  gameOver: boolean;

  inventory: string[];
  achievements: string[];
  companionsRecruited: string[];
  magicalAbilities: string[];

  skills: Record<string, number>;
  relationships: Record<string, number>;
  worldState: Record<string, number>;

  loreCollected?: string[];
  memoriesUnlocked?: string[];
  secretsDiscovered?: string[];
  saveSlots: Record<string, any>;
}

export interface GameActions {
  changeScene: (scene: string) => void;
  updateHealth: (amount: number) => void;
  updateSkill: (skill: string, amount: number) => void;
  addToInventory: (item: string) => void;
  addAchievement: (achievement: string) => void;
  updateRelationship: (character: string, amount: number) => void;
  updateWorldState: (aspect: string, amount: number) => void;
  saveGame: (slotName: string) => void;
  loadGame: (slotName: string) => void;
  restartGame: () => void;
}

export interface Choice {
  text: string;
  action: () => void;
  condition?: () => boolean;
  skillCheck?: {
    type: string;
    difficulty: number;
  };
  requirements?: {
    achievements?: string[];
    companions?: string[];
    items?: string[];
    skills?: Record<string, number>;
  };
}

export interface Scene {
  title: string;
  description: string;
  choices: Choice[];
}
