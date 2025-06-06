// src/scenes/gameExpansionAdditional.ts
import { Scene, GameState, GameActions } from "../types/game";
import { EnhancedGameState, EnhancedGameActions, EnhancedScene } from "../types/enhancedGame";

export const createGameExpansionAdditional = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  documentation_begin: {
    title: "The Scholar's Chronicle",
    description: "You begin documenting your journey with scholarly precision. Your journal will not only record events but analyze patterns, preserve knowledge, and perhaps reveal hidden connections between seemingly unrelated encounters.",
    choices: [
      {
        text: "Focus on magical phenomena documentation",
        action: () => {
          actions.addScore(50);
          actions.changeScene("magical_documentation");
        }
      },
      {
        text: "Record cultural and historical observations",
        action: () => {
          actions.addScore(50);
          actions.changeScene("cultural_documentation");
        }
      },
      {
        text: "Analyze the psychology of beings you meet",
        action: () => {
          actions.addScore(50);
          actions.changeScene("psychological_study");
        }
      },
      {
        text: "Create maps and geographical surveys",
        action: () => {
          actions.addScore(50);
          actions.changeScene("cartographic_work");
        }
      }
    ]
  },

  knowledge_seeking: {
    title: "The Quest for Ancient Sources",
    description: "Your scholarly instincts guide you to seek out repositories of ancient knowledge. You've heard rumors of several locations where wisdom from ages past might still be preserved.",
    choices: [
      {
        text: "Seek the Hidden Library of the First Mages",
        action: () => {
          actions.addScore(75);
          actions.changeScene("hidden_library_quest");
        }
      },
      {
        text: "Find the Crystal Caves of Memory",
        action: () => {
          actions.addScore(75);
          actions.changeScene("memory_caves_quest");
        }
      },
      {
        text: "Visit the Oracle of the Northern Peaks",
        action: () => {
          actions.addScore(75);
          actions.changeScene("oracle_quest");
        }
      },
      {
        text: "Continue to the hermit for more immediate guidance",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  safe_path: {
    title: "The Traveler's Route",
    description: "Your experience guides you along paths that avoid the most dangerous predators and magical anomalies. The route is longer but reveals interesting locations most adventurers miss in their haste.",
    choices: [
      {
        text: "Discover the Merchant's Rest Stop",
        action: () => {
          actions.addScore(50);
          actions.changeScene("merchant_camp");
        }
      },
      {
        text: "Find the Wanderer's Shrine",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wanderer_shrine");
        }
      },
      {
        text: "Explore the Abandoned Waystation",
        action: () => {
          actions.addScore(50);
          actions.changeScene("abandoned_waystation");
        }
      },
      {
        text: "Continue directly to your destination",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  magical_tracking: {
    title: "Following Mystical Traces",
    description: "Your trained eye picks up signs of magical creature passage - glowing pawprints, scorched leaves from phoenix feathers, and trees bent by invisible forces. These trails promise encounters with rare and powerful beings.",
    choices: [
      {
        text: "Follow the phoenix trail to its nesting grounds",
        action: () => {
          actions.addScore(100);
          actions.changeScene("phoenix_encounter");
        }
      },
      {
        text: "Track the invisible stalker to its lair",
        action: () => {
          actions.addScore(75);
          actions.changeScene("stalker_lair");
        }
      },
      {
        text: "Pursue the dancing lights phenomenon",
        action: () => {
          actions.addScore(75);
          actions.changeScene("light_phenomenon");
        }
      },
      {
        text: "Return to safer paths",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  dangerous_shortcut: {
    title: "The Perilous Passage",
    description: "The shortcut leads through territory marked with warning signs in dozen languages, including some that make your eyes water to read. But it could save days of travel if you survive.",
    choices: [
      {
        text: "Navigate the Screaming Gorge",
        action: () => {
          actions.takeDamage(20);
          actions.addScore(100);
          actions.changeScene("screaming_gorge");
        }
      },
      {
        text: "Cross through the Null Magic Zone",
        action: () => {
          actions.addScore(75);
          actions.changeScene("null_zone");
        }
      },
      {
        text: "Brave the Shapeshifter's Domain",
        action: () => {
          actions.addScore(75);
          actions.changeScene("shapeshifter_domain");
        }
      },
      {
        text: "Reconsider and take the safe path",
        action: () => actions.changeScene("safe_path")
      }
    ]
  },

  ally_seeking: {
    title: "Building Alliances",
    description: "Your vision of unity requires allies from all walks of life. You must decide which groups to approach first, as each alliance will affect how others perceive your cause.",
    choices: [
      {
        text: "Seek alliance with the Merchant Guilds",
        action: () => {
          actions.addScore(75);
          actions.changeScene("merchant_alliance");
        }
      },
      {
        text: "Approach the Circle of Mages",
        action: () => {
          actions.addScore(75);
          actions.changeScene("mage_alliance");
        }
      },
      {
        text: "Rally the Common Folk",
        action: () => {
          actions.addScore(75);
          actions.changeScene("common_alliance");
        }
      },
      {
        text: "Negotiate with the Forest Tribes",
        action: () => {
          actions.addScore(75);
          actions.changeScene("tribal_alliance");
        }
      }
    ]
  },

  hermit_alliance: {
    title: "The Hermit's Network",
    description: "Auraxes listens with growing excitement as you describe Eldric. 'Another keeper of knowledge, alone by choice rather than circumstance! Yes, we could work together. Hermits, dragons, and seekers united in preserving and sharing wisdom. This could be the beginning of something wonderful.'",
    choices: [
      {
        text: "Arrange a meeting between them",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Knowledge Broker");
          actions.changeScene("hermit_dragon_meeting");
        }
      },
      {
        text: "Offer to carry messages between them",
        action: () => {
          actions.addScore(100);
          actions.changeScene("messenger_role");
        }
      },
      {
        text: "Suggest creating a network of knowledge keepers",
        action: () => {
          actions.addScore(125);
          actions.changeScene("keeper_network");
        }
      }
    ]
  },

  more_stories: {
    title: "Tales of Hidden Wisdom",
    description: "You share more stories of those who still value learning: village healers passing down herb lore, blacksmiths teaching the old ways of working metal, children gathering eagerly for stories under starlight. Each tale brings more light to Auraxes's ancient eyes.",
    choices: [
      {
        text: "Tell of the underground school in the war-torn lands",
        action: () => {
          actions.addScore(100);
          actions.changeScene("underground_school_tale");
        }
      },
      {
        text: "Describe the blind sage who teaches through touch",
        action: () => {
          actions.addScore(100);
          actions.changeScene("blind_sage_tale");
        }
      },
      {
        text: "Share the story of the reformed thief who teaches ethics",
        action: () => {
          actions.addScore(100);
          actions.changeScene("thief_teacher_tale");
        }
      }
    ]
  },

  hermit_connection: {
    title: "An Old Friendship Revealed",
    description: "Auraxes's eyes widen with recognition. 'Eldric? Eldric the Bright, who studied here as a young man? He still lives? Oh, what joy! He was one of my finest students, though he left to wander the world. To know he still teaches, still preserves knowledge... this gives me such hope!'",
    choices: [
      {
        text: "Offer to reunite the old friends",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Reunion Architect");
          actions.changeScene("planning_reunion");
        }
      },
      {
        text: "Ask about Eldric's time as a student",
        action: () => {
          actions.addScore(75);
          actions.changeScene("eldric_history");
        }
      },
      {
        text: "Suggest they could teach together again",
        action: () => {
          actions.addScore(150);
          actions.changeScene("teaching_partnership");
        }
      }
    ]
  },

  elemental_mastery_training: {
    title: "Mastering the Elements",
    description: "Having awakened to elemental magic, you must now learn to balance and control these primal forces. Each element teaches different lessons and grants different powers.",
    choices: [
      {
        text: "Master Fire - Power and Transformation",
        action: () => {
          actions.addToInventory("Fire Mastery");
          actions.addScore(100);
          actions.changeScene("fire_mastery_complete");
        }
      },
      {
        text: "Master Water - Flow and Adaptation",
        action: () => {
          actions.addToInventory("Water Mastery");
          actions.addScore(100);
          actions.changeScene("water_mastery_complete");
        }
      },
      {
        text: "Master Earth - Stability and Endurance",
        action: () => {
          actions.addToInventory("Earth Mastery");
          actions.addScore(100);
          actions.changeScene("earth_mastery_complete");
        }
      },
      {
        text: "Master Air - Freedom and Perspective",
        action: () => {
          actions.addToInventory("Air Mastery");
          actions.addScore(100);
          actions.changeScene("air_mastery_complete");
        }
      },
      {
        text: "Seek perfect balance of all elements",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Elemental Harmony");
          actions.changeScene("elemental_balance");
        }
      }
    ]
  },

  dragon_memories: {
    title: "Sharing Ancient Memories",
    description: "Auraxes offers to share her memories directly with you through an ancient dragon technique. This would let you experience her millennia of life - the joys, sorrows, triumphs, and failures that shaped her into who she is today.",
    choices: [
      {
        text: "Accept the memory sharing ritual",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Memory Keeper");
          actions.changeScene("memory_ritual");
        }
      },
      {
        text: "Ask to see specific important memories",
        action: () => {
          actions.addScore(150);
          actions.changeScene("selective_memories");
        }
      },
      {
        text: "Suggest recording the memories for posterity",
        action: () => {
          actions.addScore(175);
          actions.changeScene("memory_preservation");
        }
      },
      {
        text: "Respectfully decline to avoid overwhelming yourself",
        action: () => {
          actions.addScore(50);
          actions.changeScene("memory_declined");
        }
      }
    ]
  },

  universal_harmony_ending: {
    title: "The Age of Universal Harmony",
    description: `Your journey has culminated in something beyond anyone's imagination. Through patience, wisdom, and compassion, you've helped create a world where all beings - dragons, humans, magical creatures, and nature itself - work together in perfect harmony.

Auraxes leads a new council of teachers from all species. The Golden Orb has been transformed into a network of smaller orbs, each one connecting communities in shared learning and growth. Wars have ended not through force but through understanding.

Final Score: ${gameState.score}
Achievements: ${gameState.achievements.join(", ")}

You haven't just found treasure - you've helped create a golden age for all beings.`,
    choices: [
      {
        text: "Begin a new adventure in this transformed world",
        action: actions.restartGame
      }
    ]
  },

  shadow_realm_expedition: {
    title: "Journey to the Shadow Realm",
    description: "Your investigations reveal that the growing darkness originates from the Shadow Realm, a parallel dimension where negative emotions and forgotten sorrows gather. To truly understand and combat the threat, you must journey there yourself.",
    choices: [
      {
        text: "Enter through the Mirror of Souls",
        action: () => {
          actions.addScore(150);
          actions.changeScene("mirror_entrance");
        },
        skillCheck: { type: 'courage', difficulty: 8 }
      },
      {
        text: "Use dream magic to project yourself",
        action: () => {
          actions.addScore(150);
          actions.changeScene("dream_projection");
        },
        skillCheck: { type: 'wisdom', difficulty: 8 }
      },
      {
        text: "Seek a shadow guide to lead you safely",
        action: () => {
          actions.addScore(100);
          actions.changeScene("shadow_guide_search");
        }
      },
      {
        text: "Research more before attempting entry",
        action: () => {
          actions.addScore(50);
          actions.changeScene("shadow_research");
        }
      }
    ]
  },

  time_loop_mystery: {
    title: "The Temporal Recursion",
    description: "You begin to notice disturbing repetitions - conversations that echo previous ones too perfectly, events that unfold exactly as they did before. You realize you might be caught in a time loop, doomed to repeat this quest until you discover how to break free.",
    choices: [
      {
        text: "Investigate the source of the time loop",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Time Detective");
          actions.changeScene("loop_investigation");
        }
      },
      {
        text: "Try to change events dramatically",
        action: () => {
          actions.addScore(150);
          actions.changeScene("loop_disruption");
        }
      },
      {
        text: "Seek others who might remember previous loops",
        action: () => {
          actions.addScore(150);
          actions.changeScene("loop_aware_search");
        }
      },
      {
        text: "Accept the loop and perfect your choices",
        action: () => {
          actions.addScore(100);
          actions.changeScene("loop_mastery");
        }
      }
    ]
  }
});

export const createCharacterStorylines = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  grand_thesis: {
    title: "The Scholar's Magnum Opus",
    description: "Your accumulated knowledge has reached a critical mass. You realize you could compile everything you've learned into a grand thesis that would revolutionize understanding of magic, dragons, and the nature of wisdom itself.",
    choices: [
      {
        text: "Write 'On the Harmony of Dragon and Human Knowledge'",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Master Scholar");
          actions.changeScene("thesis_dragons");
        }
      },
      {
        text: "Compile 'The Unified Theory of Magical Forces'",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Magical Theorist");
          actions.changeScene("thesis_magic");
        }
      },
      {
        text: "Create 'The Encyclopedia of Forgotten Wisdom'",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Knowledge Preserver");
          actions.changeScene("thesis_encyclopedia");
        }
      },
      {
        text: "Develop a new system of universal education",
        action: () => {
          actions.addScore(350);
          actions.addAchievement("Education Revolutionary");
          actions.changeScene("education_system");
        }
      }
    ]
  },

  peace_summit: {
    title: "The Great Peace Summit",
    description: "Your diplomatic efforts have borne fruit - representatives from all major factions have agreed to attend a peace summit. As the chief mediator, the success or failure of this historic gathering rests on your shoulders.",
    choices: [
      {
        text: "Address the underlying fears driving conflict",
        action: () => {
          actions.addScore(250);
          actions.changeScene("addressing_fears");
        },
        skillCheck: { type: 'wisdom', difficulty: 7 }
      },
      {
        text: "Propose a system of mutual magical defense",
        action: () => {
          actions.addScore(250);
          actions.changeScene("defense_proposal");
        }
      },
      {
        text: "Share Auraxes's vision of cooperative learning",
        action: () => {
          actions.addScore(250);
          actions.changeScene("dragon_vision_shared");
        },
        condition: () => gameState.achievements.includes("Dragon's Heart")
      },
      {
        text: "Let each faction present their grievances first",
        action: () => {
          actions.addScore(200);
          actions.changeScene("airing_grievances");
        }
      }
    ]
  },

  uncharted_realms: {
    title: "Beyond the Edge of Maps",
    description: "Your explorations have led you to the very edge of the known world. Before you lies terra incognita - lands no map shows, where reality itself seems more fluid and the impossible becomes commonplace.",
    choices: [
      {
        text: "Venture into the Probability Plains",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Reality Explorer");
          actions.changeScene("probability_plains");
        }
      },
      {
        text: "Explore the Inverted Mountains",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Gravity Defier");
          actions.changeScene("inverted_mountains");
        }
      },
      {
        text: "Navigate the Sea of Liquid Time",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Temporal Navigator");
          actions.changeScene("time_sea");
        }
      },
      {
        text: "Map these impossible lands for future explorers",
        action: () => {
          actions.addScore(350);
          actions.addAchievement("Impossible Cartographer");
          actions.changeScene("impossible_mapping");
        }
      }
    ]
  }
});

