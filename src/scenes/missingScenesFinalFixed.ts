// src/scenes/missingScenesFinalFixed.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createMissingScenesFinalFixed = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  hermit_knowledge_sharing: {
    title: "Sharing Discoveries with the Hermit",
    description: "You return to Eldric's cottage with your detailed documentation of the forest's magical flow patterns. The hermit's eyes widen with excitement as you show him your diagrams and observations.\n\n'Remarkable! This is groundbreaking research that could change how we understand magical theory itself. You've documented patterns that even I, in all my years, have only theorized about.'",
    choices: [
      {
        text: "Propose collaborating on a comprehensive magical theory",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Magical Theorist");
          actions.changeScene("magical_theory_collaboration");
        }
      },
      {
        text: "Ask the hermit to share his own research",
        action: () => {
          actions.addToInventory("Hermit's Research Notes");
          actions.changeScene("hermit_research_shared");
        }
      },
      {
        text: "Suggest publishing this knowledge for other scholars",
        action: () => {
          actions.addScore(100);
          actions.changeScene("knowledge_publication");
        }
      },
      {
        text: "Continue your quest with the hermit's blessing",
        action: () => {
          actions.addToInventory("Scholarly Blessing");
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  magical_theory_collaboration: {
    title: "The Birth of New Magic Theory",
    description: "You and Eldric spend hours developing a revolutionary new understanding of magical flow patterns. Together, you create a comprehensive theory that explains how magical energy moves through living systems, geographical features, and even dimensions.\n\nThis collaboration represents a historic moment in magical scholarship.",
    choices: [
      {
        text: "Establish a school of magical theory",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Academy Founder");
          actions.changeScene("theory_school_founded");
        }
      },
      {
        text: "Test the theory in the dragon's temple",
        action: () => {
          actions.addScore(150);
          actions.changeScene("theory_temple_test");
        }
      },
      {
        text: "Continue your quest armed with new understanding",
        action: () => {
          actions.addToInventory("Revolutionary Magic Theory");
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  hermit_research_shared: {
    title: "The Hermit's Hidden Knowledge",
    description: "Eldric shares his lifetime of research with you - decades of observations about the mystical forest, careful studies of magical creatures, and theoretical work on the nature of wisdom itself. His notes reveal insights that complement your own discoveries perfectly.",
    choices: [
      {
        text: "Combine both research sets into a master work",
        action: () => {
          actions.addScore(175);
          actions.addToInventory("Complete Magical Compendium");
          actions.changeScene("master_work_created");
        }
      },
      {
        text: "Use the combined knowledge to understand the dragon better",
        action: () => {
          actions.addScore(125);
          actions.changeScene("enhanced_dragon_understanding");
        }
      },
      {
        text: "Focus on the practical applications",
        action: () => {
          actions.addScore(100);
          actions.changeScene("practical_magic_applications");
        }
      }
    ]
  },

  hidden_site_discovery: {
    title: "Discovering Hidden Magical Sites",
    description: "Using your understanding of magical flow patterns, you locate several previously unknown sites of power in the forest. These include a grove where time moves differently, a spring that enhances memory, and a circle of stones that amplify magical abilities.",
    choices: [
      {
        text: "Explore the time-altered grove",
        action: () => {
          actions.addScore(100);
          actions.changeScene("temporal_grove_detailed");
        }
      },
      {
        text: "Investigate the memory-enhancing spring",
        action: () => {
          actions.addScore(100);
          actions.changeScene("memory_spring");
        }
      },
      {
        text: "Study the stone circle's properties",
        action: () => {
          actions.addScore(100);
          actions.changeScene("amplification_circle");
        }
      },
      {
        text: "Map all sites for future scholars",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Site Cartographer");
          actions.changeScene("magical_site_mapping");
        }
      }
    ]
  },

  expanded_research: {
    title: "Comprehensive Magical Research",
    description: "Your research expands beyond just magical flows to encompass the entire ecosystem of mystical forces in the forest. You study everything from creature magic to plant enchantments, creating the most comprehensive magical survey ever attempted.",
    choices: [
      {
        text: "Focus on practical applications for adventurers",
        action: () => {
          actions.addScore(125);
          actions.changeScene("adventurer_guide_creation");
        }
      },
      {
        text: "Create a theoretical framework for magical education",
        action: () => {
          actions.addScore(150);
          actions.changeScene("educational_framework");
        }
      },
      {
        text: "Document everything for the dragon's library",
        action: () => {
          actions.addScore(175);
          actions.changeScene("dragon_library_contribution");
        }
      }
    ]
  },

  responsible_magic: {
    title: "The Ethics of Magical Manipulation",
    description: "Your careful and responsible approach to magical manipulation becomes a model for ethical magical practice. You develop principles for working with magical forces that respect the natural balance while still achieving beneficial outcomes.",
    choices: [
      {
        text: "Teach these principles to other magic users",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Ethical Magic Teacher");
          actions.changeScene("ethics_teaching");
        }
      },
      {
        text: "Apply the principles to help the dragon",
        action: () => {
          actions.addScore(125);
          actions.changeScene("ethical_dragon_aid");
        }
      },
      {
        text: "Create a code of conduct for magical research",
        action: () => {
          actions.addScore(100);
          actions.changeScene("magical_code_creation");
        }
      }
    ]
  },

  ambitious_magic: {
    title: "The Dangers of Magical Ambition",
    description: "Your ambitious attempts to manipulate magical flows yield powerful results, but you quickly realize you're approaching dangerous territory. The forest's magical ecosystem is more delicate than you initially understood, and your interventions risk causing cascading effects.",
    choices: [
      {
        text: "Immediately stop and work to undo any damage",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Wisdom in Restraint");
          actions.changeScene("magical_damage_control");
        }
      },
      {
        text: "Try to control the effects more carefully",
        action: () => {
          actions.addScore(50);
          actions.changeScene("careful_magical_control");
        }
      },
      {
        text: "Accept the risk and push forward",
        action: () => {
          actions.takeDamage(20);
          actions.changeScene("reckless_magic_consequences");
        }
      }
    ]
  },

  cautious_withdrawal: {
    title: "Wisdom in Caution",
    description: "You wisely decide to stop your magical experiments before risking any damage to the forest's delicate magical ecosystem. This choice demonstrates a maturity and wisdom that many mages take years to develop.",
    choices: [
      {
        text: "Document your findings about magical risks",
        action: () => {
          actions.addScore(75);
          actions.addToInventory("Magical Safety Guidelines");
          actions.changeScene("safety_documentation");
        }
      },
      {
        text: "Share your caution with other researchers",
        action: () => {
          actions.addScore(100);
          actions.changeScene("caution_teaching");
        }
      },
      {
        text: "Continue your quest with newfound wisdom",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      }
    ]
  }
});

