// src/scenes/startingScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createStartingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  start: {
    title: "The Enchanted Forest",
    description: "You stand at the edge of a mystical forest where ancient magic still flows through twisted trees and glowing streams. Legends speak of a great treasure hidden deep within - the Golden Orb of Eternal Wisdom. But many have entered these woods, and few have returned.\n\nA worn path leads deeper into the shadows, while to your right, smoke rises from a humble cottage chimney.",
    choices: [
      {
        text: "Follow the forest path into the unknown",
        action: () => {
          actions.addScore(10);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Approach the cottage for guidance",
        action: () => {
          actions.addScore(5);
          actions.changeScene("cottage");
        }
      },
      {
        text: "Search the area for hidden secrets",
        action: () => actions.changeScene("search_start"),
        skillCheck: { type: 'wisdom', difficulty: 2 }
      }
    ]
  },

  search_start: {
    title: "Hidden Discovery",
    description: "Your careful search among the gnarled roots of an ancient oak reveals something extraordinary - a small, ornate key covered in glowing runes. The moment you spot it, the runes pulse with magical energy, as if recognizing a worthy finder.\n\nThis is clearly no ordinary key. The craftsmanship suggests it's incredibly old, and the magic radiating from it feels both powerful and benevolent.",
    choices: [
      {
        text: "Take the Ancient Key",
        action: () => {
          actions.addToInventory("Ancient Key");
          actions.addAchievement("Keen Observer");
          actions.addScore(50);
          actions.changeScene("found_key");
        }
      },
      {
        text: "Leave it and visit the cottage for advice",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Leave it and venture into the forest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  found_key: {
    title: "Ancient Power Awakened",
    description: "As your fingers close around the Ancient Key, mystical runes along its surface blaze with brilliant light. A surge of ancient magic flows through you, and for a moment, you glimpse visions of the key's history - mighty wizards, forgotten kingdoms, and secrets locked away for centuries.\n\nYou sense this key will open more than just doors - it may unlock your destiny itself.",
    choices: [
      {
        text: "Head to the forest with your newfound power",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Visit the hermit to learn about the key's origins",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  game_over: {
    title: "The End of This Tale",
    description: `Your adventure has come to an end, but every ending is also a beginning. You faced challenges with courage and made choices that revealed your character.\n\nFinal Score: ${gameState.score}\nAchievements Earned: ${gameState.achievements.length}\n\nThough this journey is complete, the lessons learned and wisdom gained will serve you well in future adventures.`,
    choices: [
      {
        text: "Begin a new adventure with greater wisdom",
        action: actions.restartGame
      }
    ]
  }
});
