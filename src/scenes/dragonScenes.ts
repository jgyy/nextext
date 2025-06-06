// src/scenes/dragonScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createDragonScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  wisdom_seeker: {
    title: "The Dragon's Interest",
    description: "Auraxes's massive head tilts with genuine curiosity, her ancient eyes studying you with newfound interest. 'Wisdom over gold? Knowledge over power? Such words are rare in these halls. Most who enter speak only of treasure and glory.\n\nBut words are easily spoken, young seeker. True wisdom is proven through choices, not claims. Are you prepared to demonstrate that your heart truly seeks understanding rather than mere wealth?'",
    choices: [
      {
        text: "Accept whatever test the dragon offers",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wisdom_trial");
        }
      },
      {
        text: "Ask to become the dragon's student",
        action: () => actions.changeScene("student_request")
      },
      {
        text: "Offer to help the dragon with her loneliness",
        action: () => actions.changeScene("compassion_offer")
      }
    ]
  },

  wisdom_trial: {
    title: "The Test of True Wisdom",
    description: "Auraxes settles into a comfortable position, her eyes gleaming with ancient intelligence. 'Very well, seeker. I shall present you with a choice that has tested countless souls before you.\n\nBehind me lies the Golden Orb - treasure beyond imagination that could make you the wealthiest person alive. But I also offer you something else: knowledge that could heal the suffering of thousands, end wars before they begin, and bring prosperity to entire kingdoms. The treasure you could keep for yourself, but the knowledge grows stronger only when shared freely. Choose wisely.'",
    choices: [
      {
        text: "Choose the knowledge that helps others",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Wisdom Incarnate");
          actions.completeQuest("The Test of Hearts");
          actions.changeScene("wisdom_victory");
        }
      },
      {
        text: "Choose the personal treasure",
        action: () => {
          actions.addScore(50);
          actions.changeScene("treasure_choice");
        }
      },
      {
        text: "Ask if there's a way to achieve both",
        action: () => actions.changeScene("creative_solution"),
        skillCheck: { type: 'wisdom', difficulty: 5 }
      }
    ]
  },

  wisdom_victory: {
    title: "The Greatest Treasure",
    description: "Auraxes's eyes blaze with approval and joy. 'At last! After a thousand years of waiting, someone has chosen wisdom over wealth, others over self. You have proven yourself worthy of the greatest treasure of all.\n\nThe knowledge I grant you is not just ancient spells or forgotten lore - it is the understanding of how to heal hearts, unite enemies, and bring hope to the hopeless. You leave here not as a mere treasure hunter, but as a guardian of wisdom itself.'\n\nAs the dragon's words wash over you, you feel fundamentally changed. You have become something greater than you were.",
    choices: [
      {
        text: "Accept the role of Wisdom Guardian",
        action: () => {
          actions.addScore(500);
          actions.addAchievement("Guardian of Wisdom");
          actions.changeScene("guardian_ending");
        }
      },
      {
        text: "Ask to stay and learn more from Auraxes",
        action: () => actions.changeScene("dragon_student")
      }
    ]
  },

  respectful_approach: {
    title: "Honoring Ancient Wisdom",
    description: "You approach the great dragon with deep respect, bowing as you would to a revered teacher. Auraxes seems surprised and pleased by your courtesy. 'How refreshing,' she rumbles, her voice carrying notes of genuine warmth. 'It has been centuries since someone entered my domain with proper respect.\n\nYou understand that wisdom and age deserve reverence. This alone marks you as different from the usual treasure seekers who stumble through my halls.'",
    choices: [
      {
        text: "Ask to learn from her vast knowledge",
        action: () => actions.changeScene("learning_request")
      },
      {
        text: "Offer to ease her long solitude",
        action: () => actions.changeScene("companionship_offer")
      },
      {
        text: "Express admiration for the preservation of knowledge",
        action: () => actions.changeScene("knowledge_appreciation")
      }
    ]
  },

  student_request: {
    title: "Seeking a Teacher",
    description: "Auraxes considers your request with careful attention. 'A student? It has been so very long since anyone sought to learn rather than simply take. My last students... they left to fight in wars and never returned. I have been alone with my books and scrolls for centuries.\n\nBut perhaps it is time to try again. Are you truly prepared for the dedication that learning requires? Wisdom cannot be rushed or forced - it must be cultivated with patience and humility.'",
    choices: [
      {
        text: "Commit to patient, long-term study",
        action: () => {
          actions.addScore(100);
          actions.changeScene("dedicated_student");
        }
      },
      {
        text: "Ask what the first lesson would be",
        action: () => actions.changeScene("first_lesson")
      },
      {
        text: "Promise to be a worthy successor to her previous students",
        action: () => actions.changeScene("successor_promise")
      }
    ]
  },

  dragon_combat: {
    title: "The Test of Courage",
    description: "Your enchanted sword gleams as you face the mighty dragon, but Auraxes makes no move to attack. Instead, she watches with ancient eyes full of sadness. 'So, another warrior comes seeking to prove strength through violence. Very well - if you insist on this path, I will test your martial skill. But know that you have already failed a far more important test.'",
    choices: [
      {
        text: "Lower your weapon and apologize",
        action: () => {
          actions.addScore(75);
          actions.changeScene("wisdom_realization");
        }
      },
      {
        text: "Ask what test you have failed",
        action: () => actions.changeScene("failed_test_explanation")
      },
      {
        text: "Continue the combat with honor",
        action: () => actions.changeScene("honorable_combat")
      }
    ]
  },

  tribute_offering: {
    title: "Gifts of Respect",
    description: "You step forward and offer something from your inventory as tribute to the ancient dragon. Auraxes examines your offering with genuine interest, clearly surprised by this respectful gesture.\n\n'Most who enter simply try to take,' she observes thoughtfully. 'You offer instead. This speaks well of your character and understanding of proper courtesy. What you offer tells me much about who you are.'",
    choices: [
      {
        text: "Offer the Crystal of Visions",
        action: () => actions.changeScene("crystal_tribute"),
        condition: () => gameState.inventory.includes("Crystal of Visions")
      },
      {
        text: "Offer Ancient Wisdom",
        action: () => actions.changeScene("wisdom_tribute"),
        condition: () => gameState.inventory.includes("Ancient Wisdom")
      },
      {
        text: "Offer the Unicorn's Blessing",
        action: () => actions.changeScene("blessing_tribute"),
        condition: () => gameState.inventory.includes("Unicorn's Blessing")
      },
      {
        text: "Explain you seek to give knowledge, not just take it",
        action: () => actions.changeScene("knowledge_exchange_offer")
      }
    ]
  },

  compassion_offer: {
    title: "Understanding Loneliness",
    description: "Your offer to ease the dragon's loneliness touches something deep in Auraxes's ancient heart. Her massive eyes glisten with what might be tears. 'Loneliness... yes, that is the word. A thousand years of solitude, watching the world forget that wisdom matters, that knowledge should be shared, that teaching is life's highest calling.\n\nYou are the first in centuries to recognize my pain rather than simply fearing my power.'",
    choices: [
      {
        text: "Offer to stay and be her companion",
        action: () => {
          actions.addScore(150);
          actions.changeScene("companion_path");
        }
      },
      {
        text: "Suggest she return to teaching",
        action: () => actions.changeScene("teaching_encouragement")
      },
      {
        text: "Ask to help her reconnect with the world",
        action: () => actions.changeScene("world_reconnection")
      }
    ]
  },

  creative_solution: {
    title: "Thinking Beyond the Choice",
    description: "Auraxes chuckles, a sound like distant thunder mixed with delight. 'Clever! Yes, there is indeed a third way - but it requires proving you understand the deeper lesson. If you can tell me why the choice itself was the true test, I will grant you both knowledge and the means to use it wisely.\n\nShow me that you comprehend what wisdom truly means.'",
    choices: [
      {
        text: "Explain that the choice reveals one's character",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Master of Understanding");
          actions.changeScene("character_insight");
        }
      },
      {
        text: "Say that wisdom means knowing when not to choose",
        action: () => actions.changeScene("wisdom_insight")
      },
      {
        text: "Suggest that both options serve different but valid goods",
        action: () => actions.changeScene("balance_insight")
      }
    ]
  },

  character_insight: {
    title: "Understanding the Self",
    description: "Auraxes nods with profound approval. 'Precisely. The choice reveals whether one seeks power for selfish gain or to serve others. You understand that character is the foundation of all wisdom. This insight makes you worthy of both knowledge and the resources to use it effectively.\n\nYou have proven yourself to be exactly what this world needs - someone who will use power responsibly.'",
    choices: [
      {
        text: "Accept this great responsibility",
        action: () => {
          actions.addScore(500);
          actions.addAchievement("Guardian of Balance");
          actions.changeScene("guardian_ending");
        }
      },
      {
        text: "Ask for guidance in carrying this burden",
        action: () => actions.changeScene("guidance_request")
      }
    ]
  },

  treasure_choice: {
    title: "The Weight of Gold",
    description: "Auraxes's expression grows deeply sad as you choose the treasure. 'So you are like all the others after all. You speak of wisdom but choose selfishness when tested.' She sighs, a sound like wind through empty halls.\n\n'Take your gold then, but know that you have lost something far more valuable than anything you could ever carry. The opportunity to truly change the world has slipped through your fingers like sand.'",
    choices: [
      {
        text: "Reconsider and ask for the knowledge instead",
        action: () => {
          actions.addScore(100);
          actions.changeScene("second_chance");
        }
      },
      {
        text: "Ask what you have truly lost",
        action: () => actions.changeScene("loss_explanation")
      },
      {
        text: "Take the treasure and leave",
        action: () => {
          actions.addScore(25);
          actions.changeScene("hollow_victory");
        }
      }
    ]
  }
});