export const createAdditionalMissingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  temporal_grove_detailed: {
    title: "The Grove Where Time Bends",
    description: "In this remarkable grove, you witness the full extent of temporal distortion. Past and future seem to exist simultaneously here. You see echoes of ancient ceremonies, glimpses of possible tomorrows, and the eternal dance of cause and effect.",
    choices: [
      {
        text: "Study the temporal mechanics carefully",
        action: () => {
          actions.addScore(100);
          actions.addToInventory("Temporal Theory Notes");
          actions.changeScene("temporal_study_complete");
        }
      },
      {
        text: "Try to communicate across time",
        action: () => {
          actions.addScore(125);
          actions.changeScene("temporal_communication_attempt");
        },
        skillCheck: { type: 'wisdom', difficulty: 8 }
      },
      {
        text: "Leave before you get trapped in time",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  memory_spring: {
    title: "The Spring of Remembrance",
    description: "This crystal-clear spring enhances memory and understanding. Drinking from it allows you to recall details with perfect clarity and understand connections you might have missed. Ancient knowledge becomes accessible to those who drink respectfully.",
    choices: [
      {
        text: "Drink deeply and enhance your memories",
        action: () => {
          actions.addScore(100);
          actions.heal(25);
          actions.addAchievement("Perfect Memory");
          actions.changeScene("memory_enhanced");
        }
      },
      {
        text: "Use the spring to understand the dragon's history",
        action: () => {
          actions.addScore(150);
          actions.changeScene("dragon_history_revealed");
        }
      },
      {
        text: "Share the spring's location with scholars",
        action: () => {
          actions.addScore(75);
          actions.changeScene("spring_sharing");
        }
      }
    ]
  },

  amplification_circle: {
    title: "The Circle of Amplification",
    description: "This ancient stone circle amplifies magical abilities and enhances the understanding of all who enter it with pure intentions. The stones hum with accumulated magical energy from centuries of use by wise practitioners.",
    choices: [
      {
        text: "Use the circle to enhance your own abilities",
        action: () => {
          actions.addScore(100);
          actions.addToInventory("Amplified Abilities");
          actions.changeScene("abilities_enhanced");
        }
      },
      {
        text: "Study how the amplification works",
        action: () => {
          actions.addScore(125);
          actions.addToInventory("Amplification Theory");
          actions.changeScene("amplification_understood");
        }
      },
      {
        text: "Preserve the circle for future users",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Sacred Site Guardian");
          actions.changeScene("circle_preservation");
        }
      }
    ]
  }
});
