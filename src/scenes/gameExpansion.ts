// src/scenes/gameExpansion.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createGameExpansion = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  character_creation: {
    title: "Choose Your Path",
    description: "Before beginning your quest for the Golden Orb, you must decide what kind of adventurer you wish to be. This choice will influence how others perceive you and what opportunities become available throughout your journey.",
    choices: [
      {
        text: "Begin as a Scholar seeking knowledge",
        action: () => {
          actions.addToInventory("Scholar's Journal");
          actions.addAchievement("Path of Learning");
          actions.addScore(25);
          actions.changeScene("scholar_background");
        }
      },
      {
        text: "Start as a Noble with diplomatic training",
        action: () => {
          actions.addToInventory("Noble Seal");
          actions.addAchievement("Born to Lead");
          actions.addScore(25);
          actions.changeScene("noble_background");
        }
      },
      {
        text: "Begin as a Wanderer with survival skills",
        action: () => {
          actions.addToInventory("Traveler's Kit");
          actions.addAchievement("Child of the Road");
          actions.addScore(25);
          actions.changeScene("wanderer_background");
        }
      },
      {
        text: "Start without a defined background (Traditional opening)",
        action: () => actions.changeScene("start")
      }
    ]
  },

  scholar_background: {
    title: "The Scholar's Journey Begins",
    description: "Your years of study have prepared you well for this quest. You carry ancient maps, know forgotten languages, and understand the historical significance of the Golden Orb. However, your physical training has been limited, and you may need to rely more on wit than strength.",
    choices: [
      {
        text: "Use your knowledge to research the forest's history",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_research");
        }
      },
      {
        text: "Seek out the hermit for scholarly discussion",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Enter the forest with confidence in your preparation",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  noble_background: {
    title: "Noblesse Oblige",
    description: "Your noble upbringing has taught you the importance of honor, duty, and protecting those who cannot protect themselves. You carry the responsibility of your family name and the expectation that you will use any power you gain for the betterment of all. Your diplomatic training may prove invaluable.",
    choices: [
      {
        text: "Vow to use the Golden Orb for your people's benefit",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Noble Purpose");
          actions.changeScene("noble_vow");
        }
      },
      {
        text: "Consider the political implications of your quest",
        action: () => actions.changeScene("political_considerations")
      },
      {
        text: "Approach the cottage to speak with the hermit as an equal",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  wanderer_background: {
    title: "The Road Less Traveled",
    description: "Your life on the road has taught you to read the subtle signs of danger and opportunity. You understand the wild places of the world and have learned that the greatest treasures are often found in the most unexpected places. Your experience with diverse peoples has given you wisdom beyond your years.",
    choices: [
      {
        text: "Use your survival skills to find hidden paths",
        action: () => {
          actions.addScore(50);
          actions.changeScene("survival_advantage");
        }
      },
      {
        text: "Trust your instincts about the forest's dangers",
        action: () => actions.changeScene("instinct_guidance")
      },
      {
        text: "Enter the forest with wanderer's wisdom",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  temple_districts: {
    title: "The Temple Complex",
    description: "As you explore further, you realize the temple is actually a vast complex with multiple districts, each serving different purposes. You can see the Tower of Trials to the north, the Gardens of Contemplation to the east, the Library Sanctum to the west, and the Dragon's Hall at the center.",
    choices: [
      {
        text: "Ascend the Tower of Trials",
        action: () => actions.changeScene("trial_tower")
      },
      {
        text: "Explore the Gardens of Contemplation",
        action: () => actions.changeScene("contemplation_gardens")
      },
      {
        text: "Enter the Library Sanctum",
        action: () => actions.changeScene("library_sanctum")
      },
      {
        text: "Go directly to the Dragon's Hall",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  trial_tower: {
    title: "The Tower of Challenges",
    description: "The Tower of Trials rises seven stories high, each level designed to test a different aspect of heroic character. Ancient mechanisms still function here, presenting challenges that have tested heroes for millennia. You sense that completing these trials will prove your worthiness beyond any doubt.",
    choices: [
      {
        text: "Face the Trial of Courage (Level 1)",
        action: () => actions.changeScene("courage_trial")
      },
      {
        text: "Attempt the Trial of Wisdom (Level 2)",
        action: () => actions.changeScene("wisdom_trial_tower")
      },
      {
        text: "Challenge the Trial of Compassion (Level 3)",
        action: () => actions.changeScene("compassion_trial")
      },
      {
        text: "Skip the trials and continue to other areas",
        action: () => actions.changeScene("temple_districts")
      }
    ]
  },

  courage_trial: {
    title: "The Test of Bravery",
    description: "The first trial manifests as a bridge across a chasm of swirling mists. Spectral guardians emerge, but you quickly realize they are testing not your ability to fight, but your willingness to stand firm in the face of fear. They do not attack - they simply radiate an aura of intimidation that grows stronger as you advance.",
    choices: [
      {
        text: "Walk forward despite your fear",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Courage Under Fire");
          actions.changeScene("courage_victory");
        }
      },
      {
        text: "Try to reason with the guardians",
        action: () => actions.changeScene("guardian_dialogue")
      },
      {
        text: "Retreat and try a different approach",
        action: () => actions.changeScene("trial_tower")
      }
    ]
  },

  contemplation_gardens: {
    title: "Gardens of Inner Peace",
    description: "The Gardens of Contemplation are a marvel of landscape design and natural magic. Flowering trees bloom in impossible colors, streams flow uphill in graceful spirals, and the very air seems to encourage deep thought and reflection. At the garden's heart sits a meditation pavilion where profound insights await.",
    choices: [
      {
        text: "Meditate in the central pavilion",
        action: () => {
          actions.heal(40);
          actions.addScore(75);
          actions.changeScene("deep_meditation");
        }
      },
      {
        text: "Study the magical phenomena in the gardens",
        action: () => actions.changeScene("garden_magic_study")
      },
      {
        text: "Follow the uphill stream to its source",
        action: () => actions.changeScene("stream_source")
      }
    ]
  },

  library_sanctum: {
    title: "The Great Library",
    description: "The Library Sanctum is breathtaking in scope - countless shelves stretch up into darkness, filled with books, scrolls, and tablets from every age and culture. Floating lights drift between the stacks, and you can sense the presence of a guardian spirit who maintains this repository of knowledge.",
    choices: [
      {
        text: "Seek out the guardian spirit",
        action: () => actions.changeScene("librarian_spirit")
      },
      {
        text: "Research the history of the Golden Orb",
        action: () => {
          actions.addToInventory("Orb Chronicles");
          actions.addScore(75);
          actions.changeScene("orb_research");
        }
      },
      {
        text: "Look for information about dragon-human cooperation",
        action: () => actions.changeScene("cooperation_texts")
      }
    ]
  },

  companion_recruitment: {
    title: "Gathering Allies",
    description: "Your reputation has grown, and various beings have expressed interest in joining your quest. Each potential companion brings unique abilities and perspectives, but you must choose carefully - not all combinations work well together.",
    choices: [
      {
        text: "Invite the reformed treasure hunter to join you",
        action: () => {
          actions.addToInventory("Human Ally");
          actions.changeScene("treasure_hunter_companion");
        },
        condition: () => gameState.achievements.includes("Peaceful Leader")
      },
      {
        text: "Ask the young dragon scholar to accompany you",
        action: () => {
          actions.addToInventory("Dragon Scholar");
          actions.changeScene("scholar_companion");
        },
        condition: () => gameState.achievements.includes("Master Librarian")
      },
      {
        text: "Recruit the forest spirit as a guide",
        action: () => {
          actions.addToInventory("Forest Spirit");
          actions.changeScene("spirit_companion");
        },
        condition: () => gameState.achievements.includes("Forest Guardian")
      },
      {
        text: "Continue your quest alone",
        action: () => actions.changeScene("solitary_continuation")
      }
    ]
  },

  dragon_variant_wise: {
    title: "Auraxes the Teacher",
    description: "Your consistent choices favoring wisdom have shaped how Auraxes appears to you. She manifests as the ideal teacher - patient, encouraging, and wise beyond measure. Her golden scales seem to glow with inner light, and her eyes hold centuries of accumulated knowledge that she is eager to share.",
    choices: [
      {
        text: "Ask to become her student",
        action: () => {
          actions.addScore(200);
          actions.changeScene("ideal_student_path");
        }
      },
      {
        text: "Propose establishing a new school together",
        action: () => actions.changeScene("academy_proposal")
      },
      {
        text: "Request to carry her teachings to the world",
        action: () => actions.changeScene("teaching_mission")
      }
    ]
  },

  dragon_variant_compassionate: {
    title: "Auraxes the Healer",
    description: "Your acts of kindness and compassion have revealed this aspect of the dragon's nature. She appears as a being of profound empathy, her scales shimmering with healing energy. You can sense that she has spent centuries secretly tending to the wounded and lost who found their way to her temple.",
    choices: [
      {
        text: "Offer to help her heal the world's pain",
        action: () => {
          actions.addScore(200);
          actions.changeScene("healing_partnership");
        }
      },
      {
        text: "Ask to learn her healing arts",
        action: () => actions.changeScene("healing_student")
      },
      {
        text: "Propose a hospital for all creatures",
        action: () => actions.changeScene("universal_healing")
      }
    ]
  },

  transformation_ending: {
    title: "The Transformed Hero",
    description: `Your journey has fundamentally changed who you are. You began seeking treasure but discovered that the greatest transformation was within yourself. You have become someone who can bridge different worlds and perspectives.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYou are now a catalyst for positive change, carrying the wisdom to help others find their own paths to growth.`,
    choices: [
      {
        text: "Establish a school for personal transformation",
        action: () => actions.changeScene("transformation_school")
      },
      {
        text: "Become a guide for other life-changing quests",
        action: () => actions.changeScene("transformation_guide")
      },
      {
        text: "Write about the power of inner change",
        action: () => actions.changeScene("transformation_author")
      }
    ]
  },

  balance_ending: {
    title: "The Harmonious Solution",
    description: `You have achieved perfect balance in all your choices, understanding that wisdom lies not in extremes but in the harmonious integration of all virtues. Your balanced approach has created new possibilities that no one else had imagined.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYou have become a living example of how seemingly opposing forces can work together for the greater good.`,
    choices: [
      {
        text: "Teach the art of balance to future leaders",
        action: () => actions.changeScene("balance_academy")
      },
      {
        text: "Mediate conflicts across the realm",
        action: () => actions.changeScene("conflict_resolution")
      },
      {
        text: "Begin a new adventure with perfect harmony",
        action: () => actions.restartGame
      }
    ]
  },

  achievement_ceremony: {
    title: "Recognition of Excellence",
    description: `Your achievements have been recognized throughout the realm. You have earned: ${gameState.achievements.join(", ")}.\n\nEach achievement represents not just a task completed, but a choice made in favor of growth, wisdom, or compassion. These moments of excellence have shaped who you have become.`,
    choices: [
      {
        text: "Feel proud of your accomplishments",
        action: () => {
          actions.addScore(gameState.achievements.length * 50);
          actions.changeScene("pride_and_humility");
        }
      },
      {
        text: "Dedicate your achievements to those who helped you",
        action: () => actions.changeScene("grateful_dedication")
      },
      {
        text: "Use your reputation to help others",
        action: () => actions.changeScene("reputation_service")
      }
    ]
  },

  choice_reflection: {
    title: "The Weight of Decisions",
    description: "You pause to consider how your choices throughout this journey have shaped not only your own fate, but the lives of everyone you've encountered. Each decision created ripples that extended far beyond what you could see at the time.",
    choices: [
      {
        text: "Review your most significant choices",
        action: () => actions.changeScene("choice_review")
      },
      {
        text: "Consider how you might choose differently",
        action: () => actions.changeScene("alternative_paths")
      },
      {
        text: "Accept responsibility for all your decisions",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Full Responsibility");
          actions.changeScene("responsibility_accepted");
        }
      }
    ]
  },

  community_building: {
    title: "Building a Better World",
    description: "Your quest has shown you that individual heroism, while important, is most powerful when it inspires and enables others to become heroes themselves. You see opportunities to create lasting positive change in the world.",
    choices: [
      {
        text: "Establish a network of wisdom keepers",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Network Builder");
          actions.changeScene("wisdom_network");
        }
      },
      {
        text: "Create a system for sharing magical knowledge safely",
        action: () => actions.changeScene("knowledge_sharing_system")
      },
      {
        text: "Focus on training future problem-solvers",
        action: () => actions.changeScene("problem_solver_academy")
      }
    ]
  }
});

export default createGameExpansion;
