// src/core/sceneFactory.ts
import { Scene, GameState, GameActions } from "../types/game";

export interface SceneTemplate {
  title: string;
  description: string | ((state: GameState) => string);
  type: 'discovery' | 'encounter' | 'choice' | 'ending' | 'test' | 'dialogue';
  baseChoices?: Choice[];
  conditionalChoices?: ConditionalChoice[];
  effects?: SceneEffects;
}

interface ConditionalChoice extends Choice {
  conditions?: {
    skills?: Record<string, number>;
    items?: string[];
    achievements?: string[];
    relationships?: Record<string, number>;
    custom?: (state: GameState) => boolean;
  };
}

interface SceneEffects {
  onEnter?: (state: GameState, actions: GameActions) => void;
  onChoice?: (choiceId: string, state: GameState, actions: GameActions) => void;
}

export class SceneFactory {
  private static commonChoices = {
    continueToForest: () => ({ text: "Continue to the forest", action: "forest_path" }),
    visitHermit: () => ({ text: "Visit the hermit", action: "cottage" }),
    restAndHeal: (amount = 20) => ({ 
      text: "Rest and heal", 
      action: "forest_path",
      effects: { heal: amount }
    }),
    returnToPrevious: (scene: string) => ({ text: "Go back", action: scene })
  };

  static createScene(template: SceneTemplate, gameState: GameState, actions: GameActions): Scene {
    const description = typeof template.description === 'function' 
      ? template.description(gameState) 
      : template.description;

    const choices = [
      ...(template.baseChoices || []),
      ...(template.conditionalChoices?.filter(choice => 
        this.checkConditions(choice.conditions, gameState)) || [])
    ].map(choice => this.processChoice(choice, actions));

    return { title: template.title, description, choices };
  }

  private static checkConditions(conditions: ConditionalChoice['conditions'], state: GameState): boolean {
    if (!conditions) return true;
    
    return [
      () => !conditions.skills || Object.entries(conditions.skills).every(([skill, min]) => 
        (state.skills?.[skill] || 0) >= min),
      () => !conditions.items || conditions.items.every(item => state.inventory.includes(item)),
      () => !conditions.achievements || conditions.achievements.every(ach => state.achievements.includes(ach)),
      () => !conditions.relationships || Object.entries(conditions.relationships).every(([char, min]) => 
        (state.relationships?.[char] || 0) >= min),
      () => !conditions.custom || conditions.custom(state)
    ].every(check => check());
  }

  private static processChoice(choice: any, actions: GameActions): Choice {
    return {
      text: choice.text,
      action: () => {
        if (choice.effects) {
          this.applyEffects(choice.effects, actions);
        }
        if (choice.action) {
          actions.changeScene(choice.action);
        }
      },
      skillCheck: choice.skillCheck
    };
  }

  private static applyEffects(effects: any, actions: GameActions): void {
    if (effects.score) actions.addScore(effects.score);
    if (effects.heal) actions.heal(effects.heal);
    if (effects.damage) actions.takeDamage(effects.damage);
    if (effects.item) actions.addToInventory(effects.item);
    if (effects.achievement) actions.addAchievement(effects.achievement);
    if (effects.skill) actions.improveSkill(effects.skill.type, effects.skill.amount);
    if (effects.relationship) actions.modifyRelationship(effects.relationship.target, effects.relationship.change);
  }
}

export const SCENE_TEMPLATES: Record<string, SceneTemplate> = {
  start: {
    title: "The Enchanted Forest",
    description: "You stand at the edge of a mystical forest where ancient magic flows. Legends speak of the Golden Orb of Eternal Wisdom hidden within.",
    type: 'choice',
    baseChoices: [
      { text: "Follow the forest path", action: "forest_path", effects: { score: 10 }},
      { text: "Approach the cottage", action: "cottage", effects: { score: 5 }},
      { text: "Search for secrets", action: "search_start", skillCheck: { type: "wisdom", difficulty: 2 }}
    ]
  },

  discovery: {
    title: "Hidden Discovery",
    description: (state) => `You discover something valuable. Your keen observation skills serve you well.`,
    type: 'discovery',
    baseChoices: [
      { text: "Take the item", effects: { score: 50, achievement: "Keen Observer" }},
      { text: "Leave it for now", action: "forest_path" }
    ]
  },

  encounter: {
    title: "Unexpected Meeting",
    description: "You encounter someone on your journey. How you approach will matter.",
    type: 'encounter',
    baseChoices: [
      { text: "Approach respectfully", effects: { score: 25 }},
      { text: "Be cautious", effects: { score: 10 }},
      { text: "Continue without engaging", action: "forest_path" }
    ]
  },

  ending: {
    title: "Your Journey's End",
    description: (state) => `Your adventure concludes. Score: ${state.score}. Achievements: ${state.achievements.length}.`,
    type: 'ending',
    baseChoices: [
      { text: "Begin anew", action: "restart" }
    ]
  }
};

