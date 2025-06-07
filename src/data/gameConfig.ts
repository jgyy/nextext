// src/data/gameConfig.ts
export const ACHIEVEMENTS = {
  "Keen Observer": "Found the hidden Ancient Key",
  "Armed and Ready": "Obtained the Enchanted Sword", 
  "Pure of Heart": "Received the Unicorn's Blessing",
  "Wisdom Incarnate": "Chose knowledge over treasure",
  "Guardian of Wisdom": "Became the new Guardian of Wisdom",
  "Dragon's Heart": "Understood the dragon's true nature",
  "True Scholar": "Approached quest as scholarly endeavor",
  "Peaceful Leader": "United treasure hunters in peace",
  "Master Librarian": "Preserved the lost library",
  "True Hero": "Completed the ultimate transformation",
  
  "Skill Master": "Maximized a skill to 100",
  "Universal Beloved": "Positive relationships with all factions",
  "World Healer": "Improved all world aspects to 80+",
  "Lore Master": "Discovered 50+ pieces of lore",
  "Archmage": "Mastered 5+ magical abilities",
  "Time Traveler": "Accessed the temporal nexus",
  "Perfect Hero": "Achieved the optimal ending for all beings"
};

export const CHARACTER_CLASSES = {
  scholar: { 
    name: "Scholar", 
    skills: { wisdom: 15, mysticism: 10 },
    bonus: "Enhanced learning and lore discovery"
  },
  diplomat: { 
    name: "Diplomat", 
    skills: { diplomacy: 15, compassion: 10 },
    bonus: "Improved relationships and conflict resolution"
  },
  explorer: { 
    name: "Explorer", 
    skills: { survival: 15, courage: 10 },
    bonus: "Enhanced navigation and environmental resistance"
  },
  mystic: { 
    name: "Mystic", 
    skills: { mysticism: 15, compassion: 10 },
    bonus: "Accelerated magical ability learning"
  },
  guardian: { 
    name: "Guardian", 
    skills: { courage: 10, compassion: 10, wisdom: 10 },
    bonus: "Balanced progression and leadership abilities"
  }
};

export const SKILL_DESCRIPTIONS = {
  wisdom: { icon: "🧠", description: "Understanding and knowledge" },
  courage: { icon: "❤️", description: "Bravery and determination" },
  compassion: { icon: "🤝", description: "Empathy and kindness" },
  diplomacy: { icon: "💬", description: "Negotiation and persuasion" },
  survival: { icon: "🏕️", description: "Wilderness skills and resilience" },
  mysticism: { icon: "✨", description: "Magical understanding and power" }
};

export const WORLD_ASPECTS = {
  forestHealth: { name: "Forest Health", icon: "🌲" },
  knowledgePreservation: { name: "Knowledge Preservation", icon: "📚" },
  dragonTrust: { name: "Dragon Trust", icon: "🐉" },
  realmPeace: { name: "Realm Peace", icon: "☮️" },
  magicalBalance: { name: "Magical Balance", icon: "⚖️" }
};

export const RELATIONSHIPS = {
  auraxes: { name: "Auraxes the Dragon", type: "dragon" },
  hermit: { name: "Eldric the Hermit", type: "scholar" },
  unicorn: { name: "Celestia the Unicorn", type: "celestial" },
  wolfSpirit: { name: "Wolf Spirit", type: "spirit" },
  fairies: { name: "Forest Fairies", type: "fae" },
  forestGuardian: { name: "Forest Guardian", type: "nature" }
};

export const SCENE_PATTERNS = {
  binary: (description: string, choice1: any, choice2: any) => ({
    description,
    choices: [choice1, choice2]
  }),
  
  multiple: (description: string, choices: any[]) => ({
    description,
    choices
  }),
  
  skillGated: (description: string, skill: string, difficulty: number, success: any, failure: any) => ({
    description,
    choices: [
      { ...success, skillCheck: { type: skill, difficulty } },
      failure
    ]
  }),
  
  conditional: (description: string, baseChoices: any[], conditionalChoices: any[]) => ({
    description,
    getChoices: (gameState: any) => [
      ...baseChoices,
      ...conditionalChoices.filter(choice => choice.condition(gameState))
    ]
  })
};

