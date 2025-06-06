// src/scenes/sceneManager.ts
import { Scene, GameState, GameActions } from "../types/game";
import { createStartingScenes } from "./startingScenes";
import { createCottageScenes } from "./cottageScenes";
import { createForestScenes } from "./forestScenes";
import { createRiverScenes } from "./riverScenes";
import { createTempleScenes } from "./templeScenes";
import { createDragonScenes } from "./dragonScenes";
import { createEndingScenes } from "./endingScenes";

export const getAllScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => {
  const allScenes = {
    ...createStartingScenes(gameState, actions),
    ...createCottageScenes(gameState, actions),
    ...createForestScenes(gameState, actions),
    ...createRiverScenes(gameState, actions),
    ...createTempleScenes(gameState, actions),
    ...createDragonScenes(gameState, actions),
    ...createEndingScenes(gameState, actions),
    ...createPlaceholderScenes(gameState, actions)
  };

  return allScenes;
};

const createPlaceholderScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  placeholder_scene: {
    title: "Continuing Your Journey",
    description: "Your adventure continues through paths unknown. The choices you've made have led you to new possibilities, and your character grows stronger with each decision. What lies ahead remains to be discovered.",
    choices: [
      {
        text: "Continue your quest",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Return to familiar ground",
        action: () => actions.changeScene("start")
      },
      {
        text: "Seek wisdom",
        action: () => actions.changeScene("cottage")
      }
    ]
  }
});
