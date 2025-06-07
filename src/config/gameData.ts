// src/config/gameData.ts
export const INITIAL_STATE: GameState = {
  currentScene: "start",
  inventory: [],
  health: 100,
  maxHealth: 100,
  gameOver: false,
  victory: false,
  score: 0,
  achievements: [],
  questsCompleted: [],
  level: 1,
  experience: 0,
  skills: { wisdom: 10, courage: 10, compassion: 10, diplomacy: 10, survival: 10, mysticism: 10 },
  relationships: { auraxes: 0, hermit: 0, unicorn: 0, wolfSpirit: 0, fairies: 0, forestGuardian: 0 },
  worldState: { forestHealth: 100, knowledgePreservation: 50, dragonTrust: 0, realmPeace: 70, magicalBalance: 50 },
  reputation: { scholars: 0, mystics: 0, nobles: 0, commoners: 0 },
  companionsRecruited: [],
  magicalAbilities: [],
  visionsSeen: [],
  secretsUnlocked: [],
  loreDiscovered: [],
  newGamePlusLevel: 0,
  saveSlots: {}
};

export const ACHIEVEMENTS = {
  "Keen Observer": "Found the hidden Ancient Key",
  "Armed and Ready": "Obtained the Enchanted Sword",
  "Pure of Heart": "Received the Unicorn's Blessing",
  "Wisdom Incarnate": "Chose knowledge over treasure",
  "Guardian of Wisdom": "Became the new Guardian of Wisdom",
  "Dragon's Heart": "Understood the dragon's true nature",
  "Master Librarian": "Preserved the lost library",
  "True Scholar": "Approached quest as scholarly endeavor",
  "Peaceful Leader": "United treasure hunters in peace",
  "True Hero": "Completed the ultimate transformation"
};

export const CHARACTER_CLASSES = {
  scholar: { skills: { wisdom: 15, mysticism: 10 }, bonus: "Enhanced learning" },
  diplomat: { skills: { diplomacy: 15, compassion: 10 }, bonus: "Better relationships" },
  explorer: { skills: { survival: 15, courage: 10 }, bonus: "Navigation bonuses" },
  mystic: { skills: { mysticism: 15, compassion: 10 }, bonus: "Magical abilities" },
  guardian: { skills: { courage: 10, compassion: 10, wisdom: 10 }, bonus: "Balanced growth" }
};

export interface SceneTemplate {
  type: 'discovery' | 'encounter' | 'choice' | 'ending' | 'test';
  title: string;
  description: string;
  options: Array<{
    text: string;
    score?: number;
    item?: string;
    achievement?: string;
    scene?: string;
    heal?: number;
    damage?: number;
    skill?: { type: string; amount: number };
    relationship?: { target: string; change: number };
    condition?: string;
    skillCheck?: { type: string; difficulty: number };
  }>;
}

