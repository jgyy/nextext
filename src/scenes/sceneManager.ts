// src/scenes/sceneManager.ts
import { Scene, GameState, GameActions } from "../types/game";
import { createStartingScenes } from "./startingScenes";
import { createCottageScenes } from "./cottageScenes";
import { createForestScenes, getEnhancedForestPath } from "./forestScenes";
import { createRiverScenes } from "./riverScenes";
import { createTempleScenes } from "./templeScenes";
import { createDragonScenes } from "./dragonScenes";
import { createEndingScenes } from "./endingScenes";
import { createAdditionalScenes } from "./additionalScenes";
import { createForestScenesPart2 } from "./forestScenesPart2";
import { createExpansionScenes, createUtilityScenes } from "./expansionScenes";
import { createExpansionScenesFix, createAdditionalEnhancedScenes } from "./expansionScenesFix";
import { createConnectorScenes } from "./connectorScenes";
import { createBridgeScenes } from "./bridgeScenes";
import { createMissingScenes } from "./missingScenes";
import { createMissingScenesFix } from "./missingScenesFix";
import { createGameExpansion } from "./gameExpansion";
import { createGameExpansionAdditional, createCharacterStorylines, createPuzzleScenes, createMoralDilemmas, createWorldBuildingScenes } from "./gameExpansionAdditional";
import { createAdditionalMissingScenes } from "./additionalMissingScenes";
import { createMissingScenesFinal } from "./missingScenesFinal";
import { createAdvancedExpansion, createGameSystems } from "./advancedExpansion";

