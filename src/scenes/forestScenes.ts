// src/scenes/forestScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createForestScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  forest_path: {
    title: "Into the Heart of Mystery",
    description: "The forest grows denser and more magical as you venture deeper. Luminescent flowers bloom along the path, their petals glowing with soft blue light. Somewhere in the distance, you hear the melodic sound of running water, while ahead, ancient stone ruins peek through the canopy.\n\nThe very air seems alive with possibility and danger. Two paths diverge before you - one leading toward the sound of crystalline water, the other climbing toward the mysterious ruins.",
    choices: [
      {
        text: "Follow the melodic sound of water",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Climb toward the ancient ruins",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Rest and prepare for what lies ahead",
        action: () => actions.changeScene("forest_rest")
      },
      {
        text: "Search for hidden paths",
        action: () => actions.changeScene("secret_paths"),
        skillCheck: { type: 'stealth', difficulty: 3 }
      }
    ]
  },

  forest_rest: {
    title: "Moment of Reflection",
    description: `You pause to rest against an ancient tree and take stock of your situation. The forest around you hums with magical energy, and you can feel the presence of ancient powers watching your every move.\n\nHealth: ${gameState.health}/${gameState.maxHealth}\nScore: ${gameState.score}\nInventory: ${gameState.inventory.length > 0 ? gameState.inventory.join(", ") : "Empty"}\n\nThe path ahead will require all your courage and wisdom.`,
    choices: [
      {
        text: "Use your healing potion",
        action: () => {
          actions.heal(50);
          actions.removeFromInventory("Healing Potion");
          actions.changeScene("potion_used");
        },
        condition: () => gameState.hasPotion && gameState.health < gameState.maxHealth
      },
      {
        text: "Head toward the stream",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Approach the temple ruins",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Return to the hermit for advice",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  potion_used: {
    title: "Renewed Strength",
    description: "The healing potion's magic flows through your body, mending wounds and restoring your vitality. The empty crystal vial dissolves into sparkling dust that dances away on the wind. You feel refreshed and ready to face whatever challenges await.",
    choices: [
      {
        text: "Continue to the crystal stream",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Head toward the temple",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  secret_paths: {
    title: "Hidden Ways of the Forest",
    description: "Your careful searching reveals a network of hidden paths winding between the massive trees. These trails are clearly ancient, marked with symbols that seem to shift and change when you're not looking directly at them. One path glows with silver light, another pulses with deep green energy, and a third seems to shimmer with all the colors of the rainbow.",
    choices: [
      {
        text: "Follow the silver-lit path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("moonlit_grove");
        }
      },
      {
        text: "Take the green energy path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("nature_sanctuary");
        }
      },
      {
        text: "Choose the rainbow shimmer path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("fairy_realm");
        }
      },
      {
        text: "Return to the main paths",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  moonlit_grove: {
    title: "Grove of Eternal Moonlight",
    description: "The silver path leads you to a grove where eternal moonlight filters through crystalline leaves. In the center stands a spirit wolf, its fur seeming to contain starlight itself. The wolf regards you with ancient, knowing eyes.\n\n'Welcome, seeker,' the wolf speaks in a voice like wind through silver bells. 'I am the Guardian of Hidden Paths. You show wisdom in finding this place. What guidance do you seek?'",
    choices: [
      {
        text: "Ask about the dragon in the temple",
        action: () => actions.changeScene("wolf_dragon_wisdom")
      },
      {
        text: "Request the wolf's blessing",
        action: () => {
          actions.addToInventory("Wolf's Blessing");
          actions.addAchievement("Spirit Blessed");
          actions.heal(30);
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Ask about the nature of wisdom",
        action: () => actions.changeScene("wisdom_lesson")
      }
    ]
  },

  nature_sanctuary: {
    title: "The Heart of the Forest",
    description: "The green path brings you to a sacred grove where the very essence of nature seems concentrated. Ancient trees form a perfect circle around a spring of the purest water you've ever seen. Forest creatures gather here in perfect harmony - deer, rabbits, birds, and even a magnificent stag with antlers that seem to be made of living wood.",
    choices: [
      {
        text: "Drink from the sacred spring",
        action: () => {
          actions.heal(40);
          actions.addScore(75);
          actions.addAchievement("Nature's Child");
          actions.changeScene("spring_blessing");
        }
      },
      {
        text: "Approach the magnificent stag",
        action: () => actions.changeScene("stag_encounter")
      },
      {
        text: "Sit quietly and commune with nature",
        action: () => actions.changeScene("nature_meditation")
      }
    ]
  },

  fairy_realm: {
    title: "The Fairy Circle",
    description: "The rainbow path leads you into a realm of pure magic where tiny lights dance in the air like living stars. Mushrooms grow in perfect circles, and the very air shimmers with enchantment. A chorus of fairy voices fills the air with music sweeter than any earthly song.\n\nThe fairies gather around you, their laughter like tiny silver bells. 'A mortal who found our secret path!' they chime in unison. 'We offer a gift to one so clever and pure of heart.'",
    choices: [
      {
        text: "Accept the gift of enhanced wisdom",
        action: () => {
          actions.addToInventory("Fairy Wisdom");
          actions.addAchievement("Fairy Blessed");
          actions.addScore(100);
          actions.changeScene("wisdom_enhanced");
        }
      },
      {
        text: "Ask for magical protection",
        action: () => {
          actions.addToInventory("Fairy Ward");
          actions.addAchievement("Fairy Blessed");
          actions.addScore(100);
          actions.changeScene("protection_granted");
        }
      },
      {
        text: "Request strength for the trials ahead",
        action: () => {
          actions.addToInventory("Fairy Strength");
          actions.addAchievement("Fairy Blessed");
          actions.addScore(100);
          actions.changeScene("strength_bestowed");
        }
      }
    ]
  },

  wolf_dragon_wisdom: {
    title: "Ancient Counsel",
    description: "The spirit wolf shares profound wisdom about the dragon. 'Auraxes is not your enemy, young seeker. She is lonely, having watched the world forget the value of learning and wisdom. Approach her not as a conqueror, but as a student. Show her that there are still those who value knowledge over gold, and you may find not just treasure, but a teacher and friend.'",
    choices: [
      {
        text: "Ask how to prove your sincerity",
        action: () => actions.changeScene("sincerity_guidance")
      },
      {
        text: "Request the wolf's blessing for the meeting",
        action: () => {
          actions.addToInventory("Wolf's Blessing");
          actions.heal(30);
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Head to the temple with this knowledge",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  wisdom_enhanced: {
    title: "Gift of Fairy Wisdom",
    description: "The fairies surround you with sparkling light as their gift takes hold. Your mind feels sharper, more attuned to the subtle currents of magic and meaning that flow through the world. You understand now that wisdom is not just knowledge, but the ability to see the connections between all things.",
    choices: [
      {
        text: "Thank the fairies and continue your quest",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Ask the fairies about the dragon",
        action: () => actions.changeScene("fairy_dragon_lore")
      }
    ]
  }
});

export const enhancedForestPath = (gameState: GameState, actions: GameActions): Scene => ({
  title: "Into the Heart of Mystery",
  description: "The forest grows denser and more magical as you venture deeper. Luminescent flowers bloom along the path, their petals glowing with soft blue light. The very air seems alive with possibility and ancient power - you can feel magical energies stirring within you, responding to this mystical place.\n\nSomewhere in the distance, you hear the melodic sound of running water, while ahead, ancient stone ruins peek through the canopy. But there's something else - a shimmering grove where the very fabric of magic seems more concentrated, calling to something deep within your soul.",
  choices: [
    {
      text: "Follow the melodic sound of water",
      action: () => actions.changeScene("crystal_stream")
    },
    {
      text: "Climb toward the ancient ruins",
      action: () => actions.changeScene("temple_approach")
    },
    {
      text: "Investigate the shimmering magical grove",
      action: () => {
        actions.addScore(25);
        actions.changeScene("magic_discovery");
      }
    },
    {
      text: "Rest and prepare for what lies ahead",
      action: () => actions.changeScene("forest_rest")
    },
    {
      text: "Search for hidden paths",
      action: () => actions.changeScene("secret_paths"),
      skillCheck: { type: 'stealth', difficulty: 3 }
    },
    {
      text: "Take time to check your progress and plan",
      action: () => actions.changeScene("rest_and_prepare")
    }
  ]
});

export const getEnhancedForestPath = (gameState: GameState, actions: GameActions): Scene => 
  enhancedForestPath(gameState, actions);
