// src/scenes/advancedExpansion.ts
import { Scene, GameState, GameActions } from "../types/game";
import { EnhancedGameState, EnhancedGameActions } from "../types/enhancedGame";

export const createAdvancedExpansion = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  philosopher_encounter: {
    title: "The Wandering Philosopher",
    description: "You encounter a mysterious figure sitting by the path, apparently deep in thought. As you approach, they look up with eyes that seem to hold the weight of countless contemplations. 'Ah, another seeker,' they say. 'Tell me, what do you believe is the nature of true power?'",
    choices: [
      {
        text: "Power is the ability to change the world",
        action: () => {
          actions.addScore(50);
          actions.changeScene("power_as_change");
        }
      },
      {
        text: "True power is understanding and wisdom",
        action: () => {
          actions.addScore(75);
          actions.changeScene("power_as_wisdom");
        }
      },
      {
        text: "Power is the capacity to help others",
        action: () => {
          actions.addScore(100);
          actions.changeScene("power_as_service");
        }
      },
      {
        text: "Power is an illusion - only connection matters",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Deep Thinker");
          actions.changeScene("power_as_illusion");
        }
      }
    ]
  },

  power_as_illusion: {
    title: "Beyond the Veil of Power",
    description: "The philosopher's eyes light up with delight. 'Fascinating! You see beyond the surface. If power is indeed an illusion, then what we call the Golden Orb might be something entirely different than what seekers imagine. Perhaps it's not an object to be possessed, but a state of being to be realized.'\n\nThis conversation has given you a completely new perspective on your quest.",
    choices: [
      {
        text: "Ask about the nature of the Golden Orb",
        action: () => {
          actions.addScore(100);
          actions.changeScene("orb_philosophy");
        }
      },
      {
        text: "Inquire about the dragon's role in this illusion",
        action: () => actions.changeScene("dragon_philosophy")
      },
      {
        text: "Continue your journey with this new understanding",
        action: () => {
          actions.addToInventory("Philosophical Insight");
          actions.changeScene("enlightened_path");
        }
      }
    ]
  },

  dream_realm_entry: {
    title: "Entering the Realm of Dreams",
    description: "As you sleep in the enchanted forest, your consciousness slips into the Dream Realm - a place where thoughts become reality and the impossible becomes mundane. Here, the boundaries between seekers, dragons, and orbs blur into something far more complex.",
    choices: [
      {
        text: "Explore your own subconscious desires",
        action: () => actions.changeScene("subconscious_exploration")
      },
      {
        text: "Seek out other dreamers in this realm",
        action: () => actions.changeScene("dream_community")
      },
      {
        text: "Look for Auraxes in her dreams",
        action: () => {
          actions.addScore(100);
          actions.changeScene("dragon_dreamscape");
        },
        condition: () => gameState.achievements.includes("Dragon's Heart")
      },
      {
        text: "Try to wake up before getting lost",
        action: () => actions.changeScene("dream_escape")
      }
    ]
  },

  dragon_dreamscape: {
    title: "The Dragon's Dream",
    description: "You find yourself in Auraxes's dreamscape - a vast library that extends infinitely in all directions, filled with students of every species imaginable. Here, she is not alone but surrounded by eager learners. You realize this is her heart's deepest desire: to teach again, to share knowledge freely, to see the joy of discovery in young eyes.",
    choices: [
      {
        text: "Approach her as a student in the dream",
        action: () => {
          actions.addScore(150);
          actions.changeScene("dream_student");
        }
      },
      {
        text: "Show her this dream can become reality",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Dream Weaver");
          actions.changeScene("dream_manifestation");
        }
      },
      {
        text: "Learn from the dream students",
        action: () => actions.changeScene("dream_lessons")
      }
    ]
  },

  reality_fracture: {
    title: "A Crack in Reality",
    description: "You discover a place where reality itself has fractured, revealing the underlying mechanics of existence. Through the crack, you can see the 'code' of reality - the fundamental rules that govern magic, matter, and consciousness. This forbidden knowledge could grant incredible power, but might also shatter your sanity.",
    choices: [
      {
        text: "Study the code of reality carefully",
        action: () => {
          actions.addScore(200);
          actions.changeScene("reality_code_study");
        },
        skillCheck: { type: 'wisdom', difficulty: 15 }
      },
      {
        text: "Try to repair the fracture",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Reality Mender");
          actions.changeScene("fracture_repair");
        }
      },
      {
        text: "Use the fracture to glimpse other realities",
        action: () => actions.changeScene("alternate_realities")
      },
      {
        text: "Back away from dangerous knowledge",
        action: () => {
          actions.addScore(100);
          actions.changeScene("wise_retreat");
        }
      }
    ]
  },

  mirror_trial: {
    title: "The Hall of Truth Mirrors",
    description: "You enter a chamber filled with mirrors that don't reflect your appearance, but your truth. Each mirror shows a different aspect of who you are - your fears, desires, potential futures, and past regrets. To proceed, you must accept all aspects of yourself.",
    choices: [
      {
        text: "Face the mirror of your deepest fears",
        action: () => {
          actions.addScore(100);
          actions.changeScene("fear_confrontation");
        }
      },
      {
        text: "Look into the mirror of lost opportunities",
        action: () => {
          actions.addScore(100);
          actions.changeScene("regret_acceptance");
        }
      },
      {
        text: "Gaze upon your highest potential",
        action: () => {
          actions.addScore(100);
          actions.changeScene("potential_vision");
        }
      },
      {
        text: "Stand before all mirrors simultaneously",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Complete Self Acceptance");
          actions.changeScene("total_integration");
        },
        skillCheck: { type: 'courage', difficulty: 10 }
      }
    ]
  },

  narrative_awareness: {
    title: "The Story Becomes Aware",
    description: "Something strange happens - the very narrative of your adventure seems to become self-aware. Words on ancient walls begin addressing you directly, speaking of how every hero's journey follows patterns, and how you might be trapped in a story that's been told a thousand times before. But perhaps awareness is the first step to true freedom.",
    choices: [
      {
        text: "Embrace your role in the greater narrative",
        action: () => {
          actions.addScore(150);
          actions.changeScene("narrative_acceptance");
        }
      },
      {
        text: "Try to break free from narrative constraints",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Story Breaker");
          actions.changeScene("narrative_rebellion");
        }
      },
      {
        text: "Engage in dialogue with the story itself",
        action: () => {
          actions.addScore(250);
          actions.changeScene("meta_conversation");
        }
      },
      {
        text: "Write your own ending",
        action: () => actions.changeScene("author_mode")
      }
    ]
  },

  refugee_camp: {
    title: "The Displaced People",
    description: "You come across a camp of refugees - people displaced by the growing darkness in the realm. They eye you with a mixture of hope and suspicion. Your choices here will affect not just individuals, but the fate of entire communities.",
    choices: [
      {
        text: "Share your provisions and healing items",
        action: () => {
          actions.removeFromInventory("Healing Potion");
          actions.addScore(150);
          actions.addAchievement("Humanitarian");
          actions.changeScene("grateful_refugees");
        },
        condition: () => gameState.hasPotion
      },
      {
        text: "Teach them defensive magic",
        action: () => {
          actions.addScore(200);
          actions.changeScene("magical_teaching");
        },
        condition: () => gameState.inventory.includes("Elemental Affinity")
      },
      {
        text: "Promise to address the root cause of their displacement",
        action: () => {
          actions.addScore(100);
          actions.changeScene("promise_made");
        }
      },
      {
        text: "Listen to their stories and learn",
        action: () => {
          actions.addScore(75);
          actions.changeScene("refugee_stories");
        }
      }
    ]
  },

  elemental_convergence: {
    title: "Where Elements Collide",
    description: "You discover a rare phenomenon - a point where all four elements converge and clash. Fire and water create steam that crystallizes into earth, while air whips everything into a magical maelstrom. This chaos could be harnessed, but it's extremely dangerous.",
    choices: [
      {
        text: "Attempt to harmonize the elements",
        action: () => {
          actions.addScore(250);
          actions.changeScene("elemental_harmony");
        },
        skillCheck: { type: 'wisdom', difficulty: 12 }
      },
      {
        text: "Extract power from the chaos",
        action: () => actions.changeScene("chaos_harvest"),
        skillCheck: { type: 'courage', difficulty: 10 }
      },
      {
        text: "Study the phenomenon from a safe distance",
        action: () => {
          actions.addScore(100);
          actions.changeScene("safe_observation");
        }
      },
      {
        text: "Use the chaos to forge a magical item",
        action: () => actions.changeScene("chaos_forging"),
        condition: () => gameState.inventory.length > 3
      }
    ]
  },

  dragon_past_revealed: {
    title: "Auraxes's Secret History",
    description: "Through various clues and conversations, you've uncovered the truth about Auraxes. She wasn't always a guardian - she was once the youngest and most beloved teacher at the Great Academy. When war destroyed the academy and killed her students, she retreated here with the remaining knowledge, vowing to protect it until the world proved ready to learn without destroying.",
    choices: [
      {
        text: "Share your understanding of her pain",
        action: () => {
          actions.addScore(300);
          actions.changeScene("empathetic_understanding");
        }
      },
      {
        text: "Promise to help rebuild what was lost",
        action: () => {
          actions.addScore(250);
          actions.changeScene("rebuilding_promise");
        }
      },
      {
        text: "Ask her to tell you about her students",
        action: () => {
          actions.addScore(200);
          actions.changeScene("student_memories");
        }
      },
      {
        text: "Suggest the world might be ready now",
        action: () => actions.changeScene("readiness_discussion")
      }
    ]
  },

  ending_philosopher: {
    title: "The Philosopher's Victory",
    description: `Your journey has led you to a profound realization - the Golden Orb was never a physical object, but a state of understanding. You've achieved this enlightenment through your choices, compassion, and wisdom. Auraxes smiles with deep satisfaction as she recognizes a kindred spirit who understands that true treasure cannot be possessed, only shared.

    You establish a new school of philosophy that teaches the unity of thought and action, spreading wisdom not through force but through example and dialogue.

    Final Score: ${gameState.score}
    Achievements: ${gameState.achievements.join(", ")}

    "The greatest treasure is the understanding that there is no treasure to seek, only wisdom to share."`,
    choices: [
      {
        text: "Begin teaching the philosophy of unity",
        action: actions.restartGame
      }
    ]
  },

  ending_network: {
    title: "The Web of Connection",
    description: `Your greatest achievement wasn't claiming the Orb, but connecting all the disparate beings you met - dragon to hermit, unicorn to human, scholar to warrior. You've woven a web of relationships that makes the whole realm stronger.

    The Golden Orb reveals itself to be not one artifact but a network of connections between all thinking beings. You become the heart of this network, facilitating communication and understanding across all boundaries.

    Final Score: ${gameState.score}
    Achievements: ${gameState.achievements.join(", ")}

    "When all beings are connected in understanding, the Golden Orb manifests not as object but as relationship."`,
    choices: [
      {
        text: "Nurture the growing network",
        action: actions.restartGame
      }
    ]
  },

  ending_transcendent: {
    title: "Beyond All Boundaries",
    description: `Your journey has taken you beyond the physical, beyond the mental, into a realm of pure being. The Golden Orb dissolves into light as you realize it was always a test - not of worthiness to possess, but readiness to transcend possession itself.

    You and Auraxes, along with all who are ready, step into a new form of existence where teacher and student, dragon and human, are merely chosen forms rather than fixed identities.

    Final Score: ${gameState.score}
    Achievements: ${gameState.achievements.join(", ")}

    "The ultimate treasure is the freedom from the need for treasure."`,
    choices: [
      {
        text: "Embrace transcendence",
        action: actions.restartGame
      }
    ]
  },

  save_point_discovery: {
    title: "The Temporal Anchor",
    description: "You discover an ancient artifact that seems to exist outside normal time - a Save Point. This crystalline structure allows you to preserve this moment perfectly, creating a temporal anchor you can return to if your future choices lead to disaster. But power over time always comes with consequences.",
    choices: [
      {
        text: "Create a temporal anchor here",
        action: () => {
          if (actions.saveGame) {
            actions.saveGame("Temporal Anchor");
          }
          actions.addScore(100);
          actions.addAchievement("Time Keeper");
          actions.changeScene("anchor_created");
        }
      },
      {
        text: "Study how the artifact works",
        action: () => {
          actions.addScore(75);
          actions.changeScene("temporal_study");
        }
      },
      {
        text: "Leave it alone - time should flow naturally",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Natural Flow");
          actions.changeScene("time_respect");
        }
      }
    ]
  },

  achievement_hall: {
    title: "The Hall of Legends",
    description: `You discover a mystical hall where the deeds of all heroes are recorded. Your own achievements glow on the walls:

${gameState.achievements.map(a => `✦ ${a}`).join('\n')}

But you notice empty spaces - achievements yet to be earned, paths yet to be walked. The hall seems to whisper of possibilities beyond your current understanding.`,
    choices: [
      {
        text: "Study the unearned achievements",
        action: () => actions.changeScene("future_achievements")
      },
      {
        text: "Add your own inscription",
        action: () => {
          actions.addScore(50);
          actions.changeScene("personal_inscription");
        }
      },
      {
        text: "Look for patterns in heroic journeys",
        action: () => {
          actions.addScore(100);
          actions.changeScene("pattern_recognition");
        }
      },
      {
        text: "Continue your unique path",
        action: () => actions.changeScene("forest_path")
      }
    ]
  }
});

