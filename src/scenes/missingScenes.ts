// src/scenes/missingScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createMissingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  sincerity_guidance: {
    title: "Proving Your Sincerity",
    description: "The spirit wolf's ancient eyes study you carefully. 'Sincerity cannot be proven through words alone, young seeker. It must be demonstrated through actions when you believe no one is watching, through choices made when personal gain conflicts with what is right.\n\nThe dragon will sense your true nature the moment you enter her presence. Be yourself - your genuine self - and let your character speak for you. Deception has no place in the presence of one who has lived for millennia.'",
    choices: [
      {
        text: "Promise to be completely honest with the dragon",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Truth Speaker");
          actions.changeScene("honesty_pledge");
        }
      },
      {
        text: "Ask for guidance on staying true to yourself",
        action: () => actions.changeScene("authenticity_guidance")
      },
      {
        text: "Request the wolf's blessing to help you remain genuine",
        action: () => {
          actions.addToInventory("Wolf's Blessing");
          actions.heal(30);
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Continue to the temple with this wisdom",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  honesty_pledge: {
    title: "The Oath of Truth",
    description: "Your pledge to complete honesty resonates through the mystical grove, causing the very air to shimmer with approving energy. The spirit wolf nods gravely. 'This oath will serve you well. Dragons can sense lies as easily as mortals can see sunlight. Your commitment to truth marks you as worthy of respect.'",
    choices: [
      {
        text: "Feel strengthened by your commitment to truth",
        action: () => {
          actions.addScore(50);
          actions.changeScene("truth_strength");
        }
      },
      {
        text: "Ask what truths the dragon most needs to hear",
        action: () => actions.changeScene("needed_truths")
      },
      {
        text: "Head to the temple as a truthful seeker",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  authenticity_guidance: {
    title: "The Wolf's Wisdom on Authenticity",
    description: "The spirit wolf shares profound wisdom about authenticity. 'To be true to yourself, you must first know yourself. What drives you? What do you truly value? In moments of choice, listen to the voice within that speaks without considering what others might think or want.\n\nThe dragon values authenticity above all other virtues, for it is the foundation upon which all other virtues are built.'",
    choices: [
      {
        text: "Reflect deeply on your true motivations",
        action: () => {
          actions.addScore(75);
          actions.changeScene("self_reflection");
        }
      },
      {
        text: "Promise to follow your inner compass",
        action: () => {
          actions.addScore(50);
          actions.changeScene("inner_compass");
        }
      },
      {
        text: "Continue with renewed self-awareness",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  truth_strength: {
    title: "Power of Honesty",
    description: "Your commitment to truth fills you with an inner strength and clarity you've never experienced before. You realize that honesty isn't just about speaking truth to others - it's about being honest with yourself about your motivations, fears, and hopes.",
    choices: [
      {
        text: "Embrace this new clarity",
        action: () => {
          actions.addScore(50);
          actions.changeScene("clarity_embraced");
        }
      },
      {
        text: "Use this honesty to examine your quest's true purpose",
        action: () => actions.changeScene("quest_examination")
      },
      {
        text: "Continue to the temple with clear intentions",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  needed_truths: {
    title: "Truths the Dragon Seeks",
    description: "The wolf's expression grows thoughtful. 'Auraxes has heard countless lies about why mortals seek her treasure. She longs to hear someone admit they don't have all the answers, that they seek wisdom because they recognize their own limitations. She wants to know that learning still matters to someone in your generation.'",
    choices: [
      {
        text: "Prepare to admit your limitations honestly",
        action: () => {
          actions.addScore(75);
          actions.changeScene("humble_preparation");
        }
      },
      {
        text: "Practice expressing your genuine desire to learn",
        action: () => actions.changeScene("learning_expression")
      },
      {
        text: "Head to the temple ready to be vulnerable and honest",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  self_reflection: {
    title: "Journey Within",
    description: "You take time for deep introspection, examining your true motivations for this quest. You realize that while you began seeking treasure, you now genuinely desire wisdom and understanding. This transformation itself is a kind of treasure - the growth from selfishness toward something greater.",
    choices: [
      {
        text: "Embrace your transformed motivations",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Self Awareness");
          actions.changeScene("motivation_transformation");
        }
      },
      {
        text: "Plan to share this growth with the dragon",
        action: () => actions.changeScene("growth_sharing");
      },
      {
        text: "Continue your quest with deeper self-knowledge",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  inner_compass: {
    title: "Following Your True North",
    description: "You make a commitment to follow your inner moral compass, regardless of external pressures or temptations. This promise to yourself creates a sense of inner peace and determination that will guide you through any challenge.",
    choices: [
      {
        text: "Feel the strength of moral certainty",
        action: () => {
          actions.addScore(75);
          actions.changeScene("moral_strength");
        }
      },
      {
        text: "Continue to the temple guided by your inner compass",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  architecture_study: {
    title: "Ancient Temple Architecture",
    description: "You study the magnificent architecture of the temple complex. The stones are fitted together with such precision that no mortar was needed, and you can see that the entire structure was designed to channel and amplify magical energies. This wasn't just built to house treasure - it was designed as a place of learning and contemplation.",
    choices: [
      {
        text: "Appreciate the builders' wisdom",
        action: () => {
          actions.addScore(50);
          actions.changeScene("builder_appreciation");
        }
      },
      {
        text: "Look for hidden passages in the design",
        action: () => actions.changeScene("design_secrets")
      },
      {
        text: "Enter the temple with respect for its creators",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  ruins_exploration: {
    title: "Exploring the Temple Grounds",
    description: "You carefully explore the temple grounds, discovering smaller shrines, meditation gardens, and what appear to be dormitories where students once lived. This place was clearly once a thriving center of learning, not just a treasure vault.",
    choices: [
      {
        text: "Investigate the student dormitories",
        action: () => actions.changeScene("dormitory_investigation")
      },
      {
        text: "Examine the meditation gardens",
        action: () => actions.changeScene("garden_exploration")
      },
      {
        text: "Approach the main temple with new understanding",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  temple_exploration: {
    title: "Hidden Aspects of the Temple",
    description: "Your continued exploration reveals the true complexity of the temple. There are multiple levels, hidden chambers, and intricate passages that suggest this place had many functions beyond simply housing a dragon and treasure.",
    choices: [
      {
        text: "Explore the upper levels",
        action: () => actions.changeScene("upper_levels")
      },
      {
        text: "Investigate the hidden chambers",
        action: () => actions.changeScene("hidden_chambers")
      },
      {
        text: "Return to the main entrance with new knowledge",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  understanding_approach: {
    title: "Approaching with Understanding",
    description: "Having observed the dragon's true nature, you enter her chamber not as an adversary or treasure hunter, but as someone who recognizes her for what she truly is - a dedicated guardian of knowledge who has been alone for far too long.",
    choices: [
      {
        text: "Greet her as a fellow lover of knowledge",
        action: () => {
          actions.addScore(100);
          actions.changeScene("scholarly_greeting");
        }
      },
      {
        text: "Express appreciation for her dedication",
        action: () => actions.changeScene("dedication_appreciation")
      },
      {
        text: "Offer to help ease her loneliness",
        action: () => actions.changeScene("companionship_offer")
      }
    ]
  },

  scholarly_greeting: {
    title: "Meeting of Minds",
    description: "You approach Auraxes as one scholar to another, and her entire demeanor changes. Her eyes light up with an excitement you haven't seen in the previous visions of her solitude. 'A scholar! A true seeker of knowledge! It has been... oh, how long has it been since someone entered these halls for love of learning rather than love of gold?'",
    choices: [
      {
        text: "Share your own love of learning",
        action: () => {
          actions.addScore(100);
          actions.changeScene("shared_passion");
        }
      },
      {
        text: "Ask about her greatest discoveries",
        action: () => actions.changeScene("dragon_discoveries")
      },
      {
        text: "Offer to be her student",
        action: () => actions.changeScene("student_request")
      }
    ]
  }
});

export default createMissingScenes;
