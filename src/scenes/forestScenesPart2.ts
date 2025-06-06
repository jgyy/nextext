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

  dragon_wisdom_guidance: {
    title: "Wisdom for the Dragon",
    description: "The spirit wolf shares ancient knowledge about approaching dragons. 'Speak to its loneliness, not its fear. Dragons are not meant to live in isolation—they are teachers by nature. Show Auraxes that the world still values learning, and you may find a friend rather than a foe.'",
    choices: [
      {
        text: "Ask how to prove the world values learning",
        action: () => actions.changeScene("proving_learning_value")
      },
      {
        text: "Request the wolf's blessing for this task",
        action: () => {
          actions.addToInventory("Wolf's Wisdom");
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Head to the temple with this guidance",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  proving_learning_value: {
    title: "Demonstrating Worth",
    description: "The wolf explains how to prove that learning still matters. 'Share stories of teachers you've met, students you've seen grow, knowledge that has been preserved despite hardship. Show her that wisdom continues to light the way for those who seek it, even in dark times.'",
    choices: [
      {
        text: "Think of the hermit's dedication to knowledge",
        action: () => {
          actions.addScore(50);
          actions.changeScene("hermit_example");
        }
      },
      {
        text: "Consider your own journey of learning",
        action: () => actions.changeScene("personal_growth")
      },
      {
        text: "Head to the temple with these examples ready",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  wolf_blessed: {
    title: "Blessed by Ancient Wisdom",
    description: "The spirit wolf's blessing settles over you like a cloak of starlight. You feel more attuned to the ancient magics of the world and better prepared to understand the deeper meanings behind events. The wolf's wisdom will guide you when you need it most.",
    choices: [
      {
        text: "Continue to the temple with confidence",
        action: () => {
          actions.addScore(75);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Ask for one final piece of advice",
        action: () => actions.changeScene("final_wolf_wisdom")
      }
    ]
  },

  hermit_example: {
    title: "The Teacher's Light",
    description: "You reflect on Eldric the hermit - how he has preserved knowledge in his isolated cottage, how he shared wisdom freely with travelers, how his eyes lit up when discussing ancient lore. Here was proof that the love of learning still burns bright in the world.",
    choices: [
      {
        text: "Prepare to share this story with the dragon",
        action: () => {
          actions.addScore(50);
          actions.changeScene("story_prepared");
        }
      },
      {
        text: "Think of other examples of preserved wisdom",
        action: () => actions.changeScene("wisdom_examples")
      },
      {
        text: "Head to the temple with renewed purpose",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  personal_growth: {
    title: "Your Own Learning",
    description: "You consider your own journey - how each encounter taught you something new, how you've grown from simply seeking treasure to understanding the value of wisdom itself. Your quest has been an education in what truly matters.",
    choices: [
      {
        text: "Embrace your transformation",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Transformed Seeker");
          actions.changeScene("transformation_complete");
        }
      },
      {
        text: "Plan to share this growth with the dragon",
        action: () => actions.changeScene("growth_sharing")
      },
      {
        text: "Continue to the temple as a changed person",
        action: () => actions.changeScene("ruins")
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

  guardian_role: {
    title: "Becoming a Guardian",
    description: "As you accept the role of forest guardian, you feel a deep connection form between yourself and the ancient woodland. The trees seem to whisper their approval, and you understand that you now carry the responsibility to protect this magical realm and its secrets.",
    choices: [
      {
        text: "Swear to protect the forest's wisdom",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Forest Guardian");
          actions.changeScene("oath_sworn");
        }
      },
      {
        text: "Ask what duties this role entails",
        action: () => actions.changeScene("guardian_duties")
      },
      {
        text: "Continue your quest with this new responsibility",
        action: () => actions.changeScene("ruins")
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
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Explore the newfound hidden paths",
        action: () => actions.changeScene("enhanced_exploration")
      }
    ]
  },

  final_wolf_wisdom: {
    title: "Parting Words",
    description: "The spirit wolf speaks with profound gravity: 'Remember that the greatest dragons are defeated not by swords, but by understanding. The greatest treasures are not taken, but given. And the greatest adventures change not the world around you, but the person within you.'",
    choices: [
      {
        text: "Thank the wolf and carry these words with you",
        action: () => {
          actions.addScore(50);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Ask the wolf to accompany you",
        action: () => actions.changeScene("wolf_companion")
      }
    ]
  },

  wolf_companion: {
    title: "The Spirit Guide",
    description: "The wolf considers your request thoughtfully. 'I cannot leave the forest, but I will send a part of my essence with you.' A smaller, translucent wolf materializes beside you. 'This spirit guide will offer counsel when you need it most.'",
    choices: [
      {
        text: "Accept the spirit guide gratefully",
        action: () => {
          actions.addToInventory("Spirit Guide");
          actions.addScore(75);
          actions.changeScene("guided_journey");
        }
      },
      {
        text: "Continue to the temple with the wolf's blessing",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  enhanced_exploration: {
    title: "Seeing with Wolf Eyes",
    description: "With your enhanced perception, you discover wonders hidden from ordinary sight: a grove where time moves differently, a spring that reflects not your appearance but your inner nature, and paths that lead to realms beyond the physical world.",
    choices: [
      {
        text: "Visit the time-touched grove",
        action: () => actions.changeScene("temporal_grove")
      },
      {
        text: "Look into the soul-reflecting spring",
        action: () => actions.changeScene("soul_spring")
      },
      {
        text: "Continue to the temple with your discoveries",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  temporal_grove: {
    title: "Where Time Stands Still",
    description: "In this grove, you witness moments from the past and future - you see the dragon as a young teacher, eager and joyful, surrounded by devoted students. You also glimpse a possible future where the temple once again bustles with learners from across the realm.",
    choices: [
      {
        text: "Focus on the vision of the young teacher",
        action: () => {
          actions.addScore(50);
          actions.changeScene("teacher_vision");
        }
      },
      {
        text: "Study the future of renewed learning",
        action: () => actions.changeScene("future_school")
      },
      {
        text: "Leave with hope for what could be",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  soul_spring: {
    title: "Mirror of the Heart",
    description: "As you gaze into the spring, you see your inner self reflected back. You observe how your journey has changed you - from a simple treasure seeker to someone who values wisdom, compassion, and the welfare of others above personal gain.",
    choices: [
      {
        text: "Embrace your transformed nature",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("True Self Discovered");
          actions.changeScene("self_acceptance");
        }
      },
      {
        text: "Drink from the spring to strengthen this change",
        action: () => actions.changeScene("soul_strengthening")
      },
      {
        text: "Continue to the temple with clear self-knowledge",
        action: () => actions.changeScene("ruins")
      }
    ]
  }
});
