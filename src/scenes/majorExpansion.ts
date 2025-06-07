// src/scenes/majorExpansion.ts - Exciting new content for the game!
import { Scene, GameState, GameActions } from "../types/game";
import { EnhancedGameState, EnhancedGameActions, EnhancedScene } from "../types/enhancedGame";

export const createTimelineScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  temporal_observatory: {
    title: "The Chronomancer's Observatory",
    description: "Hidden high in the mountain peaks, you discover an ancient observatory built by the legendary Chronomancers. Crystalline instruments show timelines branching like a vast tree, each branch representing different possible realities. You can see your own timeline, but also glimpses of what might have been.",
    choices: [
      {
        text: "Study the timeline where dragons never became guardians",
        action: () => {
          actions.addScore(150);
          actions.changeScene("timeline_dragon_kings");
        }
      },
      {
        text: "Explore the reality where magic was never discovered",
        action: () => {
          actions.addScore(150);
          actions.changeScene("timeline_mundane_world");
        }
      },
      {
        text: "Investigate the dark timeline where shadows won",
        action: () => {
          actions.addScore(200);
          actions.changeScene("timeline_shadow_victory");
        }
      },
      {
        text: "Attempt to send a message to another timeline",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Timeline Messenger");
          actions.changeScene("cross_timeline_communication");
        },
        skillCheck: { type: 'wisdom', difficulty: 12 }
      },
      {
        text: "Try to step through to an alternate reality",
        action: () => {
          actions.addScore(300);
          actions.changeScene("reality_travel_attempt");
        },
        skillCheck: { type: 'courage', difficulty: 15 }
      }
    ]
  },

  timeline_dragon_kings: {
    title: "The Dragon Empire Timeline",
    description: "In this alternate reality, dragons never became teachers and guardians. Instead, they formed a mighty empire that spans the known world. You see Auraxes not as a lonely scholar, but as Empress Auraxes the Magnificent, ruler of a golden age where dragons and humans work together as partners rather than teacher and student.",
    choices: [
      {
        text: "Learn about the political structure of this dragon empire",
        action: () => {
          actions.addScore(100);
          actions.addToInventory("Dragon Empire Political Theory");
          actions.changeScene("dragon_politics_study");
        }
      },
      {
        text: "Try to communicate with Empress Auraxes",
        action: () => {
          actions.addScore(150);
          actions.changeScene("empress_contact");
        }
      },
      {
        text: "Study how this reality avoided the current crisis",
        action: () => {
          actions.addScore(125);
          actions.changeScene("crisis_prevention_study");
        }
      },
      {
        text: "Return to your own timeline with this knowledge",
        action: () => {
          actions.addToInventory("Alternate Reality Insights");
          actions.changeScene("temporal_observatory");
        }
      }
    ]
  },

  reality_travel_attempt: {
    title: "Stepping Between Worlds",
    description: "You successfully breach the barriers between realities and find yourself standing in the same forest, but everything is subtly different. The trees are taller, the magic flows differently, and you can sense that the choices that led to this reality were vastly different from your own.",
    choices: [
      {
        text: "Explore this alternate version of the forest",
        action: () => {
          actions.addScore(200);
          actions.changeScene("alternate_forest_exploration");
        }
      },
      {
        text: "Seek out the alternate version of yourself",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Self Encounter");
          actions.changeScene("alternate_self_meeting");
        }
      },
      {
        text: "Find the dragon in this reality",
        action: () => {
          actions.addScore(175);
          actions.changeScene("alternate_dragon_encounter");
        }
      },
      {
        text: "Try to return to your own reality immediately",
        action: () => {
          actions.addScore(100);
          actions.changeScene("reality_return_attempt");
        }
      }
    ]
  },

  alternate_self_meeting: {
    title: "Meeting Another You",
    description: "You encounter another version of yourself - one who made different choices and followed different paths. This alternate you is wiser in some ways, more reckless in others. The conversation that follows challenges everything you thought you knew about destiny and choice.",
    choices: [
      {
        text: "Learn from your alternate self's mistakes",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Wisdom from Reflection");
          actions.changeScene("alternate_wisdom_gained");
        }
      },
      {
        text: "Share your own journey's insights",
        action: () => {
          actions.addScore(150);
          actions.changeScene("wisdom_exchange");
        }
      },
      {
        text: "Warn them about dangers you've faced",
        action: () => {
          actions.addScore(175);
          actions.addAchievement("Cross-Reality Helper");
          actions.changeScene("warning_given");
        }
      },
      {
        text: "Propose working together across realities",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Reality Alliance");
          actions.changeScene("cross_reality_partnership");
        }
      }
    ]
  }
});

