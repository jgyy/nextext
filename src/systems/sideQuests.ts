// src/systems/sideQuests.ts

export interface SideQuest {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  rewards: {
    experience: number;
    skills?: Partial<EnhancedGameState['skills']>;
    items?: string[];
    relationships?: Partial<EnhancedGameState['relationships']>;
    achievements?: string[];
  };
  prerequisites?: {
    skills?: Partial<EnhancedGameState['skills']>;
    relationships?: Partial<EnhancedGameState['relationships']>;
    achievements?: string[];
    items?: string[];
  };
  timeLimit?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
}

export const SIDE_QUESTS: SideQuest[] = [
  {
    id: "lost_scholar",
    title: "The Lost Scholar of Ancient Ways",
    description: "A young scholar has gone missing while researching pre-dragon civilizations. Find them before the forest's dangers claim another seeker of knowledge.",
    objectives: [
      "Search the abandoned research camp",
      "Follow the trail through the Whispering Woods", 
      "Rescue the scholar from the Shadow Caverns",
      "Escort them safely back to civilization"
    ],
    rewards: {
      experience: 200,
      skills: { wisdom: 15, survival: 10 },
      items: ["Ancient Research Notes", "Scholarly Blessing"],
      relationships: { scholars: 25 },
      achievements: ["Rescuer of Knowledge"]
    },
    prerequisites: {
      skills: { wisdom: 10, survival: 5 }
    },
    difficulty: 'Medium'
  },
  
  {
    id: "fairy_ring_mystery",
    title: "The Broken Fairy Ring",
    description: "The fairy circles in the Moonlit Grove have been corrupted by dark magic. Help restore the natural balance before the corruption spreads.",
    objectives: [
      "Investigate the corrupted fairy rings",
      "Discover the source of dark magic",
      "Gather purification components",
      "Perform the cleansing ritual"
    ],
    rewards: {
      experience: 150,
      skills: { mysticism: 20, compassion: 10 },
      items: ["Fairy Dust", "Purification Crystal"],
      relationships: { fairies: 30, forestGuardian: 20 },
      achievements: ["Nature's Cleanser"]
    },
    prerequisites: {
      relationships: { fairies: 10 }
    },
    difficulty: 'Medium'
  },

  {
    id: "dragon_dreams",
    title: "The Dragon's Haunted Dreams",
    description: "Auraxes is tormented by nightmares of past failures. Enter her dreams using ancient magic and help her find peace with her history.",
    objectives: [
      "Learn the Dream Walking ritual",
      "Enter Auraxes's subconscious",
      "Confront the manifestations of her guilt",
      "Help her forgive herself for past mistakes"
    ],
    rewards: {
      experience: 300,
      skills: { mysticism: 25, compassion: 20, wisdom: 15 },
      items: ["Dream Walker's Talisman", "Memory Crystal"],
      relationships: { auraxes: 50 },
      achievements: ["Dream Walker", "Dragon Therapist"]
    },
    prerequisites: {
      skills: { mysticism: 25, compassion: 15 },
      relationships: { auraxes: 30 }
    },
    difficulty: 'Hard'
  },

  {
    id: "temporal_paradox",
    title: "The Temporal Paradox Crisis",
    description: "Your actions have created a temporal paradox that threatens to unravel reality itself. Travel through time to correct the timeline.",
    objectives: [
      "Identify the source of the paradox",
      "Travel to three key historical moments", 
      "Make subtle corrections without altering core events",
      "Restore temporal stability"
    ],
    rewards: {
      experience: 500,
      skills: { mysticism: 30, wisdom: 25 },
      items: ["Temporal Anchor", "Chronos Blessing"],
      achievements: ["Time Mender", "Paradox Resolver", "Temporal Guardian"]
    },
    prerequisites: {
      skills: { mysticism: 30 },
      achievements: ["Time Traveler"]
    },
    difficulty: 'Legendary'
  }
];

