// src/scenes/missingScenesFix.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createMissingScenesFix = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  clarity_embraced: {
    title: "Crystal Clear Understanding",
    description: "The clarity of your new understanding fills you with confidence and peace. You realize that honesty isn't just about telling the truth to others - it's about being honest with yourself about your motivations, fears, and hopes. This self-awareness becomes your greatest strength.",
    choices: [
      {
        text: "Use this clarity to understand the dragon's needs",
        action: () => {
          actions.addScore(75);
          actions.changeScene("dragon_understanding");
        }
      },
      {
        text: "Apply this honesty to all future choices",
        action: () => {
          actions.addScore(50);
          actions.addAchievement("Crystal Clear");
          actions.changeScene("honest_path");
        }
      },
      {
        text: "Continue to the temple with clear purpose",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  dragon_understanding: {
    title: "Seeing Through Dragon Eyes",
    description: "Your newfound clarity allows you to understand the dragon's perspective with startling empathy. You see her not as a monster guarding treasure, but as a lonely teacher who has watched the world abandon wisdom for war, knowledge for power. Her 'treasure' is the accumulated learning of ages, waiting for someone worthy to inherit it.",
    choices: [
      {
        text: "Approach as someone who understands her pain",
        action: () => {
          actions.addScore(100);
          actions.changeScene("empathetic_approach");
        }
      },
      {
        text: "Prepare to prove your commitment to learning",
        action: () => actions.changeScene("learning_preparation")
      },
      {
        text: "Think of ways to end her isolation",
        action: () => actions.changeScene("isolation_solutions")
      }
    ]
  },

  honest_path: {
    title: "The Way of Truth",
    description: "You commit to a path of complete honesty in all your dealings. This doesn't mean brutal frankness that hurts others, but rather a compassionate truthfulness that builds trust and understanding. You feel this commitment will serve you well in the trials ahead.",
    choices: [
      {
        text: "Head to the temple as a truthful seeker",
        action: () => {
          actions.addScore(50);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Test your commitment with a difficult truth",
        action: () => actions.changeScene("truth_test")
      }
    ]
  },

  learning_preparation: {
    title: "Preparing to Learn",
    description: "You take time to prepare yourself mentally and spiritually for the role of student. True learning requires humility, patience, and the willingness to have your assumptions challenged. You clear your mind of preconceptions about dragons, treasure, and what this quest truly means.",
    choices: [
      {
        text: "Enter the temple as a humble student",
        action: () => {
          actions.addScore(75);
          actions.changeScene("student_entrance");
        }
      },
      {
        text: "Practice the ancient greeting of students to teachers",
        action: () => actions.changeScene("greeting_practice")
      }
    ]
  },

  isolation_solutions: {
    title: "Ending Ancient Loneliness",
    description: "You contemplate various ways to help end the dragon's centuries of isolation. Perhaps you could establish a new school at the temple, bring worthy students to learn from her, or find a way to share her wisdom with the world without endangering her. The key is showing her that the world still values what she protects.",
    choices: [
      {
        text: "Plan to establish a school of wisdom",
        action: () => {
          actions.addScore(100);
          actions.changeScene("school_planning");
        }
      },
      {
        text: "Think of worthy students to bring to her",
        action: () => actions.changeScene("student_recruitment_ideas")
      },
      {
        text: "Consider ways to share her knowledge safely",
        action: () => actions.changeScene("knowledge_distribution")
      }
    ]
  },

  student_entrance: {
    title: "Entering as a Student",
    description: "You enter the temple not as a treasure hunter or hero, but as a student seeking wisdom. This shift in perspective changes everything - the very stones seem to welcome you, and you sense approval in the ancient magic that permeates this place. You've chosen the role of learner, and the temple recognizes this choice.",
    choices: [
      {
        text: "Proceed to meet your teacher",
        action: () => {
          actions.addScore(100);
          actions.changeScene("main_hall");
        }
      },
      {
        text: "Stop to study the temple's lessons on the walls",
        action: () => actions.changeScene("wall_lessons")
      }
    ]
  },

  story_prepared: {
    title: "Stories Worth Sharing",
    description: "You prepare the stories you'll share with the dragon - tales of the hermit's dedication to preserving knowledge despite isolation, the unicorn's faith in purity of purpose, and your own transformation from treasure seeker to wisdom seeker. These stories prove that learning and wisdom still matter in the world.",
    choices: [
      {
        text: "Enter the temple ready to share these tales",
        action: () => {
          actions.addScore(75);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Practice telling the stories with emotion and truth",
        action: () => actions.changeScene("storytelling_practice")
      }
    ]
  },

  wisdom_examples: {
    title: "Living Proof of Wisdom's Value",
    description: "You think of all the examples of preserved wisdom you've encountered: the hermit's cottage library, the fairy knowledge passed down through generations, the wolf spirit's ancient memories, and the runes that still teach after centuries. Each proves that wisdom endures and remains valuable.",
    choices: [
      {
        text: "Catalog these examples to share with the dragon",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wisdom_catalog");
        }
      },
      {
        text: "Head to the temple with confidence in wisdom's endurance",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  oath_sworn: {
    title: "Sacred Oath to the Forest",
    description: "You speak your oath to the ancient forest, promising to protect its wisdom, respect its mysteries, and share its teachings responsibly with those who prove worthy. The trees seem to sigh with approval, and you feel a deep connection to the living world around you. This bond will guide and protect you.",
    choices: [
      {
        text: "Feel the forest's blessing upon you",
        action: () => {
          actions.heal(50);
          actions.addScore(100);
          actions.changeScene("forest_blessed");
        }
      },
      {
        text: "Ask the forest for guidance on your quest",
        action: () => actions.changeScene("forest_guidance")
      }
    ]
  },

  guardian_duties: {
    title: "Understanding Your Responsibilities",
    description: "The spirit wolf explains the duties of a forest guardian: protecting sacred sites from those who would exploit them, helping lost travelers find their path, maintaining the balance between civilization and wild magic, and preserving the ancient stories and songs of the woodland realm.",
    choices: [
      {
        text: "Accept all these responsibilities gladly",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Full Guardian");
          actions.changeScene("guardian_acceptance");
        }
      },
      {
        text: "Ask how to balance these duties with your quest",
        action: () => actions.changeScene("duty_balance")
      },
      {
        text: "Request the tools needed for these tasks",
        action: () => actions.changeScene("guardian_tools")
      }
    ]
  },

  quest_examination: {
    title: "The True Nature of Your Quest",
    description: "With your newfound honesty, you examine why you truly began this quest. Was it really for treasure? For glory? Or was there always a deeper longing - for purpose, for growth, for the chance to become more than you were? You realize the quest itself has been transforming you all along.",
    choices: [
      {
        text: "Embrace your transformation fully",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Self Discovered");
          actions.changeScene("transformation_embraced");
        }
      },
      {
        text: "Share this realization when you meet the dragon",
        action: () => actions.changeScene("realization_prepared")
      }
    ]
  },

  moral_strength: {
    title: "The Power of Principles",
    description: "Your commitment to following your moral compass fills you with an unshakeable strength. You know that whatever challenges lie ahead, you will face them with integrity. This moral certainty doesn't make you inflexible - rather, it gives you the confidence to make difficult choices with wisdom and compassion.",
    choices: [
      {
        text: "Continue to the temple with moral clarity",
        action: () => {
          actions.addScore(75);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Test your principles against hypothetical dilemmas",
        action: () => actions.changeScene("ethical_preparation")
      }
    ]
  },

  guided_journey: {
    title: "Walking with Spirit Guidance",
    description: "With the spirit guide at your side, you feel more attuned to the mystical currents of the world. The small wolf spirit occasionally offers insights through visions and feelings rather than words, helping you understand situations at a deeper level than mere observation would allow.",
    choices: [
      {
        text: "Ask the spirit about the dragon's true nature",
        action: () => actions.changeScene("spirit_dragon_insight")
      },
      {
        text: "Continue to the temple with enhanced perception",
        action: () => {
          actions.addScore(50);
          actions.changeScene("ruins");
        }
      }
    ]
  },

  teacher_vision: {
    title: "The Joy of Teaching",
    description: "The temporal vision shows you Auraxes in her youth, surrounded by eager students from many species - humans, elves, even other dragons. Her joy in teaching is palpable, her patience infinite, her delight in each student's breakthrough genuine. This is who she truly is beneath centuries of loneliness.",
    choices: [
      {
        text: "Resolve to help her rediscover this joy",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Joy Bringer");
          actions.changeScene("joy_resolution");
        }
      },
      {
        text: "Learn her teaching methods from the vision",
        action: () => actions.changeScene("teaching_observation")
      }
    ]
  },

  future_school: {
    title: "Vision of Renewed Learning",
    description: "You see a possible future where the temple once again bustles with students and teachers. Dragons and humans work side by side, preserving ancient wisdom while discovering new truths. The loneliness is gone, replaced by the vibrant energy of shared learning and growth.",
    choices: [
      {
        text: "Commit to making this vision reality",
        action: () => {
          actions.addScore(150);
          actions.changeScene("future_commitment");
        }
      },
      {
        text: "Study how this future was achieved",
        action: () => actions.changeScene("future_study")
      }
    ]
  },

  self_acceptance: {
    title: "Embracing Your True Self",
    description: "Looking into the soul spring's reflection, you fully accept who you've become - no longer driven by greed or glory, but by wisdom, compassion, and the desire to help others grow. This self-acceptance brings a profound peace and confidence that will serve you well in all future challenges.",
    choices: [
      {
        text: "Thank the spring for this gift of clarity",
        action: () => {
          actions.addScore(100);
          actions.changeScene("spring_gratitude");
        }
      },
      {
        text: "Continue to the temple as your authentic self",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  soul_strengthening: {
    title: "Drinking Deep of Truth",
    description: "As you drink from the soul spring, you feel your inner transformation solidify and strengthen. The wisdom, compassion, and courage you've developed become permanent parts of your character, impossible to lose or forget. You are forever changed for the better.",
    choices: [
      {
        text: "Feel grateful for your journey of growth",
        action: () => {
          actions.heal(50);
          actions.addScore(150);
          actions.changeScene("gratitude_moment");
        }
      },
      {
        text: "Head to the temple as a transformed hero",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  transformation_embraced: {
    title: "Becoming Who You Were Meant to Be",
    description: "You fully embrace your transformation from a simple treasure seeker into someone who values wisdom, growth, and the wellbeing of others above personal gain. This isn't losing yourself - it's becoming who you were always meant to be. The change feels like coming home to your true self.",
    choices: [
      {
        text: "Approach the dragon as your transformed self",
        action: () => {
          actions.addScore(200);
          actions.changeScene("authentic_meeting");
        }
      },
      {
        text: "Take a moment to appreciate how far you've come",
        action: () => actions.changeScene("growth_appreciation")
      }
    ]
  }
});

export default createMissingScenesFix;
