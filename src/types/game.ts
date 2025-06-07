// src/types/game.ts
export interface GameState {
  currentScene: string;
  inventory: string[];
  health: number;
  maxHealth: number;
  gameOver: boolean;
  victory: boolean;
  score: number;
  achievements: string[];
  questsCompleted: string[];
  
  characterClass?: 'scholar' | 'diplomat' | 'explorer' | 'mystic' | 'guardian';
  level: number;
  experience: number;
  
  skills: Record<string, number>;
  relationships: Record<string, number>;
  worldState: Record<string, number>;
  reputation: Record<string, number>;
  
  companionsRecruited: string[];
  magicalAbilities: string[];
  visionsSeen: string[];
  secretsUnlocked: string[];
  loreDiscovered: string[];
  
  newGamePlusLevel: number;
  saveSlots: Record<string, GameState>;
}

export interface Choice {
  text: string;
  action: () => void;
  condition?: () => boolean;
  skillCheck?: { type: string; difficulty: number };
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
  addAchievement: (achievement: string) => void;
  addScore: (points: number) => void;
  completeQuest: (quest: string) => void;
  gainExperience: (amount: number) => void;
  improveSkill: (skill: string, amount: number) => void;
  modifyRelationship: (character: string, change: number) => void;
  affectWorldState: (aspect: string, change: number) => void;
  unlockSecret: (secret: string) => void;
  gainLore: (lore: string) => void;
  recruitCompanion: (companion: string) => void;
  activateVision: (vision: string) => void;
  learnMagicalAbility: (ability: string) => void;
  saveGame: (slotName: string) => void;
  loadGame: (slotName: string) => void;
}
