// src/scenes/templeScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createTempleScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  temple_approach: {
    title: "The Temple of Trials",
    description: "Before you rises a magnificent temple carved from midnight-black stone, its surface covered in glowing runes that pulse with ancient power. Two massive doors dominate the entrance - one sealed with intricate locks and protective spells, the other standing slightly ajar.\n\nEven from a distance, you can sense the immense presence within - ancient, powerful, and utterly alert to your approach. The very stones seem to whisper warnings and challenges.",
    choices: gameState.hasKey ? [
      {
        text: "Use the Ancient Key on the sealed door",
        action: () => {
          actions.addScore(75);
          actions.changeScene("secret_entrance");
        }
      },
      {
        text: "Enter through the open door",
        action: () => actions.changeScene("main_hall")
      },
      {
        text: "Study the protective runes",
        action: () => actions.changeScene("rune_study"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      }
    ] : [
      {
        text: "Enter through the open door",
        action: () => actions.changeScene("main_hall")
      },
      {
        text: "Search for another entrance",
        action: () => actions.changeScene("hidden_entrance"),
        skillCheck: { type: 'stealth', difficulty: 4 }
      },
      {
        text: "Study the protective runes",
        action: () => actions.changeScene("rune_study"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      }
    ]
  },

  secret_entrance: {
    title: "The Scholars' Path",
    description: "The Ancient Key turns smoothly in the lock, and the sealed door opens to reveal a passage that glows with soft, welcoming light. This route was clearly designed for those who approached with wisdom rather than force.\n\nThe passage is lined with beautiful murals depicting the history of learning and the great scholars who once studied here. You can sense that this path leads to chambers where you can prove your dedication to knowledge before meeting the dragon.",
    choices: [
      {
        text: "Follow the scholars' path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("learning_chambers");
        }
      },
      {
        text: "Study the murals for hidden knowledge",
        action: () => actions.changeScene("mural_study"),
        skillCheck: { type: 'wisdom', difficulty: 3 }
      }
    ]
  },

  learning_chambers: {
    title: "The Hall of Ancient Knowledge",
    description: "The path leads you through a series of chambers filled with ancient books, scrolls, and artifacts of learning. The very air hums with accumulated wisdom. In one chamber, you find a test - a series of riddles carved into stone tablets that seem to evaluate not just intelligence, but wisdom and compassion.",
    choices: [
      {
        text: "Attempt to solve the wisdom riddles",
        action: () => actions.changeScene("wisdom_riddles"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      },
      {
        text: "Study the ancient texts",
        action: () => {
          actions.addToInventory("Ancient Wisdom");
          actions.addScore(75);
          actions.changeScene("knowledge_gained");
        }
      },
      {
        text: "Continue toward the dragon's chamber",
        action: () => actions.changeScene("respectful_approach")
      }
    ]
  },

  wisdom_riddles: {
    title: "Test of True Understanding",
    description: "The stone tablets present three riddles:\n\n'What grows stronger when shared, yet costs nothing to give?'\n\n'What conquers all enemies without violence?'\n\n'What is the treasure that makes its keeper rich by giving it away?'\n\nYou sense that these riddles test not just cleverness, but understanding of the deeper truths that guide a wise heart.",
    choices: [
      {
        text: "Answer: Knowledge, Love, and Wisdom",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Sage of Riddles");
          actions.changeScene("riddles_mastered");
        }
      },
      {
        text: "Answer: Friendship, Peace, and Kindness",
        action: () => {
          actions.addScore(100);
          actions.changeScene("close_understanding");
        }
      },
      {
        text: "Admit you need more time to understand",
        action: () => actions.changeScene("humble_learning")
      }
    ]
  },

  rune_study: {
    title: "Ancient Inscriptions",
    description: "The glowing runes tell the temple's history in symbols of power and beauty. You learn that this place was once called the 'Temple of Harmony,' where dragons and humans worked together to preserve knowledge for future generations.\n\nThe runes also reveal that Auraxes is not just guarding treasure, but testing each visitor to see if they're worthy to inherit the responsibility of protecting wisdom itself.",
    choices: [
      {
        text: "Enter with deep respect for the temple's purpose",
        action: () => {
          actions.addScore(50);
          actions.changeScene("reverent_entry");
        }
      },
      {
        text: "Use the Ancient Key with newfound understanding",
        action: () => actions.changeScene("secret_entrance"),
        condition: () => gameState.hasKey
      },
      {
        text: "Enter through the main door as a seeker of wisdom",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  main_hall: {
    title: "The Dragon's Domain",
    description: "You step into a vast chamber illuminated by floating orbs of magical light. Ancient tapestries line the walls, depicting the history of knowledge and learning throughout the ages. In the center of this magnificent hall rests Auraxes the Ancient - a dragon of impossible beauty and majesty.\n\nHer scales shimmer like molten gold, and her eyes hold the accumulated wisdom of a thousand years. Ancient books and scrolls surround her like a living library. She raises her great head as you enter, and her voice resonates with power and intelligence.\n\n'Another seeker comes before me. Tell me, young one - what brings you to my domain?'",
    choices: [
      {
        text: "State that you seek wisdom above all treasure",
        action: () => {
          actions.addScore(100);
          actions.changeScene("wisdom_seeker");
        }
      },
      {
        text: "Draw your sword and prepare for battle",
        action: () => actions.changeScene("dragon_combat"),
        condition: () => gameState.hasSword,
        skillCheck: { type: 'courage', difficulty: 5 }
      },
      {
        text: "Approach with respect and humility",
        action: () => actions.changeScene("respectful_approach")
      },
      {
        text: "Offer a gift as tribute",
        action: () => actions.changeScene("tribute_offering"),
        condition: () => gameState.inventory.length > 0
      }
    ]
  },

  hidden_entrance: {
    title: "Secret Passages",
    description: "Your careful searching reveals a narrow passage concealed behind centuries of ivy growth. The passage appears to lead around the main chamber, possibly offering a way to observe before being observed.\n\nAs you examine the entrance, you notice it's carved with symbols suggesting it was meant for scholars and messengers, not intruders.",
    choices: [
      {
        text: "Use the passage to observe the dragon first",
        action: () => actions.changeScene("dragon_observation")
      },
      {
        text: "Enter respectfully through the main door instead",
        action: () => actions.changeScene("main_hall")
      },
      {
        text: "Search for other entrances",
        action: () => actions.changeScene("temple_exploration")
      }
    ]
  },

  dragon_observation: {
    title: "The Teacher in Solitude",
    description: "From your hidden vantage point, you observe Auraxes in her natural state. Rather than the fearsome beast you expected, you see an ancient scholar surrounded by books and artifacts. She reads from ancient tomes, occasionally sighing with what sounds like loneliness.\n\nYou witness her caring for the ancient knowledge, preserving scrolls and protecting artifacts with the devotion of a librarian. This is clearly not a monster, but a guardian of learning.",
    choices: [
      {
        text: "Enter openly and respectfully",
        action: () => {
          actions.addScore(75);
          actions.changeScene("understanding_approach");
        }
      },
      {
        text: "Announce yourself as a fellow scholar",
        action: () => actions.changeScene("scholarly_introduction")
      },
      {
        text: "Wait and observe more",
        action: () => actions.changeScene("deeper_observation")
      }
    ]
  },

  balance_solution: {
    title: "The Path of Harmony",
    description: "Your choice of the balance and harmony sequence causes the temple stones to resonate with a deep, musical tone. The air fills with golden light as hidden mechanisms activate, revealing a passage marked with symbols of peace and understanding.\n\nThis path represents the middle way - neither pure force nor pure wisdom, but the balance between all virtues. As you step forward, you feel a sense of profound equilibrium.",
    choices: [
      {
        text: "Enter the harmony passage",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Seeker of Balance");
          actions.changeScene("harmony_chamber");
        }
      },
      {
        text: "Study the symbols more carefully",
        action: () => actions.changeScene("symbol_study")
      }
    ]
  },

  master_solution: {
    title: "The Unity of All Paths",
    description: "By attempting to activate both sequences simultaneously, you demonstrate an understanding that transcends simple choices. The temple responds with wonder - all stones begin to glow in perfect harmony, and multiple passages open before you.\n\nYou have discovered that the greatest wisdom lies not in choosing one path over another, but in understanding how all virtues work together to create something greater than their parts.",
    choices: [
      {
        text: "Enter the combined passage of all virtues",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Master of Wisdom");
          actions.changeScene("master_chamber");
        }
      },
      {
        text: "Share this discovery with the dragon",
        action: () => actions.changeScene("unity_sharing")
      }
    ]
  }
});
