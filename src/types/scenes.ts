// src/types/scenes.ts
import { GameState, GameActions, Scene, CHARACTER_CLASSES } from './game';

export const createAdvancedScenes = (
  gameState: GameState, 
  actions: GameActions
): Record<string, Scene> => ({
  character_selection: {
    title: "Choose Your Destiny",
    description: "Before beginning your legendary quest, you must decide what kind of hero you wish to become. This choice will shape not only your abilities but how the world responds to you throughout your journey.",
    choices: Object.entries(CHARACTER_CLASSES).map(([classKey, classData]) => ({
      text: `Become a ${classData.name}: ${classData.description}`,
      action: () => {
        actions.changeScene("class_selected");
        Object.entries(classData.startingSkills).forEach(([skill, value]) => {
          actions.improveSkill(skill as any, value);
        });
      }
    }))
  },

  mystical_convergence: {
    title: "The Convergence of Paths",
    description: "As you journey deeper into the mystical realm, you discover that your actions have been creating ripples across multiple dimensions of reality. Ancient forces are taking notice of your quest, and you must choose how to respond to their interest.",
    choices: [
      {
        text: "Embrace the cosmic significance of your quest",
        action: () => {
          actions.affectWorldState("magicalBalance", 25);
          actions.gainExperience(100);
          actions.changeScene("cosmic_awareness");
        },
        skillCheck: { type: 'mysticism', difficulty: 8 }
      },
      {
        text: "Remain grounded in your original purpose",
        action: () => {
          actions.improveSkill("wisdom", 10);
          actions.changeScene("grounded_wisdom");
        }
      },
      {
        text: "Seek to understand the bigger picture",
        action: () => {
          actions.unlockSecret("The Great Pattern");
          actions.changeScene("pattern_recognition");
        }
      }
    ],
    requirements: { skills: { mysticism: 5 } },
    consequences: {
      worldState: { magicalBalance: 10 },
      skills: { mysticism: 5 }
    }
  },

  companion_recruitment_hub: {
    title: "Gathering Allies",
    description: "Your reputation has grown throughout the realm, and various beings seek to join your noble quest. Choose your companions wisely, as they will influence both your capabilities and the paths available to you.",
    choices: [
      {
        text: "Recruit Lyra, the Dragon Scholar",
        action: () => {
          actions.recruitCompanion("Lyra the Dragon Scholar");
          actions.modifyRelationship("villagers", 20);
          actions.changeScene("lyra_recruited");
        },
        condition: () => gameState.stats.relationships.auraxes > 0
      },
      {
        text: "Accept Finn, the Reformed Treasure Hunter",
        action: () => {
          actions.recruitCompanion("Finn the Reformed");
          actions.improveSkill("survival", 10);
          actions.changeScene("finn_recruited");
        },
        condition: () => gameState.achievements.includes("Peaceful Leader")
      },
      {
        text: "Invite Whisper, the Forest Spirit",
        action: () => {
          actions.recruitCompanion("Whisper the Forest Spirit");
          actions.learnMagicalAbility("Nature Communication");
          actions.changeScene("whisper_recruited");
        },
        condition: () => gameState.stats.relationships.forestGuardian > 50
      },
      {
        text: "Continue alone to maintain independence",
        action: () => {
          actions.improveSkill("courage", 15);
          actions.addAchievement("Lone Wolf");
          actions.changeScene("solo_path");
        }
      }
    ],
    companionDialogue: {
      "Lyra the Dragon Scholar": "I've studied dragon lore all my life. Together, we can bridge the gap between species.",
      "Finn the Reformed": "I know the dangerous paths ahead. Let me help you avoid my past mistakes.",
      "Whisper the Forest Spirit": "The forest whispers of dark times ahead. You will need nature's aid."
    }
  },

  temporal_nexus: {
    title: "The Nexus of Time",
    description: "You discover a place where time flows differently, allowing you to witness pivotal moments in the realm's history. Here, you can learn from the past or catch glimpses of possible futures.",
    choices: [
      {
        text: "Witness the first meeting between dragons and humans",
        action: () => {
          actions.gainLore("The Age of Cooperation");
          actions.modifyRelationship("auraxes", 30);
          actions.changeScene("ancient_alliance");
        }
      },
      {
        text: "See the prophecy of the coming darkness",
        action: () => {
          actions.activateVision("The Shadow Prophecy");
          actions.improveSkill("mysticism", 15);
          actions.changeScene("prophecy_revealed");
        }
      },
      {
        text: "Glimpse your own potential futures",
        action: () => {
          actions.unlockSecret("Paths Not Taken");
          actions.changeScene("future_visions");
        }
      },
      {
        text: "Use the nexus to communicate across time",
        action: () => {
          actions.learnMagicalAbility("Temporal Communication");
          actions.changeScene("time_communication");
        },
        skillCheck: { type: 'mysticism', difficulty: 10 }
      }
    ],
    magicalOptions: [
      {
        ability: "Temporal Communication",
        text: "Send a message to the past or future",
        action: () => actions.changeScene("temporal_message")
      }
    ]
  },

  faction_diplomacy: {
    title: "The Council of Factions",
    description: "Representatives from various factions across the realm have gathered to discuss the implications of your quest. Your choices here will determine which groups support or oppose your mission.",
    choices: [
      {
        text: "Advocate for peaceful cooperation between all factions",
        action: () => {
          actions.modifyStat("reputation", "nobles", 15);
          actions.modifyStat("reputation", "scholars", 15);
          actions.modifyStat("reputation", "mystics", 15);
          actions.changeScene("universal_peace");
        },
        skillCheck: { type: 'diplomacy', difficulty: 8 }
      },
      {
        text: "Propose sharing magical knowledge responsibly",
        action: () => {
          actions.modifyStat("reputation", "scholars", 25);
          actions.modifyStat("reputation", "mystics", 20);
          actions.changeScene("knowledge_sharing_accord");
        }
      },
      {
        text: "Focus on protecting the common people",
        action: () => {
          actions.modifyStat("reputation", "commoners", 30);
          actions.improveSkill("compassion", 20);
          actions.changeScene("people_first");
        }
      },
      {
        text: "Suggest each faction should follow their own path",
        action: () => {
          actions.changeScene("independence_doctrine");
        }
      }
    ],
    requirements: { relationships: { nobles: 20 } },
    consequences: {
      worldState: { realmPeace: 20 },
      reputation: { nobles: 10, scholars: 10 }
    }
  },

  magical_awakening: {
    title: "The Great Awakening",
    description: "Your journey has awakened dormant magical abilities within you. The type of magic that manifests depends on your experiences and choices throughout your quest.",
    choices: [
      {
        text: "Embrace Elemental Magic (Fire, Water, Earth, Air)",
        action: () => {
          actions.learnMagicalAbility("Elemental Mastery");
          actions.changeScene("elemental_path");
        },
        condition: () => gameState.stats.skills.survival > 20
      },
      {
        text: "Develop Divine Magic (Healing, Protection, Blessing)",
        action: () => {
          actions.learnMagicalAbility("Divine Channeling");
          actions.changeScene("divine_path");
        },
        condition: () => gameState.stats.skills.compassion > 20
      },
      {
        text: "Master Mind Magic (Telepathy, Illusion, Memory)",
        action: () => {
          actions.learnMagicalAbility("Mental Arts");
          actions.changeScene("mental_path");
        },
        condition: () => gameState.stats.skills.wisdom > 20
      },
      {
        text: "Channel Spirit Magic (Communication, Summoning, Binding)",
        action: () => {
          actions.learnMagicalAbility("Spirit Communion");
          actions.changeScene("spirit_path");
        },
        condition: () => gameState.stats.skills.mysticism > 20
      },
      {
        text: "Reject magical power to remain purely human",
        action: () => {
          actions.addAchievement("Pure Human Hero");
          actions.improveSkill("courage", 25);
          actions.changeScene("pure_path");
        }
      }
    ]
  },

  world_crisis: {
    title: "The Spreading Darkness",
    description: "A great crisis is spreading across the realm - ancient shadows are awakening, seeking to consume all light and knowledge. Your quest has become more urgent, as the Golden Orb may be the key to stopping this darkness.",
    choices: [
      {
        text: "Rally all your allies to face the threat united",
        action: () => {
          actions.affectWorldState("realmPeace", 30);
          actions.changeScene("united_front");
        },
        condition: () => gameState.collections.companions.length > 0
      },
      {
        text: "Seek ancient knowledge to understand the darkness",
        action: () => {
          actions.gainLore("The Shadow's Origin");
          actions.changeScene("darkness_research");
        },
        skillCheck: { type: 'wisdom', difficulty: 12 }
      },
      {
        text: "Use your magical abilities to combat the shadows",
        action: () => {
          actions.affectWorldState("magicalBalance", 25);
          actions.changeScene("magical_combat");
        },
        condition: () => gameState.collections.magicalAbilities.length > 0
      },
      {
        text: "Focus on reaching the dragon before it's too late",
        action: () => {
          actions.changeScene("urgent_approach");
        }
      }
    ],
    consequences: {
      worldState: { realmPeace: -10, magicalBalance: -5 }
    }
  },

  master_ending_choices: {
    title: "The Moment of Ultimate Choice",
    description: "You stand before the Golden Orb with the dragon Auraxes, but the realm faces its darkest hour. The Orb contains enough power to save everyone, but how you choose to use it will determine not just your fate, but the fate of all reality.",
    choices: [
      {
        text: "Use the Orb to become a cosmic guardian of all realms",
        action: () => {
          actions.addAchievement("Cosmic Guardian");
          actions.changeScene("cosmic_guardian_ending");
        },
        condition: () => gameState.level >= 5 && gameState.stats.skills.mysticism > 30
      },
      {
        text: "Split the Orb's power among all worthy beings",
        action: () => {
          actions.addAchievement("Power Sharer");
          actions.changeScene("democratic_power_ending");
        },
        condition: () => gameState.stats.relationships.auraxes > 80
      },
      {
        text: "Transform the Orb into a source of learning for all",
        action: () => {
          actions.addAchievement("Eternal Teacher");
          actions.changeScene("universal_school_ending");
        },
        condition: () => gameState.stats.skills.wisdom > 40
      },
      {
        text: "Use the Orb to heal the fundamental wounds of reality",
        action: () => {
          actions.addAchievement("Reality Healer");
          actions.changeScene("reality_healing_ending");
        },
        condition: () => gameState.stats.skills.compassion > 40
      },
      {
        text: "Refuse the Orb and find another way",
        action: () => {
          actions.addAchievement("The Third Path");
          actions.changeScene("alternative_solution_ending");
        }
      }
    ]
  }
});

