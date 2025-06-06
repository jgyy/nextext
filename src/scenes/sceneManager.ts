// src/scenes/sceneManager.ts
import { Scene, GameState, GameActions } from "../types/game";
import { createStartingScenes } from "./startingScenes";
import { createCottageScenes } from "./cottageScenes";
import { createForestScenes } from "./forestScenes";
import { createRiverScenes } from "./riverScenes";
import { createTempleScenes } from "./templeScenes";
import { createDragonScenes } from "./dragonScenes";
import { createEndingScenes } from "./endingScenes";
import { createAdditionalScenes } from "./additionalScenes";
import { createForestScenesPart2 } from "./forestScenesPart2";
import { createExpansionScenes, createUtilityScenes } from "./expansionScenes";
import { createConnectorScenes } from "./connectorScenes";
import { createBridgeScenes } from "./bridgeScenes";
import createMissingScenes from "./missingScenes";

export const getAllScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => {
  const allScenes = {
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
    ...createLocalMissingScenes(gameState, actions),
    ...createEnhancedScenes(gameState, actions),
    ...createPlaceholderScenes(gameState, actions)
  };

  return allScenes;
};

const createMissingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  dragon_insight: {
    title: "Understanding the Dragon's Heart",
    description: "The Crystal of Visions reveals the truth about Auraxes - centuries of loneliness, watching students come and go, seeing the world slowly forget the value of wisdom and learning. You witness her pain as wars erupted, libraries burned, and knowledge was abandoned for material pursuits.\n\nShe is not a monster hoarding treasure, but a heartbroken teacher who has been waiting for someone who truly values what she protects. Your heart fills with compassion for this ancient guardian of wisdom.",
    choices: [
      {
        text: "Approach the dragon with deep empathy",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Dragon's Heart");
          actions.changeScene("empathetic_approach");
        }
      },
      {
        text: "Offer to be her student and companion",
        action: () => actions.changeScene("companion_offer")
      },
      {
        text: "Promise to help end her solitude",
        action: () => actions.changeScene("solitude_promise")
      }
    ]
  },

  secret_knowledge: {
    title: "Hidden Paths Revealed",
    description: "The Crystal shows you secret passages through the temple that few have ever discovered. These paths were designed by ancient architects to test different virtues - one path tests courage, another wisdom, and a third tests compassion.\n\nMore importantly, you see that the dragon has been using these passages to observe visitors, studying their character before revealing herself. She has been hoping to find someone worthy of her trust.",
    choices: [
      {
        text: "Use the wisdom path to approach respectfully",
        action: () => {
          actions.addScore(75);
          actions.changeScene("wisdom_path");
        }
      },
      {
        text: "Take the compassion path to show your heart",
        action: () => {
          actions.addScore(75);
          actions.changeScene("compassion_path");
        }
      },
      {
        text: "Enter boldly through the main entrance",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  test_revelation: {
    title: "The True Test Unveiled",
    description: "The visions reveal the real nature of the test that awaits. It's not about solving riddles or demonstrating magical power - it's about a fundamental choice between self and others. The dragon will offer you exactly what you think you want, but the true test is whether you'll choose personal gain or the greater good.\n\nThis revelation fills you with both excitement and trepidation. You understand now that this quest will test the very core of who you are.",
    choices: [
      {
        text: "Prepare to choose wisdom over wealth",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wisdom_preparation");
        }
      },
      {
        text: "Enter the temple with confidence in your character",
        action: () => {
          actions.addScore(50);
          actions.changeScene("confident_entry");
        }
      },
      {
        text: "Meditate on the nature of true treasure",
        action: () => actions.changeScene("treasure_meditation")
      }
    ]
  },

  empathetic_approach: {
    title: "Meeting with Understanding",
    description: "You enter the dragon's hall not as a treasure hunter or warrior, but as someone who understands pain and loneliness. Auraxes immediately senses the change in your demeanor and regards you with surprise and cautious hope.\n\n'You look upon me not with fear or greed, but with... understanding?' she says softly. 'It has been so very long since anyone saw past my scales to the heart beneath.'",
    choices: [
      {
        text: "Express genuine sympathy for her isolation",
        action: () => {
          actions.addScore(100);
          actions.changeScene("sympathy_expressed");
        }
      },
      {
        text: "Offer to share stories of the outside world",
        action: () => actions.changeScene("world_sharing")
      },
      {
        text: "Ask about her hopes and dreams",
        action: () => actions.changeScene("dragon_dreams")
      }
    ]
  },

  wisdom_preparation: {
    title: "Strengthening Your Resolve",
    description: "Understanding the nature of the coming test, you spend time in quiet reflection, strengthening your commitment to wisdom and compassion over personal gain. You remind yourself of the hermit's kindness, the unicorn's wisdom, and all the lessons you've learned on this journey.\n\nYou feel ready to face whatever choice the dragon presents, confident in your values and determined to prove worthy of her trust.",
    choices: [
      {
        text: "Enter the temple with resolved heart",
        action: () => {
          actions.addScore(75);
          actions.changeScene("main_hall");
        }
      },
      {
        text: "Practice making selfless choices",
        action: () => actions.changeScene("selflessness_practice")
      }
    ]
  },

  ruins: {
    title: "Ancient Temple Grounds",
    description: "You emerge from the forest to find yourself at the base of a massive temple complex. Ancient stones rise before you like sleeping giants, covered in moss and glowing with faint magical energy. This is clearly the Temple of Trials, where the Golden Orb waits.\n\nThe structure is both magnificent and intimidating, with multiple entrances and pathways leading up to the main temple. You can sense powerful magic emanating from within.",
    choices: [
      {
        text: "Approach the main temple entrance",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Search for alternative entrances",
        action: () => actions.changeScene("ruins_exploration")
      },
      {
        text: "Study the ancient architecture",
        action: () => actions.changeScene("architecture_study")
      }
    ]
  }
});

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