export const createPuzzleScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  ancient_mechanism: {
    title: "The Clockwork of the Ancients",
    description: "You discover an enormous mechanical device, its gears and crystals arranged in impossibly complex patterns. This appears to be an ancient puzzle that, when solved, could unlock profound magical knowledge or terrible power.",
    choices: [
      {
        text: "Align the celestial gears with current star positions",
        action: () => {
          actions.addScore(150);
          actions.changeScene("celestial_solution");
        },
        skillCheck: { type: 'wisdom', difficulty: 7 }
      },
      {
        text: "Arrange crystals to form the sacred geometries",
        action: () => {
          actions.addScore(150);
          actions.changeScene("geometric_solution");
        }
      },
      {
        text: "Input the sequence from your collected lore",
        action: () => {
          actions.addScore(200);
          actions.changeScene("lore_solution");
        },
        condition: () => gameState.inventory.includes("Ancient Wisdom")
      },
      {
        text: "Study the mechanism without activating it",
        action: () => {
          actions.addScore(75);
          actions.changeScene("mechanism_study");
        }
      }
    ]
  },

  riddle_of_existence: {
    title: "The Ultimate Question",
    description: "You encounter an ancient being that guards the path forward with a riddle that has stumped seekers for millennia: 'What can be broken without being held, given without being owned, kept without being caged, and grown by being shared?'",
    choices: [
      {
        text: "Answer: A Promise",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Promise Keeper");
          actions.changeScene("promise_path_opened");
        }
      },
      {
        text: "Answer: Knowledge",
        action: () => {
          actions.addScore(200);
          actions.changeScene("knowledge_acknowledged");
        }
      },
      {
        text: "Answer: Trust",
        action: () => {
          actions.addScore(250);
          actions.changeScene("trust_recognized");
        }
      },
      {
        text: "Ask for time to contemplate the riddle",
        action: () => {
          actions.addScore(100);
          actions.changeScene("riddle_contemplation");
        }
      }
    ]
  },

  memory_maze: {
    title: "The Labyrinth of Recollection",
    description: "You enter a mystical maze where the paths shift based on your memories. To navigate successfully, you must confront and understand key moments from your journey, as each choice you've made has literally shaped the passages before you.",
    choices: [
      {
        text: "Follow the path of compassionate choices",
        action: () => {
          actions.addScore(200);
          actions.changeScene("compassion_corridor");
        },
        condition: () => gameState.achievements.includes("Pure of Heart")
      },
      {
        text: "Take the route of wisdom gained",
        action: () => {
          actions.addScore(200);
          actions.changeScene("wisdom_way");
        },
        condition: () => gameState.achievements.includes("Sage of Riddles")
      },
      {
        text: "Navigate by moments of courage",
        action: () => {
          actions.addScore(200);
          actions.changeScene("courage_channel");
        }
      },
      {
        text: "Trust your instincts and forge a new path",
        action: () => {
          actions.addScore(250);
          actions.changeScene("instinct_path");
        }
      }
    ]
  }
});