export const createNewGamePlusScenes = (
  gameState: GameState, 
  actions: GameActions
): Record<string, Scene> => ({
  new_game_plus_start: {
    title: "The Cycle Begins Anew",
    description: `Welcome back, legendary hero. Your previous journey (Achievement Count: ${gameState.meta.permanentAchievements.length}) has unlocked new possibilities. The realm remembers your deeds, and you carry forward the wisdom of your past incarnations.`,
    choices: [
      {
        text: "Begin with memories of your past life intact",
        action: () => {
          actions.improveSkill("wisdom", 20);
          actions.changeScene("memory_intact_start");
        },
        condition: () => gameState.meta.newGamePlusLevel > 0
      },
      {
        text: "Start in a different part of the realm",
        action: () => actions.changeScene("alternate_start_location"),
        condition: () => gameState.meta.unlockedStartingPaths.length > 0
      },
      {
        text: "Begin with a companion from your previous journey",
        action: () => actions.changeScene("companion_start"),
        condition: () => gameState.meta.permanentAchievements.includes("Eternal Bonds")
      },
      {
        text: "Start the classic journey with enhanced awareness",
        action: () => {
          actions.gainExperience(100);
          actions.changeScene("start");
        }
      }
    ]
  }
});

export const createAllScenes = (
  gameState: GameState, 
  actions: GameActions
): Record<string, Scene> => ({
  ...createAdvancedScenes(gameState, actions),
  ...createNewGamePlusScenes(gameState, actions)
});
