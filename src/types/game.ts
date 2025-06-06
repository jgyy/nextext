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
  
  level?: number;
  experience?: number;
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
    type: 'wisdom' | 'courage' | 'stealth' | 'strength' | 'diplomacy' | 'survival' | 'mysticism' | 'compassion';
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
  
  saveGame?: (slotName: string) => void;
  loadGame?: (slotName: string) => void;
}

export const ACHIEVEMENTS = {
  "Keen Observer": "Found the hidden Ancient Key",
  "Armed and Ready": "Obtained the Enchanted Sword",
  "Pure of Heart": "Received the Unicorn's Blessing",
  "Sage of Riddles": "Solved all the wisdom riddles perfectly",
  "Wisdom Incarnate": "Chose knowledge over treasure",
  "Guardian of Wisdom": "Became the new Guardian of Wisdom",
  "Dragon's Heart": "Understood the dragon's true nature",
  "True Seeker": "Sought wisdom above all else",
  "Peaceful Leader": "United treasure hunters in peace",
  "Master Librarian": "Preserved the lost library",
  "True Hero": "Completed the ultimate transformation",
  
  "Path of Learning": "Chose the Scholar's path",
  "Born to Lead": "Chose the Noble's path",
  "Child of the Road": "Chose the Wanderer's path",
  "Crystal Clear": "Achieved perfect clarity of purpose",
  "Self Awareness": "Fully understood your motivations",
  "Beacon of Hope": "Used power to guide others",
  "Nature's Healer": "Healed the forest and its creatures",
  "Guardian of Balance": "Maintained natural balance",
  "Forest Guardian": "Accepted guardianship of the forest",
  "Spirit Blessed": "Received blessing from the spirit wolf",
  "Nature's Child": "Drank from the sacred spring",
  "Fairy Blessed": "Received the fairies' gift",
  "Blessed Journey": "Received the hermit's blessing",
  "Transformed Seeker": "Underwent personal transformation",
  "Wisdom Keeper": "Became keeper of ancient wisdom",
  "Authentic Hero": "Remained true to yourself",
  "Pure of Intent": "Rejected power for its own sake",
  "Joy Bringer": "Brought joy back to the dragon",
  "Dream Weaver": "Helped fulfill ancient dreams",
  "Dragon's Pupil": "Became Auraxes's student",
  "Soul Bonded": "Formed magical bond with the dragon",
  "Kindred Spirits": "Found deep understanding with another",
  "Full Guardian": "Accepted all guardian responsibilities",
  "Self Discovered": "Discovered your true self",
  "True Scholar": "Approached quest as scholarly endeavor",
  "Noble Purpose": "Vowed to use power for good"
};

export const QUESTS = {
  "The Test of Hearts": "Prove your wisdom to the dragon",
  "The Scholar's Path": "Use knowledge to complete your journey",
  "The Guardian's Duty": "Protect the forest and its secrets",
  "The Teacher's Return": "Help Auraxes teach again",
  "The United Kingdoms": "Use the Orb to bring peace",
  "The Wisdom Keeper": "Preserve and share ancient knowledge"
};