export const createMoralDilemmas = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  impossible_choice: {
    title: "The Impossible Decision",
    description: "You face a terrible choice: You can save a village of innocent people from a magical plague, but doing so requires using the last of a rare herb that the dragon needs to maintain her sanity. Without it, Auraxes might lose herself to rage and destroy far more than one village.",
    choices: [
      {
        text: "Save the village and find another way to help Auraxes",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Village Savior");
          actions.changeScene("village_saved_consequence");
        }
      },
      {
        text: "Preserve the herb for Auraxes",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Dragon Guardian");
          actions.changeScene("dragon_preserved_consequence");
        }
      },
      {
        text: "Split the herb and hope both partial doses work",
        action: () => {
          actions.addScore(150);
          actions.changeScene("compromise_attempted");
        }
      },
      {
        text: "Search desperately for an alternative solution",
        action: () => {
          actions.addScore(250);
          actions.changeScene("alternative_search");
        },
        skillCheck: { type: 'wisdom', difficulty: 9 }
      }
    ]
  },

  truth_or_peace: {
    title: "The Burden of Truth",
    description: "You discover that the kingdom's beloved ruler, who has maintained peace for decades, is actually a dragon in disguise - one of Auraxes's children who took human form to guide humanity. Revealing this could shatter the peace, but keeping it secret perpetuates a fundamental deception.",
    choices: [
      {
        text: "Reveal the truth and trust people to accept it",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Truth Above All");
          actions.changeScene("truth_revealed_consequence");
        }
      },
      {
        text: "Keep the secret to preserve peace",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Guardian of Peace");
          actions.changeScene("secret_kept_consequence");
        }
      },
      {
        text: "Convince the ruler to reveal the truth themselves",
        action: () => {
          actions.addScore(300);
          actions.changeScene("guided_revelation");
        },
        skillCheck: { type: 'wisdom', difficulty: 8 }
      },
      {
        text: "Create a gradual plan for revelation",
        action: () => {
          actions.addScore(275);
          actions.changeScene("gradual_truth");
        }
      }
    ]
  },

  power_distribution: {
    title: "The Weight of Power",
    description: "You discover an artifact of immense power that could solve many problems - end droughts, cure diseases, even resurrect the dead. But it responds only to you. Do you keep this power to use wisely, or find a way to share it, knowing it might be misused?",
    choices: [
      {
        text: "Keep the power and use it responsibly",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Responsible Guardian");
          actions.changeScene("sole_guardian_path");
        }
      },
      {
        text: "Find a way to share the power equally",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Power Distributor");
          actions.changeScene("shared_power_path");
        }
      },
      {
        text: "Create a council to decide its use",
        action: () => {
          actions.addScore(225);
          actions.changeScene("council_formation");
        }
      },
      {
        text: "Destroy the artifact to prevent misuse",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Ultimate Sacrifice");
          actions.changeScene("artifact_destroyed");
        }
      }
    ]
  }
});