export const createInteractiveScenes = (gameState: EnhancedGameState, actions: EnhancedGameActions): Record<string, EnhancedScene> => ({
  sphinx_riddle_challenge: {
    title: "The Guardian Sphinx's Test",
    description: "Before you stands an ancient sphinx, guardian of forbidden knowledge. Its eyes gleam with intelligence as it poses a riddle that will test not just your wit, but your understanding of the deeper truths.",
    choices: [
      {
        text: "Accept the riddle challenge",
        action: () => actions.changeScene("sphinx_riddle_1")
      },
      {
        text: "Ask for a different test",
        action: () => actions.changeScene("sphinx_alternative_test")
      },
      {
        text: "Attempt to bypass the sphinx through stealth",
        action: () => actions.changeScene("sphinx_stealth_attempt"),
        skillCheck: { type: 'survival', difficulty: 10 }
      },
      {
        text: "Challenge the sphinx to a philosophical debate",
        action: () => actions.changeScene("sphinx_philosophy_duel"),
        skillCheck: { type: 'wisdom', difficulty: 12 }
      }
    ]
  },

  sphinx_riddle_1: {
    title: "First Riddle: The Nature of Truth",
    description: "'I speak without a voice, yet all can hear me. I have no substance, yet I can move mountains. I am born from minds but live beyond them. I can unite enemies or divide friends. What am I?'\n\nThe sphinx watches you carefully, its ancient eyes seeming to peer into your very soul.",
    choices: [
      {
        text: "Answer: An Idea",
        action: () => {
          actions.gainExperience(100);
          actions.improveSkill("wisdom", 10);
          actions.changeScene("sphinx_riddle_2");
        }
      },
      {
        text: "Answer: Truth",
        action: () => {
          actions.gainExperience(75);
          actions.changeScene("sphinx_riddle_2");
        }
      },
      {
        text: "Answer: Words",
        action: () => {
          actions.changeScene("sphinx_riddle_incorrect");
        }
      },
      {
        text: "Ask for a hint",
        action: () => actions.changeScene("sphinx_hint_1")
      }
    ]
  },

  alchemy_laboratory: {
    title: "The Alchemist's Laboratory",
    description: "You discover an abandoned alchemical laboratory filled with bubbling potions, crystalline components, and ancient formulas. A note suggests you can create powerful elixirs if you can decipher the alchemical equations.",
    choices: [
      {
        text: "Attempt to brew a Potion of Enhanced Wisdom",
        action: () => actions.changeScene("wisdom_potion_brewing"),
        condition: () => gameState.inventory.includes("Moonstone Essence")
      },
      {
        text: "Try to create an Elixir of Dragon Communication",
        action: () => actions.changeScene("dragon_elixir_brewing"),
        condition: () => gameState.inventory.includes("Dragon Scale")
      },
      {
        text: "Experiment with Temporal Displacement Serum",
        action: () => actions.changeScene("temporal_serum_brewing"),
        skillCheck: { type: 'mysticism', difficulty: 15 }
      },
      {
        text: "Study the alchemical texts first",
        action: () => {
          actions.gainLore("Principles of Magical Alchemy");
          actions.changeScene("alchemy_study");
        }
      },
      {
        text: "Leave the dangerous laboratory alone",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  memory_palace: {
    title: "The Dragon's Memory Palace",
    description: "You find yourself within Auraxes's vast mental palace of memories, a labyrinthine structure containing thousands of years of experiences. Each room holds different memories, and navigating them correctly could unlock incredible insights.",
    choices: [
      {
        text: "Enter the Hall of First Students",
        action: () => {
          actions.gainLore("The First Age of Teaching");
          actions.modifyRelationship("auraxes", 15);
          actions.changeScene("first_students_memory");
        }
      },
      {
        text: "Explore the Chamber of Lost Civilizations",
        action: () => {
          actions.gainLore("Forgotten Empires of Wisdom");
          actions.improveSkill("wisdom", 15);
          actions.changeScene("lost_civilizations_memory");
        }
      },
      {
        text: "Visit the Gallery of Regrets",
        action: () => {
          actions.improveSkill("compassion", 20);
          actions.changeScene("regrets_memory");
        }
      },
      {
        text: "Seek the Inner Sanctum of Hidden Knowledge",
        action: () => {
          actions.unlockSecret("The Ultimate Truth");
          actions.changeScene("hidden_knowledge_memory");
        },
        skillCheck: { type: 'wisdom', difficulty: 20 }
      }
    ]
  },

  elemental_nexus: {
    title: "The Elemental Nexus",
    description: "You stand at the convergence point of all elemental forces. Four ancient altars surround you - Fire, Water, Earth, and Air. To proceed, you must solve the puzzle of elemental harmony by activating them in the correct sequence.",
    choices: [
      {
        text: "Fire → Water → Earth → Air (The Cycle of Creation)",
        action: () => {
          actions.learnMagicalAbility("Elemental Harmony");
          actions.changeScene("creation_cycle_success");
        }
      },
      {
        text: "Air → Fire → Water → Earth (The Storm Sequence)",
        action: () => {
          actions.learnMagicalAbility("Storm Calling");
          actions.changeScene("storm_sequence_success");
        }
      },
      {
        text: "Earth → Air → Fire → Water (The Mountain's Breath)",
        action: () => {
          actions.learnMagicalAbility("Mountain's Wisdom");
          actions.changeScene("mountain_sequence_success");
        }
      },
      {
        text: "Activate all elements simultaneously",
        action: () => {
          actions.learnMagicalAbility("Elemental Unity");
          actions.addAchievement("Master of Elements");
          actions.changeScene("unity_sequence_success");
        },
        skillCheck: { type: 'mysticism', difficulty: 18 }
      },
      {
        text: "Study the elemental patterns more carefully",
        action: () => actions.changeScene("elemental_study")
      }
    ]
  },

  royal_court: {
    title: "The Court of Seven Kingdoms",
    description: "You arrive at a diplomatic gathering where representatives from seven different kingdoms debate how to respond to the growing magical crisis. Your words here could unite them in common cause or drive them further apart.",
    choices: [
      {
        text: "Propose a magical knowledge-sharing alliance",
        action: () => {
          actions.modifyRelationship("nobles", 25);
          actions.modifyRelationship("scholars", 30);
          actions.changeScene("knowledge_alliance_formed");
        },
        skillCheck: { type: 'diplomacy', difficulty: 12 }
      },
      {
        text: "Suggest a military alliance against dark forces",
        action: () => {
          actions.modifyRelationship("nobles", 20);
          actions.changeScene("military_alliance_formed");
        },
        skillCheck: { type: 'courage', difficulty: 10 }
      },
      {
        text: "Advocate for protecting common people first",
        action: () => {
          actions.modifyRelationship("commoners", 35);
          actions.improveSkill("compassion", 15);
          actions.changeScene("people_protection_pact");
        },
        skillCheck: { type: 'compassion', difficulty: 8 }
      },
      {
        text: "Propose that each kingdom find its own solution",
        action: () => actions.changeScene("independence_declared")
      },
      {
        text: "Listen to all sides before offering guidance",
        action: () => {
          actions.improveSkill("wisdom", 10);
          actions.changeScene("diplomatic_wisdom");
        }
      }
    ]
  },

  vision_quest: {
    title: "The Great Vision Quest",
    description: "Deep in meditation at the Sacred Grove, you begin a vision quest that will show you possible futures and hidden truths. Each vision offers profound insights but also tests your ability to handle cosmic knowledge.",
    choices: [
      {
        text: "Seek visions of the realm's potential futures",
        action: () => {
          actions.activateVision("Future Possibilities");
          actions.improveSkill("mysticism", 20);
          actions.changeScene("future_visions_revealed");
        }
      },
      {
        text: "Look for the origins of the current crisis",
        action: () => {
          actions.gainLore("The Shadow's True Origin");
          actions.changeScene("crisis_origins_revealed");
        }
      },
      {
        text: "Commune with the spirits of past heroes",
        action: () => {
          actions.gainExperience(150);
          actions.addAchievement("Spirit Communion");
          actions.changeScene("past_heroes_communion");
        }
      },
      {
        text: "Seek guidance from cosmic forces",
        action: () => {
          actions.unlockSecret("The Universal Pattern");
          actions.changeScene("cosmic_guidance_received");
        },
        skillCheck: { type: 'mysticism', difficulty: 25 }
      },
      {
        text: "End the quest to avoid overwhelming revelations",
        action: () => actions.changeScene("vision_quest_ended")
      }
    ]
  }
});

export const createEnvironmentalScenes = (gameState: EnhancedGameState, actions: EnhancedGameActions): Record<string, EnhancedScene> => ({
  abandoned_village: {
    title: "The Village That Time Forgot",
    description: "You discover the ruins of a once-thriving village, now overgrown with mystical vines. Ancient murals on the walls tell the story of its inhabitants - scholars and mages who tried to create a utopia of knowledge sharing, but something went terribly wrong.",
    choices: [
      {
        text: "Investigate the central library ruins",
        action: () => {
          actions.gainLore("The Failed Utopia Project");
          actions.changeScene("library_ruins_investigation");
        }
      },
      {
        text: "Examine the mystical vines for clues",
        action: () => {
          actions.improveSkill("mysticism", 10);
          actions.changeScene("mystical_vines_study");
        }
      },
      {
        text: "Search for survivors or descendants",
        action: () => actions.changeScene("survivor_search"),
        skillCheck: { type: 'survival', difficulty: 8 }
      },
      {
        text: "Perform a ritual to honor the lost community",
        action: () => {
          actions.improveSkill("compassion", 15);
          actions.addAchievement("Guardian of Memory");
          actions.changeScene("memorial_ritual");
        }
      }
    ]
  },

  crystalline_caverns: {
    title: "The Singing Crystal Caves",
    description: "Deep underground, you find caverns filled with resonating crystals that sing with accumulated magical energy. The harmonic frequencies seem to encode messages and memories from across the ages.",
    choices: [
      {
        text: "Attune yourself to the crystal harmonics",
        action: () => {
          actions.learnMagicalAbility("Crystal Resonance");
          actions.changeScene("crystal_attunement");
        },
        skillCheck: { type: 'mysticism', difficulty: 12 }
      },
      {
        text: "Record the crystal songs for later study",
        action: () => {
          actions.gainLore("Songs of the Earth's Memory");
          actions.changeScene("crystal_recording");
        }
      },
      {
        text: "Look for the largest crystal formation",
        action: () => actions.changeScene("master_crystal_discovery")
      },
      {
        text: "Leave the crystals undisturbed",
        action: () => {
          actions.improveSkill("wisdom", 10);
          actions.addAchievement("Respectful Explorer");
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  starfall_crater: {
    title: "The Starfall Crater",
    description: "You find a massive crater where a star fell from the heavens centuries ago. The impact site still pulses with cosmic energy, and strange plants with star-like flowers grow in perfect geometric patterns around the rim.",
    choices: [
      {
        text: "Meditate at the crater's center",
        action: () => {
          actions.activateVision("Cosmic Perspective");
          actions.improveSkill("mysticism", 25);
          actions.changeScene("cosmic_meditation");
        }
      },
      {
        text: "Study the star-flowers' properties",
        action: () => {
          actions.gainLore("Celestial Botany");
          actions.changeScene("starflower_study");
        }
      },
      {
        text: "Search for fragments of the fallen star",
        action: () => {
          actions.changeScene("star_fragment_search");
        },
        skillCheck: { type: 'survival', difficulty: 15 }
      },
      {
        text: "Attempt to communicate with the cosmic energy",
        action: () => {
          actions.learnMagicalAbility("Stellar Communication");
          actions.changeScene("cosmic_communication");
        },
        skillCheck: { type: 'mysticism', difficulty: 20 }
      }
    ]
  }
});

export interface DynamicEvent {
  id: string;
  title: string;
  description: string;
  triggerConditions: {
    scenes?: string[];
    skills?: Partial<EnhancedGameState['skills']>;
    relationships?: Partial<EnhancedGameState['relationships']>;
    worldState?: Partial<EnhancedGameState['worldState']>;
    achievements?: string[];
  };
  choices: Array<{
    text: string;
    consequences: {
      skills?: Partial<EnhancedGameState['skills']>;
      relationships?: Partial<EnhancedGameState['relationships']>;
      worldState?: Partial<EnhancedGameState['worldState']>;
      items?: string[];
      nextScene?: string;
    };
  }>;
  oneTime: boolean;
}

export const DYNAMIC_EVENTS: DynamicEvent[] = [
  {
    id: "meteor_shower",
    title: "The Prophetic Meteor Shower",
    description: "As you travel, the sky suddenly fills with falling stars. Local villagers emerge from their homes, pointing excitedly at the celestial display. An old woman approaches you, claiming the meteors are a sign that the Chosen One walks among them.",
    triggerConditions: {
      scenes: ["forest_path", "village_outskirts"],
      skills: { mysticism: 15 }
    },
    choices: [
      {
        text: "Accept the role of Chosen One",
        consequences: {
          relationships: { commoners: 20 },
          skills: { courage: 10 },
          nextScene: "chosen_one_acceptance"
        }
      },
      {
        text: "Humbly deflect the prophecy",
        consequences: {
          skills: { wisdom: 15, compassion: 10 },
          nextScene: "humble_deflection"
        }
      },
      {
        text: "Study the meteors for magical significance",
        consequences: {
          skills: { mysticism: 20 },
          items: ["Meteor Fragment"],
          nextScene: "meteor_study"
        }
      }
    ],
    oneTime: true
  },

  {
    id: "crossroads_merchant",
    title: "The Mysterious Crossroads Merchant",
    description: "At a crossroads, you encounter a strange merchant whose cart is filled with impossible items - bottled moonbeams, crystallized laughter, and maps to places that don't exist. They offer to trade for something you carry.",
    triggerConditions: {
      scenes: ["forest_path", "village_road"]
    },
    choices: [
      {
        text: "Trade an item for a bottle of liquid inspiration",
        consequences: {
          skills: { wisdom: 20, mysticism: 15 },
          nextScene: "inspiration_gained"
        }
      },
      {
        text: "Exchange knowledge for a map to hidden realms",
        consequences: {
          items: ["Map of Hidden Realms"],
          nextScene: "hidden_map_acquired"
        }
      },
      {
        text: "Politely decline and continue your journey",
        consequences: {
          skills: { wisdom: 5 },
          nextScene: "merchant_respected"
        }
      }
    ],
    oneTime: false
  }
];
