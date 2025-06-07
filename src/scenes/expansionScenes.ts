// src/scenes/expansionScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createExpansionScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  magic_discovery: {
    title: "Awakening Inner Magic",
    description: "As you journey deeper into the mystical realm, you begin to feel a stirring within yourself. The magical energies of the forest are awakening dormant powers in your soul. You sense three different magical paths opening before you - the way of elemental power, the path of nature harmony, or the discipline of mind magic.",
    choices: [
      {
        text: "Embrace elemental magic (Fire, Water, Earth, Air)",
        action: () => {
          actions.addToInventory("Elemental Affinity");
          actions.addAchievement("Elemental Awakening");
          actions.changeScene("elemental_path");
        }
      },
      {
        text: "Choose the path of nature harmony",
        action: () => {
          actions.addToInventory("Nature Bond");
          actions.addAchievement("One with Nature");
          actions.changeScene("nature_magic");
        }
      },
      {
        text: "Focus on mind and spirit magic",
        action: () => {
          actions.addToInventory("Psychic Sensitivity");
          actions.addAchievement("Mind Awakened");
          actions.changeScene("psychic_powers");
        }
      },
      {
        text: "Reject magical power to stay true to yourself",
        action: () => {
          actions.addScore(50);
          actions.addAchievement("Pure of Intent");
          actions.changeScene("magic_rejection");
        }
      }
    ]
  },

  elemental_path: {
    title: "Master of Elements",
    description: "You feel the primal forces of creation flowing through you. Fire dances at your fingertips, water responds to your will, earth trembles at your command, and air carries your thoughts. But with this power comes great responsibility - how will you use these forces?",
    choices: [
      {
        text: "Use fire magic to clear difficult paths",
        action: () => {
          actions.addScore(50);
          actions.changeScene("fire_mastery");
        }
      },
      {
        text: "Call upon water magic to heal and purify",
        action: () => {
          actions.heal(30);
          actions.changeScene("water_healing");
        }
      },
      {
        text: "Command earth to reveal hidden secrets",
        action: () => {
          actions.addToInventory("Earth Secrets");
          actions.changeScene("earth_secrets");
        }
      },
      {
        text: "Master air magic to scout ahead",
        action: () => actions.changeScene("wind_scouting")
      }
    ]
  },

  nature_magic: {
    title: "Voice of the Wild",
    description: "The forest accepts you as one of its own. Animals approach without fear, plants bend to aid your passage, and the very trees whisper their ancient secrets. You understand now that you are part of something much larger than yourself - the eternal dance of life and growth.",
    choices: [
      {
        text: "Speak with the ancient trees about the dragon",
        action: () => actions.changeScene("tree_council")
      },
      {
        text: "Call upon forest animals to aid your quest",
        action: () => {
          actions.addToInventory("Animal Allies");
          actions.changeScene("animal_alliance");
        }
      },
      {
        text: "Use plant magic to accelerate growth and healing",
        action: () => {
          actions.heal(40);
          actions.changeScene("growth_magic");
        }
      },
      {
        text: "Continue to the temple with nature's blessing",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  psychic_powers: {
    title: "Awakened Mind",
    description: "Your consciousness expands beyond the boundaries of your physical form. You can sense thoughts, emotions, and intentions with startling clarity. The mental barriers that once limited you begin to dissolve, revealing the interconnected nature of all consciousness.",
    choices: [
      {
        text: "Try to sense the dragon's emotional state from afar",
        action: () => actions.changeScene("dragon_empathy")
      },
      {
        text: "Read the psychic imprints left by past temple visitors",
        action: () => {
          actions.addToInventory("Psychic Memories");
          actions.changeScene("psychic_archaeology");
        }
      },
      {
        text: "Project calming thoughts to ease your own fears",
        action: () => {
          actions.heal(25);
          actions.changeScene("self_calming");
        }
      },
      {
        text: "Continue to the temple with enhanced perception",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  moral_crossroads: {
    title: "The Test of Character",
    description: "You discover a group of treasure hunters who arrived before you, now trapped by the temple's magical defenses. They are injured and frightened, but they also carry weapons and speak of defeating the dragon by force. Their leader offers to split the treasure if you help them, but you sense their intentions are purely selfish.",
    choices: [
      {
        text: "Help them despite their selfish motives",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Unconditional Compassion");
          actions.changeScene("altruistic_aid");
        }
      },
      {
        text: "Try to convince them to abandon violence",
        action: () => actions.changeScene("peaceful_persuasion"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      },
      {
        text: "Refuse to help and continue alone",
        action: () => actions.changeScene("solitary_path")
      },
      {
        text: "Offer to guide them to safety instead",
        action: () => actions.changeScene("protective_guidance")
      }
    ]
  },

  altruistic_aid: {
    title: "Kindness Without Condition",
    description: "Despite their flawed motivations, you choose to help the injured treasure hunters. Your healing magic and kind words gradually change their attitudes. Several begin to question whether there might be a better way than violence, while others remain stubbornly focused on wealth.",
    choices: [
      {
        text: "Continue trying to change their hearts",
        action: () => {
          actions.addScore(50);
          actions.changeScene("heart_transformation");
        }
      },
      {
        text: "Heal them and let them make their own choices",
        action: () => {
          actions.addScore(50);
          actions.changeScene("free_will_respected");
        }
      },
      {
        text: "Lead them to safety away from the temple",
        action: () => actions.changeScene("protective_guide")
      }
    ]
  },

  ancient_library: {
    title: "The Lost Library",
    description: "Your explorations reveal a hidden chamber beneath the temple - an ancient library thought lost to time. Thousands of scrolls, books, and tablets contain knowledge from civilizations that vanished millennia ago. This discovery could revolutionize understanding of history and magic.",
    choices: [
      {
        text: "Focus on preserving and cataloging the collection",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Keeper of Lost Knowledge");
          actions.changeScene("library_preservation");
        }
      },
      {
        text: "Search for specific knowledge about dragon society",
        action: () => {
          actions.addToInventory("Dragon Lore");
          actions.changeScene("dragon_history");
        }
      },
      {
        text: "Look for prophecies about the current age",
        action: () => actions.changeScene("prophetic_texts")
      },
      {
        text: "Study the advanced magical techniques described",
        action: () => {
          actions.addToInventory("Ancient Spells");
          actions.changeScene("ancient_magic");
        }
      }
    ]
  },

  personal_transformation: {
    title: "The Hero's Evolution",
    description: "You pause to reflect on how profoundly this journey has changed you. You began seeking treasure for personal gain, but now you understand that true wealth lies in wisdom, relationships, and the positive impact you can have on the world. This transformation is perhaps the greatest treasure of all.",
    choices: [
      {
        text: "Embrace your new understanding fully",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Transformed Soul");
          actions.changeScene("complete_transformation");
        }
      },
      {
        text: "Share this realization with others",
        action: () => actions.changeScene("transformation_sharing")
      },
      {
        text: "Use this insight to help guide future seekers",
        action: () => actions.changeScene("mentor_path")
      },
      {
        text: "Continue your quest with new purpose",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  mentor_path: {
    title: "The Wise Guide",
    description: "You choose to become a mentor to future seekers, helping them navigate the challenges you've overcome and learn the lessons you've discovered. Your journey becomes the foundation for helping others find their own paths to wisdom and understanding.\n\nYour legacy grows not through conquest, but through the positive impact you have on others.",
    choices: [
      {
        text: "Establish a school for aspiring heroes",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Master Teacher");
          actions.changeScene("hero_academy_ending");
        }
      },
      {
        text: "Become a traveling guide for questors",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Wandering Sage");
          actions.changeScene("traveling_mentor_ending");
        }
      },
      {
        text: "Write books about the true nature of adventure",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Chronicler of Wisdom");
          actions.changeScene("author_ending");
        }
      }
    ]
  }
});

export const createUtilityScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  magic_item_study: {
    title: "Understanding Your Tools",
    description: `You carefully examine the magical items in your possession, trying to understand their true nature and potential uses.\n\nYour magical items: ${gameState.inventory.filter(item => 
      item.includes("Crystal") || item.includes("Blessing") || item.includes("Magic") || 
      item.includes("Enchanted") || item.includes("Ancient") || item.includes("Fairy") ||
      item.includes("Wolf") || item.includes("Unicorn") || item.includes("Spirit")
    ).join(", ") || "None yet discovered"}`,
    choices: [
      {
        text: "Meditate to unlock hidden properties",
        action: () => {
          actions.addScore(25);
          actions.changeScene("item_meditation");
        }
      },
      {
        text: "Try to combine items for greater effect",
        action: () => actions.changeScene("item_combination")
      },
      {
        text: "Save your study for when you meet the dragon",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  rest_and_prepare: {
    title: "Gathering Strength",
    description: "You take time to rest, recover, and prepare for the challenges ahead. This moment of peace allows you to center yourself and consider your options carefully.",
    choices: [
      {
        text: "Practice your skills and abilities",
        action: () => {
          actions.addScore(25);
          actions.changeScene("skill_practice");
        }
      },
      {
        text: "Meditate on the lessons you've learned",
        action: () => {
          actions.heal(20);
          actions.changeScene("wisdom_meditation");
        }
      },
      {
        text: "Plan your approach to the temple",
        action: () => actions.changeScene("strategic_planning")
      },
      {
        text: "Continue your journey refreshed",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  strategic_planning: {
    title: "Considering Your Options",
    description: "You take time to think through your approach to the challenges ahead. With everything you've learned and all the allies and items you've gathered, how will you proceed?",
    choices: [
      {
        text: "Plan a diplomatic approach to the dragon",
        action: () => {
          actions.addScore(50);
          actions.changeScene("diplomatic_strategy");
        }
      },
      {
        text: "Prepare for multiple possible outcomes",
        action: () => {
          actions.addScore(50);
          actions.changeScene("flexible_strategy");
        }
      },
      {
        text: "Focus on learning rather than winning",
        action: () => {
          actions.addScore(75);
          actions.changeScene("learning_focus");
        }
      },
      {
        text: "Trust in your instincts and pure intentions",
        action: () => {
          actions.addScore(50);
          actions.changeScene("intuitive_approach");
        }
      }
    ]
  }
});
