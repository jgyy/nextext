// src/scenes/riverScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createRiverScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  crystal_stream: {
    title: "The Stream of Starlight",
    description: "You emerge at a breathtaking crystal-clear stream that seems to contain liquid starlight. The water sparkles with an inner radiance, and as you approach, you notice ancient runes carved into the smooth stones beneath the surface.\n\nSudddenly, the air shimmers with magic, and a magnificent unicorn steps gracefully from behind a grove of silver birches. Its horn gleams like captured moonlight, and its eyes hold the wisdom of ages.",
    choices: [
      {
        text: "Approach the unicorn with reverence",
        action: () => {
          actions.changeScene("unicorn_encounter");
        }
      },
      {
        text: "Examine the magical runes in the water",
        action: () => actions.changeScene("water_mystery"),
        skillCheck: { type: 'wisdom', difficulty: 3 }
      },
      {
        text: "Drink from the enchanted stream",
        action: () => {
          actions.heal(30);
          actions.addScore(25);
          actions.changeScene("stream_blessing");
        }
      }
    ]
  },

  unicorn_encounter: {
    title: "Meeting the Pure of Heart",
    description: "The unicorn regards you with eyes like liquid starlight, and when it speaks, its voice is like silver bells carried on the wind. 'Greetings, seeker of truth. I am Celestia, guardian of this sacred stream. Your heart calls out for more than mere treasure - I sense a desire for genuine wisdom and the power to heal the world's wounds.\n\nFew mortals are permitted to approach me, but your spirit shines with untainted purpose. Accept my blessing, and let it guide you through the trials ahead.'",
    choices: [
      {
        text: "Accept the unicorn's blessing gratefully",
        action: () => {
          actions.addToInventory("Unicorn's Blessing");
          actions.addAchievement("Pure of Heart");
          actions.heal(50);
          actions.addScore(100);
          actions.changeScene("blessed_by_unicorn");
        }
      },
      {
        text: "Ask about the dragon in the temple",
        action: () => actions.changeScene("unicorn_wisdom")
      },
      {
        text: "Inquire about the true nature of the quest",
        action: () => actions.changeScene("quest_truth")
      }
    ]
  },

  blessed_by_unicorn: {
    title: "Blessed by Purity",
    description: "Celestia's blessing flows through you like warm sunlight, filling you with divine protection and clarity of purpose. You feel fundamentally changed - your health is restored, and you sense that you're now protected from lesser evils and deceptions.\n\nThe unicorn nods regally before beginning to fade like morning mist. 'Remember, brave one - true treasure lies not in what you can take, but in what you can give.'",
    choices: [
      {
        text: "Continue to the ancient temple",
        action: () => {
          actions.addScore(50);
          actions.changeScene("temple_approach");
        }
      },
      {
        text: "Explore the magical stream further",
        action: () => actions.changeScene("water_mystery")
      },
      {
        text: "Return to the forest paths",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  unicorn_wisdom: {
    title: "Celestial Guidance",
    description: "Celestia's expression grows gentle and wise. 'Auraxes the Ancient is no monster, dear seeker. She is the last of the Great Teacher Dragons, keeper of wisdom that could heal the world's wounds. For a thousand years, she has waited for someone worthy to inherit this knowledge.\n\nApproach her with respect, not as a thief seeking treasure, but as a student seeking truth. Show her that learning and compassion still have value in this world, and you may find the greatest treasure of all - understanding.'",
    choices: [
      {
        text: "Ask how to prove yourself worthy",
        action: () => actions.changeScene("worthiness_test")
      },
      {
        text: "Accept the unicorn's blessing for the trial",
        action: () => {
          actions.addToInventory("Unicorn's Blessing");
          actions.heal(50);
          actions.addScore(100);
          actions.changeScene("blessed_by_unicorn");
        }
      },
      {
        text: "Head to the temple with this knowledge",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  quest_truth: {
    title: "The True Nature of Your Journey",
    description: "Celestia's eyes grow distant and profound. 'Your quest was never truly about gold or magical artifacts, though you may not have realized it yet. The Golden Orb you seek is indeed real, but its true power lies in what it represents - the accumulation of wisdom, compassion, and the desire to use power for the good of all.\n\nMany seek the Orb for selfish reasons and find only emptiness. But those who understand its true nature become guardians of hope itself.'",
    choices: [
      {
        text: "Accept this greater purpose",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Enlightened Seeker");
          actions.changeScene("purpose_accepted");
        }
      },
      {
        text: "Ask what it means to be a guardian of hope",
        action: () => actions.changeScene("guardian_explanation")
      },
      {
        text: "Request the unicorn's blessing for this journey",
        action: () => {
          actions.addToInventory("Unicorn's Blessing");
          actions.heal(50);
          actions.changeScene("blessed_by_unicorn");
        }
      }
    ]
  },

  water_mystery: {
    title: "Ancient Runes of Power",
    description: "As you study the runes beneath the crystal water, they begin to glow with soft blue light. The ancient symbols tell a story of the first days of magic, when dragons and unicorns worked together to preserve wisdom for future generations.\n\nOne particular rune catches your attention - it seems to pulse with energy and depicts a key opening not a door, but a mind. You sense this knowledge will be important in the trials ahead.",
    choices: [
      {
        text: "Touch the glowing rune",
        action: () => {
          actions.addToInventory("Crystal of Visions");
          actions.addScore(75);
          actions.addAchievement("Mystic Scholar");
          actions.changeScene("vision_crystal");
        }
      },
      {
        text: "Study the other runes more carefully",
        action: () => actions.changeScene("deeper_mysteries")
      },
      {
        text: "Share your discovery with the unicorn",
        action: () => actions.changeScene("unicorn_encounter")
      }
    ]
  },

  vision_crystal: {
    title: "Visions of Truth",
    description: "As you touch the glowing rune, it transforms into a beautiful crystal that rises from the water into your hands. The Crystal of Visions shows you glimpses of the past and possible futures - you see the dragon not as a fearsome beast, but as a lonely teacher yearning for students who value wisdom over wealth.\n\nThe visions also show you paths through the temple that few have ever seen, and most importantly, they reveal the true test that awaits you.",
    choices: [
      {
        text: "Focus on the vision of the dragon's loneliness",
        action: () => actions.changeScene("dragon_insight")
      },
      {
        text: "Study the hidden temple paths",
        action: () => actions.changeScene("secret_knowledge")
      },
      {
        text: "Examine the true test that awaits",
        action: () => actions.changeScene("test_revelation")
      }
    ]
  },

  stream_blessing: {
    title: "Waters of Renewal",
    description: "The magical waters of the stream flow through you, healing your wounds and filling you with renewed energy. You feel more attuned to the mystical forces around you, and the unicorn observes your respectful approach to the sacred waters with clear approval.\n\nAs you drink, you notice that the water tastes like liquid starlight and carries with it whispers of ancient wisdom.",
    choices: [
      {
        text: "Approach the unicorn now",
        action: () => actions.changeScene("unicorn_encounter")
      },
      {
        text: "Investigate the runes in the streambed",
        action: () => actions.changeScene("water_mystery")
      },
      {
        text: "Continue toward the temple, refreshed",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  worthiness_test: {
    title: "Proving Your Worth",
    description: "Celestia explains the nature of worthiness with gentle wisdom. 'True worth is not proven through trials of strength or cunning, but through choices made when no one is watching. The dragon will test not your power, but your character. Will you choose knowledge that helps others over treasure that enriches only yourself? Will you show mercy when you have the power to take revenge?\n\nThese are the tests that matter, young seeker.'",
    choices: [
      {
        text: "Promise to choose wisdom over wealth",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wisdom_promise");
        }
      },
      {
        text: "Ask for the unicorn's blessing to help you choose rightly",
        action: () => {
          actions.addToInventory("Unicorn's Blessing");
          actions.heal(50);
          actions.changeScene("blessed_by_unicorn");
        }
      },
      {
        text: "Head to the temple, determined to prove yourself",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  }
});
