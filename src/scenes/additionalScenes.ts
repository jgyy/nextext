// src/scenes/additionalScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createAdditionalScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  tribute_offer: {
    title: "Offering Tribute",
    description: "You step forward and offer something from your inventory as tribute to the great dragon. The ancient beast examines your offering with interest, clearly surprised by this respectful gesture. 'Most who enter simply try to take. You offer instead. This speaks well of your character.'",
    choices: [
      {
        text: "Offer the Crystal of Visions",
        action: () => actions.changeScene("crystal_tribute"),
        condition: () => gameState.inventory.includes("Crystal of Visions")
      },
      {
        text: "Offer Ancient Wisdom tome",
        action: () => actions.changeScene("wisdom_tribute"),
        condition: () => gameState.inventory.includes("Ancient Wisdom")
      },
      {
        text: "Offer the Unicorn's Blessing",
        action: () => actions.changeScene("blessing_tribute"),
        condition: () => gameState.inventory.includes("Unicorn's Blessing")
      },
      {
        text: "Explain you seek to learn, not take",
        action: () => actions.changeScene("learning_approach")
      }
    ]
  },

  crystal_tribute: {
    title: "Gift of Vision",
    description: "Auraxes's eyes widen with genuine surprise as you offer the Crystal of Visions. 'You would give up such a powerful artifact? This crystal shows truth and reveals hidden paths. Yet you offer it freely to me.' Her voice carries notes of wonder and growing respect.\n\n'This gift tells me more about your character than any words could. You understand that true wealth comes from giving, not taking.'",
    choices: [
      {
        text: "Explain that wisdom shared grows stronger",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Generous Heart");
          actions.changeScene("wisdom_sharing");
        }
      },
      {
        text: "Say the crystal belongs with a true guardian",
        action: () => actions.changeScene("guardian_recognition")
      },
      {
        text: "Ask to learn from her vast knowledge",
        action: () => actions.changeScene("student_request")
      }
    ]
  },

  wisdom_tribute: {
    title: "Knowledge Given Freely",
    description: "When you offer the tome of Ancient Wisdom, Auraxes's expression becomes one of profound respect. 'You offer knowledge itself as tribute. This shows you understand that wisdom is meant to be shared, not hoarded. Few comprehend this truth.'\n\nShe carefully takes the tome, her claws gentle despite their fearsome size. 'Such a gift deserves a worthy response.'",
    choices: [
      {
        text: "Ask to exchange knowledge",
        action: () => {
          actions.addScore(125);
          actions.changeScene("knowledge_exchange");
        }
      },
      {
        text: "Request to become her student",
        action: () => actions.changeScene("devoted_student")
      },
      {
        text: "Suggest establishing a new school together",
        action: () => actions.changeScene("school_proposal")
      }
    ]
  },

  blessing_tribute: {
    title: "Sacred Gift",
    description: "Auraxes gasps softly as you offer the Unicorn's Blessing. 'A blessing from the pure of heart... You would share such divine grace with me? This is perhaps the most precious gift anyone has offered in centuries.'\n\nTears glisten in the ancient dragon's eyes. 'You see me not as a monster to be defeated, but as a being worthy of blessing. This changes everything.'",
    choices: [
      {
        text: "Explain that all beings deserve compassion",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Pure Compassion");
          actions.changeScene("compassion_realized");
        }
      },
      {
        text: "Ask to share in her loneliness",
        action: () => actions.changeScene("shared_solitude")
      },
      {
        text: "Suggest the blessing can help her reconnect with the world",
        action: () => actions.changeScene("reconnection_hope")
      }
    ]
  },

  learning_approach: {
    title: "The Student's Heart",
    description: "Your words about seeking to learn rather than take resonate deeply with Auraxes. Her entire demeanor shifts from guarded wariness to eager interest. 'A student! It has been so long since anyone came here to learn rather than to plunder. You remind me of why I chose to guard knowledge in the first place.'",
    choices: [
      {
        text: "Express genuine desire to understand",
        action: () => {
          actions.addScore(100);
          actions.changeScene("understanding_quest");
        }
      },
      {
        text: "Ask about her role as a teacher",
        action: () => actions.changeScene("teacher_role")
      },
      {
        text: "Offer to help preserve her knowledge",
        action: () => actions.changeScene("preservation_offer")
      }
    ]
  },

  companion_offer: {
    title: "Offering Companionship",
    description: "Your offer to ease the dragon's loneliness touches something deep in Auraxes's ancient heart. Her massive eyes glisten with what might be tears. 'Companionship... yes, that is what I have missed most. A thousand years of solitude, watching the world forget that wisdom matters, that knowledge should be shared.'\n\nShe looks at you with new hope. 'You are the first in centuries to see my pain rather than simply fearing my power.'",
    choices: [
      {
        text: "Offer to stay and learn from her",
        action: () => {
          actions.addScore(150);
          actions.changeScene("permanent_student");
        }
      },
      {
        text: "Suggest she return to teaching others",
        action: () => actions.changeScene("teaching_revival")
      },
      {
        text: "Propose building a new community of learners",
        action: () => actions.changeScene("learning_community")
      }
    ]
  },

  solitude_promise: {
    title: "A Vow to End Loneliness",
    description: "Your promise to help end her centuries of solitude brings visible relief to the ancient dragon. 'Such a promise... if you truly mean it, you offer something more valuable than all the gold in my treasury. But how can one person end a thousand years of isolation?'",
    choices: [
      {
        text: "Suggest she can teach the world again",
        action: () => {
          actions.addScore(100);
          actions.changeScene("world_teaching");
        }
      },
      {
        text: "Offer to be her voice to the outside world",
        action: () => actions.changeScene("dragon_ambassador")
      },
      {
        text: "Propose turning the temple into a school",
        action: () => actions.changeScene("temple_school")
      }
    ]
  },

  wisdom_path: {
    title: "The Scholar's Route",
    description: "Using your vision knowledge, you navigate through the temple's hidden scholarly passages. These corridors are lined with beautiful murals depicting the history of learning, and you can sense the approval of generations of scholars who walked these halls.\n\nWhen you finally emerge into the dragon's chamber, Auraxes looks up from an ancient tome with surprise and delight.",
    choices: [
      {
        text: "Greet her as a fellow scholar",
        action: () => {
          actions.addScore(75);
          actions.changeScene("scholarly_greeting");
        }
      },
      {
        text: "Show respect for the scholarly traditions",
        action: () => actions.changeScene("tradition_respect")
      },
      {
        text: "Ask about the murals you passed",
        action: () => actions.changeScene("mural_discussion")
      }
    ]
  },

  compassion_path: {
    title: "The Way of the Heart",
    description: "The compassion path leads you through chambers filled with healing herbs and charitable works of past temple inhabitants. You see evidence of the dragon's secret kindness - food left for forest creatures, healing potions prepared for injured travelers.\n\nWhen you enter her presence, Auraxes seems surprised that someone found this particular route.",
    choices: [
      {
        text: "Acknowledge her hidden kindness",
        action: () => {
          actions.addScore(100);
          actions.changeScene("kindness_recognized");
        }
      },
      {
        text: "Thank her for her secret care of others",
        action: () => actions.changeScene("secret_thanks")
      },
      {
        text: "Ask to help with her charitable works",
        action: () => actions.changeScene("charity_assistance")
      }
    ]
  },

  confident_entry: {
    title: "Entering with Purpose",
    description: "Understanding the true nature of the test ahead, you enter the temple with confidence born not of arrogance, but of clear purpose. You know who you are and what you stand for, and this inner certainty radiates from you as you approach the dragon's chamber.\n\nAuraxes immediately senses this change in your bearing and regards you with keen interest.",
    choices: [
      {
        text: "State your purpose clearly",
        action: () => {
          actions.addScore(75);
          actions.changeScene("purpose_declaration");
        }
      },
      {
        text: "Wait respectfully for her to speak first",
        action: () => actions.changeScene("respectful_waiting")
      },
      {
        text: "Ask to prove your worthiness",
        action: () => actions.changeScene("worthiness_request")
      }
    ]
  }
});
