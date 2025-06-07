// src/scenes/additionalMissingScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createAdditionalMissingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
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

  survival_advantage: {
    title: "Reading the Wild",
    description: "Your trained eye spots signs that others would miss - broken twigs indicating recent passage, unusual plant growth suggesting magical influence, and animal behaviors that hint at hidden dangers or opportunities.\n\nYou quickly identify several safe paths through the forest that avoid the most dangerous areas.",
    choices: [
      {
        text: "Take the path of least resistance",
        action: () => {
          actions.addScore(50);
          actions.changeScene("safe_path");
        }
      },
      {
        text: "Follow the signs of magical creatures",
        action: () => actions.changeScene("magical_tracking")
      },
      {
        text: "Choose the most direct route despite dangers",
        action: () => actions.changeScene("dangerous_shortcut")
      }
    ]
  },

  instinct_guidance: {
    title: "The Wanderer's Intuition",
    description: "Your instincts, honed by years of travel, tell you this forest is unlike any you've encountered. There's an intelligence here, a watchfulness. You sense that the forest itself is testing visitors, and that approaching with respect rather than conquest is key.",
    choices: [
      {
        text: "Move through the forest with reverence",
        action: () => {
          actions.addScore(75);
          actions.changeScene("respectful_journey");
        }
      },
      {
        text: "Try to communicate with the forest spirit",
        action: () => actions.changeScene("forest_communication")
      },
      {
        text: "Proceed cautiously but purposefully",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  respectful_journey: {
    title: "Walking with Grace",
    description: "You move through the forest with deep respect, careful not to disturb the natural harmony. The forest seems to recognize your reverence - paths open before you, dangerous creatures give you wide berth, and you occasionally glimpse helpful spirits watching from the shadows.",
    choices: [
      {
        text: "Thank the forest for its hospitality",
        action: () => {
          actions.addScore(50);
          actions.addAchievement("Forest Friend");
          actions.changeScene("forest_gratitude");
        }
      },
      {
        text: "Continue to the temple with the forest's blessing",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Stop to help a wounded forest creature",
        action: () => actions.changeScene("creature_aid")
      }
    ]
  },

  forest_communication: {
    title: "Speaking to the Trees",
    description: "You attempt to communicate with the forest consciousness itself, using a combination of respectful words, gestures, and opening your mind to non-verbal communication. To your amazement, you feel a response - ancient, vast, and surprisingly warm.",
    choices: [
      {
        text: "Ask the forest about the dragon",
        action: () => {
          actions.addScore(100);
          actions.changeScene("forest_dragon_knowledge");
        }
      },
      {
        text: "Request safe passage to the temple",
        action: () => {
          actions.addScore(75);
          actions.changeScene("forest_guided_path");
        }
      },
      {
        text: "Offer to help the forest in return",
        action: () => {
          actions.addAchievement("Forest Ally");
          actions.changeScene("forest_bargain");
        }
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

  merchant_alliance: {
    title: "The Merchant's Bargain",
    description: "The Merchant Guild leaders listen to your proposal with calculating eyes. They're interested in the stability that unity would bring, but they want guarantees that trade routes will remain open and profitable.",
    choices: [
      {
        text: "Promise protected trade routes",
        action: () => {
          actions.addScore(75);
          actions.changeScene("trade_agreement");
        }
      },
      {
        text: "Offer them a voice in the new order",
        action: () => {
          actions.addScore(100);
          actions.changeScene("merchant_council_seat");
        }
      },
      {
        text: "Appeal to their long-term interests",
        action: () => {
          actions.addScore(50);
          actions.changeScene("economic_argument");
        }
      }
    ]
  },

  mage_alliance: {
    title: "The Circle's Deliberation",
    description: "The Circle of Mages debates your proposal with a mixture of excitement and caution. They see the potential for sharing magical knowledge, but fear the loss of their privileged position and the dangers of uncontrolled magic use.",
    choices: [
      {
        text: "Propose a magical education system",
        action: () => {
          actions.addScore(100);
          actions.changeScene("magical_education_proposal");
        }
      },
      {
        text: "Guarantee their role as advisors",
        action: () => {
          actions.addScore(75);
          actions.changeScene("mage_advisory_role");
        }
      },
      {
        text: "Warn of the dangers of remaining divided",
        action: () => {
          actions.addScore(50);
          actions.changeScene("division_warning");
        }
      }
    ]
  },

  common_alliance: {
    title: "The People's Voice",
    description: "The common folk gather in the town square to hear your words. They're tired of being pawns in the games of the powerful and are eager for change, but they've been disappointed before.",
    choices: [
      {
        text: "Promise them a voice in governance",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("People's Champion");
          actions.changeScene("democratic_promise");
        }
      },
      {
        text: "Vow to protect them from exploitation",
        action: () => {
          actions.addScore(75);
          actions.changeScene("protection_vow");
        }
      },
      {
        text: "Inspire them with a vision of the future",
        action: () => {
          actions.addScore(50);
          actions.changeScene("inspirational_speech");
        }
      }
    ]
  },

  tribal_alliance: {
    title: "The Forest Council",
    description: "The Forest Tribes meet you in a sacred grove. They're wary of outsiders and protective of their ancient ways, but they recognize that the changing world threatens their traditional life.",
    choices: [
      {
        text: "Promise to protect their sacred lands",
        action: () => {
          actions.addScore(100);
          actions.changeScene("sacred_land_protection");
        }
      },
      {
        text: "Offer to learn from their wisdom",
        action: () => {
          actions.addScore(75);
          actions.changeScene("wisdom_exchange");
        }
      },
      {
        text: "Propose a partnership of equals",
        action: () => {
          actions.addScore(50);
          actions.changeScene("equal_partnership");
        }
      }
    ]
  },

  hidden_library_quest: {
    title: "Seeking the Hidden Library",
    description: "Your search for the Hidden Library of the First Mages leads you through ancient clues and forgotten paths. The library is said to contain the original texts on magic itself, written when the world was young.",
    choices: [
      {
        text: "Follow the constellation map",
        action: () => {
          actions.addScore(75);
          actions.changeScene("constellation_path");
        }
      },
      {
        text: "Decipher the runic directions",
        action: () => {
          actions.addScore(75);
          actions.changeScene("runic_path");
        }
      },
      {
        text: "Seek a guide who knows the way",
        action: () => {
          actions.addScore(50);
          actions.changeScene("library_guide_search");
        }
      }
    ]
  },

  memory_caves_quest: {
    title: "The Crystal Caves of Memory",
    description: "The Crystal Caves are said to preserve memories in crystalline form. Here, the thoughts and experiences of countless beings are stored, waiting to be accessed by those who know how.",
    choices: [
      {
        text: "Enter the caves with caution",
        action: () => {
          actions.addScore(75);
          actions.changeScene("cave_entrance");
        }
      },
      {
        text: "Study the cave's defenses first",
        action: () => {
          actions.addScore(50);
          actions.changeScene("cave_study");
        }
      },
      {
        text: "Search for another time",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  oracle_quest: {
    title: "Journey to the Oracle",
    description: "The Oracle of the Northern Peaks is said to see all possible futures. The journey to reach her is treacherous, but her wisdom could be invaluable to your quest.",
    choices: [
      {
        text: "Begin the mountain ascent",
        action: () => {
          actions.addScore(75);
          actions.changeScene("mountain_climb");
        }
      },
      {
        text: "Prepare for the harsh journey",
        action: () => {
          actions.addScore(50);
          actions.changeScene("mountain_preparation");
        }
      },
      {
        text: "Seek the Oracle another time",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

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
  }
});

export default createAdditionalMissingScenes;
