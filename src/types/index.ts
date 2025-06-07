// src/types/index.ts
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
  
  hasKey: boolean;
  hasSword: boolean;
  hasPotion: boolean;
  hasBlessing: boolean;
  dragonDefeated: boolean;
  unicornMet: boolean;
  
  characterClass?: 'scholar' | 'diplomat' | 'explorer' | 'mystic' | 'guardian';
  level?: number;
  experience?: number;
  
  skills?: Record<string, number>;
  relationships?: Record<string, number>;
  worldState?: Record<string, number>;
  reputation?: Record<string, number>;
  
  chaptersCompleted?: string[];
  secretsUnlocked?: string[];
  loreDiscovered?: string[];
  companionsRecruited?: string[];
  visionsSeen?: string[];
  propheciesHeard?: string[];
  magicalAbilities?: string[];
  
  newGamePlusLevel?: number;
  unlockedStartingPaths?: string[];
  permanentAchievements?: string[];
  saveSlots?: Record<string, GameState>;
  loreCollected?: string[];
  memoriesUnlocked?: string[];
  secretsDiscovered?: string[];
}

export interface Choice {
  text: string;
  action: () => void;
  condition?: () => boolean;
  skillCheck?: {
    type: string;
    difficulty: number;
  };
}

export interface Scene {
  title: string;
  description: string;
  choices: Choice[];
  requirements?: {
    skills?: Record<string, number>;
    relationships?: Record<string, number>;
    achievements?: string[];
    items?: string[];
  };
  consequences?: {
    skills?: Record<string, number>;
    relationships?: Record<string, number>;
    worldState?: Record<string, number>;
  };
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
  
  gainExperience?: (amount: number) => void;
  levelUp?: () => void;
  improveSkill?: (skill: string, amount: number) => void;
  modifyRelationship?: (character: string, change: number) => void;
  affectWorldState?: (aspect: string, change: number) => void;
  unlockSecret?: (secret: string) => void;
  gainLore?: (lore: string) => void;
  recruitCompanion?: (companion: string) => void;
  activateVision?: (vision: string) => void;
  learnMagicalAbility?: (ability: string) => void;
  saveGame?: (slotName: string) => void;
  loadGame?: (slotName: string) => void;
}

export type SkillType = 'wisdom' | 'courage' | 'compassion' | 'diplomacy' | 'survival' | 'mysticism';
export type CharacterType = 'auraxes' | 'hermit' | 'unicorn' | 'wolfSpirit' | 'fairies' | 'forestGuardian';
export type WorldAspect = 'forestHealth' | 'knowledgePreservation' | 'dragonTrust' | 'realmPeace' | 'magicalBalance';