export const createGameSystems = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  weather_system_storm: {
    title: "The Approaching Storm",
    description: "Dark clouds gather overhead as a magical storm approaches. Lightning crackles with arcane energy, and the rain seems to whisper secrets. This weather will affect your journey in various ways.",
    choices: [
      {
        text: "Seek shelter and wait it out",
        action: () => {
          actions.heal(10);
          actions.changeScene("storm_shelter");
        }
      },
      {
        text: "Use the storm's energy to empower your magic",
        action: () => {
          actions.addScore(100);
          actions.changeScene("storm_channeling");
        },
        condition: () => gameState.inventory.some(item => item.includes("Magic"))
      },
      {
        text: "Dance in the rain and embrace the chaos",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Storm Dancer");
          actions.changeScene("rain_dancing");
        }
      },
      {
        text: "Press on despite the weather",
        action: () => {
          actions.takeDamage(10);
          actions.addScore(50);
          actions.changeScene("determined_journey");
        }
      }
    ]
  },

  reputation_check: {
    title: "Your Reputation Precedes You",
    description: `Word of your deeds has spread throughout the realm. As you enter a new area, people recognize you as:
    
${gameState.achievements.includes("Humanitarian") ? "• The Compassionate Helper\n" : ""}${gameState.achievements.includes("Dragon's Heart") ? "• Friend of Dragons\n" : ""}${gameState.achievements.includes("Wisdom Incarnate") ? "• The Wise Seeker\n" : ""}${gameState.achievements.length > 5 ? "• A Legendary Hero\n" : "• An Emerging Adventurer\n"}

This reputation opens new paths and closes others.`,
    choices: [
      {
        text: "Use your reputation to gather information",
        action: () => {
          actions.addScore(50);
          actions.changeScene("reputation_leverage");
        }
      },
      {
        text: "Try to travel incognito",
        action: () => actions.changeScene("disguised_travel")
      },
      {
        text: "Embrace your fame and inspire others",
        action: () => {
          actions.addScore(100);
          actions.changeScene("inspirational_presence");
        },
        condition: () => gameState.achievements.length > 3
      },
      {
        text: "Continue without acknowledging the attention",
        action: () => actions.changeScene("humble_continuation")
      }
    ]
  },

  moral_ambiguity: {
    title: "No Clear Answer",
    description: "You face a situation with no clearly right choice. A village needs medicine that's stored in the dragon's temple, but taking it without permission would be theft. The dragon might share it if asked, but the journey to ask would take precious time as people suffer.",
    choices: [
      {
        text: "Take the medicine now, explain later",
        action: () => {
          actions.addScore(100);
          actions.changeScene("justified_theft");
        }
      },
      {
        text: "Rush to ask the dragon's permission",
        action: () => {
          actions.addScore(100);
          actions.changeScene("honorable_haste");
        }
      },
      {
        text: "Seek an alternative solution",
        action: () => {
          actions.addScore(150);
          actions.changeScene("creative_alternative");
        },
        skillCheck: { type: 'wisdom', difficulty: 8 }
      },
      {
        text: "Let events unfold without interference",
        action: () => {
          actions.addScore(50);
          actions.changeScene("non_intervention");
        }
      }
    ]
  }
});
