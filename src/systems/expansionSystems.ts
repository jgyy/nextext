// src/systems/expansionSystems.ts

import { GameState, GameActions } from "../types/game";

export const EXPANSION_ACHIEVEMENTS = {
  "Timeline Messenger": "Successfully communicate across realities",
  "Reality Alliance": "Form partnership with alternate self",
  "Multiverse Guardian": "Become guardian of all realities",
  "Cosmic Healer": "Heal wounds across all dimensions",
  "Time Detective": "Solve mysteries spanning multiple timelines",
  
  "Elemental Wisdom": "Solve the Riddle of Elements",
  "Vault Opener": "Open the legendary Vault of Seven Seals",
  "Pattern Master": "Recognize complex patterns in chaos",
  "Dangerous Knowledge Seeker": "Research forbidden topics",
  "Mystery Solver": "Solve the case of the disappearing scholars",
  
  "Vulnerable Leader": "Share your deepest fears with companions",
  "Loyalty Tested": "Test and prove your companions' dedication",
  "Heart Collector": "Gain maximum trust from all companions",
  "Mentor": "Guide companions to achieve their personal goals",
  "Pack Leader": "Lead a group of 5+ companions successfully",
  
  "Master Diplomat": "Unite opposing factions under common cause",
  "Shadow Hunter": "Expose and defeat hidden conspiracies",
  "Economic Revolutionary": "Transform the realm's economic system",
  "Kingmaker": "Influence the succession of multiple kingdoms",
  "Peace Architect": "Design lasting peace agreements",
  
  "Storm Shield": "Protect communities from magical disasters",
  "Land Healer": "Restore damaged magical ecosystems",
  "Rift Sealer": "Close dangerous dimensional rifts",
  "World Shaper": "Permanently alter the realm's geography",
  "Ecosystem Guardian": "Protect and nurture magical wildlife",
  
  "Unity Creator": "Connect all conscious minds across realities",
  "Power Liberator": "Free cosmic power for all beings",
  "The Humble Path": "Refuse ultimate power and find another way",
  "Infinite Sage": "Gain knowledge spanning all possibilities",
  "Existence Healer": "Heal the fundamental wounds of reality itself"
};

export interface Companion {
  name: string;
  type: 'oracle' | 'mage' | 'shapeshifter' | 'scholar' | 'warrior' | 'spirit';
  trustLevel: number; 
  personalQuest: string;
  abilities: string[];
  backstory: string;
  currentMood: 'happy' | 'neutral' | 'concerned' | 'conflicted' | 'angry';
  specialDialogue: Record<string, string>;
}

export const COMPANIONS: Record<string, Companion> = {
  zara: {
    name: "Zara the Time-touched Oracle",
    type: "oracle",
    trustLevel: 25,
    personalQuest: "Find her lost sister across the timelines",
    abilities: ["Future Sight", "Temporal Warning", "Paradox Detection"],
    backstory: "Once a normal scholar until she accidentally glimpsed the time streams",
    currentMood: "neutral",
    specialDialogue: {
      dragon_meeting: "The dragon... she exists in multiple timelines simultaneously. How fascinating!",
      orb_discovery: "The paths converge here, but the endings... they're still shifting.",
      danger: "I see flames ahead. Not literal ones - flames of choice."
    }
  },
  
  marcus: {
    name: "Marcus the Reformed Dark Mage",
    type: "mage", 
    trustLevel: 15,
    personalQuest: "Atone for his past by saving those he once threatened",
    abilities: ["Shadow Manipulation", "Dark Magic Nullification", "Protective Barriers"],
    backstory: "Former member of the Shadow Conclave seeking redemption",
    currentMood: "conflicted",
    specialDialogue: {
      shadow_encounter: "I know their tactics. Let me handle this.",
      moral_choice: "I've made the wrong choice before. Let me help you choose right.",
      redemption: "Every day I choose again who I want to be."
    }
  },
  
  whisp: {
    name: "Whisp the Shapeshifting Cat",
    type: "shapeshifter",
    trustLevel: 40,
    personalQuest: "Discover the truth about her mysterious origins",
    abilities: ["Perfect Mimicry", "Size Shifting", "Emotion Reading"],
    backstory: "Appears to be a magical cat but may be something far more ancient",
    currentMood: "happy",
    specialDialogue: {
      mystery: "*purrs knowingly* Some secrets reveal themselves when you're ready.",
      comfort: "*nuzzles* You don't have to carry everything alone.",
      wisdom: "Cats see things differently. Want to know what I see?"
    }
  }
};