const createMissingScenesFinalFixed = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  hermit_knowledge_sharing: {
    title: "Sharing Discoveries with the Hermit",
    description: "You return to Eldric's cottage with your detailed documentation of the forest's magical flow patterns. The hermit's eyes widen with excitement as you show him your diagrams and observations.\n\n'Remarkable! This is groundbreaking research that could change how we understand magical theory itself. You've documented patterns that even I, in all my years, have only theorized about.'",
    choices: [
      {
        text: "Propose collaborating on a comprehensive magical theory",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Magical Theorist");
          actions.changeScene("magical_theory_collaboration");
        }
      },
      {
        text: "Ask the hermit to share his own research",
        action: () => {
          actions.addToInventory("Hermit's Research Notes");
          actions.changeScene("hermit_research_shared");
        }
      },
      {
        text: "Suggest publishing this knowledge for other scholars",
        action: () => {
          actions.addScore(100);
          actions.changeScene("knowledge_publication");
        }
      },
      {
        text: "Continue your quest with the hermit's blessing",
        action: () => {
          actions.addToInventory("Scholarly Blessing");
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  magical_theory_collaboration: {
    title: "The Birth of New Magic Theory",
    description: "You and Eldric spend hours developing a revolutionary new understanding of magical flow patterns. Together, you create a comprehensive theory that explains how magical energy moves through living systems, geographical features, and even dimensions.\n\nThis collaboration represents a historic moment in magical scholarship.",
    choices: [
      {
        text: "Establish a school of magical theory",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Academy Founder");
          actions.changeScene("theory_school_founded");
        }
      },
      {
        text: "Test the theory in the dragon's temple",
        action: () => {
          actions.addScore(150);
          actions.changeScene("theory_temple_test");
        }
      },
      {
        text: "Continue your quest armed with new understanding",
        action: () => {
          actions.addToInventory("Revolutionary Magic Theory");
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  hermit_research_shared: {
    title: "The Hermit's Hidden Knowledge",
    description: "Eldric shares his lifetime of research with you - decades of observations about the mystical forest, careful studies of magical creatures, and theoretical work on the nature of wisdom itself. His notes reveal insights that complement your own discoveries perfectly.",
    choices: [
      {
        text: "Combine both research sets into a master work",
        action: () => {
          actions.addScore(175);
          actions.addToInventory("Complete Magical Compendium");
          actions.changeScene("master_work_created");
        }
      },
      {
        text: "Use the combined knowledge to understand the dragon better",
        action: () => {
          actions.addScore(125);
          actions.changeScene("enhanced_dragon_understanding");
        }
      },
      {
        text: "Focus on the practical applications",
        action: () => {
          actions.addScore(100);
          actions.changeScene("practical_magic_applications");
        }
      }
    ]
  },

  hidden_site_discovery: {
    title: "Discovering Hidden Magical Sites",
    description: "Using your understanding of magical flow patterns, you locate several previously unknown sites of power in the forest. These include a grove where time moves differently, a spring that enhances memory, and a circle of stones that amplify magical abilities.",
    choices: [
      {
        text: "Explore the time-altered grove",
        action: () => {
          actions.addScore(100);
          actions.changeScene("temporal_grove_detailed");
        }
      },
      {
        text: "Investigate the memory-enhancing spring",
        action: () => {
          actions.addScore(100);
          actions.changeScene("memory_spring");
        }
      },
      {
        text: "Study the stone circle's properties",
        action: () => {
          actions.addScore(100);
          actions.changeScene("amplification_circle");
        }
      },
      {
        text: "Map all sites for future scholars",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Site Cartographer");
          actions.changeScene("magical_site_mapping");
        }
      }
    ]
  },

  temporal_grove_detailed: {
    title: "The Grove Where Time Bends",
    description: "In this remarkable grove, you witness the full extent of temporal distortion. Past and future seem to exist simultaneously here. You see echoes of ancient ceremonies, glimpses of possible tomorrows, and the eternal dance of cause and effect.",
    choices: [
      {
        text: "Study the temporal mechanics carefully",
        action: () => {
          actions.addScore(100);
          actions.addToInventory("Temporal Theory Notes");
          actions.changeScene("temporal_study_complete");
        }
      },
      {
        text: "Try to communicate across time",
        action: () => {
          actions.addScore(125);
          actions.changeScene("temporal_communication_attempt");
        },
        skillCheck: { type: 'wisdom', difficulty: 8 }
      },
      {
        text: "Leave before you get trapped in time",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  memory_spring: {
    title: "The Spring of Remembrance",
    description: "This crystal-clear spring enhances memory and understanding. Drinking from it allows you to recall details with perfect clarity and understand connections you might have missed. Ancient knowledge becomes accessible to those who drink respectfully.",
    choices: [
      {
        text: "Drink deeply and enhance your memories",
        action: () => {
          actions.addScore(100);
          actions.heal(25);
          actions.addAchievement("Perfect Memory");
          actions.changeScene("memory_enhanced");
        }
      },
      {
        text: "Use the spring to understand the dragon's history",
        action: () => {
          actions.addScore(150);
          actions.changeScene("dragon_history_revealed");
        }
      },
      {
        text: "Share the spring's location with scholars",
        action: () => {
          actions.addScore(75);
          actions.changeScene("spring_sharing");
        }
      }
    ]
  },

  amplification_circle: {
    title: "The Circle of Amplification",
    description: "This ancient stone circle amplifies magical abilities and enhances the understanding of all who enter it with pure intentions. The stones hum with accumulated magical energy from centuries of use by wise practitioners.",
    choices: [
      {
        text: "Use the circle to enhance your own abilities",
        action: () => {
          actions.addScore(100);
          actions.addToInventory("Amplified Abilities");
          actions.changeScene("abilities_enhanced");
        }
      },
      {
        text: "Study how the amplification works",
        action: () => {
          actions.addScore(125);
          actions.addToInventory("Amplification Theory");
          actions.changeScene("amplification_understood");
        }
      },
      {
        text: "Preserve the circle for future users",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Sacred Site Guardian");
          actions.changeScene("circle_preservation");
        }
      }
    ]
  },

  knowledge_publication: {
    title: "Publishing Revolutionary Knowledge",
    description: "You and the hermit work together to publish your magical flow research, creating the first comprehensive guide to understanding magical currents. This publication revolutionizes magical education across the realm.",
    choices: [
      {
        text: "Establish a research institute",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Institute Founder");
          actions.changeScene("research_institute");
        }
      },
      {
        text: "Continue your quest with fame and recognition",
        action: () => {
          actions.addScore(100);
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  expanded_research: {
    title: "Comprehensive Magical Research",
    description: "Your research expands beyond just magical flows to encompass the entire ecosystem of mystical forces in the forest. You study everything from creature magic to plant enchantments, creating the most comprehensive magical survey ever attempted.",
    choices: [
      {
        text: "Focus on practical applications for adventurers",
        action: () => {
          actions.addScore(125);
          actions.changeScene("adventurer_guide_creation");
        }
      },
      {
        text: "Create a theoretical framework for magical education",
        action: () => {
          actions.addScore(150);
          actions.changeScene("educational_framework");
        }
      },
      {
        text: "Continue your quest with enhanced knowledge",
        action: () => {
          actions.addScore(75);
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  responsible_magic: {
    title: "Ethical Magical Practice",
    description: "Your responsible approach to magic becomes a model for others. You develop principles that balance power with wisdom.",
    choices: [
      {
        text: "Teach these principles to others",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Ethics Teacher");
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Continue your quest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  ambitious_magic: {
    title: "The Risks of Ambition",
    description: "Your ambitious magical experiments yield powerful but dangerous results.",
    choices: [
      {
        text: "Pull back from the dangerous path",
        action: () => {
          actions.addScore(100);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Accept the risks",
        action: () => {
          actions.takeDamage(15);
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  cautious_withdrawal: {
    title: "Wisdom in Restraint",
    description: "You wisely choose caution over ambition, demonstrating mature judgment.",
    choices: [
      {
        text: "Continue with newfound wisdom",
        action: () => {
          actions.addScore(75);
          actions.changeScene("forest_path");
        }
      }
    ]
  }
});

export const getAllScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => {
  const baseScenes = {
    ...createStartingScenes(gameState, actions),
    ...createCottageScenes(gameState, actions),
    ...createForestScenes(gameState, actions),
    ...createForestScenesPart2(gameState, actions),
    ...createRiverScenes(gameState, actions),
    ...createTempleScenes(gameState, actions),
    ...createDragonScenes(gameState, actions),
    ...createEndingScenes(gameState, actions),
    ...createAdditionalScenes(gameState, actions),
    ...createExpansionScenes(gameState, actions),
    ...createUtilityScenes(gameState, actions),
    ...createConnectorScenes(gameState, actions),
    ...createBridgeScenes(gameState, actions),
    ...createMissingScenes(gameState, actions),
    ...createMissingScenesFix(gameState, actions),
    ...createGameExpansion(gameState, actions),
    ...createExpansionScenesFix(gameState, actions),
    ...createAdditionalEnhancedScenes(gameState, actions),
    ...createAdditionalMissingScenes(gameState, actions),
    ...createMissingScenesFinal(gameState, actions),
    ...createAdvancedExpansion(gameState, actions),
    ...createGameSystems(gameState, actions),
    ...createMissingScenesFinalFixed(gameState, actions) 
  };

  try {
    if (typeof createGameExpansionAdditional !== 'undefined') {
      Object.assign(baseScenes, createGameExpansionAdditional(gameState, actions));
    }
  } catch (e) {
    console.warn('createGameExpansionAdditional not available');
  }

  try {
    if (typeof createCharacterStorylines !== 'undefined') {
      Object.assign(baseScenes, createCharacterStorylines(gameState, actions));
    }
  } catch (e) {
    console.warn('createCharacterStorylines not available');
  }

  try {
    if (typeof createPuzzleScenes !== 'undefined') {
      Object.assign(baseScenes, createPuzzleScenes(gameState, actions));
    }
  } catch (e) {
    console.warn('createPuzzleScenes not available');
  }

  try {
    if (typeof createMoralDilemmas !== 'undefined') {
      Object.assign(baseScenes, createMoralDilemmas(gameState, actions));
    }
  } catch (e) {
    console.warn('createMoralDilemmas not available');
  }

  try {
    if (typeof createWorldBuildingScenes !== 'undefined') {
      Object.assign(baseScenes, createWorldBuildingScenes(gameState, actions));
    }
  } catch (e) {
    console.warn('createWorldBuildingScenes not available');
  }

  if (gameState.currentScene && baseScenes[gameState.currentScene]) {
    baseScenes.forest_path = getEnhancedForestPath(gameState, actions);
  }

  baseScenes.debug_missing_scene = {
    title: "Scene Navigation Error",
    description: `The scene you're trying to reach doesn't exist. This is a navigation error that shouldn't happen in normal gameplay. 

Current Scene: ${gameState.currentScene}
Available Scenes: ${Object.keys(baseScenes).length} scenes loaded

Please report this issue if it persists.`,
    choices: [
      {
        text: "Return to the forest path",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Go back to the start",
        action: () => actions.changeScene("start")
      },
      {
        text: "Visit the hermit's cottage",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Restart your adventure",
        action: actions.restartGame
      }
    ]
  };

  return baseScenes;
};

export const validateScenes = (scenes: Record<string, Scene>): void => {
  const missingScenes: string[] = [];
  const invalidScenes: string[] = [];

  Object.entries(scenes).forEach(([sceneId, scene]) => {
    if (!scene.title || !scene.description || !scene.choices) {
      invalidScenes.push(sceneId);
      console.error(`Invalid scene structure for ${sceneId}:`, scene);
    }
    
    scene.choices.forEach((choice, index) => {
      if (!choice.text || !choice.action) {
        console.error(`Invalid choice ${index} in scene ${sceneId}:`, choice);
      }
    });
  });

  Object.entries(scenes).forEach(([sceneId, scene]) => {
    scene.choices.forEach((choice) => {
      const actionString = choice.action.toString();
      const match = actionString.match(/changeScene\s*\(\s*["']([^"']+)["']\s*\)/);
      if (match && match[1] && !scenes[match[1]] && match[1] !== 'debug_missing_scene') {
        missingScenes.push(match[1]);
      }
    });
  });

  if (invalidScenes.length > 0) {
    console.warn('Invalid scenes found:', invalidScenes);
  }

  if (missingScenes.length > 0) {
    console.warn('Referenced but missing scenes:', [...new Set(missingScenes)]);
  }

  console.log(`Scene validation complete. Total scenes: ${Object.keys(scenes).length}`);
};

export const getScene = (scenes: Record<string, Scene>, sceneId: string): Scene => {
  if (scenes[sceneId]) {
    return scenes[sceneId];
  }
  
  console.error(`Scene "${sceneId}" not found. Falling back to debug scene.`);
  return scenes.debug_missing_scene || {
    title: "Error",
    description: "Critical error: No scenes loaded.",
    choices: [{
      text: "Restart",
      action: () => window.location.reload()
    }]
  };
};
