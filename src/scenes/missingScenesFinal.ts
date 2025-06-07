// src/scenes/missingScenesFinal.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createMissingScenesFinal = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  ambient_magic_study: {
    title: "The Magic in the Air",
    description: "You spend time studying the ambient magical field of the forest. Your observations reveal patterns in how magic flows through living things, how it pools in certain locations, and how it responds to different emotions and intentions.",
    choices: [
      {
        text: "Document the magical flow patterns",
        action: () => {
          actions.addScore(75);
          actions.addToInventory("Magical Theory Notes");
          actions.changeScene("flow_documentation");
        }
      },
      {
        text: "Experiment with directing the flow",
        action: () => {
          actions.addScore(50);
          actions.changeScene("flow_manipulation");
        }
      },
      {
        text: "Continue your journey with new insights",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  creature_documentation: {
    title: "Cataloging the Mystical",
    description: "You carefully observe and document the magical creatures of the forest - their behaviors, habitats, and the magic they naturally wield. This systematic approach reveals surprising connections between different species.",
    choices: [
      {
        text: "Focus on symbiotic relationships",
        action: () => {
          actions.addScore(75);
          actions.changeScene("symbiosis_study");
        }
      },
      {
        text: "Study predator-prey dynamics",
        action: () => {
          actions.addScore(50);
          actions.changeScene("ecosystem_study");
        }
      },
      {
        text: "Investigate magical evolution",
        action: () => {
          actions.addScore(100);
          actions.changeScene("evolution_study");
        }
      }
    ]
  },

  flow_documentation: {
    title: "Mapping Magical Currents",
    description: "Your careful documentation reveals that magic flows through the forest like invisible rivers. These currents follow predictable patterns, pooling in certain sacred groves and avoiding others. You create detailed diagrams that could revolutionize magical understanding.",
    choices: [
      {
        text: "Share your findings with the hermit",
        action: () => {
          actions.addScore(100);
          actions.changeScene("hermit_knowledge_sharing");
        }
      },
      {
        text: "Use the patterns to find hidden magical sites",
        action: () => actions.changeScene("hidden_site_discovery")
      },
      {
        text: "Continue documenting other phenomena",
        action: () => actions.changeScene("expanded_research")
      }
    ]
  },

  flow_manipulation: {
    title: "Directing the Flow",
    description: "You experiment with influencing the magical currents, discovering that focused intention and emotional resonance can redirect these flows. However, you also sense that excessive manipulation could disrupt the forest's natural balance.",
    choices: [
      {
        text: "Practice responsible manipulation",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Ethical Mage");
          actions.changeScene("responsible_magic");
        }
      },
      {
        text: "Attempt more ambitious redirections",
        action: () => actions.changeScene("ambitious_magic")
      },
      {
        text: "Stop experimenting to avoid risks",
        action: () => {
          actions.addScore(50);
          actions.changeScene("cautious_withdrawal");
        }
      }
    ]
  },

  cultural_interviews: {
    title: "Voices of the Forest Folk",
    description: "You spend time interviewing various forest inhabitants about their traditions. The dryads speak of tree-singing ceremonies, the sprites describe moonlight dances that strengthen magic, and even the talking animals share ancestral stories passed down through generations.",
    choices: [
      {
        text: "Record the dryads' tree-singing traditions",
        action: () => {
          actions.addScore(75);
          actions.addToInventory("Dryad Song Collection");
          actions.changeScene("dryad_traditions");
        }
      },
      {
        text: "Learn the sprites' moonlight rituals",
        action: () => {
          actions.addScore(75);
          actions.changeScene("sprite_rituals");
        }
      },
      {
        text: "Document animal folklore and wisdom",
        action: () => {
          actions.addScore(75);
          actions.changeScene("animal_folklore");
        }
      }
    ]
  },

  symbol_studies: {
    title: "The Language of Ancient Symbols",
    description: "Your study of ancient symbols reveals a complex communication system that predates written language. These symbols don't just convey meaning - they actively channel and shape magical energy. You begin to understand how ancient peoples used them to create lasting enchantments.",
    choices: [
      {
        text: "Decipher the protection symbols",
        action: () => {
          actions.addScore(75);
          actions.changeScene("protection_symbols");
        }
      },
      {
        text: "Study the symbols of power and enhancement",
        action: () => {
          actions.addScore(75);
          actions.changeScene("power_symbols");
        }
      },
      {
        text: "Investigate symbols of communication",
        action: () => {
          actions.addScore(75);
          actions.changeScene("communication_symbols");
        }
      }
    ]
  },

  dragon_psychology: {
    title: "Understanding the Dragon Mind",
    description: "Your psychological analysis of dragons reveals that their long lives create unique mental patterns. They experience time differently, forming deep but slow emotional connections. Auraxes's isolation has likely intensified her natural tendency toward introspection, creating a feedback loop of loneliness and withdrawal.",
    choices: [
      {
        text: "Develop strategies to help her reconnect",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Dragon Therapist");
          actions.changeScene("reconnection_strategies");
        }
      },
      {
        text: "Study how to communicate across time perception differences",
        action: () => {
          actions.addScore(75);
          actions.changeScene("temporal_communication");
        }
      },
      {
        text: "Apply this understanding when you meet her",
        action: () => actions.changeScene("psychologically_prepared")
      }
    ]
  },

  hermit_psychology: {
    title: "The Solitary Mind",
    description: "Your study of Eldric's choice to live in isolation reveals complex motivations. Unlike the dragon's forced solitude, his is chosen - a response to disappointment with society's abandonment of wisdom. Yet he continues teaching, suggesting hope still burns within him.",
    choices: [
      {
        text: "Discuss your observations with Eldric",
        action: () => {
          actions.addScore(75);
          actions.changeScene("hermit_discussion");
        }
      },
      {
        text: "Consider how chosen and forced isolation differ",
        action: () => {
          actions.addScore(50);
          actions.changeScene("isolation_comparison");
        }
      },
      {
        text: "Plan to reconnect him with like-minded souls",
        action: () => actions.changeScene("connection_planning")
      }
    ]
  },

  stable_mapping: {
    title: "Charting the Constant",
    description: "You map the stable elements of the forest - ancient trees that serve as landmarks, rock formations that never change, and streams that always flow the same paths. This creates a reliable guide through the ever-shifting magical landscape.",
    choices: [
      {
        text: "Create copies of the map for other travelers",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Helpful Cartographer");
          actions.changeScene("map_distribution");
        }
      },
      {
        text: "Use the map to find the quickest route to the temple",
        action: () => actions.changeScene("efficient_journey")
      },
      {
        text: "Mark locations of particular interest",
        action: () => actions.changeScene("points_of_interest")
      }
    ]
  },

  magical_cartography: {
    title: "Mapping the Invisible",
    description: "Your maps of magical fluctuations reveal that the forest's magic ebbs and flows like tides. Certain areas become more magical at specific times, while others have consistent levels. This knowledge could revolutionize how people navigate and use magical spaces.",
    choices: [
      {
        text: "Predict the next magical high tide",
        action: () => {
          actions.addScore(100);
          actions.changeScene("magical_prediction");
        }
      },
      {
        text: "Find permanently magical zones",
        action: () => {
          actions.addScore(75);
          actions.changeScene("permanent_magic_zones");
        }
      },
      {
        text: "Share this knowledge with magical communities",
        action: () => actions.changeScene("knowledge_distribution")
      }
    ]
  },

  optimized_path: {
    title: "The Perfect Route",
    description: "Using your detailed maps, you plot an optimal path to your destination that avoids dangers while passing through areas of beneficial magic. The journey that might take days for others will take you mere hours.",
    choices: [
      {
        text: "Follow the optimized path immediately",
        action: () => {
          actions.addScore(100);
          actions.changeScene("swift_journey");
        }
      },
      {
        text: "Take a slight detour to help others along the way",
        action: () => {
          actions.addScore(75);
          actions.changeScene("helpful_detour");
        }
      },
      {
        text: "Mark the path for future travelers",
        action: () => {
          actions.addScore(50);
          actions.changeScene("path_marking");
        }
      }
    ]
  },

  unity_planning: {
    title: "A Vision of Unity",
    description: "You envision using the Golden Orb's power to create lasting peace between the warring kingdoms. Treaties could be enforced, resources shared fairly, and conflicts resolved through wisdom rather than warfare. This noble goal strengthens your resolve.",
    choices: [
      {
        text: "Begin your quest with this vision in mind",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Seek allies who share this vision",
        action: () => actions.changeScene("ally_seeking")
      }
    ]
  },

  neutral_commitment: {
    title: "The Neutral Guardian's Oath",
    description: "You commit yourself to ensuring the Golden Orb remains neutral, beyond the reach of any single power. This decision requires great courage, as you'll likely face opposition from all sides who want the power for themselves.",
    choices: [
      {
        text: "Swear an oath to maintain neutrality",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Neutral Keeper");
          actions.changeScene("oath_of_neutrality");
        }
      },
      {
        text: "Begin planning how to achieve this",
        action: () => actions.changeScene("neutrality_strategy")
      },
      {
        text: "Continue your quest with this resolve",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  guardian_considerations: {
    title: "Choosing a Guardian",
    description: "If the Orb is to remain neutral, it needs a guardian who can be trusted absolutely. You consider the options: the dragon Auraxes, the hermit Eldric, a council of representatives, or perhaps a magical construct that has no personal ambitions.",
    choices: [
      {
        text: "The dragon would be the strongest guardian",
        action: () => {
          actions.addScore(50);
          actions.changeScene("dragon_guardian_plan");
        }
      },
      {
        text: "A council would provide balanced oversight",
        action: () => {
          actions.addScore(50);
          actions.changeScene("council_guardian_plan");
        }
      },
      {
        text: "Create a magical guardian without bias",
        action: () => {
          actions.addScore(75);
          actions.changeScene("construct_guardian_plan");
        }
      },
      {
        text: "Continue the quest and decide later",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  symbiosis_study: {
    title: "The Web of Mutual Aid",
    description: "Your study reveals fascinating symbiotic relationships: fireflies that feed on flower nectar while providing light for nocturnal blooms, wolves that protect unicorn foals in exchange for healing when injured, and trees that share nutrients through vast underground networks.",
    choices: [
      {
        text: "Document the firefly-flower partnership",
        action: () => {
          actions.addScore(50);
          actions.changeScene("firefly_documentation");
        }
      },
      {
        text: "Study the wolf-unicorn alliance",
        action: () => {
          actions.addScore(75);
          actions.changeScene("wolf_unicorn_study");
        }
      },
      {
        text: "Investigate the tree network in depth",
        action: () => {
          actions.addScore(100);
          actions.changeScene("tree_network_research");
        }
      }
    ]
  },

  ecosystem_study: {
    title: "The Balance of Nature",
    description: "You observe how magical predators and prey maintain a delicate balance. Crystal foxes hunt moon rabbits, but only during certain phases. Shadow cats prey on light sprites, yet neither population ever grows too large or too small. There's an intelligence to this balance that suggests deliberate design.",
    choices: [
      {
        text: "Study the lunar hunting patterns",
        action: () => {
          actions.addScore(75);
          actions.changeScene("lunar_patterns");
        }
      },
      {
        text: "Investigate the population control mechanisms",
        action: () => {
          actions.addScore(75);
          actions.changeScene("population_balance");
        }
      },
      {
        text: "Search for evidence of intelligent design",
        action: () => {
          actions.addScore(100);
          actions.changeScene("design_evidence");
        }
      }
    ]
  },

  evolution_study: {
    title: "Magical Evolution",
    description: "Your investigation reveals that magical creatures evolve differently than mundane ones. They adapt not just physically but magically, developing new abilities in response to environmental changes. You witness a family of ordinary rabbits beginning to develop moon-related powers after generations of living in an enchanted grove.",
    choices: [
      {
        text: "Document this evolutionary process",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Evolution Witness");
          actions.changeScene("evolution_documentation");
        }
      },
      {
        text: "Try to accelerate the process safely",
        action: () => actions.changeScene("evolution_acceleration")
      },
      {
        text: "Share this discovery with scholars",
        action: () => actions.changeScene("evolution_sharing")
      }
    ]
  }
});

export default createMissingScenesFinal;
