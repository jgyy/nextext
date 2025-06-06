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

  respectful_greeting: {
    title: "Formal Courtesy",
    description: "You bow respectfully to the ancient dragon, showing the proper deference due to such a magnificent and wise creature. Auraxes seems pleased by your manners. 'It has been centuries since someone greeted me with proper respect. You clearly understand that wisdom and age deserve courtesy. I am intrigued by you, young seeker.'",
    choices: [
      {
        text: "Ask permission to learn from the dragon",
        action: () => actions.changeScene("learning_request")
      },
      {
        text: "Inquire about the dragon's long solitude",
        action: () => actions.changeScene("solitude_question")
      },
      {
        text: "Offer to share news of the outside world",
        action: () => actions.changeScene("world_news")
      }
    ]
  },

  treasure_chamber: {
    title: "The Heart of the Temple",
    description: "You enter a magnificent chamber where the legendary Golden Orb floats in the center, surrounded by countless books, scrolls, and artifacts of incredible value. But now, having journeyed this far, you understand that the real treasure isn't gold—it's the wisdom and growth you've gained along the way.",
    choices: [
      {
        text: "Approach the Golden Orb with understanding",
        action: () => actions.changeScene("enlightened_approach")
      },
      {
        text: "Study the ancient books and scrolls first",
        action: () => actions.changeScene("scholarly_investigation")
      },
      {
        text: "Call out to the dragon to share this moment",
        action: () => actions.changeScene("shared_discovery")
      }
    ]
  },

  enlightened_approach: {
    title: "True Understanding",
    description: "As you approach the Golden Orb with your newfound wisdom, it begins to glow more brightly. You realize this isn't just a treasure to be claimed, but a test of your character and growth. The orb seems to respond to your understanding, revealing its true nature as a repository of ancient knowledge and compassion.",
    choices: [
      {
        text: "Touch the orb to accept its wisdom",
        action: () => {
          actions.changeScene("wisdom_victory");
        }
      },
      {
        text: "Ask the orb to teach you",
        action: () => actions.changeScene("orb_teaching")
      },
      {
        text: "Request to share this knowledge with others",
        action: () => actions.changeScene("sharing_wisdom")
      }
    ]
  },

  dragon_wisdom_guidance: {
    title: "Wisdom for the Dragon",
    description: "The spirit wolf shares ancient knowledge about approaching dragons. 'Speak to its loneliness, not its fear. Dragons are not meant to live in isolation—they are teachers by nature. Show Auraxes that the world still values learning, and you may find a friend rather than a foe.'",
    choices: [
      {
        text: "Ask how to prove the world values learning",
        action: () => actions.changeScene("proving_learning_value")
      },
      {
        text: "Request the wolf's blessing for this task",
        action: () => {
          actions.addToInventory("Wolf's Wisdom");
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Head to the temple with this guidance",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  second_chance: {
    title: "Redemption Offered",
    description: "The dragon, seeing your reconsideration, softens slightly. 'Perhaps there is hope for you yet. True wisdom sometimes comes through recognizing our mistakes. I will offer you the choice again, but this time, think carefully about what truly matters in this world.'",
    choices: [
      {
        text: "Choose knowledge that helps others",
        action: () => actions.changeScene("compassion_choice")
      },
      {
        text: "Ask the dragon to explain the difference",
        action: () => actions.changeScene("wisdom_explanation")
      },
      {
        text: "Admit you're still learning right from wrong",
        action: () => actions.changeScene("humble_learning")
      }
    ]
  },

  lesson_in_loss: {
    title: "Understanding Consequences",
    description: "The dragon explains sadly, 'You have lost the chance to gain wisdom that could have changed countless lives. Knowledge of healing, of bringing peace, of understanding the hearts of others—all this could have been yours. Instead, you chose gold that will tarnish and jewels that will lose their luster. This is why so few find the true treasure.'",
    choices: [
      {
        text: "Ask if there's any way to make amends",
        action: () => actions.changeScene("seeking_redemption")
      },
      {
        text: "Accept this lesson and leave",
        action: () => actions.changeScene("hollow_victory")
      },
      {
        text: "Promise to use the treasure to help others",
        action: () => actions.changeScene("redemptive_promise")
      }
    ]
  },

  seeking_redemption: {
    title: "The Path Back",
    description: "You return to the dragon, hoping to make amends for your earlier choice. Auraxes regards you with ancient eyes full of both disappointment and hope. 'So, you have discovered that gold cannot fill the emptiness where wisdom should reside. Few have the courage to return and admit their mistake. Perhaps redemption is possible.'",
    choices: [
      {
        text: "Offer to give back the treasure",
        action: () => actions.changeScene("treasure_return")
      },
      {
        text: "Ask to serve the dragon to make amends",
        action: () => actions.changeScene("service_penance")
      },
      {
        text: "Request a chance to start over",
        action: () => actions.changeScene("fresh_start")
      }
    ]
  },

  learning_request: {
    title: "The Student's Plea",
    description: "You humbly ask the dragon to become your teacher. Auraxes considers this carefully. 'Learning requires patience, dedication, and the humility to accept that you know very little. It is not a path for those seeking quick power or easy answers. Are you truly prepared for the long journey of understanding?'",
    choices: [
      {
        text: "Commit to patient, long-term learning",
        action: () => actions.changeScene("dedicated_student")
      },
      {
        text: "Ask what the first lesson would be",
        action: () => actions.changeScene("first_lesson")
      },
      {
        text: "Admit you're not sure but want to try",
        action: () => actions.changeScene("uncertain_but_willing")
      }
    ]
  },

  solitude_question: {
    title: "Breaking the Silence",
    description: "When you ask about the dragon's long solitude, Auraxes's expression grows distant and melancholy. 'A thousand years of silence, young one. A thousand years of watching the world forget that wisdom matters, that knowledge is meant to be shared, that teaching is the highest calling. You are the first in decades to even ask.'",
    choices: [
      {
        text: "Offer to help end that solitude",
        action: () => actions.changeScene("companionship_offer")
      },
      {
        text: "Ask what happened to the last students",
        action: () => actions.changeScene("lost_students")
      },
      {
        text: "Suggest the world needs teachers now more than ever",
        action: () => actions.changeScene("teaching_hope")
      }
    ]
  },

  world_news: {
    title: "Tales from Beyond",
    description: "You share stories of the outside world—the hermit's kindness, the unicorn's wisdom, the spirit wolf's guidance. The dragon listens with growing wonder. 'You speak of magic and wisdom still alive in the world. I had begun to believe that only greed and violence remained. Your tales give me hope that perhaps... perhaps there is still a place for old teachers like me.'",
    choices: [
      {
        text: "Assure the dragon the world needs its wisdom",
        action: () => actions.changeScene("world_needs_wisdom")
      },
      {
        text: "Invite the dragon to see the world again",
        action: () => actions.changeScene("journey_invitation")
      },
      {
        text: "Suggest starting small with one student",
        action: () => actions.changeScene("small_beginning")
      }
    ]
  }
});