export function generateAllScenes(gameState: GameState, actions: GameActions): Record<string, Scene> {
  const scenes: Record<string, Scene> = {};

  Object.entries(SCENE_TEMPLATES).forEach(([id, template]) => {
    scenes[id] = SceneFactory.createScene(template, gameState, actions);
  });

  const discoveries = [
    { id: "search_start", item: "Ancient Key", achievement: "Keen Observer" },
    { id: "crystal_discovery", item: "Crystal of Visions", achievement: "Mystic Scholar" },
    { id: "blessing_found", item: "Unicorn's Blessing", achievement: "Pure of Heart" }
  ];

  discoveries.forEach(disc => {
    scenes[disc.id] = SceneFactory.createScene({
      ...SCENE_TEMPLATES.discovery,
      title: `Discovery: ${disc.item}`,
      baseChoices: [
        { text: `Take the ${disc.item}`, action: "forest_path", 
          effects: { item: disc.item, achievement: disc.achievement, score: 50 }},
        { text: "Leave it", action: "forest_path" }
      ]
    }, gameState, actions);
  });

  const characters = [
    { id: "cottage", name: "Eldric the Hermit", relationship: "hermit" },
    { id: "unicorn_encounter", name: "Celestia the Unicorn", relationship: "unicorn" },
    { id: "main_hall", name: "Auraxes the Dragon", relationship: "auraxes" }
  ];

  characters.forEach(char => {
    scenes[char.id] = createCharacterScene(char, gameState, actions);
  });

  generateProgressionScenes(scenes, gameState, actions);
  
  generateFallbackScenes(scenes, actions);

  return scenes;
}

function createCharacterScene(char: any, gameState: GameState, actions: GameActions): Scene {
  const baseChoices = [
    { text: `Greet ${char.name} respectfully`, action: `${char.id}_positive`, 
      effects: { relationship: { target: char.relationship, change: 15 }, score: 25 }},
    { text: "Ask for guidance", action: `${char.id}_guidance` },
    { text: "Continue your journey", action: "forest_path" }
  ];

  if (char.id === "cottage") {
    baseChoices.push(
      { text: "Request a weapon", action: "get_sword", 
        conditions: { custom: (state) => !state.inventory.includes("Enchanted Sword") }},
      { text: "Ask for healing", action: "get_potion",
        conditions: { custom: (state) => !state.inventory.includes("Healing Potion") }}
    );
  }

  return SceneFactory.createScene({
    title: `Meeting ${char.name}`,
    description: `You encounter ${char.name}. They regard you with ancient wisdom.`,
    type: 'encounter',
    baseChoices
  }, gameState, actions);
}

function generateProgressionScenes(scenes: Record<string, Scene>, gameState: GameState, actions: GameActions): void {
  const progressionScenes = [
    "forest_path", "temple_approach", "wisdom_seeker", "dragon_combat", 
    "respectful_approach", "guardian_ending", "scholar_ending"
  ];

  progressionScenes.forEach(sceneId => {
    if (!scenes[sceneId]) {
      scenes[sceneId] = {
        title: "Journey Continues",
        description: "Your adventure progresses through the mystical realm.",
        choices: [
          { text: "Continue forward", action: () => actions.changeScene(getNextScene(sceneId)) },
          { text: "Rest briefly", action: () => { actions.heal(10); actions.changeScene(getNextScene(sceneId)); }}
        ]
      };
    }
  });
}

function generateFallbackScenes(scenes: Record<string, Scene>, actions: GameActions): void {
  scenes.missing_scene_fallback = {
    title: "Path Forward",
    description: "The mystical realm guides you onward.",
    choices: [
      { text: "Continue to forest", action: () => actions.changeScene("forest_path") },
      { text: "Visit hermit", action: () => actions.changeScene("cottage") },
      { text: "Restart journey", action: actions.restartGame }
    ]
  };
}

function getNextScene(currentScene: string): string {
  const progressionMap: Record<string, string> = {
    "forest_path": "temple_approach",
    "temple_approach": "main_hall", 
    "main_hall": "wisdom_seeker",
    "wisdom_seeker": "guardian_ending"
  };
  return progressionMap[currentScene] || "forest_path";
}
