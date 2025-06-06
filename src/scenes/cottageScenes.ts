// src/scenes/cottageScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createCottageScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  cottage: {
    title: "The Hermit's Sanctuary",
    description: "An ancient hermit opens the wooden door before you can knock, his eyes twinkling with starlight and wisdom accumulated over countless years. His long beard flows like silver water, and his simple robes seem to shimmer with protective enchantments.\n\n'Welcome, brave traveler,' he says with a voice like wind through old trees. 'The forest whispered of your coming. I am Eldric the Wise, keeper of ancient lore. The path ahead is treacherous, but I can offer aid to one pure of heart.'",
    choices: [
      {
        text: "Ask about the legend of the Golden Orb",
        action: () => actions.changeScene("hermit_lore")
      },
      {
        text: "Request a weapon for protection",
        action: () => {
          actions.addToInventory("Enchanted Sword");
          actions.addAchievement("Armed and Ready");
          actions.changeScene("got_sword");
        },
        condition: () => !gameState.hasSword
      },
      {
        text: "Ask for healing supplies",
        action: () => {
          actions.addToInventory("Healing Potion");
          actions.changeScene("got_potion");
        },
        condition: () => !gameState.hasPotion
      },
      {
        text: "Thank him and continue your journey",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  hermit_lore: {
    title: "Ancient Legends Revealed",
    description: "Eldric's eyes grow distant as he recounts tales older than memory itself. 'The Golden Orb you seek is not mere treasure, young one. It is a repository of wisdom accumulated over millennia - the power to heal hearts, end wars, and bring prosperity to lands touched by darkness.\n\nBut beware - it lies within the Temple of Trials, guarded by Auraxes the Ancient, a dragon of immense wisdom and power. Many seek to claim the Orb through force or cunning, but the true path requires something far rarer - genuine wisdom and compassion.'",
    choices: [
      {
        text: "Ask about the dragon's nature",
        action: () => actions.changeScene("dragon_lore")
      },
      {
        text: "Inquire about the Temple's defenses",
        action: () => actions.changeScene("temple_secrets")
      },
      {
        text: "Request guidance on proving your worth",
        action: () => actions.changeScene("worthiness_guidance")
      }
    ]
  },

  dragon_lore: {
    title: "The Truth About Auraxes",
    description: "Eldric's voice drops to a reverent whisper. 'Auraxes is no mindless beast, child. She is the last of the Great Teacher Dragons, older than kingdoms and wiser than any mortal sage. For a thousand years, she has guarded not just treasure, but knowledge itself.\n\nShe was once beloved by scholars and heroes alike, until war and greed turned the world away from learning. Now she tests all who enter, seeking someone worthy to inherit the wisdom of ages. Violence will only prove your unworthiness.'",
    choices: [
      {
        text: "Ask how to approach the dragon with respect",
        action: () => actions.changeScene("approach_guidance")
      },
      {
        text: "Request the hermit's blessing for the journey",
        action: () => {
          actions.addToInventory("Hermit's Blessing");
          actions.addAchievement("Blessed Journey");
          actions.heal(25);
          actions.changeScene("hermit_blessed");
        }
      },
      {
        text: "Prepare to venture into the forest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  got_sword: {
    title: "Armed with Ancient Power",
    description: "Eldric presents you with a sword that seems to hum with inner light. 'This blade has been blessed by the spirits of the forest. It will serve you well, but remember - true strength comes not from steel, but from the courage to do what is right, even when it is difficult.'",
    choices: [
      {
        text: "Ask about the Golden Orb",
        action: () => actions.changeScene("hermit_lore")
      },
      {
        text: "Request healing supplies as well",
        action: () => {
          actions.addToInventory("Healing Potion");
          actions.changeScene("fully_equipped");
        },
        condition: () => !gameState.hasPotion
      },
      {
        text: "Head into the forest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  got_potion: {
    title: "Gift of Healing",
    description: "The hermit hands you a crystal vial filled with shimmering liquid that seems to contain captured starlight. 'This potion holds the essence of life itself. It will restore your health when you need it most, but use it wisely - such magic is rare and precious.'",
    choices: [
      {
        text: "Ask about the Golden Orb",
        action: () => actions.changeScene("hermit_lore")
      },
      {
        text: "Request a weapon as well",
        action: () => {
          actions.addToInventory("Enchanted Sword");
          actions.changeScene("fully_equipped");
        },
        condition: () => !gameState.hasSword
      },
      {
        text: "Head into the forest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  fully_equipped: {
    title: "Ready for Any Challenge",
    description: "With both enchanted sword and healing potion in your possession, you feel prepared for whatever trials await. Eldric nods approvingly. 'You are well-equipped in body, young one. Now ensure your spirit is equally prepared for the challenges ahead. May wisdom guide your steps.'",
    choices: [
      {
        text: "Ask for final guidance about the quest",
        action: () => actions.changeScene("hermit_lore")
      },
      {
        text: "Venture into the mystical forest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  hermit_blessed: {
    title: "Blessed by Wisdom",
    description: "Eldric places his weathered hand upon your forehead, and you feel a warm, protective energy flow through you. 'Carry this blessing with you, brave one. It will shield you from lesser evils and help you recognize truth from illusion. But remember - the greatest protection comes from the purity of your own intentions.'",
    choices: [
      {
        text: "Journey into the enchanted forest",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Ask one final question about the dragon",
        action: () => actions.changeScene("dragon_lore")
      }
    ]
  },

  temple_secrets: {
    title: "Secrets of the Ancient Temple",
    description: "Eldric's expression grows grave as he shares hidden knowledge. 'The Temple of Trials has two entrances - one that leads directly to the dragon's hall, and another that requires an ancient key. The key's path offers greater safety but tests your wisdom. The direct path tests your courage but offers no sanctuary from the dragon's immediate judgment.'",
    choices: [
      {
        text: "Ask about finding the ancient key",
        action: () => actions.changeScene("key_guidance"),
        condition: () => !gameState.hasKey
      },
      {
        text: "Show the hermit your ancient key",
        action: () => actions.changeScene("key_recognition"),
        condition: () => gameState.hasKey
      },
      {
        text: "Prepare to face the temple",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  key_guidance: {
    title: "The Search for Ancient Power",
    description: "Eldric strokes his long beard thoughtfully. 'The Ancient Key lies hidden near the forest's edge, concealed among the roots of the oldest trees. It bears mystical runes and pulses with magical energy. Only those with keen eyes and patient hearts can hope to find it.'",
    choices: [
      {
        text: "Return to search for the key",
        action: () => actions.changeScene("search_start")
      },
      {
        text: "Head to the forest without the key",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  key_recognition: {
    title: "A Legendary Artifact",
    description: "Eldric's eyes widen with amazement as you show him the Ancient Key. 'By the ancient powers! This is the Key of Endless Doors, crafted by the first wizards to lock away the greatest secrets. With this, you can enter the temple's hidden passages and approach the dragon from a position of respect rather than as an intruder. You are truly favored by destiny.'",
    choices: [
      {
        text: "Ask how to use the key properly",
        action: () => actions.changeScene("key_instruction")
      },
      {
        text: "Head to the temple with confidence",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  key_instruction: {
    title: "Mastering Ancient Magic",
    description: "Eldric teaches you the proper way to use the Ancient Key. 'The key responds to pure intention, not force. Approach the locked door with respect and humility, and it will recognize your worthiness. The path it opens will take you through chambers of learning, where you can prove your dedication to knowledge before meeting the dragon.'",
    choices: [
      {
        text: "Thank the hermit and begin your quest",
        action: () => {
          actions.addScore(25);
          actions.changeScene("forest_path");
        }
      }
    ]
  }
});