export const SCENE_TEMPLATES: Record<string, SceneTemplate> = {
  start: {
    type: 'choice',
    title: "The Enchanted Forest",
    description: "You stand at the edge of a mystical forest where ancient magic flows. Legends speak of the Golden Orb of Eternal Wisdom hidden within. A worn path leads into shadows, while smoke rises from a cottage.",
    options: [
      { text: "Follow the forest path", scene: "forest_path", score: 10 },
      { text: "Approach the cottage", scene: "cottage", score: 5 },
      { text: "Search for secrets", scene: "search_start", skillCheck: { type: "wisdom", difficulty: 2 }}
    ]
  },
  
  search_start: {
    type: 'discovery',
    title: "Hidden Discovery",
    description: "Your search reveals an Ancient Key covered in glowing runes. The magic radiating from it feels powerful and benevolent.",
    options: [
      { text: "Take the Ancient Key", item: "Ancient Key", achievement: "Keen Observer", score: 50, scene: "found_key" },
      { text: "Visit cottage for advice", scene: "cottage" },
      { text: "Enter the forest", scene: "forest_path" }
    ]
  },

  cottage: {
    type: 'encounter',
    title: "The Hermit's Sanctuary",
    description: "Ancient hermit Eldric opens the door. 'Welcome, traveler. I can offer aid to one pure of heart.'",
    options: [
      { text: "Ask about the Golden Orb", scene: "hermit_lore" },
      { text: "Request weapon", item: "Enchanted Sword", achievement: "Armed and Ready", scene: "got_sword", condition: "!inventory.includes('Enchanted Sword')" },
      { text: "Ask for healing", item: "Healing Potion", scene: "got_potion", condition: "!inventory.includes('Healing Potion')" },
      { text: "Continue journey", scene: "forest_path" }
    ]
  },

  forest_path: {
    type: 'choice',
    title: "Into the Heart of Mystery",
    description: "The forest grows denser and more magical. Luminescent flowers glow with blue light. You hear crystalline water in the distance, while ancient ruins peek through the canopy.",
    options: [
      { text: "Follow sound of water", scene: "crystal_stream" },
      { text: "Climb toward ruins", scene: "temple_approach" },
      { text: "Rest and prepare", scene: "forest_rest" },
      { text: "Search hidden paths", scene: "secret_paths", skillCheck: { type: "survival", difficulty: 3 }}
    ]
  },

  crystal_stream: {
    type: 'encounter',
    title: "The Stream of Starlight",
    description: "A magnificent unicorn named Celestia emerges by a crystal-clear stream with ancient runes beneath the surface.",
    options: [
      { text: "Approach unicorn with reverence", scene: "unicorn_encounter" },
      { text: "Examine magical runes", scene: "water_mystery", skillCheck: { type: "wisdom", difficulty: 3 }},
      { text: "Drink from stream", heal: 30, score: 25, scene: "stream_blessing" }
    ]
  },

  unicorn_encounter: {
    type: 'encounter',
    title: "Meeting the Pure of Heart",
    description: "Celestia speaks: 'Your heart calls for wisdom and healing. Accept my blessing to guide you through trials ahead.'",
    options: [
      { text: "Accept blessing", item: "Unicorn's Blessing", achievement: "Pure of Heart", heal: 50, score: 100, scene: "blessed_by_unicorn" },
      { text: "Ask about dragon", scene: "unicorn_wisdom" },
      { text: "Inquire about quest nature", scene: "quest_truth" }
    ]
  },

  main_hall: {
    type: 'encounter',
    title: "The Dragon's Domain",
    description: "You enter a vast chamber where Auraxes the Ancient rests among books and scrolls. 'Another seeker comes before me. What brings you to my domain?'",
    options: [
      { text: "Seek wisdom above treasure", score: 100, scene: "wisdom_seeker" },
      { text: "Draw sword", scene: "dragon_combat", condition: "inventory.includes('Enchanted Sword')", skillCheck: { type: "courage", difficulty: 5 }},
      { text: "Approach with respect", scene: "respectful_approach" },
      { text: "Offer gift", scene: "tribute_offering", condition: "inventory.length > 0" }
    ]
  },

  wisdom_seeker: {
    type: 'test',
    title: "The Dragon's Test",
    description: "Auraxes presents a choice: the Golden Orb for personal wealth, or knowledge that could heal thousands but grows stronger only when shared freely.",
    options: [
      { text: "Choose knowledge for others", score: 200, achievement: "Wisdom Incarnate", scene: "wisdom_victory" },
      { text: "Choose personal treasure", score: 50, scene: "treasure_choice" },
      { text: "Ask for both", scene: "creative_solution", skillCheck: { type: "wisdom", difficulty: 5 }}
    ]
  },

  game_over: {
    type: 'ending',
    title: "The End of This Tale",
    description: "Your adventure has ended, but every ending is a beginning.",
    options: [
      { text: "Begin new adventure", scene: "restart" }
    ]
  }
};