export const createPuzzleQuestScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  ancient_vault_puzzle: {
    title: "The Vault of Seven Seals",
    description: "You discover an ancient vault sealed with seven different magical locks, each requiring a different type of puzzle to be solved. The vault is said to contain the 'Codex Universalis' - a book that explains the fundamental laws governing all realities.",
    choices: [
      {
        text: "Attempt the Riddle of Elements (Seal 1)",
        action: () => {
          actions.addScore(100);
          actions.changeScene("elemental_riddle_seal");
        }
      },
      {
        text: "Try the Paradox of Time (Seal 2)",
        action: () => {
          actions.addScore(125);
          actions.changeScene("temporal_paradox_seal");
        }
      },
      {
        text: "Challenge the Mirror of Truth (Seal 3)",
        action: () => {
          actions.addScore(150);
          actions.changeScene("truth_mirror_seal");
        }
      },
      {
        text: "Study all the seals before attempting any",
        action: () => {
          actions.addScore(75);
          actions.changeScene("seal_analysis");
        }
      }
    ]
  },

  elemental_riddle_seal: {
    title: "The First Seal: Elements in Harmony",
    description: "The first seal presents a riddle written in runes of fire, water, earth, and air:\n\n'I am born in fire but quenched by flame,\nI flow like water but am never wet,\nI'm solid as earth but lighter than air,\nI connect all things that have never met.\nWhat am I?'",
    choices: [
      {
        text: "Answer: Energy",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Elemental Wisdom");
          actions.changeScene("first_seal_opened");
        }
      },
      {
        text: "Answer: Magic",
        action: () => {
          actions.addScore(125);
          actions.changeScene("close_but_not_exact");
        }
      },
      {
        text: "Answer: Love",
        action: () => {
          actions.addScore(100);
          actions.changeScene("philosophical_interpretation");
        }
      },
      {
        text: "Request more time to think",
        action: () => {
          actions.addScore(25);
          actions.changeScene("riddle_contemplation");
        }
      }
    ]
  },

  mystery_investigation: {
    title: "The Disappearing Scholars",
    description: "You've discovered that scholars across the realm have been mysteriously vanishing. Each disappearance leaves behind only a strange symbol and a faint magical residue. Someone or something is targeting those who seek knowledge, and you may be next.",
    choices: [
      {
        text: "Investigate the common pattern in the disappearances",
        action: () => {
          actions.addScore(100);
          actions.changeScene("pattern_analysis");
        }
      },
      {
        text: "Study the strange symbols left behind",
        action: () => {
          actions.addScore(125);
          actions.changeScene("symbol_decryption");
        }
      },
      {
        text: "Set yourself as bait to draw out the kidnapper",
        action: () => {
          actions.addScore(150);
          actions.changeScene("bait_strategy");
        },
        skillCheck: { type: 'courage', difficulty: 10 }
      },
      {
        text: "Seek protection from the dragon before investigating",
        action: () => {
          actions.addScore(75);
          actions.changeScene("dragon_protection_request");
        }
      }
    ]
  },

  pattern_analysis: {
    title: "Uncovering the Pattern",
    description: "Your investigation reveals a disturbing pattern: all the missing scholars were researching the same topic - ancient texts about 'The Silence Between Words' and references to knowledge that exists in the spaces between thoughts. Someone doesn't want this particular area of study to continue.",
    choices: [
      {
        text: "Research 'The Silence Between Words' yourself",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Dangerous Knowledge Seeker");
          actions.changeScene("forbidden_research");
        }
      },
      {
        text: "Warn other scholars about the danger",
        action: () => {
          actions.addScore(150);
          actions.changeScene("scholar_warning_campaign");
        }
      },
      {
        text: "Try to rescue the missing scholars",
        action: () => {
          actions.addScore(175);
          actions.changeScene("rescue_mission");
        }
      },
      {
        text: "Confront whoever is behind the disappearances",
        action: () => {
          actions.addScore(250);
          actions.changeScene("confronting_the_enemy");
        }
      }
    ]
  }
});

