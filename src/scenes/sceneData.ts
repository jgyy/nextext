// src/scenes/sceneData.ts
import { GameState, GameActions, Scene, Choice } from '../types';

export const SCENE_TEMPLATES = {
  discovery: (title: string, item: string, score: number, achievement?: string) => ({
    title,
    description: `You discover ${item}. This could prove valuable on your journey ahead.`,
    getChoices: (actions: GameActions) => [
      {
        text: `Take the ${item}`,
        action: () => {
          actions.addToInventory(item);
          actions.addScore(score);
          if (achievement) actions.addAchievement(achievement);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Leave it and continue",
        action: () => actions.changeScene("forest_path")
      }
    ]
  }),
  
  encounter: (title: string, character: string, relationshipKey: string) => ({
    title,
    description: `You encounter ${character}. How you approach this meeting will affect your relationship.`,
    getChoices: (actions: GameActions) => [
      {
        text: "Approach with respect",
        action: () => {
          if (actions.modifyRelationship) actions.modifyRelationship(relationshipKey, 10);
          actions.addScore(25);
          actions.changeScene(`${relationshipKey}_positive`);
        }
      },
      {
        text: "Be cautious but polite",
        action: () => {
          if (actions.modifyRelationship) actions.modifyRelationship(relationshipKey, 5);
          actions.changeScene(`${relationshipKey}_neutral`);
        }
      },
      {
        text: "Continue without engaging",
        action: () => actions.changeScene("forest_path")
      }
    ]
  }),
  
  choice: (title: string, description: string, choices: Array<{text: string, consequence: string, score?: number}>) => ({
    title,
    description,
    getChoices: (actions: GameActions) => choices.map(choice => ({
      text: choice.text,
      action: () => {
        if (choice.score) actions.addScore(choice.score);
        actions.changeScene(choice.consequence);
      }
    }))
  }),
  
  ending: (title: string, description: string, gameState: GameState) => ({
    title,
    description: `${description}\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYour choices shaped this unique ending.`,
    getChoices: (actions: GameActions) => [
      {
        text: "Begin a new adventure",
        action: actions.restartGame
      }
    ]
  })
};

export const CORE_SCENES = {
  start: {
    title: "The Enchanted Forest",
    description: "You stand at the edge of a mystical forest where ancient magic flows. Legends speak of the Golden Orb of Eternal Wisdom hidden within. A worn path leads into shadows, while smoke rises from a cottage.",
    choices: [
      { text: "Follow the forest path", action: "forest_path", score: 10 },
      { text: "Approach the cottage", action: "cottage", score: 5 },
      { text: "Search for hidden secrets", action: "search_start", skillCheck: { type: "wisdom", difficulty: 2 }}
    ]
  },
  
  cottage: {
    title: "The Hermit's Sanctuary",
    description: "An ancient hermit opens the door, his eyes twinkling with wisdom. 'Welcome, brave traveler. I am Eldric the Wise. The path ahead is treacherous, but I can offer aid to one pure of heart.'",
    choices: [
      { text: "Ask about the Golden Orb", action: "hermit_lore" },
      { text: "Request a weapon", action: "get_sword", condition: "!hasSword", item: "Enchanted Sword", achievement: "Armed and Ready" },
      { text: "Ask for healing supplies", action: "get_potion", condition: "!hasPotion", item: "Healing Potion" },
      { text: "Thank him and continue", action: "forest_path" }
    ]
  },
  
  forest_path: {
    title: "Into the Heart of Mystery",
    description: "The forest grows denser and more magical. Luminescent flowers glow with blue light. You hear crystalline water in the distance, while ancient ruins peek through the canopy.",
    choices: [
      { text: "Follow the sound of water", action: "crystal_stream" },
      { text: "Climb toward the ruins", action: "temple_approach" },
      { text: "Rest and prepare", action: "forest_rest" },
      { text: "Search for hidden paths", action: "secret_paths", skillCheck: { type: "survival", difficulty: 3 }}
    ]
  },
  
  crystal_stream: {
    title: "The Stream of Starlight",
    description: "A crystal-clear stream sparkles with inner radiance. Ancient runes are carved in stones beneath. A magnificent unicorn steps from silver birches, its horn gleaming like moonlight.",
    choices: [
      { text: "Approach the unicorn with reverence", action: "unicorn_encounter" },
      { text: "Examine the magical runes", action: "water_mystery", skillCheck: { type: "wisdom", difficulty: 3 }},
      { text: "Drink from the stream", action: "stream_blessing", heal: 30, score: 25 }
    ]
  },
  
  main_hall: {
    title: "The Dragon's Domain",
    description: "You enter a vast chamber illuminated by floating orbs. Ancient tapestries line the walls. In the center rests Auraxes the Ancient - a dragon of impossible beauty whose scales shimmer like gold. 'Another seeker comes before me. Tell me, young one - what brings you to my domain?'",
    choices: [
      { text: "Seek wisdom above treasure", action: "wisdom_seeker", score: 100 },
      { text: "Draw your sword", action: "dragon_combat", condition: "hasSword", skillCheck: { type: "courage", difficulty: 5 }},
      { text: "Approach with respect", action: "respectful_approach" },
      { text: "Offer a gift", action: "tribute_offering", condition: "inventory.length > 0" }
    ]
  }
};

export const generateScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => {
  const scenes: Record<string, Scene> = {};
  
  Object.entries(CORE_SCENES).forEach(([id, data]) => {
    scenes[id] = {
      title: data.title,
      description: data.description,
      choices: data.choices.map(choice => ({
        text: choice.text,
        action: () => {
          if (choice.score) actions.addScore(choice.score);
          if (choice.heal) actions.heal(choice.heal);
          if (choice.item) {
            actions.addToInventory(choice.item);
            if (choice.achievement) actions.addAchievement(choice.achievement);
          }
          actions.changeScene(choice.action);
        },
        condition: choice.condition ? () => evaluateCondition(choice.condition!, gameState) : undefined,
        skillCheck: choice.skillCheck
      }))
    };
  });
  
  scenes.search_start = SCENE_TEMPLATES.discovery(
    "Hidden Discovery", 
    "Ancient Key", 
    50, 
    "Keen Observer"
  ) as Scene;
  
  scenes.unicorn_encounter = SCENE_TEMPLATES.encounter(
    "Meeting the Pure of Heart",
    "a magnificent unicorn named Celestia",
    "unicorn"
  ) as Scene;
  
  scenes.guardian_ending = SCENE_TEMPLATES.ending(
    "Guardian of Wisdom",
    "You accept the sacred role of Wisdom Guardian, becoming a bridge between ancient knowledge and the modern world.",
    gameState
  ) as Scene;
  
  addMissingScenes(scenes, gameState, actions);
  
  return scenes;
};

const evaluateCondition = (condition: string, gameState: GameState): boolean => {
  if (condition.startsWith('!')) {
    const prop = condition.slice(1);
    return !gameState[prop as keyof GameState];
  }
  if (condition.includes('.length')) {
    const [prop] = condition.split('.');
    return (gameState[prop as keyof GameState] as any[])?.length > 0;
  }
  return !!gameState[condition as keyof GameState];
};

const addMissingScenes = (scenes: Record<string, Scene>, gameState: GameState, actions: GameActions) => {
  scenes.game_over = {
    title: "The End of This Tale",
    description: `Your adventure has ended. Final Score: ${gameState.score}. Achievements: ${gameState.achievements.length}. Every ending is also a beginning.`,
    choices: [{ text: "Begin anew", action: actions.restartGame }]
  };
  
  const simpleScenes = [
    'hermit_lore', 'get_sword', 'get_potion', 'temple_approach', 'wisdom_seeker',
    'dragon_combat', 'respectful_approach', 'tribute_offering', 'water_mystery',
    'stream_blessing', 'forest_rest', 'secret_paths'
  ];
  
  simpleScenes.forEach(sceneId => {
    if (!scenes[sceneId]) {
      scenes[sceneId] = {
        title: "Continue Your Journey",
        description: "Your path leads forward through the mystical realm.",
        choices: [
          { text: "Continue", action: () => actions.changeScene("forest_path") },
          { text: "Rest", action: () => { actions.heal(10); actions.changeScene("forest_path"); }}
        ]
      };
    }
  });
};
