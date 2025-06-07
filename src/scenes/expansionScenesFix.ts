// src/scenes/expansionScenesFix.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createExpansionScenesFix = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  forest_research: {
    title: "Delving into Ancient Texts",
    description: "You spend time cross-referencing your maps and texts about the Enchanted Forest. Your research reveals that this forest was once home to a great alliance between dragons and scholars. The temple you seek was originally a center of learning, not a treasure vault.\n\nThis knowledge changes your entire perspective on the quest ahead.",
    choices: [
      {
        text: "Approach the quest as a scholarly endeavor",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("True Scholar");
          actions.changeScene("scholarly_approach");
        }
      },
      {
        text: "Share this knowledge with the hermit",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Enter the forest with new understanding",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  scholarly_approach: {
    title: "The Path of Knowledge",
    description: "You decide to approach this entire quest as a scholarly expedition rather than a treasure hunt. Your goal shifts from claiming the Golden Orb to understanding its true nature and the history of dragon-human cooperation.\n\nThis philosophical shift seems to resonate with the very forest around you.",
    choices: [
      {
        text: "Document everything you encounter",
        action: () => {
          actions.addToInventory("Research Notes");
          actions.changeScene("documentation_begin");
        }
      },
      {
        text: "Seek out sources of ancient knowledge",
        action: () => actions.changeScene("knowledge_seeking")
      },
      {
        text: "Approach the hermit as a fellow scholar",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

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

  magical_documentation: {
    title: "Documenting the Mystical",
    description: "You focus your scholarly efforts on cataloging the magical phenomena you encounter. Each spell, enchantment, and mystical creature is carefully recorded with detailed observations about their nature and behavior.",
    choices: [
      {
        text: "Study the ambient magic of the forest",
        action: () => {
          actions.addScore(50);
          actions.addToInventory("Magical Field Notes");
          actions.changeScene("ambient_magic_study");
        }
      },
      {
        text: "Document magical creature behaviors",
        action: () => {
          actions.addScore(50);
          actions.changeScene("creature_documentation");
        }
      },
      {
        text: "Continue your journey with enhanced understanding",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  cultural_documentation: {
    title: "Recording Cultural Heritage",
    description: "You dedicate yourself to preserving the cultural practices and traditions of the various beings you encounter. This anthropological approach reveals deep connections between different species and their shared history.",
    choices: [
      {
        text: "Interview forest inhabitants about their traditions",
        action: () => {
          actions.addScore(75);
          actions.changeScene("cultural_interviews");
        }
      },
      {
        text: "Study ancient symbols and their meanings",
        action: () => {
          actions.addScore(50);
          actions.changeScene("symbol_studies");
        }
      },
      {
        text: "Continue with your newfound cultural insights",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  psychological_study: {
    title: "The Mind's Mysteries",
    description: "You apply psychological analysis to understand the motivations and behaviors of those you meet. This approach helps you see beyond surface appearances to the deeper truths that drive actions.",
    choices: [
      {
        text: "Analyze the dragon's centuries of isolation",
        action: () => {
          actions.addScore(100);
          actions.changeScene("dragon_psychology");
        }
      },
      {
        text: "Study the hermit's choice of solitude",
        action: () => {
          actions.addScore(75);
          actions.changeScene("hermit_psychology");
        }
      },
      {
        text: "Continue with psychological insights",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  cartographic_work: {
    title: "Mapping the Unmappable",
    description: "You begin creating detailed maps of the mystical forest, noting how paths seem to shift and change. Your cartographic work reveals patterns in the seemingly chaotic magical landscape.",
    choices: [
      {
        text: "Map the stable paths and landmarks",
        action: () => {
          actions.addToInventory("Mystical Forest Map");
          actions.addScore(75);
          actions.changeScene("stable_mapping");
        }
      },
      {
        text: "Chart the magical fluctuations",
        action: () => {
          actions.addScore(100);
          actions.changeScene("magical_cartography");
        }
      },
      {
        text: "Use your maps to find a better route",
        action: () => actions.changeScene("optimized_path")
      }
    ]
  },

  political_considerations: {
    title: "The Game of Thrones",
    description: "You consider how possession of the Golden Orb might shift the balance of power between kingdoms. Used wisely, it could bring peace and prosperity. Used poorly, it could spark wars and conquest. Your diplomatic training helps you see all the angles of this complex situation.",
    choices: [
      {
        text: "Plan to use the Orb to unite the kingdoms",
        action: () => {
          actions.addScore(50);
          actions.changeScene("unity_planning");
        }
      },
      {
        text: "Consider keeping the Orb's power neutral",
        action: () => actions.changeScene("neutrality_planning")
      },
      {
        text: "Focus on the quest itself for now",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  unity_planning: {
    title: "A Vision of Unity",
    description: "You envision using the Golden Orb's power to create lasting peace between the warring kingdoms. Treaties could be enforced, resources shared fairly, and conflicts resolved through wisdom rather than warfare.\n\nThis noble goal strengthens your resolve to succeed in your quest.",
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

  neutrality_planning: {
    title: "The Neutral Path",
    description: "You decide that the Golden Orb's power should remain neutral, perhaps hidden or protected by an impartial guardian. This would prevent any one kingdom from gaining too much power and disrupting the balance.",
    choices: [
      {
        text: "Commit to this neutral approach",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Neutral Guardian");
          actions.changeScene("neutral_commitment");
        }
      },
      {
        text: "Consider who could be trusted as guardian",
        action: () => actions.changeScene("guardian_considerations")
      },
      {
        text: "Begin your quest with this plan",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  noble_vow: {
    title: "A Sacred Promise",
    description: "You make a solemn vow that any power or knowledge gained from this quest will be used for the benefit of all people, not just the nobility. This promise feels like a sacred oath, binding you to a higher purpose than mere adventure.\n\nThe weight of responsibility settles on your shoulders, but it feels right.",
    choices: [
      {
        text: "Begin your quest with noble purpose",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Seek the hermit's wisdom on fulfilling such vows",
        action: () => actions.changeScene("cottage")
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
  }
});

export const createAdditionalEnhancedScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  collect_ancient_memory: {
    title: "Echo of the Past",
    description: "You discover a memory crystal containing the preserved thoughts of an ancient scholar. As you touch it, visions of the past flood your mind, revealing secrets about the true nature of the Golden Orb.",
    choices: [
      {
        text: "Absorb the complete memory",
        action: () => {
          if (gameState.memoriesUnlocked) {
            gameState.memoriesUnlocked.push("The Scholar's Last Testament");
          }
          actions.addScore(100);
          actions.changeScene("memory_absorbed");
        }
      },
      {
        text: "Share the memory with your companions",
        action: () => {
          actions.addScore(75);
          actions.changeScene("memory_shared");
        },
        condition: () => gameState.inventory.some(item => item.includes("Companion"))
      },
      {
        text: "Preserve the crystal for later study",
        action: () => {
          actions.addToInventory("Memory Crystal");
          actions.changeScene("crystal_preserved");
        }
      }
    ]
  },

  discover_hidden_lore: {
    title: "The Forbidden Archive",
    description: "Behind a secret panel, you find texts that were meant to be destroyed - they contain knowledge deemed too dangerous for common use. The information here could change everything you know about dragons, magic, and the nature of reality itself.",
    choices: [
      {
        text: "Read the forbidden knowledge",
        action: () => {
          if (gameState.loreCollected) {
            gameState.loreCollected.push("The Forbidden Truths");
          }
          actions.addScore(150);
          actions.addAchievement("Seeker of Forbidden Knowledge");
          actions.changeScene("forbidden_knowledge_gained");
        }
      },
      {
        text: "Seal the archive to protect others",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Guardian of Dangerous Secrets");
          actions.changeScene("archive_sealed");
        }
      },
      {
        text: "Take only what seems safe to know",
        action: () => {
          if (gameState.loreCollected) {
            gameState.loreCollected.push("Selected Safe Passages");
          }
          actions.addScore(75);
          actions.changeScene("partial_knowledge");
        }
      }
    ]
  },

  uncover_ultimate_secret: {
    title: "The Ultimate Revelation",
    description: "All your collected knowledge, memories, and experiences suddenly align to reveal an ultimate truth - the Golden Orb is not an object but a state of being, achievable only through the complete integration of wisdom, compassion, and courage.",
    choices: [
      {
        text: "Embrace the transformation into living wisdom",
        action: () => {
          if (gameState.secretsDiscovered) {
            gameState.secretsDiscovered.push("The Golden Orb's True Nature");
          }
          actions.addScore(500);
          actions.addAchievement("Embodiment of the Orb");
          actions.changeScene("transformation_into_orb");
        }
      },
      {
        text: "Share this revelation with Auraxes",
        action: () => {
          actions.addScore(300);
          actions.changeScene("revelation_shared_dragon");
        }
      },
      {
        text: "Keep the secret to prevent its misuse",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Ultimate Secret Keeper");
          actions.changeScene("secret_protected");
        }
      }
    ]
  }
});

export default createExpansionScenesFix;