export const createCompanionScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  companion_recruitment_hub: {
    title: "Gathering Allies for the Journey Ahead",
    description: "Your reputation has spread throughout the realm, and several remarkable individuals have expressed interest in joining your quest. Each potential companion brings unique abilities, perspectives, and personal stories that will enrich your journey.",
    choices: [
      {
        text: "Recruit Zara, the Time-touched Oracle",
        action: () => {
          actions.addToInventory("Zara the Oracle");
          actions.addScore(100);
          actions.changeScene("zara_recruited");
        }
      },
      {
        text: "Invite Marcus, the Reformed Dark Mage",
        action: () => {
          actions.addToInventory("Marcus the Reformed");
          actions.addScore(100);
          actions.changeScene("marcus_recruited");
        }
      },
      {
        text: "Accept Whisp, the Shapeshifting Cat",
        action: () => {
          actions.addToInventory("Whisp the Shapeshifter");
          actions.addScore(100);
          actions.changeScene("whisp_recruited");
        }
      },
      {
        text: "Consider traveling with multiple companions",
        action: () => {
          actions.changeScene("multiple_companion_consideration");
        }
      },
      {
        text: "Continue your journey alone",
        action: () => {
          actions.addScore(50);
          actions.addAchievement("Lone Hero");
          actions.changeScene("forest_path");
        }
      }
    ]
  },

  zara_recruited: {
    title: "Zara's Temporal Insights",
    description: "Zara joins your party, bringing with her the ability to glimpse fragments of possible futures. Her prophecies are cryptic but often invaluable. She warns you: 'The path ahead splits in ways you cannot imagine. Choices made in kindness may bear bitter fruit, while actions that seem cruel may plant seeds of great joy.'",
    choices: [
      {
        text: "Ask Zara about your specific quest",
        action: () => {
          actions.addScore(75);
          actions.changeScene("zara_quest_prophecy");
        }
      },
      {
        text: "Request a vision of the dragon's fate",
        action: () => {
          actions.addScore(100);
          actions.changeScene("dragon_fate_vision");
        }
      },
      {
        text: "Learn about Zara's mysterious past",
        action: () => {
          actions.addScore(50);
          actions.changeScene("zara_backstory");
        }
      },
      {
        text: "Continue to the temple with Zara's guidance",
        action: () => {
          actions.addScore(50);
          actions.changeScene("temple_approach");
        }
      }
    ]
  },

  marcus_recruited: {
    title: "The Redemption of a Dark Mage",
    description: "Marcus joins your quest, carrying the weight of his dark past but burning with the desire to make amends. His knowledge of shadow magic and forbidden arts could be invaluable, but his presence may complicate your relationships with others who fear his former allegiances.",
    choices: [
      {
        text: "Learn about Marcus's path to redemption",
        action: () => {
          actions.addScore(75);
          actions.changeScene("marcus_redemption_story");
        }
      },
      {
        text: "Ask him to teach you about shadow magic",
        action: () => {
          actions.addScore(100);
          actions.changeScene("shadow_magic_lessons");
        }
      },
      {
        text: "Discuss how to handle others' mistrust",
        action: () => {
          actions.addScore(50);
          actions.changeScene("trust_rebuilding_discussion");
        }
      },
      {
        text: "Test his commitment to your cause",
        action: () => {
          actions.addScore(125);
          actions.changeScene("loyalty_test");
        }
      }
    ]
  },

  companion_relationship_deepening: {
    title: "Bonds Forged in Adventure",
    description: "As you travel together, your relationships with your companions deepen. Each shares personal stories, fears, and dreams around the campfire. These bonds are becoming as valuable as any magical artifact.",
    choices: [
      {
        text: "Share your own deepest fears with them",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Vulnerable Leader");
          actions.changeScene("mutual_vulnerability");
        }
      },
      {
        text: "Ask each companion about their ultimate goals",
        action: () => {
          actions.addScore(100);
          actions.changeScene("companion_dreams_revealed");
        }
      },
      {
        text: "Propose a pact of mutual protection",
        action: () => {
          actions.addScore(125);
          actions.changeScene("protection_pact");
        }
      },
      {
        text: "Focus on the mission rather than personal bonds",
        action: () => {
          actions.addScore(50);
          actions.changeScene("mission_focus");
        }
      }
    ]
  }
});