export interface PoliticalFaction {
  name: string;
  goals: string[];
  reputation: number; 
  influence: number; 
  stance_on_dragon: 'hostile' | 'neutral' | 'supportive' | 'complex';
  key_members: string[];
}

export const POLITICAL_FACTIONS: Record<string, PoliticalFaction> = {
  eternal_flame: {
    name: "Order of the Eternal Flame",
    goals: ["Destroy all dragons", "Eliminate magical threats", "Establish human supremacy"],
    reputation: -25,
    influence: 80,
    stance_on_dragon: 'hostile',
    key_members: ["Commander Valerius", "High Inquisitor Thane", "General Brightblade"]
  },
  
  shadow_conclave: {
    name: "The Shadow Conclave", 
    goals: ["Steal the Golden Orb", "Control magical knowledge", "Rule from shadows"],
    reputation: -50,
    influence: 60,
    stance_on_dragon: 'complex',
    key_members: ["The Veiled Master", "Duchess Nightwhisper", "Archon Vex"]
  },
  
  harmony_circle: {
    name: "The Harmony Circle",
    goals: ["Peaceful coexistence", "Knowledge sharing", "Prevent war"],
    reputation: 50,
    influence: 40,
    stance_on_dragon: 'supportive',
    key_members: ["Elder Moonweaver", "Prince Gentleheart", "Scholar Brightmind"]
  },
  
  merchant_confederation: {
    name: "Merchant Confederation",
    goals: ["Profitable trade", "Stable economy", "Open borders"],
    reputation: 0,
    influence: 70,
    stance_on_dragon: 'neutral',
    key_members: ["Guildmaster Goldhand", "Trader Captain Swift", "Banker Coinsworth"]
  }
};

export interface MagicalAbility {
  name: string;
  description: string;
  school: 'elemental' | 'temporal' | 'mental' | 'spirit' | 'reality' | 'life';
  power_level: number; 
  prerequisites: string[];
  unlocked_by: string[]; 
}

export const MAGICAL_ABILITIES: Record<string, MagicalAbility> = {
  timeline_sight: {
    name: "Timeline Sight",
    description: "See the consequences of actions across multiple timelines",
    school: 'temporal',
    power_level: 7,
    prerequisites: ["Time Awareness"],
    unlocked_by: ["Timeline Messenger"]
  },
  
  reality_anchor: {
    name: "Reality Anchor", 
    description: "Prevent reality from shifting around you",
    school: 'reality',
    power_level: 8,
    prerequisites: ["Timeline Sight"],
    unlocked_by: ["Reality Alliance"]
  },
  
  empathic_network: {
    name: "Empathic Network",
    description: "Connect minds across vast distances",
    school: 'mental',
    power_level: 9,
    prerequisites: ["Mind Reading", "Telepathy"],
    unlocked_by: ["Unity Creator"]
  },
  
  dimensional_gate: {
    name: "Dimensional Gate",
    description: "Open passages between different realities",
    school: 'reality',
    power_level: 10,
    prerequisites: ["Reality Anchor", "Portal Magic"],
    unlocked_by: ["Multiverse Guardian"]
  },
  
  existence_heal: {
    name: "Existence Healing",
    description: "Heal wounds in the fabric of reality itself",
    school: 'life',
    power_level: 10,
    prerequisites: ["Master Healing", "Reality Anchor"],
    unlocked_by: ["Cosmic Healer"]
  }
};

