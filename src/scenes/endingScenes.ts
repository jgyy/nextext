// src/scenes/endingScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createEndingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  guardian_ending: {
    title: "The New Guardian of Wisdom",
    description: `You accept the sacred role of Wisdom Guardian, becoming a bridge between the ancient knowledge and the modern world. Auraxes becomes your mentor and closest ally, and together you establish a new age of learning and understanding.\n\nHeroes and scholars seek you out for guidance, and your wisdom helps heal conflicts across the realm. Your adventure for treasure has become a lifelong mission of service to all who seek truth.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYou have achieved the highest possible ending - becoming a guardian of hope itself.`,
    choices: [
      {
        text: "Begin the next chapter of your legend",
        action: actions.restartGame
      }
    ]
  },

  dragon_student: {
    title: "A Student of Ancient Wisdom",
    description: `You choose to remain in the temple as Auraxes's student, spending years learning the deepest secrets of magic, history, and philosophy. Under her guidance, you become a master of ancient arts and eventually help her establish a new school of wisdom.\n\nStudents from across the realm come to learn from both of you, and the temple once again becomes a center of learning and growth.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nYou have chosen the path of eternal learning.`,
    choices: [
      {
        text: "Begin a new adventure as a master scholar",
        action: actions.restartGame
      }
    ]
  },

  hollow_victory: {
    title: "Gold and Emptiness",
    description: `You leave the temple with a vast fortune in gold and jewels, but as you travel home, the treasure feels heavier with each step. You realize you had the chance to gain wisdom that could have changed the world, but chose personal wealth instead.\n\nThe gold will spend, but the opportunity for true greatness is gone forever. Sometimes, the greatest losses are the opportunities we let slip away.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nPerhaps wisdom can be found in a second chance...`,
    choices: [
      {
        text: "Return to the temple to make amends",
        action: () => actions.changeScene("redemption_attempt")
      },
      {
        text: "Accept this lesson and start anew",
        action: actions.restartGame
      }
    ]
  },

  second_chance: {
    title: "Redemption Through Understanding",
    description: `Auraxes sees your genuine regret and nods slowly. 'Perhaps there is hope for you yet. True wisdom sometimes comes through recognizing our mistakes. I will offer you the choice again - but this time, think carefully about what truly matters.'\n\nYou realize this is more than a second chance - it's a lesson in the power of growth and self-reflection.`,
    choices: [
      {
        text: "Choose the knowledge that helps others",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Wisdom Through Experience");
          actions.changeScene("redeemed_wisdom");
        }
      },
      {
        text: "Ask the dragon to help you understand the difference",
        action: () => actions.changeScene("wisdom_explanation")
      }
    ]
  },

  redeemed_wisdom: {
    title: "Growth Through Understanding",
    description: `This time, you choose wisely, and Auraxes beams with approval. 'Now you understand. Wisdom is not just about making the right choice the first time - it's about learning from our mistakes and growing into better versions of ourselves.'\n\nThe knowledge she grants you is even more precious because you understand its true value through experience.`,
    choices: [
      {
        text: "Accept your role as a teacher of growth",
        action: () => {
          actions.addScore(300);
          actions.addAchievement("Master of Second Chances");
          actions.changeScene("teacher_ending");
        }
      }
    ]
  },

  teacher_ending: {
    title: "The Teacher of Second Chances",
    description: `Your journey becomes legendary not for the treasure you found, but for the wisdom you gained through making mistakes and learning from them. You become known as the Teacher of Second Chances, helping others learn that failure is not the end, but the beginning of true understanding.\n\nYour story inspires countless others to seek wisdom over wealth, growth over perfection.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nSometimes the greatest victories come from our failures.`,
    choices: [
      {
        text: "Begin a new tale of growth and wisdom",
        action: actions.restartGame
      }
    ]
  },

  companion_path: {
    title: "The Dragon's Companion",
    description: `You choose to stay with Auraxes as her companion, and together you work to preserve and share the ancient knowledge. Your friendship becomes legendary - the last dragon and the human who chose compassion over conquest.\n\nTogether, you welcome new students and slowly rebuild the temple as a center of learning and wisdom.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nTrue treasure was the friendship you made along the way.`,
    choices: [
      {
        text: "Continue the adventure together",
        action: actions.restartGame
      }
    ]
  },

  wisdom_realization: {
    title: "The Power of Changing Course",
    description: `Auraxes nods approvingly as you lower your weapon. 'Now you begin to understand. True courage is not just the willingness to fight, but the wisdom to know when fighting is wrong. You came here expecting a monster to slay, but found a teacher to learn from instead.'\n\nYour willingness to change course when presented with new understanding marks you as truly wise.`,
    choices: [
      {
        text: "Ask to learn from your mistake",
        action: () => {
          actions.addScore(100);
          actions.changeScene("learning_from_error");
        }
      },
      {
        text: "Request the dragon's forgiveness and guidance",
        action: () => actions.changeScene("forgiveness_path")
      }
    ]
  },

  learning_from_error: {
    title: "Growth Through Humility",
    description: `Auraxes teaches you that the greatest wisdom often comes from admitting when we're wrong and being willing to learn from our mistakes. 'This humility,' she explains, 'is rarer and more valuable than any martial skill or magical power.'\n\nYour journey transforms from a quest for treasure into a masterclass in personal growth.`,
    choices: [
      {
        text: "Embrace this new understanding",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Master of Humility");
          actions.changeScene("humility_master_ending");
        }
      }
    ]
  },

  humility_master_ending: {
    title: "The Humble Hero",
    description: `You become known throughout the realm not for your strength or cleverness, but for your humility and willingness to learn from every experience. Your story teaches others that true heroism lies not in never making mistakes, but in growing from them.\n\nYour adventure inspires a new generation of heroes who seek to understand before they act.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nThe greatest adventures are those that change who we are inside.`,
    choices: [
      {
        text: "Begin a new adventure with greater wisdom",
        action: actions.restartGame
      }
    ]
  },

  redemption_attempt: {
    title: "Seeking Redemption",
    description: `You return to the temple, your bag of gold feeling like a burden rather than a prize. Auraxes looks up from an ancient tome as you enter, her expression mixing surprise with hope. 'So, you have discovered that gold cannot fill the emptiness where wisdom should reside. Few have the courage to return and admit their mistake.'`,
    choices: [
      {
        text: "Offer to return the treasure",
        action: () => {
          actions.addScore(100);
          actions.changeScene("treasure_returned");
        }
      },
      {
        text: "Ask for a chance to choose again",
        action: () => actions.changeScene("second_chance")
      },
      {
        text: "Beg to become her student despite your failure",
        action: () => actions.changeScene("desperate_student")
      }
    ]
  },

  treasure_returned: {
    title: "The Value of Sacrifice",
    description: `Your willingness to return the treasure proves the sincerity of your change of heart. Auraxes is deeply moved. 'To give up wealth for the chance at wisdom - now this is true understanding. You have learned the most important lesson: that some things are more valuable than gold.'\n\nYour sacrifice opens the door to even greater rewards.`,
    choices: [
      {
        text: "Accept whatever the dragon deems you worthy of",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("True Sacrifice");
          actions.changeScene("sacrifice_reward");
        }
      }
    ]
  },

  sacrifice_reward: {
    title: "The Reward of True Understanding",
    description: `Because you freely gave up treasure for the chance at wisdom, Auraxes grants you something even more precious - the deep understanding that comes from genuine sacrifice and the strength that comes from choosing principles over profit.\n\nYou leave the temple not just with knowledge, but with character forged through trial and choice.\n\nFinal Score: ${gameState.score}\nAchievements: ${gameState.achievements.join(", ")}\n\nThe greatest treasures are earned through sacrifice, not conquest.`,
    choices: [
      {
        text: "Begin your new life with true understanding",
        action: actions.restartGame
      }
    ]
  }
});