export const createPoliticalScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  royal_court_intrigue: {
    title: "The Court of Seven Kingdoms",
    description: "You arrive at the Grand Council where representatives from seven kingdoms debate the implications of your quest. Unknown to most, secret factions work behind the scenes to either help or hinder your mission. The political landscape is a web of alliances, betrayals, and hidden agendas.",
    choices: [
      {
        text: "Publicly announce your quest's true purpose",
        action: () => {
          actions.addScore(100);
          actions.changeScene("public_announcement");
        }
      },
      {
        text: "Work secretly with trusted allies",
        action: () => {
          actions.addScore(150);
          actions.changeScene("secret_alliance_building");
        }
      },
      {
        text: "Try to identify the hidden factions",
        action: () => {
          actions.addScore(175);
          actions.changeScene("faction_investigation");
        },
        skillCheck: { type: 'wisdom', difficulty: 10 }
      },
      {
        text: "Offer to mediate between conflicting parties",
        action: () => {
          actions.addScore(125);
          actions.changeScene("diplomatic_mediation");
        }
      }
    ]
  },

  faction_investigation: {
    title: "Unraveling the Web of Intrigue",
    description: "Your investigation reveals three major factions: The Order of the Eternal Flame (who want to destroy the dragon), The Shadow Conclave (who seek to steal the Orb's power), and The Harmony Circle (who support peaceful resolution). Each has placed agents throughout the court.",
    choices: [
      {
        text: "Expose the Shadow Conclave's infiltration",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Shadow Hunter");
          actions.changeScene("conclave_exposure");
        }
      },
      {
        text: "Try to turn the Eternal Flame toward peaceful methods",
        action: () => {
          actions.addScore(175);
          actions.changeScene("flame_conversion");
        }
      },
      {
        text: "Ally openly with the Harmony Circle",
        action: () => {
          actions.addScore(150);
          actions.changeScene("harmony_alliance");
        }
      },
      {
        text: "Attempt to unite all factions under a common cause",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Master Diplomat");
          actions.changeScene("faction_unification");
        },
        skillCheck: { type: 'wisdom', difficulty: 12 }
      }
    ]
  },

  economic_warfare: {
    title: "The War of Gold and Magic",
    description: "You discover that economic forces are shaping the political landscape around your quest. Merchant guilds see profit in either the dragon's treasure or the stability her knowledge could bring. Your choices here will affect the entire realm's economy.",
    choices: [
      {
        text: "Propose a new economic model based on knowledge sharing",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Economic Revolutionary");
          actions.changeScene("knowledge_economy");
        }
      },
      {
        text: "Work with merchant guilds to fund peaceful solutions",
        action: () => {
          actions.addScore(150);
          actions.changeScene("merchant_partnership");
        }
      },
      {
        text: "Expose corruption in the current system",
        action: () => {
          actions.addScore(175);
          actions.changeScene("corruption_exposure");
        }
      },
      {
        text: "Stay focused on your quest and avoid economic politics",
        action: () => {
          actions.addScore(75);
          actions.changeScene("political_avoidance");
        }
      }
    ]
  }
});

export const createEnvironmentalScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  magical_storm_crisis: {
    title: "The Great Magical Storm",
    description: "A massive magical storm is brewing across the realm - the result of ancient magical forces being disrupted by the growing crisis. This storm could devastate entire kingdoms unless someone finds a way to calm the chaotic energies. The dragon's knowledge might be key to stopping it.",
    choices: [
      {
        text: "Rush to the dragon to seek knowledge about magical storms",
        action: () => {
          actions.addScore(200);
          actions.changeScene("storm_knowledge_quest");
        }
      },
      {
        text: "Try to shield communities from the storm's effects",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Storm Shield");
          actions.changeScene("community_protection");
        }
      },
      {
        text: "Attempt to redirect the storm's energy",
        action: () => {
          actions.addScore(250);
          actions.changeScene("storm_redirection");
        },
        skillCheck: { type: 'wisdom', difficulty: 15 }
      },
      {
        text: "Study the storm to understand its true nature",
        action: () => {
          actions.addScore(175);
          actions.changeScene("storm_analysis");
        }
      }
    ]
  },

  ecological_restoration: {
    title: "Healing the Wounded Land",
    description: "You discover areas where the magical balance has been severely damaged by past conflicts. Ancient battlefields still bear scars that prevent natural growth, and magical pollution threatens the health of entire ecosystems. Your quest has given you unique insights into how these wounds might be healed.",
    choices: [
      {
        text: "Use your magical knowledge to begin restoration",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Land Healer");
          actions.changeScene("magical_restoration");
        }
      },
      {
        text: "Recruit others to help with the massive task",
        action: () => {
          actions.addScore(175);
          actions.changeScene("restoration_recruitment");
        }
      },
      {
        text: "Document the damage for future research",
        action: () => {
          actions.addScore(125);
          actions.changeScene("damage_documentation");
        }
      },
      {
        text: "Seek the dragon's knowledge of ancient healing techniques",
        action: () => {
          actions.addScore(150);
          actions.changeScene("ancient_healing_quest");
        }
      }
    ]
  },

  dimensional_rifts: {
    title: "Tears in the Fabric of Reality",
    description: "Mysterious rifts have begun appearing throughout the realm - tears in reality itself that lead to strange otherworlds. Some bring beneficial energies and resources, while others leak dangerous entities and chaotic magic. The rifts seem to be connected to the magical crisis affecting the realm.",
    choices: [
      {
        text: "Explore one of the beneficial rifts",
        action: () => {
          actions.addScore(200);
          actions.changeScene("beneficial_rift_exploration");
        }
      },
      {
        text: "Attempt to seal a dangerous rift",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Rift Sealer");
          actions.changeScene("dangerous_rift_sealing");
        },
        skillCheck: { type: 'courage', difficulty: 12 }
      },
      {
        text: "Study the connection between rifts and the crisis",
        action: () => {
          actions.addScore(175);
          actions.changeScene("rift_crisis_connection");
        }
      },
      {
        text: "Warn communities about the rifts' dangers",
        action: () => {
          actions.addScore(125);
          actions.changeScene("rift_warning_campaign");
        }
      }
    ]
  }
});