export const createWorldBuildingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  floating_city: {
    title: "The City Above the Clouds",
    description: "You discover a hidden city floating miles above the earth, sustained by a combination of ancient magic and forgotten technology. Its inhabitants have been isolated for centuries, developing their own unique culture and magical traditions.",
    choices: [
      {
        text: "Learn their aerial magic techniques",
        action: () => {
          actions.addToInventory("Sky Magic");
          actions.addScore(150);
          actions.changeScene("aerial_training");
        }
      },
      {
        text: "Study their historical records",
        action: () => {
          actions.addScore(150);
          actions.changeScene("floating_archives");
        }
      },
      {
        text: "Help reconnect them with the ground world",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Bridge Builder");
          actions.changeScene("reconnection_effort");
        }
      },
      {
        text: "Warn them about the growing darkness below",
        action: () => {
          actions.addScore(175);
          actions.changeScene("sky_warning");
        }
      }
    ]
  },

  underwater_kingdom: {
    title: "The Sunken Realm",
    description: "A magical bubble allows you to breathe as you descend into an underwater kingdom. Here, merfolk and sea dragons have preserved knowledge that land-dwellers thought lost forever, written on pearl tablets and sung in whale-song libraries.",
    choices: [
      {
        text: "Learn the whale-song method of knowledge storage",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Song Keeper");
          actions.changeScene("whale_song_learning");
        }
      },
      {
        text: "Seek audience with the Sea Dragon",
        action: () => {
          actions.addScore(175);
          actions.changeScene("sea_dragon_meeting");
        }
      },
      {
        text: "Study the pearl tablets of ancient history",
        action: () => {
          actions.addScore(150);
          actions.changeScene("pearl_tablet_study");
        }
      },
      {
        text: "Propose an alliance with the surface world",
        action: () => {
          actions.addScore(200);
          actions.changeScene("underwater_alliance");
        }
      }
    ]
  },

  living_forest_heart: {
    title: "The Heart of the Forest",
    description: "At the absolute center of the enchanted forest, you find its living heart - a massive tree whose roots connect every plant in the forest, creating a vast network of consciousness. It speaks in whispers of wind and rustling leaves.",
    choices: [
      {
        text: "Commune with the forest consciousness",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Forest Speaker");
          actions.changeScene("forest_communion");
        }
      },
      {
        text: "Ask about the forest's ancient memories",
        action: () => {
          actions.addScore(200);
          actions.changeScene("forest_memories");
        }
      },
      {
        text: "Offer to help heal damaged parts of the forest",
        action: () => {
          actions.addScore(225);
          actions.changeScene("forest_healing_quest");
        }
      },
      {
        text: "Request the forest's aid against the darkness",
        action: () => {
          actions.addScore(200);
          actions.changeScene("forest_alliance_request");
        }
      }
    ]
  },

  void_observatory: {
    title: "The Observatory at Reality's Edge",
    description: "You find an ancient observatory built at a point where reality grows thin. Through its mystical telescopes, you can see not distant stars but distant possibilities - other timelines, potential futures, and the threads that bind all realities together.",
    choices: [
      {
        text: "Study the timeline where dragons rule",
        action: () => {
          actions.addScore(150);
          actions.changeScene("dragon_timeline");
        }
      },
      {
        text: "Observe the reality where magic never existed",
        action: () => {
          actions.addScore(150);
          actions.changeScene("mundane_timeline");
        }
      },
      {
        text: "Search for the optimal future timeline",
        action: () => {
          actions.addScore(200);
          actions.changeScene("optimal_search");
        }
      },
      {
        text: "Try to send a message across realities",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Reality Messenger");
          actions.changeScene("trans_reality_message");
        },
        skillCheck: { type: 'wisdom', difficulty: 9 }
      }
    ]
  }
});