export const EXPANDED_SCENES = {
  character_creation: {
    title: "Choose Your Path",
    description: "Before beginning your quest, decide what kind of hero you wish to become.",
    choices: Object.entries(CHARACTER_CLASSES).map(([key, cls]) => ({
      text: `${cls.name}: ${cls.bonus}`,
      action: `class_${key}_selected`
    }))
  },
  
  magic_discovery: {
    title: "Awakening Inner Magic", 
    description: "Magical energies awaken dormant powers within you. Choose your magical path.",
    choices: [
      { text: "Elemental Magic (Fire, Water, Earth, Air)", action: "elemental_path" },
      { text: "Nature Harmony", action: "nature_magic" },
      { text: "Mind and Spirit Magic", action: "psychic_powers" },
      { text: "Reject magical power", action: "magic_rejection" }
    ]
  },
  
  temple_trials: {
    title: "The Temple of Trials",
    description: "Ancient trials test your character. Choose your approach.",
    choices: [
      { text: "Trial of Wisdom", action: "wisdom_trial", skillCheck: { type: "wisdom", difficulty: 8 }},
      { text: "Trial of Courage", action: "courage_trial", skillCheck: { type: "courage", difficulty: 8 }},
      { text: "Trial of Compassion", action: "compassion_trial", skillCheck: { type: "compassion", difficulty: 8 }}
    ]
  }
};

export const generateEndings = (gameState: any) => {
  const endings: Record<string, any> = {};
  
  if (gameState.score > 1000) {
    endings.legendary_ending = {
      title: "The Legendary Hero",
      description: `Your incredible score of ${gameState.score} marks you as a legend for the ages.`
    };
  }
  
  if (gameState.achievements.includes("Dragon's Heart") && gameState.achievements.includes("Pure of Heart")) {
    endings.perfect_harmony = {
      title: "Perfect Harmony",
      description: "You achieved perfect understanding between all beings."
    };
  }
  
  const highRelationships = Object.values(gameState.relationships || {}).filter((r: any) => r > 80).length;
  if (highRelationships >= 3) {
    endings.beloved_hero = {
      title: "The Beloved Hero", 
      description: "Your strong relationships changed the world through friendship."
    };
  }
  
  return endings;
};

export const GAME_UTILS = {
  getSkillColor: (level: number) => {
    if (level >= 80) return 'text-purple-400';
    if (level >= 60) return 'text-blue-400'; 
    if (level >= 40) return 'text-green-400';
    if (level >= 20) return 'text-yellow-400';
    return 'text-gray-400';
  },
  
  getRelationshipStatus: (level: number) => {
    if (level >= 80) return { text: "Devoted Friend", color: "text-purple-400" };
    if (level >= 60) return { text: "Trusted Ally", color: "text-blue-400" };
    if (level >= 40) return { text: "Good Friend", color: "text-green-400" };
    if (level >= 20) return { text: "Acquaintance", color: "text-yellow-400" };
    if (level >= 0) return { text: "Neutral", color: "text-gray-400" };
    return { text: "Unfriendly", color: "text-red-400" };
  },
  
  checkAchievementUnlock: (gameState: any, achievement: string) => {
    const conditions: Record<string, () => boolean> = {
      "Skill Master": () => Object.values(gameState.skills || {}).some((s: any) => s >= 100),
      "Lore Master": () => (gameState.loreDiscovered || []).length >= 50,
      "World Healer": () => Object.values(gameState.worldState || {}).every((s: any) => s >= 80)
    };
    
    return conditions[achievement]?.() || false;
  }
};

export const SAVE_SYSTEM = {
  save: (gameState: any, slotName: string) => {
    try {
      const saveData = {
        ...gameState,
        timestamp: Date.now(),
        version: "2.0"
      };
      localStorage.setItem(`enchanted_quest_${slotName}`, JSON.stringify(saveData));
      return true;
    } catch {
      return false;
    }
  },
  
  load: (slotName: string) => {
    try {
      const data = localStorage.getItem(`enchanted_quest_${slotName}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  
  getSaveSlots: () => {
    const slots: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('enchanted_quest_')) {
        const slotName = key.replace('enchanted_quest_', '');
        const data = SAVE_SYSTEM.load(slotName);
        if (data) {
          slots.push({
            name: slotName,
            score: data.score,
            level: data.level,
            timestamp: data.timestamp
          });
        }
      }
    }
    return slots.sort((a, b) => b.timestamp - a.timestamp);
  }
};