export interface WorldEvent {
  id: string;
  name: string;
  description: string;
  trigger_conditions: {
    score_threshold?: number;
    achievements_required?: string[];
    choices_made?: string[];
  };
  effects: {
    faction_reputation_changes?: Record<string, number>;
    new_scenes_available?: string[];
    world_state_changes?: Record<string, number>;
  };
  duration: number; 
}

export const WORLD_EVENTS: WorldEvent[] = [
  {
    id: "magical_storm_crisis",
    name: "The Great Magical Storm",
    description: "A massive magical storm threatens the entire realm",
    trigger_conditions: {
      score_threshold: 500,
      achievements_required: ["Master of Elements"]
    },
    effects: {
      faction_reputation_changes: {
        harmony_circle: 20,
        eternal_flame: -10
      },
      new_scenes_available: ["storm_emergency_council", "evacuation_efforts"],
      world_state_changes: {
        magical_stability: -30,
        public_fear: 40
      }
    },
    duration: 10
  },
  
  {
    id: "scholar_disappearances",
    name: "The Vanishing Scholars",
    description: "Scholars across the realm are mysteriously disappearing",
    trigger_conditions: {
      achievements_required: ["True Scholar", "Wisdom Incarnate"]
    },
    effects: {
      faction_reputation_changes: {
        shadow_conclave: -25,
        harmony_circle: 15
      },
      new_scenes_available: ["investigation_begins", "scholar_protection_efforts"]
    },
    duration: 15
  }
];

export class DialogueManager {
  static getCompanionDialogue(companion: string, context: string, gameState: GameState): string {
    const comp = COMPANIONS[companion];
    if (!comp) return "";
    
    if (comp.specialDialogue[context]) {
      return comp.specialDialogue[context];
    }
    
    switch (comp.currentMood) {
      case 'happy':
        return this.getHappyDialogue(comp, context);
      case 'concerned':
        return this.getConcernedDialogue(comp, context);
      case 'conflicted':
        return this.getConflictedDialogue(comp, context);
      default:
        return this.getNeutralDialogue(comp, context);
    }
  }
  
  static getHappyDialogue(companion: Companion, context: string): string {
    const happyLines = [
      `${companion.name} seems pleased with your progress.`,
      `${companion.name} offers encouraging words about your choices.`,
      `${companion.name} shares an optimistic perspective on the situation.`
    ];
    return happyLines[Math.floor(Math.random() * happyLines.length)];
  }
  
  static getConcernedDialogue(companion: Companion, context: string): string {
    const concernedLines = [
      `${companion.name} expresses worry about the path ahead.`,
      `${companion.name} suggests caution in your next decision.`,
      `${companion.name} shares concerns about potential consequences.`
    ];
    return concernedLines[Math.floor(Math.random() * concernedLines.length)];
  }
  
  static getConflictedDialogue(companion: Companion, context: string): string {
    const conflictedLines = [
      `${companion.name} struggles with conflicting loyalties.`,
      `${companion.name} hesitates before offering advice.`,
      `${companion.name} speaks carefully, weighing each word.`
    ];
    return conflictedLines[Math.floor(Math.random() * conflictedLines.length)];
  }
  
  static getNeutralDialogue(companion: Companion, context: string): string {
    const neutralLines = [
      `${companion.name} observes the situation thoughtfully.`,
      `${companion.name} offers a practical perspective.`,
      `${companion.name} provides factual information about your options.`
    ];
    return neutralLines[Math.floor(Math.random() * neutralLines.length)];
  }
}

export interface QuestLine {
  id: string;
  name: string;
  description: string;
  stages: QuestStage[];
  current_stage: number;
  completed: boolean;
  rewards: {
    experience?: number;
    abilities?: string[];
    achievements?: string[];
    items?: string[];
  };
}

export interface QuestStage {
  id: string;
  description: string;
  completed: boolean;
  objectives: string[];
}

