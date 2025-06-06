// src/scenes/forestScenesPart2.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createForestScenesPart2 = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  wolf_wisdom: {
    title: "Ancient Counsel",
    description: "The spirit wolf shares its ancient knowledge with you. 'The temple ahead holds a dragon who has forgotten joy, surrounded by treasures that mean nothing to it. The real treasure is not gold, but understanding. Approach with wisdom, not greed, and you may leave richer in ways that matter.'",
    choices: [
      {
        text: "Ask how to show wisdom to a dragon",
        action: () => actions.changeScene("dragon_wisdom_guidance")
      },
      {
        text: "Request the wolf's protection",
        action: () => actions.changeScene("spirit_wolf")
      },
      {
        text: "Thank the wolf and continue",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  forest_secrets: {
    title: "Hidden Knowledge",
    description: "The spirit wolf reveals the forest's secrets: hidden paths, sacred groves, and the location of ancient magic. 'This knowledge is yours now,' it says. 'Use it wisely, and the forest will always welcome you as a friend.' You feel deeply connected to the mystical woodland.",
    choices: [
      {
        text: "Accept the role of forest guardian",
        action: () => {
          actions.addToInventory("Forest Guardian");
          actions.changeScene("guardian_role");
        }
      },
      {
        text: "Continue to the temple with new knowledge",
        action: () => actions.changeScene("ruins")
      },
      {
        text: "Explore the hidden paths first",
        action: () => actions.changeScene("secret_paths")
      }
    ]
  },

  blessed_path: {
    title: "Walking in Harmony",
    description: "With the spirit wolf's approval, you continue through the forest feeling more in tune with its rhythms. Animals watch you pass without fear, and you sense the approval of the ancient trees. The path ahead seems clearer, and you feel guided toward your true purpose.",
    choices: [
      {
        text: "Head directly to the temple",
        action: () => actions.changeScene("ruins")
      },
      {
        text: "Visit the crystal stream",
        action: () => actions.changeScene("river")
      },
      {
        text: "Follow your newfound intuition",
        action: () => actions.changeScene("intuitive_path")
      }
    ]
  },

  noble_pledge: {
    title: "Oath of Service",
    description: "Your sincere pledge to use knowledge for good deeply moves the spirit wolf. 'Such words are easy to speak but hard to live by. I believe you will try, and that is enough for now.' The wolf touches your forehead with its ethereal muzzle, and you feel a warm blessing flow through you.",
    choices: [
      {
        text: "Accept the wolf's blessing",
        action: () => {
          actions.heal(25);
          actions.addToInventory("Wolf's Blessing");
          actions.changeScene("blessed_by_wolf");
        }
      },
      {
        text: "Ask for guidance in keeping your oath",
        action: () => actions.changeScene("oath_guidance")
      }
    ]
  },

  honest_uncertainty: {
    title: "Wisdom in Doubt",
    description: "The spirit wolf nods approvingly at your honest uncertainty. 'Admitting you don't know everything is the beginning of true wisdom. Many who are certain of their righteousness cause great harm. Your humility is a strength, not a weakness.'",
    choices: [
      {
        text: "Ask the wolf to be your teacher",
        action: () => actions.changeScene("wolf_teaching")
      },
      {
        text: "Request guidance for difficult decisions",
        action: () => actions.changeScene("decision_guidance")
      },
      {
        text: "Continue with this new understanding",
        action: () => actions.changeScene("humble_journey")
      }
    ]
  },

  worthiness_challenge: {
    title: "Test of Character",
    description: "The spirit wolf considers your request. 'Very well. If you truly wish to be tested, I will show you a vision. You will see yourself with great power - how you choose to use it will reveal your true nature.' The wolf's eyes begin to glow with mystical energy.",
    choices: [
      {
        text: "Accept the vision test",
        action: () => actions.changeScene("vision_test")
      },
      {
        text: "Ask for a different kind of test",
        action: () => actions.changeScene("alternative_test")
      },
      {
        text: "Decide you don't need testing",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  spirit_wolf: {
    title: "Guardian of the Forest",
    description: "A magnificent spectral wolf emerges from the shadows, its fur seeming to contain starlight. 'You show no fear, mortal. I am the guardian of this forest's ancient secrets. Your quest is known to me. Accept my guidance, and the path ahead will be clearer.'",
    choices: [
      {
        text: "Accept the wolf's guidance",
        action: () => {
          actions.addToInventory("Wolf's Guidance");
          actions.changeScene("wolf_ally");
        }
      },
      {
        text: "Ask about the temple's dangers",
        action: () => actions.changeScene("wolf_wisdom")
      },
      {
        text: "Politely decline and continue alone",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  wolf_ally: {
    title: "Ancient Alliance",
    description: "The spirit wolf touches your forehead with its ethereal muzzle, and suddenly you can sense the true nature of the forest around you. Hidden paths become visible, illusions fade, and you understand the sacred nature of your quest. The wolf will aid you when needed most.",
    choices: [
      {
        text: "Head directly to the temple",
        action: () => actions.changeScene("ruins")
      },
      {
        text: "Visit the crystal stream first",
        action: () => actions.changeScene("river")
      }
    ]
  }
});