export const createEpicQuestLines = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  cosmic_convergence: {
    title: "The Convergence of All Paths",
    description: "All your choices, all your actions, all the relationships you've built and knowledge you've gained are converging toward a single moment of cosmic significance. The Golden Orb awaits, but it has become something far greater than anyone imagined - a nexus point that could reshape reality itself.",
    choices: [
      {
        text: "Use the Orb to heal all wounds across all realities",
        action: () => {
          actions.addScore(500);
          actions.addAchievement("Cosmic Healer");
          actions.changeScene("universal_healing_ending");
        },
        condition: () => gameState.achievements.includes("Master Diplomat") && gameState.achievements.includes("Land Healer")
      },
      {
        text: "Transform the Orb into a network connecting all minds",
        action: () => {
          actions.addScore(450);
          actions.addAchievement("Unity Creator");
          actions.changeScene("consciousness_network_ending");
        },
        condition: () => gameState.achievements.includes("Timeline Messenger")
      },
      {
        text: "Use the Orb to become a guardian of the multiverse",
        action: () => {
          actions.addScore(400);
          actions.addAchievement("Multiverse Guardian");
          actions.changeScene("guardian_of_infinity_ending");
        }
      },
      {
        text: "Shatter the Orb and let its power flow freely to all",
        action: () => {
          actions.addScore(350);
          actions.addAchievement("Power Liberator");
          actions.changeScene("power_liberation_ending");
        }
      },
      {
        text: "Refuse the Orb's power and find another way",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("The Humble Path");
          actions.changeScene("humble_solution_ending");
        }
      }
    ]
  },

  universal_healing_ending: {
    title: "The Healer of All Realities",
    description: `Your choice to use the Golden Orb for universal healing resonates across all timelines and realities. Wounds that have festered for millennia begin to close. The rifts between dimensions seal themselves. The magical storms calm. Ancient enemies find peace with each other.

You have become something beyond mortal understanding - a living embodiment of healing and hope that exists across all possible worlds. Your consciousness spans realities, touching every hurt and bringing comfort to every pain.

The dragon Auraxes, now your eternal companion across the multiverse, smiles with joy that transcends words. Together, you tend to the infinite garden of existence itself.

Final Score: ${gameState.score}
Achievements: ${gameState.achievements.join(", ")}

You have achieved the ultimate ending - becoming a force of healing for all existence.`,
    choices: [
      {
        text: "Begin a new adventure in a healed multiverse",
        action: actions.restartGame
      }
    ]
  },

  consciousness_network_ending: {
    title: "The Web of All Minds",
    description: `The Golden Orb transforms under your will, becoming a vast network that connects every conscious being across all realities. Loneliness becomes impossible. Understanding flows between minds like water. Knowledge multiplies as it's shared.

You become the caretaker of this infinite network, ensuring that no mind is ever truly alone again. The dragon's isolation ends forever, as does the isolation of every being in every world.

This is not a loss of individuality, but a celebration of it - each unique perspective enriches the whole. You have solved not just the dragon's loneliness, but the fundamental separation that causes all suffering.

Final Score: ${gameState.score}
Achievements: ${gameState.achievements.join(", ")}

The age of cosmic empathy has begun.`,
    choices: [
      {
        text: "Experience the next phase of existence",
        action: actions.restartGame
      }
    ]
  }
});

export const createMajorExpansionScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  ...createTimelineScenes(gameState, actions),
  ...createPuzzleQuestScenes(gameState, actions),
  ...createCompanionScenes(gameState, actions),
  ...createPoliticalScenes(gameState, actions),
  ...createEnvironmentalScenes(gameState, actions),
  ...createEpicQuestLines(gameState, actions)
});
