// src/scenes/connectorScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createConnectorScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  magic_rejection: {
    title: "Choosing Authenticity",
    description: "You deliberately reject the magical power offered by the forest, choosing to remain true to your original self. This decision shows remarkable strength of character - many would be tempted by such abilities. Your rejection of power for its own sake marks you as someone with genuine wisdom.",
    choices: [
      {
        text: "Feel confident in your choice",
        action: () => {
          actions.addScore(75);
          actions.changeScene("authentic_confidence");
        }
      },
      {
        text: "Continue to the temple without magical aid",
        action: () => actions.changeScene("ruins")
      },
      {
        text: "Reflect on what true power means",
        action: () => actions.changeScene("power_reflection")
      }
    ]
  },

  authentic_confidence: {
    title: "Strength in Simplicity",
    description: "Your choice to remain magically unenhanced fills you with quiet confidence. You realize that your greatest powers have always been your compassion, wisdom, and determination. These qualities cannot be granted by magic - they must be earned through choices and experiences.",
    choices: [
      {
        text: "Approach the temple as your authentic self",
        action: () => {
          actions.addScore(50);
          actions.changeScene("temple_approach");
        }
      },
      {
        text: "Share this insight with any creatures you meet",
        action: () => actions.changeScene("wisdom_sharing")
      }
    ]
  },

  fire_mastery: {
    title: "Flames of Purpose",
    description: "Your fire magic burns away obstacles both physical and metaphorical. But you learn to use it carefully - fire can clear a path or destroy everything in its wake. The power you wield is a reflection of your intentions.",
    choices: [
      {
        text: "Use fire to clear a hidden path to the temple",
        action: () => {
          actions.addScore(50);
          actions.changeScene("secret_fire_path");
        }
      },
      {
        text: "Create a beacon to guide others",
        action: () => {
          actions.addAchievement("Beacon of Hope");
          actions.changeScene("guiding_flame");
        }
      },
      {
        text: "Continue with disciplined fire magic",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  water_healing: {
    title: "Flowing Compassion",
    description: "Your water magic becomes a force of healing and purification. You discover that this power grows stronger when used to help others rather than yourself. The springs and streams of the forest respond to your call, offering their aid.",
    choices: [
      {
        text: "Heal the forest creatures you encounter",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Nature's Healer");
          actions.changeScene("forest_healing");
        }
      },
      {
        text: "Purify corrupted areas of the forest",
        action: () => actions.changeScene("purification_work")
      },
      {
        text: "Continue to the temple as a healer",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  tree_council: {
    title: "Wisdom of the Ancients",
    description: "The ancient trees share their millennia of knowledge about the dragon. They speak of Auraxes as a protector who has kept the forest's balance intact, preventing the temple's power from corrupting the natural world. The trees ask you to show the same respect for balance that the dragon has shown.",
    choices: [
      {
        text: "Promise to maintain the natural balance",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Guardian of Balance");
          actions.changeScene("balance_keeper");
        }
      },
      {
        text: "Ask the trees to speak with the dragon on your behalf",
        action: () => actions.changeScene("tree_advocacy")
      },
      {
        text: "Continue with the trees' blessing",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  dragon_empathy: {
    title: "Sensing Ancient Pain",
    description: "Your psychic abilities allow you to sense the dragon's emotional state from afar. You feel centuries of loneliness, the pain of watching students leave and never return, and a deep longing for meaningful connection. This insight fills you with compassion rather than fear.",
    choices: [
      {
        text: "Approach with understanding of her pain",
        action: () => {
          actions.addScore(100);
          actions.changeScene("empathetic_approach");
        }
      },
      {
        text: "Try to project feelings of friendship",
        action: () => actions.changeScene("psychic_friendship")
      },
      {
        text: "Enter the temple with deep empathy",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  peaceful_persuasion: {
    title: "Words of Wisdom",
    description: "Your words carry weight as you explain the true nature of the dragon and the real treasure that awaits those with pure hearts. Some of the treasure hunters listen with growing understanding, while others scoff at your 'naive idealism.'",
    choices: [
      {
        text: "Focus on the converts and build a peaceful delegation",
        action: () => {
          actions.addScore(100);
          actions.changeScene("peaceful_alliance");
        }
      },
      {
        text: "Respect their choice and continue alone",
        action: () => actions.changeScene("solitary_continuation")
      },
      {
        text: "Offer to prove your approach by going first",
        action: () => actions.changeScene("proof_by_example")
      }
    ]
  },

  peaceful_alliance: {
    title: "United in Purpose",
    description: "Several of the treasure hunters have been convinced by your wisdom and agree to approach the dragon peacefully. Together, you form an unusual delegation - former treasure seekers now united in the pursuit of understanding rather than wealth.",
    choices: [
      {
        text: "Lead the group to the temple as a teacher",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Peaceful Leader");
          actions.changeScene("group_approach");
        }
      },
      {
        text: "Let the group choose their own representative",
        action: () => actions.changeScene("democratic_approach")
      },
      {
        text: "Suggest everyone speaks for themselves",
        action: () => actions.changeScene("individual_voices")
      }
    ]
  },

  library_preservation: {
    title: "Keeper of Ancient Knowledge",
    description: "You dedicate yourself to preserving the lost library, carefully cataloging each piece of knowledge. This work could take years, but the value to future generations would be immeasurable. You've found a treasure far greater than gold - the accumulated wisdom of lost civilizations.",
    choices: [
      {
        text: "Commit to this scholarly work",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Master Librarian");
          actions.changeScene("scholar_ending");
        }
      },
      {
        text: "Share the discovery with the dragon",
        action: () => actions.changeScene("library_sharing")
      },
      {
        text: "Plan to bring other scholars here",
        action: () => actions.changeScene("scholarly_community")
      }
    ]
  },

  dragon_history: {
    title: "Understanding Dragon Society",
    description: "The ancient texts reveal that dragons were once the primary teachers and knowledge keepers of the world. They worked alongside humans, elves, and other species to preserve learning and advance civilization. Auraxes is one of the last remnants of this golden age of cooperation.",
    choices: [
      {
        text: "Share this knowledge with the dragon",
        action: () => {
          actions.addScore(100);
          actions.changeScene("historical_sharing");
        }
      },
      {
        text: "Use this understanding to approach respectfully",
        action: () => actions.changeScene("historically_informed_approach")
      },
      {
        text: "Reflect on what was lost",
        action: () => actions.changeScene("loss_reflection")
      }
    ]
  },

  complete_transformation: {
    title: "The True Treasure",
    description: "Your transformation is complete. You understand now that the real treasure was never the Golden Orb, but the person you became in seeking it. Every choice, every challenge, every moment of growth has led to this realization. You are no longer the same person who began this quest.",
    choices: [
      {
        text: "Meet the dragon as your transformed self",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("True Hero");
          actions.changeScene("transformed_meeting");
        }
      },
      {
        text: "Help others undergo similar transformations",
        action: () => actions.changeScene("transformation_teacher")
      },
      {
        text: "Embrace your new role in the world",
        action: () => actions.changeScene("new_purpose")
      }
    ]
  },

  scholar_ending: {
    title: "The Master Scholar",
    description: `You dedicate your life to preserving and sharing the ancient knowledge you've discovered. Your work attracts scholars from across the realm, and the temple becomes a center of learning once again. Your name becomes synonymous with wisdom and dedication to knowledge.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYou have chosen the path of eternal learning and teaching.`,
    choices: [
      {
        text: "Begin a new chapter as a master scholar",
        action: actions.restartGame
      }
    ]
  },

  hero_academy_ending: {
    title: "The Academy Founder",
    description: `Your experiences lead you to establish an academy for aspiring heroes, teaching them that true heroism comes from wisdom, compassion, and personal growth rather than strength or cunning. Your students go on to change the world through understanding rather than conquest.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYour legacy lives on through every hero you've guided to wisdom.`,
    choices: [
      {
        text: "Train a new generation of wise heroes",
        action: actions.restartGame
      }
    ]
  },

  traveling_mentor_ending: {
    title: "The Wandering Sage",
    description: `You become a traveling mentor, wandering the world to guide other seekers on their quests. Your wisdom helps countless adventurers find their true purposes and avoid the pitfalls you once faced. You become a legend not for what you conquered, but for whom you helped.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nEvery path you walk becomes easier for those who follow.`,
    choices: [
      {
        text: "Continue guiding seekers on new paths",
        action: actions.restartGame
      }
    ]
  },

  transformed_meeting: {
    title: "Meeting as Equals",
    description: "When you finally meet Auraxes, she immediately recognizes the profound change in you. 'You have already found the greatest treasure,' she says with wonder. 'You have become someone worthy of the deepest wisdom. The test is complete before it even begins.'",
    choices: [
      {
        text: "Accept the role of wisdom's guardian",
        action: () => {
          actions.addScore(500);
          actions.changeScene("guardian_ending");
        }
      },
      {
        text: "Ask to learn alongside her as an equal",
        action: () => actions.changeScene("equal_partnership")
      },
      {
        text: "Suggest establishing a new age of cooperation",
        action: () => actions.changeScene("new_age_beginning")
      }
    ]
  }
});

export default createConnectorScenes;
