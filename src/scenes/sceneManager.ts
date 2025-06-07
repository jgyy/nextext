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
    ...createGameSystems(gameState, actions)
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