export const MAJOR_QUESTLINES: QuestLine[] = [
  {
    id: "multiverse_mastery",
    name: "Master of Multiple Realities",
    description: "Learn to navigate and influence multiple timelines",
    current_stage: 0,
    completed: false,
    stages: [
      {
        id: "discover_observatory",
        description: "Find the Chronomancer's Observatory",
        completed: false,
        objectives: ["Locate the temporal observatory", "Survive the approach"]
      },
      {
        id: "first_timeline_contact",
        description: "Make contact with another timeline",
        completed: false,
        objectives: ["Successfully communicate across realities", "Learn about alternate history"]
      },
      {
        id: "reality_travel",
        description: "Travel to an alternate reality",
        completed: false,
        objectives: ["Successfully breach reality barriers", "Survive in alternate dimension"]
      },
      {
        id: "multiverse_understanding",
        description: "Achieve mastery over multiverse navigation",
        completed: false,
        objectives: ["Meet alternate self", "Form cross-reality alliance", "Return safely"]
      }
    ],
    rewards: {
      experience: 1000,
      abilities: ["Reality Travel", "Timeline Sight", "Dimensional Gate"],
      achievements: ["Multiverse Guardian"],
      items: ["Cosmic Compass", "Reality Anchor Stone"]
    }
  },
  
  {
    id: "companion_bonds",
    name: "Bonds That Transcend Worlds",
    description: "Form deep, meaningful relationships with your companions",
    current_stage: 0,
    completed: false,
    stages: [
      {
        id: "recruit_companions",
        description: "Gather a diverse group of allies",
        completed: false,
        objectives: ["Recruit at least 2 companions", "Learn their backgrounds"]
      },
      {
        id: "build_trust",
        description: "Develop trust and understanding",
        completed: false,
        objectives: ["Share personal stories", "Support companion goals", "Resolve conflicts"]
      },
      {
        id: "ultimate_loyalty",
        description: "Achieve unbreakable bonds",
        completed: false,
        objectives: ["Complete companion personal quests", "Face final trial together"]
      }
    ],
    rewards: {
      experience: 750,
      achievements: ["Heart Collector", "Pack Leader"],
      abilities: ["Empathic Bond", "Shared Strength"],
      items: ["Bond of Loyalty", "Companion's Promise"]
    }
  }
];

export interface EnhancedSaveData extends GameState {
  companions: Record<string, Companion>;
  political_reputation: Record<string, number>;
  magical_abilities: string[];
  active_questlines: QuestLine[];
  world_events: string[]; 
  timeline_knowledge: string[]; 
  reality_access: string[]; 
}

export function createEnhancedSave(gameState: GameState): EnhancedSaveData {
  return {
    ...gameState,
    companions: {},
    political_reputation: {},
    magical_abilities: [],
    active_questlines: [],
    world_events: [],
    timeline_knowledge: [],
    reality_access: []
  };
}

export function updateCompanionMood(companion: string, newMood: Companion['currentMood']): void {
  if (COMPANIONS[companion]) {
    COMPANIONS[companion].currentMood = newMood;
  }
}

export function modifyPoliticalReputation(faction: string, change: number): void {
  if (POLITICAL_FACTIONS[faction]) {
    POLITICAL_FACTIONS[faction].reputation = Math.max(-100, Math.min(100, 
      POLITICAL_FACTIONS[faction].reputation + change));
  }
}

export function checkQuestProgress(questId: string, stageId: string): boolean {
  const quest = MAJOR_QUESTLINES.find(q => q.id === questId);
  if (!quest) return false;
  
  const stage = quest.stages.find(s => s.id === stageId);
  return stage ? stage.completed : false;
}

export function unlockMagicalAbility(abilityName: string, gameState: GameState): boolean {
  const ability = MAGICAL_ABILITIES[abilityName];
  if (!ability) return false;
  
  const hasRequiredAchievements = ability.unlocked_by.every(
    achievement => gameState.achievements.includes(achievement)
  );
  
  return hasRequiredAchievements;
}
