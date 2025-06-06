// src/scenes/sceneManager.ts
import { Scene, GameState, GameActions } from "../types/game";
import { createStartingScenes } from "./startingScenes";
import { createCottageScenes } from "./cottageScenes";
import { createForestScenes } from "./forestScenes";
import { createRiverScenes } from "./riverScenes";
import { createTempleScenes } from "./templeScenes";
import { createDragonScenes } from "./dragonScenes";
import { createEndingScenes } from "./endingScenes";
import { createAdditionalScenes } from "./additionalScenes";
import { createForestScenesPart2 } from "./forestScenesPart2";
import { createExpansionScenes, createUtilityScenes } from "./expansionScenes";
import { createExpansionScenesFix } from "./expansionScenesFix";
import { createConnectorScenes } from "./connectorScenes";
import { createBridgeScenes } from "./bridgeScenes";
import { createMissingScenes } from "./missingScenes";
import { createMissingScenesFix } from "./missingScenesFix";
import { createGameExpansion } from "./gameExpansion";

export const getAllScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => {
  const allScenes = {
    ...createStartingScenes(gameState, actions),
    ...createCottageScenes(gameState, actions),
    ...createForestScenes(gameState, actions),
    ...createForestScenesPart2(gameState, actions),
    ...createRiverScenes(gameState, actions),
    ...createTempleScenes(gameState, actions),
    ...createDragonScenes(gameState, actions),
    ...createEndingScenes(gameState, actions),
    ...createAdditionalScenes(gameState, actions),
    ...createExpansionScenes(gameState, actions),
    ...createUtilityScenes(gameState, actions),
    ...createConnectorScenes(gameState, actions),
    ...createBridgeScenes(gameState, actions),
    ...createMissingScenes(gameState, actions),
    ...createMissingScenesFix(gameState, actions),
    ...createGameExpansion(gameState, actions),
    ...createAdditionalMissingScenes(gameState, actions),
    ...createEnhancedScenes(gameState, actions),
    ...createPlaceholderScenes(gameState, actions),
    ...createExpandedScenes(gameState, actions)
  };

  return allScenes;
};

const createAdditionalMissingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  dragon_insight: {
    title: "Understanding the Dragon's Heart",
    description: "The Crystal of Visions reveals the truth about Auraxes - centuries of loneliness, watching students come and go, seeing the world slowly forget the value of wisdom and learning. You witness her pain as wars erupted, libraries burned, and knowledge was abandoned for material pursuits.\n\nShe is not a monster hoarding treasure, but a heartbroken teacher who has been waiting for someone who truly values what she protects. Your heart fills with compassion for this ancient guardian of wisdom.",
    choices: [
      {
        text: "Approach the dragon with deep empathy",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Dragon's Heart");
          actions.changeScene("empathetic_approach");
        }
      },
      {
        text: "Offer to be her student and companion",
        action: () => actions.changeScene("companion_offer")
      },
      {
        text: "Promise to help end her solitude",
        action: () => actions.changeScene("solitude_promise")
      }
    ]
  },

  secret_knowledge: {
    title: "Hidden Paths Revealed",
    description: "The Crystal shows you secret passages through the temple that few have ever discovered. These paths were designed by ancient architects to test different virtues - one path tests courage, another wisdom, and a third tests compassion.\n\nMore importantly, you see that the dragon has been using these passages to observe visitors, studying their character before revealing herself. She has been hoping to find someone worthy of her trust.",
    choices: [
      {
        text: "Use the wisdom path to approach respectfully",
        action: () => {
          actions.addScore(75);
          actions.changeScene("wisdom_path");
        }
      },
      {
        text: "Take the compassion path to show your heart",
        action: () => {
          actions.addScore(75);
          actions.changeScene("compassion_path");
        }
      },
      {
        text: "Enter boldly through the main entrance",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  test_revelation: {
    title: "The True Test Unveiled",
    description: "The visions reveal the real nature of the test that awaits. It's not about solving riddles or demonstrating magical power - it's about a fundamental choice between self and others. The dragon will offer you exactly what you think you want, but the true test is whether you'll choose personal gain or the greater good.\n\nThis revelation fills you with both excitement and trepidation. You understand now that this quest will test the very core of who you are.",
    choices: [
      {
        text: "Prepare to choose wisdom over wealth",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wisdom_preparation");
        }
      },
      {
        text: "Enter the temple with confidence in your character",
        action: () => {
          actions.addScore(50);
          actions.changeScene("confident_entry");
        }
      },
      {
        text: "Meditate on the nature of true treasure",
        action: () => actions.changeScene("treasure_meditation")
      }
    ]
  },

  empathetic_approach: {
    title: "Meeting with Understanding",
    description: "You enter the dragon's hall not as a treasure hunter or warrior, but as someone who understands pain and loneliness. Auraxes immediately senses the change in your demeanor and regards you with surprise and cautious hope.\n\n'You look upon me not with fear or greed, but with... understanding?' she says softly. 'It has been so very long since anyone saw past my scales to the heart beneath.'",
    choices: [
      {
        text: "Express genuine sympathy for her isolation",
        action: () => {
          actions.addScore(100);
          actions.changeScene("sympathy_expressed");
        }
      },
      {
        text: "Offer to share stories of the outside world",
        action: () => actions.changeScene("world_sharing")
      },
      {
        text: "Ask about her hopes and dreams",
        action: () => actions.changeScene("dragon_dreams")
      }
    ]
  },

  wisdom_preparation: {
    title: "Strengthening Your Resolve",
    description: "Understanding the nature of the coming test, you spend time in quiet reflection, strengthening your commitment to wisdom and compassion over personal gain. You remind yourself of the hermit's kindness, the unicorn's wisdom, and all the lessons you've learned on this journey.\n\nYou feel ready to face whatever choice the dragon presents, confident in your values and determined to prove worthy of her trust.",
    choices: [
      {
        text: "Enter the temple with resolved heart",
        action: () => {
          actions.addScore(75);
          actions.changeScene("main_hall");
        }
      },
      {
        text: "Practice making selfless choices",
        action: () => actions.changeScene("selflessness_practice")
      }
    ]
  },

  ruins: {
    title: "Ancient Temple Grounds",
    description: "You emerge from the forest to find yourself at the base of a massive temple complex. Ancient stones rise before you like sleeping giants, covered in moss and glowing with faint magical energy. This is clearly the Temple of Trials, where the Golden Orb waits.\n\nThe structure is both magnificent and intimidating, with multiple entrances and pathways leading up to the main temple. You can sense powerful magic emanating from within.",
    choices: [
      {
        text: "Approach the main temple entrance",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Search for alternative entrances",
        action: () => actions.changeScene("ruins_exploration")
      },
      {
        text: "Study the ancient architecture",
        action: () => actions.changeScene("architecture_study")
      }
    ]
  }
});

const createEnhancedScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  treasure_meditation: {
    title: "Contemplating True Wealth",
    description: "You sit in quiet meditation, considering what treasure truly means. As you reflect on your journey, you realize that the greatest riches you've found so far aren't gold or jewels, but the wisdom from the hermit, the blessing of the unicorn, and the growing understanding of your own character.\n\nThis realization brings a sense of peace and clarity about what you truly seek from the dragon.",
    choices: [
      {
        text: "Enter the temple seeking wisdom, not gold",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("True Seeker");
          actions.changeScene("enlightened_approach");
        }
      },
      {
        text: "Understand that the journey itself is the treasure",
        action: () => {
          actions.addScore(75);
          actions.changeScene("journey_realization");
        }
      },
      {
        text: "Continue with clarity about your values",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  enlightened_approach: {
    title: "The Wisdom Seeker",
    description: "You approach the temple with complete clarity about your purpose. You're not here for material wealth, but for the wisdom and understanding that can help you grow as a person and serve others better. This shift in perspective seems to change the very air around you - the temple's magic responds to your pure intentions.",
    choices: [
      {
        text: "Enter with humble confidence",
        action: () => {
          actions.addScore(50);
          actions.changeScene("main_hall");
        }
      },
      {
        text: "Take a moment to prepare mentally for the test ahead",
        action: () => actions.changeScene("mental_preparation")
      }
    ]
  },

  mental_preparation: {
    title: "Preparing Mind and Spirit",
    description: "You spend time centering yourself, preparing for whatever test the dragon might present. You review the lessons you've learned, the relationships you've built, and the growth you've experienced. You feel ready to face any challenge with wisdom and compassion.",
    choices: [
      {
        text: "Enter the temple as a prepared seeker",
        action: () => {
          actions.heal(25);
          actions.addScore(50);
          actions.changeScene("main_hall");
        }
      }
    ]
  },

  sympathy_expressed: {
    title: "Shared Understanding",
    description: "Your genuine sympathy for the dragon's isolation touches something deep within Auraxes. Her ancient eyes glisten with emotion - when was the last time someone saw her pain rather than just her power? 'You understand,' she whispers. 'The weight of centuries, the loneliness of knowledge that none wish to share... Yes, you truly understand.'",
    choices: [
      {
        text: "Offer to learn from her and ease her solitude",
        action: () => {
          actions.addScore(150);
          actions.changeScene("companion_offering");
        }
      },
      {
        text: "Ask how you can help preserve her knowledge",
        action: () => actions.changeScene("knowledge_preservation")
      },
      {
        text: "Share your own experiences of loneliness",
        action: () => actions.changeScene("mutual_understanding")
      }
    ]
  }
});

const createPlaceholderScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  placeholder_scene: {
    title: "Continuing Your Journey",
    description: "Your adventure continues through paths unknown. The choices you've made have led you to new possibilities, and your character grows stronger with each decision. What lies ahead remains to be discovered.",
    choices: [
      {
        text: "Continue your quest",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Return to familiar ground",
        action: () => actions.changeScene("start")
      },
      {
        text: "Seek wisdom",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  journey_realization: {
    title: "The True Adventure",
    description: "You realize that the real treasure has been the journey itself - every choice that helped you grow, every creature that taught you something new, every moment that expanded your understanding of yourself and the world. This adventure has transformed you from a simple treasure seeker into someone with wisdom and purpose.",
    choices: [
      {
        text: "Embrace this transformation completely",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Transformed Hero");
          actions.changeScene("transformation_complete");
        }
      },
      {
        text: "Enter the temple as your new, wiser self",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  transformation_complete: {
    title: "The Hero Reborn",
    description: "Your transformation is complete. You are no longer the person who began this quest seeking gold and glory. You have become someone who values wisdom, compassion, and the growth that comes from helping others. This inner change is more valuable than any external treasure could ever be.",
    choices: [
      {
        text: "Meet the dragon as your true self",
        action: () => {
          actions.addScore(200);
          actions.changeScene("authentic_meeting");
        }
      },
      {
        text: "Continue your quest with newfound purpose",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  authentic_meeting: {
    title: "Meeting of True Spirits",
    description: "When you enter the dragon's presence as your authentic, transformed self, Auraxes immediately recognizes the change in you. 'You have already found the greatest treasure,' she says with wonder. 'You have become someone worthy of wisdom itself. The test is already complete.'",
    choices: [
      {
        text: "Accept the role of wisdom keeper",
        action: () => {
          actions.addScore(500);
          actions.addAchievement("Wisdom Keeper");
          actions.changeScene("keeper_ending");
        }
      },
      {
        text: "Ask to share this wisdom with the world",
        action: () => actions.changeScene("world_teacher")
      }
    ]
  },

  keeper_ending: {
    title: "The Wisdom Keeper",
    description: `You accept the sacred role of Wisdom Keeper, becoming a guardian of knowledge and truth for future generations. Your transformation from treasure seeker to wisdom keeper represents the highest achievement possible.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYou have achieved the ultimate goal - becoming someone who creates treasure through wisdom rather than seeking it through conquest.`,
    choices: [
      {
        text: "Begin your new life as a keeper of wisdom",
        action: actions.restartGame
      }
    ]
  }
});

const createExpandedScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  world_sharing: {
    title: "Tales from Beyond",
    description: "You share stories of the world beyond the temple walls - how knowledge is still cherished in hidden corners, how young minds still hunger for wisdom, and how the seeds of learning continue to sprout even in difficult times. Auraxes listens with rapt attention, her eyes brightening with each tale.",
    choices: [
      {
        text: "Tell her about the hermit's dedication",
        action: () => {
          actions.addScore(75);
          actions.changeScene("hermit_tale");
        }
      },
      {
        text: "Share the unicorn's faith in purity",
        action: () => actions.changeScene("unicorn_tale")
      },
      {
        text: "Describe the fairies' preservation of ancient magic",
        action: () => actions.changeScene("fairy_tale")
      }
    ]
  },

  dragon_dreams: {
    title: "Dreams of an Ancient Heart",
    description: "Auraxes shares her deepest dreams with surprising vulnerability. 'I dream of halls filled with eager students again, of knowledge flowing freely between species, of wisdom being valued above wealth. But mostly... I dream of not being alone with these treasures of learning.'",
    choices: [
      {
        text: "Promise to help make these dreams reality",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Dream Weaver");
          actions.changeScene("dream_promise");
        }
      },
      {
        text: "Suggest starting small with a few dedicated students",
        action: () => actions.changeScene("small_beginnings")
      },
      {
        text: "Offer to be her first student in centuries",
        action: () => actions.changeScene("first_student")
      }
    ]
  },

  companion_offering: {
    title: "A Promise of Companionship",
    description: "Your offer to ease the dragon's solitude through companionship and learning brings tears to her ancient eyes. 'You would stay? Not just take knowledge and leave, but remain to learn and grow together? It has been so long since anyone made such an offer...'",
    choices: [
      {
        text: "Commit to a year of study and companionship",
        action: () => {
          actions.addScore(200);
          actions.changeScene("year_commitment");
        }
      },
      {
        text: "Suggest dividing time between learning and bringing others",
        action: () => actions.changeScene("balanced_approach")
      },
      {
        text: "Promise to make the temple a living center of learning again",
        action: () => actions.changeScene("temple_revival")
      }
    ]
  },

  knowledge_preservation: {
    title: "Preserving Ancient Wisdom",
    description: "When you ask about preserving her knowledge, Auraxes becomes animated with hope. 'The knowledge here is too vast for any one mind, but together we could create something lasting - books that teach themselves, crystals that hold memories, songs that carry wisdom across generations.'",
    choices: [
      {
        text: "Learn the art of knowledge crystallization",
        action: () => {
          actions.addScore(100);
          actions.changeScene("crystal_learning");
        }
      },
      {
        text: "Suggest creating a network of knowledge keepers",
        action: () => actions.changeScene("keeper_network")
      },
      {
        text: "Offer to transcribe the most important teachings",
        action: () => actions.changeScene("transcription_offer")
      }
    ]
  },

  mutual_understanding: {
    title: "Shared Solitude",
    description: "As you share your own experiences of loneliness and isolation, a deep connection forms between you and Auraxes. She realizes that wisdom often comes with the price of being misunderstood, that those who see deeply often stand apart. Your mutual understanding creates a bond stronger than mere teacher and student.",
    choices: [
      {
        text: "Acknowledge the bond between you",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Kindred Spirits");
          actions.changeScene("bond_acknowledged");
        }
      },
      {
        text: "Suggest that together you're stronger",
        action: () => actions.changeScene("strength_together")
      },
      {
        text: "Promise to never let her be alone again",
        action: () => actions.changeScene("eternal_companionship")
      }
    ]
  },

  world_teacher: {
    title: "Teaching the World",
    description: "Your request to share the dragon's wisdom with the world resonates deeply with Auraxes. 'Yes! This is what I've been waiting for - not someone to take my treasure, but someone to help me give it to all who need it. Together, we can remind the world why wisdom matters.'",
    choices: [
      {
        text: "Plan a traveling school of wisdom",
        action: () => {
          actions.addScore(250);
          actions.changeScene("traveling_school");
        }
      },
      {
        text: "Suggest establishing schools in major cities",
        action: () => actions.changeScene("city_schools")
      },
      {
        text: "Propose training other teachers first",
        action: () => actions.changeScene("teacher_training")
      }
    ]
  },

  selflessness_practice: {
    title: "Practicing Selfless Choices",
    description: "You spend time mentally rehearsing selfless choices, imagining scenarios where personal gain conflicts with the greater good. Each mental exercise strengthens your resolve to choose wisely when the moment comes. You think of all those who could benefit from the dragon's wisdom if you prove worthy.",
    choices: [
      {
        text: "Feel ready for any test",
        action: () => {
          actions.addScore(50);
          actions.changeScene("test_ready");
        }
      },
      {
        text: "Enter the temple with practiced wisdom",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  character_creation: {
    title: "Choose Your Path",
    description: "Before beginning your quest for the Golden Orb, you must decide what kind of adventurer you wish to be. This choice will influence how others perceive you and what opportunities become available throughout your journey.\n\n(Note: This is the enhanced game mode with additional features like character classes, skills, and relationships. Choose 'Start without a defined background' for the traditional experience.)",
    choices: [
      {
        text: "Begin as a Scholar seeking knowledge",
        action: () => {
          actions.addToInventory("Scholar's Journal");
          actions.addAchievement("Path of Learning");
          actions.addScore(25);
          actions.changeScene("scholar_background");
        }
      },
      {
        text: "Start as a Noble with diplomatic training",
        action: () => {
          actions.addToInventory("Noble Seal");
          actions.addAchievement("Born to Lead");
          actions.addScore(25);
          actions.changeScene("noble_background");
        }
      },
      {
        text: "Begin as a Wanderer with survival skills",
        action: () => {
          actions.addToInventory("Traveler's Kit");
          actions.addAchievement("Child of the Road");
          actions.addScore(25);
          actions.changeScene("wanderer_background");
        }
      },
      {
        text: "Start without a defined background (Traditional opening)",
        action: () => actions.changeScene("start")
      }
    ]
  }
});
