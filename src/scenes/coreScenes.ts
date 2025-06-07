// src/scenes/coreScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createStartingScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  start: {
    title: "The Enchanted Forest",
    description: "You stand at the edge of a mystical forest where ancient magic still flows through twisted trees and glowing streams. Legends speak of a great treasure hidden deep within - the Golden Orb of Eternal Wisdom. But many have entered these woods, and few have returned.\n\nA worn path leads deeper into the shadows, while to your right, smoke rises from a humble cottage chimney.",
    choices: [
      {
        text: "Follow the forest path into the unknown",
        action: () => {
          actions.addScore(10);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Approach the cottage for guidance",
        action: () => {
          actions.addScore(5);
          actions.changeScene("cottage");
        }
      },
      {
        text: "Search the area for hidden secrets",
        action: () => actions.changeScene("search_start"),
        skillCheck: { type: 'wisdom', difficulty: 2 }
      }
    ]
  },

  search_start: {
    title: "Hidden Discovery",
    description: "Your careful search among the gnarled roots of an ancient oak reveals something extraordinary - a small, ornate key covered in glowing runes. The moment you spot it, the runes pulse with magical energy, as if recognizing a worthy finder.\n\nThis is clearly no ordinary key. The craftsmanship suggests it's incredibly old, and the magic radiating from it feels both powerful and benevolent.",
    choices: [
      {
        text: "Take the Ancient Key",
        action: () => {
          actions.addToInventory("Ancient Key");
          actions.addAchievement("Keen Observer");
          actions.addScore(50);
          actions.changeScene("found_key");
        }
      },
      {
        text: "Leave it and visit the cottage for advice",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Leave it and venture into the forest",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  found_key: {
    title: "Ancient Power Awakened",
    description: "As your fingers close around the Ancient Key, mystical runes along its surface blaze with brilliant light. A surge of ancient magic flows through you, and for a moment, you glimpse visions of the key's history - mighty wizards, forgotten kingdoms, and secrets locked away for centuries.\n\nYou sense this key will open more than just doors - it may unlock your destiny itself.",
    choices: [
      {
        text: "Head to the forest with your newfound power",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Visit the hermit to learn about the key's origins",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  game_over: {
    title: "The End of This Tale",
    description: `Your adventure has come to an end, but every ending is also a beginning. You faced challenges with courage and made choices that revealed your character.\n\nFinal Score: ${gameState.score}\nAchievements Earned: ${gameState.achievements.length}\n\nThough this journey is complete, the lessons learned and wisdom gained will serve you well in future adventures.`,
    choices: [
      {
        text: "Begin a new adventure with greater wisdom",
        action: actions.restartGame
      }
    ]
  }
})
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
import { Scene, GameState, GameActions } from "../types/game";

export const createForestScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  forest_path: {
    title: "Into the Heart of Mystery",
    description: "The forest grows denser and more magical as you venture deeper. Luminescent flowers bloom along the path, their petals glowing with soft blue light. Somewhere in the distance, you hear the melodic sound of running water, while ahead, ancient stone ruins peek through the canopy.\n\nThe very air seems alive with possibility and danger. Two paths diverge before you - one leading toward the sound of crystalline water, the other climbing toward the mysterious ruins.",
    choices: [
      {
        text: "Follow the melodic sound of water",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Climb toward the ancient ruins",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Rest and prepare for what lies ahead",
        action: () => actions.changeScene("forest_rest")
      },
      {
        text: "Search for hidden paths",
        action: () => actions.changeScene("secret_paths"),
        skillCheck: { type: 'stealth', difficulty: 3 }
      }
    ]
  },

  forest_rest: {
    title: "Moment of Reflection",
    description: `You pause to rest against an ancient tree and take stock of your situation. The forest around you hums with magical energy, and you can feel the presence of ancient powers watching your every move.\n\nHealth: ${gameState.health}/${gameState.maxHealth}\nScore: ${gameState.score}\nInventory: ${gameState.inventory.length > 0 ? gameState.inventory.join(", ") : "Empty"}\n\nThe path ahead will require all your courage and wisdom.`,
    choices: [
      {
        text: "Use your healing potion",
        action: () => {
          actions.heal(50);
          actions.removeFromInventory("Healing Potion");
          actions.changeScene("potion_used");
        },
        condition: () => gameState.hasPotion && gameState.health < gameState.maxHealth
      },
      {
        text: "Head toward the stream",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Approach the temple ruins",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Return to the hermit for advice",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  potion_used: {
    title: "Renewed Strength",
    description: "The healing potion's magic flows through your body, mending wounds and restoring your vitality. The empty crystal vial dissolves into sparkling dust that dances away on the wind. You feel refreshed and ready to face whatever challenges await.",
    choices: [
      {
        text: "Continue to the crystal stream",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Head toward the temple",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  secret_paths: {
    title: "Hidden Ways of the Forest",
    description: "Your careful searching reveals a network of hidden paths winding between the massive trees. These trails are clearly ancient, marked with symbols that seem to shift and change when you're not looking directly at them. One path glows with silver light, another pulses with deep green energy, and a third seems to shimmer with all the colors of the rainbow.",
    choices: [
      {
        text: "Follow the silver-lit path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("moonlit_grove");
        }
      },
      {
        text: "Take the green energy path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("nature_sanctuary");
        }
      },
      {
        text: "Choose the rainbow shimmer path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("fairy_realm");
        }
      },
      {
        text: "Return to the main paths",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  moonlit_grove: {
    title: "Grove of Eternal Moonlight",
    description: "The silver path leads you to a grove where eternal moonlight filters through crystalline leaves. In the center stands a spirit wolf, its fur seeming to contain starlight itself. The wolf regards you with ancient, knowing eyes.\n\n'Welcome, seeker,' the wolf speaks in a voice like wind through silver bells. 'I am the Guardian of Hidden Paths. You show wisdom in finding this place. What guidance do you seek?'",
    choices: [
      {
        text: "Ask about the dragon in the temple",
        action: () => actions.changeScene("wolf_dragon_wisdom")
      },
      {
        text: "Request the wolf's blessing",
        action: () => {
          actions.addToInventory("Wolf's Blessing");
          actions.addAchievement("Spirit Blessed");
          actions.heal(30);
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Ask about the nature of wisdom",
        action: () => actions.changeScene("wisdom_lesson")
      }
    ]
  },

  nature_sanctuary: {
    title: "The Heart of the Forest",
    description: "The green path brings you to a sacred grove where the very essence of nature seems concentrated. Ancient trees form a perfect circle around a spring of the purest water you've ever seen. Forest creatures gather here in perfect harmony - deer, rabbits, birds, and even a magnificent stag with antlers that seem to be made of living wood.",
    choices: [
      {
        text: "Drink from the sacred spring",
        action: () => {
          actions.heal(40);
          actions.addScore(75);
          actions.addAchievement("Nature's Child");
          actions.changeScene("spring_blessing");
        }
      },
      {
        text: "Approach the magnificent stag",
        action: () => actions.changeScene("stag_encounter")
      },
      {
        text: "Sit quietly and commune with nature",
        action: () => actions.changeScene("nature_meditation")
      }
    ]
  },

  fairy_realm: {
    title: "The Fairy Circle",
    description: "The rainbow path leads you into a realm of pure magic where tiny lights dance in the air like living stars. Mushrooms grow in perfect circles, and the very air shimmers with enchantment. A chorus of fairy voices fills the air with music sweeter than any earthly song.\n\nThe fairies gather around you, their laughter like tiny silver bells. 'A mortal who found our secret path!' they chime in unison. 'We offer a gift to one so clever and pure of heart.'",
    choices: [
      {
        text: "Accept the gift of enhanced wisdom",
        action: () => {
          actions.addToInventory("Fairy Wisdom");
          actions.addAchievement("Fairy Blessed");
          actions.addScore(100);
          actions.changeScene("wisdom_enhanced");
        }
      },
      {
        text: "Ask for magical protection",
        action: () => {
          actions.addToInventory("Fairy Ward");
          actions.addAchievement("Fairy Blessed");
          actions.addScore(100);
          actions.changeScene("protection_granted");
        }
      },
      {
        text: "Request strength for the trials ahead",
        action: () => {
          actions.addToInventory("Fairy Strength");
          actions.addAchievement("Fairy Blessed");
          actions.addScore(100);
          actions.changeScene("strength_bestowed");
        }
      }
    ]
  },

  wolf_dragon_wisdom: {
    title: "Ancient Counsel",
    description: "The spirit wolf shares profound wisdom about the dragon. 'Auraxes is not your enemy, young seeker. She is lonely, having watched the world forget the value of learning and wisdom. Approach her not as a conqueror, but as a student. Show her that there are still those who value knowledge over gold, and you may find not just treasure, but a teacher and friend.'",
    choices: [
      {
        text: "Ask how to prove your sincerity",
        action: () => actions.changeScene("sincerity_guidance")
      },
      {
        text: "Request the wolf's blessing for the meeting",
        action: () => {
          actions.addToInventory("Wolf's Blessing");
          actions.heal(30);
          actions.changeScene("wolf_blessed");
        }
      },
      {
        text: "Head to the temple with this knowledge",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  wisdom_enhanced: {
    title: "Gift of Fairy Wisdom",
    description: "The fairies surround you with sparkling light as their gift takes hold. Your mind feels sharper, more attuned to the subtle currents of magic and meaning that flow through the world. You understand now that wisdom is not just knowledge, but the ability to see the connections between all things.",
    choices: [
      {
        text: "Thank the fairies and continue your quest",
        action: () => actions.changeScene("forest_path")
      },
      {
        text: "Ask the fairies about the dragon",
        action: () => actions.changeScene("fairy_dragon_lore")
      }
    ]
  }
});

export const enhancedForestPath = (gameState: GameState, actions: GameActions): Scene => ({
  title: "Into the Heart of Mystery",
  description: "The forest grows denser and more magical as you venture deeper. Luminescent flowers bloom along the path, their petals glowing with soft blue light. The very air seems alive with possibility and ancient power - you can feel magical energies stirring within you, responding to this mystical place.\n\nSomewhere in the distance, you hear the melodic sound of running water, while ahead, ancient stone ruins peek through the canopy. But there's something else - a shimmering grove where the very fabric of magic seems more concentrated, calling to something deep within your soul.",
  choices: [
    {
      text: "Follow the melodic sound of water",
      action: () => actions.changeScene("crystal_stream")
    },
    {
      text: "Climb toward the ancient ruins",
      action: () => actions.changeScene("temple_approach")
    },
    {
      text: "Investigate the shimmering magical grove",
      action: () => {
        actions.addScore(25);
        actions.changeScene("magic_discovery");
      }
    },
    {
      text: "Rest and prepare for what lies ahead",
      action: () => actions.changeScene("forest_rest")
    },
    {
      text: "Search for hidden paths",
      action: () => actions.changeScene("secret_paths"),
      skillCheck: { type: 'stealth', difficulty: 3 }
    },
    {
      text: "Take time to check your progress and plan",
      action: () => actions.changeScene("rest_and_prepare")
    }
  ]
});

export const getEnhancedForestPath = (gameState: GameState, actions: GameActions): Scene => 
  enhancedForestPath(gameState, actions);
import { Scene, GameState, GameActions } from "../types/game";

export const createForestScenesPart2 = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  wolf_wisdom: {
    title: "Ancient Counsel",
    description: "The spirit wolf shares its ancient knowledge with you. 'The temple ahead holds a dragon who has forgotten joy, surrounded by treasures that mean nothing to it. The real treasure is not gold, but understanding. Approach with wisdom, not greed, and you may leave richer in ways that matter.'",
    choices: [
      {
        text: "Ask how to show wisdom to a dragon",
        action: () => actions.changeScene("dragon_wisdom_guidance")
      },
      {
        text: "Request the wolf's protection",
        action: () => actions.changeScene("spirit_wolf")
      },
      {
        text: "Thank the wolf and continue",
        action: () => actions.changeScene("forest_path")
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

  proving_learning_value: {
    title: "Demonstrating Worth",
    description: "The wolf explains how to prove that learning still matters. 'Share stories of teachers you've met, students you've seen grow, knowledge that has been preserved despite hardship. Show her that wisdom continues to light the way for those who seek it, even in dark times.'",
    choices: [
      {
        text: "Think of the hermit's dedication to knowledge",
        action: () => {
          actions.addScore(50);
          actions.changeScene("hermit_example");
        }
      },
      {
        text: "Consider your own journey of learning",
        action: () => actions.changeScene("personal_growth")
      },
      {
        text: "Head to the temple with these examples ready",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  wolf_blessed: {
    title: "Blessed by Ancient Wisdom",
    description: "The spirit wolf's blessing settles over you like a cloak of starlight. You feel more attuned to the ancient magics of the world and better prepared to understand the deeper meanings behind events. The wolf's wisdom will guide you when you need it most.",
    choices: [
      {
        text: "Continue to the temple with confidence",
        action: () => {
          actions.addScore(75);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Ask for one final piece of advice",
        action: () => actions.changeScene("final_wolf_wisdom")
      }
    ]
  },

  hermit_example: {
    title: "The Teacher's Light",
    description: "You reflect on Eldric the hermit - how he has preserved knowledge in his isolated cottage, how he shared wisdom freely with travelers, how his eyes lit up when discussing ancient lore. Here was proof that the love of learning still burns bright in the world.",
    choices: [
      {
        text: "Prepare to share this story with the dragon",
        action: () => {
          actions.addScore(50);
          actions.changeScene("story_prepared");
        }
      },
      {
        text: "Think of other examples of preserved wisdom",
        action: () => actions.changeScene("wisdom_examples")
      },
      {
        text: "Head to the temple with renewed purpose",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  personal_growth: {
    title: "Your Own Learning",
    description: "You consider your own journey - how each encounter taught you something new, how you've grown from simply seeking treasure to understanding the value of wisdom itself. Your quest has been an education in what truly matters.",
    choices: [
      {
        text: "Embrace your transformation",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Transformed Seeker");
          actions.changeScene("transformation_complete");
        }
      },
      {
        text: "Plan to share this growth with the dragon",
        action: () => actions.changeScene("growth_sharing")
      },
      {
        text: "Continue to the temple as a changed person",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  forest_secrets: {
    title: "Hidden Knowledge",
    description: "The spirit wolf reveals the forest's secrets: hidden paths, sacred groves, and the location of ancient magic. 'This knowledge is yours now,' it says. 'Use it wisely, and the forest will always welcome you as a friend.' You feel deeply connected to the mystical woodland.",
    choices: [
      {
        text: "Accept the role of forest guardian",
        action: () => {
          actions.addToInventory("Forest Guardian");
          actions.changeScene("guardian_role");
        }
      },
      {
        text: "Continue to the temple with new knowledge",
        action: () => actions.changeScene("ruins")
      },
      {
        text: "Explore the hidden paths first",
        action: () => actions.changeScene("secret_paths")
      }
    ]
  },

  guardian_role: {
    title: "Becoming a Guardian",
    description: "As you accept the role of forest guardian, you feel a deep connection form between yourself and the ancient woodland. The trees seem to whisper their approval, and you understand that you now carry the responsibility to protect this magical realm and its secrets.",
    choices: [
      {
        text: "Swear to protect the forest's wisdom",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("Forest Guardian");
          actions.changeScene("oath_sworn");
        }
      },
      {
        text: "Ask what duties this role entails",
        action: () => actions.changeScene("guardian_duties")
      },
      {
        text: "Continue your quest with this new responsibility",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  spirit_wolf: {
    title: "Guardian of the Forest",
    description: "A magnificent spectral wolf emerges from the shadows, its fur seeming to contain starlight. 'You show no fear, mortal. I am the guardian of this forest's ancient secrets. Your quest is known to me. Accept my guidance, and the path ahead will be clearer.'",
    choices: [
      {
        text: "Accept the wolf's guidance",
        action: () => {
          actions.addToInventory("Wolf's Guidance");
          actions.changeScene("wolf_ally");
        }
      },
      {
        text: "Ask about the temple's dangers",
        action: () => actions.changeScene("wolf_wisdom")
      },
      {
        text: "Politely decline and continue alone",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  wolf_ally: {
    title: "Ancient Alliance",
    description: "The spirit wolf touches your forehead with its ethereal muzzle, and suddenly you can sense the true nature of the forest around you. Hidden paths become visible, illusions fade, and you understand the sacred nature of your quest. The wolf will aid you when needed most.",
    choices: [
      {
        text: "Head directly to the temple",
        action: () => actions.changeScene("ruins")
      },
      {
        text: "Visit the crystal stream first",
        action: () => actions.changeScene("crystal_stream")
      },
      {
        text: "Explore the newfound hidden paths",
        action: () => actions.changeScene("enhanced_exploration")
      }
    ]
  },

  final_wolf_wisdom: {
    title: "Parting Words",
    description: "The spirit wolf speaks with profound gravity: 'Remember that the greatest dragons are defeated not by swords, but by understanding. The greatest treasures are not taken, but given. And the greatest adventures change not the world around you, but the person within you.'",
    choices: [
      {
        text: "Thank the wolf and carry these words with you",
        action: () => {
          actions.addScore(50);
          actions.changeScene("ruins");
        }
      },
      {
        text: "Ask the wolf to accompany you",
        action: () => actions.changeScene("wolf_companion")
      }
    ]
  },

  wolf_companion: {
    title: "The Spirit Guide",
    description: "The wolf considers your request thoughtfully. 'I cannot leave the forest, but I will send a part of my essence with you.' A smaller, translucent wolf materializes beside you. 'This spirit guide will offer counsel when you need it most.'",
    choices: [
      {
        text: "Accept the spirit guide gratefully",
        action: () => {
          actions.addToInventory("Spirit Guide");
          actions.addScore(75);
          actions.changeScene("guided_journey");
        }
      },
      {
        text: "Continue to the temple with the wolf's blessing",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  enhanced_exploration: {
    title: "Seeing with Wolf Eyes",
    description: "With your enhanced perception, you discover wonders hidden from ordinary sight: a grove where time moves differently, a spring that reflects not your appearance but your inner nature, and paths that lead to realms beyond the physical world.",
    choices: [
      {
        text: "Visit the time-touched grove",
        action: () => actions.changeScene("temporal_grove")
      },
      {
        text: "Look into the soul-reflecting spring",
        action: () => actions.changeScene("soul_spring")
      },
      {
        text: "Continue to the temple with your discoveries",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  temporal_grove: {
    title: "Where Time Stands Still",
    description: "In this grove, you witness moments from the past and future - you see the dragon as a young teacher, eager and joyful, surrounded by devoted students. You also glimpse a possible future where the temple once again bustles with learners from across the realm.",
    choices: [
      {
        text: "Focus on the vision of the young teacher",
        action: () => {
          actions.addScore(50);
          actions.changeScene("teacher_vision");
        }
      },
      {
        text: "Study the future of renewed learning",
        action: () => actions.changeScene("future_school")
      },
      {
        text: "Leave with hope for what could be",
        action: () => actions.changeScene("ruins")
      }
    ]
  },

  soul_spring: {
    title: "Mirror of the Heart",
    description: "As you gaze into the spring, you see your inner self reflected back. You observe how your journey has changed you - from a simple treasure seeker to someone who values wisdom, compassion, and the welfare of others above personal gain.",
    choices: [
      {
        text: "Embrace your transformed nature",
        action: () => {
          actions.addScore(100);
          actions.addAchievement("True Self Discovered");
          actions.changeScene("self_acceptance");
        }
      },
      {
        text: "Drink from the spring to strengthen this change",
        action: () => actions.changeScene("soul_strengthening")
      },
      {
        text: "Continue to the temple with clear self-knowledge",
        action: () => actions.changeScene("ruins")
      }
    ]
  }
});
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
import { Scene, GameState, GameActions } from "../types/game";

export const createTempleScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  temple_approach: {
    title: "The Temple of Trials",
    description: "Before you rises a magnificent temple carved from midnight-black stone, its surface covered in glowing runes that pulse with ancient power. Two massive doors dominate the entrance - one sealed with intricate locks and protective spells, the other standing slightly ajar.\n\nEven from a distance, you can sense the immense presence within - ancient, powerful, and utterly alert to your approach. The very stones seem to whisper warnings and challenges.",
    choices: gameState.hasKey ? [
      {
        text: "Use the Ancient Key on the sealed door",
        action: () => {
          actions.addScore(75);
          actions.changeScene("secret_entrance");
        }
      },
      {
        text: "Enter through the open door",
        action: () => actions.changeScene("main_hall")
      },
      {
        text: "Study the protective runes",
        action: () => actions.changeScene("rune_study"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      }
    ] : [
      {
        text: "Enter through the open door",
        action: () => actions.changeScene("main_hall")
      },
      {
        text: "Search for another entrance",
        action: () => actions.changeScene("hidden_entrance"),
        skillCheck: { type: 'stealth', difficulty: 4 }
      },
      {
        text: "Study the protective runes",
        action: () => actions.changeScene("rune_study"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      }
    ]
  },

  secret_entrance: {
    title: "The Scholars' Path",
    description: "The Ancient Key turns smoothly in the lock, and the sealed door opens to reveal a passage that glows with soft, welcoming light. This route was clearly designed for those who approached with wisdom rather than force.\n\nThe passage is lined with beautiful murals depicting the history of learning and the great scholars who once studied here. You can sense that this path leads to chambers where you can prove your dedication to knowledge before meeting the dragon.",
    choices: [
      {
        text: "Follow the scholars' path",
        action: () => {
          actions.addScore(50);
          actions.changeScene("learning_chambers");
        }
      },
      {
        text: "Study the murals for hidden knowledge",
        action: () => actions.changeScene("mural_study"),
        skillCheck: { type: 'wisdom', difficulty: 3 }
      }
    ]
  },

  learning_chambers: {
    title: "The Hall of Ancient Knowledge",
    description: "The path leads you through a series of chambers filled with ancient books, scrolls, and artifacts of learning. The very air hums with accumulated wisdom. In one chamber, you find a test - a series of riddles carved into stone tablets that seem to evaluate not just intelligence, but wisdom and compassion.",
    choices: [
      {
        text: "Attempt to solve the wisdom riddles",
        action: () => actions.changeScene("wisdom_riddles"),
        skillCheck: { type: 'wisdom', difficulty: 4 }
      },
      {
        text: "Study the ancient texts",
        action: () => {
          actions.addToInventory("Ancient Wisdom");
          actions.addScore(75);
          actions.changeScene("knowledge_gained");
        }
      },
      {
        text: "Continue toward the dragon's chamber",
        action: () => actions.changeScene("respectful_approach")
      }
    ]
  },

  wisdom_riddles: {
    title: "Test of True Understanding",
    description: "The stone tablets present three riddles:\n\n'What grows stronger when shared, yet costs nothing to give?'\n\n'What conquers all enemies without violence?'\n\n'What is the treasure that makes its keeper rich by giving it away?'\n\nYou sense that these riddles test not just cleverness, but understanding of the deeper truths that guide a wise heart.",
    choices: [
      {
        text: "Answer: Knowledge, Love, and Wisdom",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Sage of Riddles");
          actions.changeScene("riddles_mastered");
        }
      },
      {
        text: "Answer: Friendship, Peace, and Kindness",
        action: () => {
          actions.addScore(100);
          actions.changeScene("close_understanding");
        }
      },
      {
        text: "Admit you need more time to understand",
        action: () => actions.changeScene("humble_learning")
      }
    ]
  },

  rune_study: {
    title: "Ancient Inscriptions",
    description: "The glowing runes tell the temple's history in symbols of power and beauty. You learn that this place was once called the 'Temple of Harmony,' where dragons and humans worked together to preserve knowledge for future generations.\n\nThe runes also reveal that Auraxes is not just guarding treasure, but testing each visitor to see if they're worthy to inherit the responsibility of protecting wisdom itself.",
    choices: [
      {
        text: "Enter with deep respect for the temple's purpose",
        action: () => {
          actions.addScore(50);
          actions.changeScene("reverent_entry");
        }
      },
      {
        text: "Use the Ancient Key with newfound understanding",
        action: () => actions.changeScene("secret_entrance"),
        condition: () => gameState.hasKey
      },
      {
        text: "Enter through the main door as a seeker of wisdom",
        action: () => actions.changeScene("main_hall")
      }
    ]
  },

  main_hall: {
    title: "The Dragon's Domain",
    description: "You step into a vast chamber illuminated by floating orbs of magical light. Ancient tapestries line the walls, depicting the history of knowledge and learning throughout the ages. In the center of this magnificent hall rests Auraxes the Ancient - a dragon of impossible beauty and majesty.\n\nHer scales shimmer like molten gold, and her eyes hold the accumulated wisdom of a thousand years. Ancient books and scrolls surround her like a living library. She raises her great head as you enter, and her voice resonates with power and intelligence.\n\n'Another seeker comes before me. Tell me, young one - what brings you to my domain?'",
    choices: [
      {
        text: "State that you seek wisdom above all treasure",
        action: () => {
          actions.addScore(100);
          actions.changeScene("wisdom_seeker");
        }
      },
      {
        text: "Draw your sword and prepare for battle",
        action: () => actions.changeScene("dragon_combat"),
        condition: () => gameState.hasSword,
        skillCheck: { type: 'courage', difficulty: 5 }
      },
      {
        text: "Approach with respect and humility",
        action: () => actions.changeScene("respectful_approach")
      },
      {
        text: "Offer a gift as tribute",
        action: () => actions.changeScene("tribute_offering"),
        condition: () => gameState.inventory.length > 0
      }
    ]
  },

  hidden_entrance: {
    title: "Secret Passages",
    description: "Your careful searching reveals a narrow passage concealed behind centuries of ivy growth. The passage appears to lead around the main chamber, possibly offering a way to observe before being observed.\n\nAs you examine the entrance, you notice it's carved with symbols suggesting it was meant for scholars and messengers, not intruders.",
    choices: [
      {
        text: "Use the passage to observe the dragon first",
        action: () => actions.changeScene("dragon_observation")
      },
      {
        text: "Enter respectfully through the main door instead",
        action: () => actions.changeScene("main_hall")
      },
      {
        text: "Search for other entrances",
        action: () => actions.changeScene("temple_exploration")
      }
    ]
  },

  dragon_observation: {
    title: "The Teacher in Solitude",
    description: "From your hidden vantage point, you observe Auraxes in her natural state. Rather than the fearsome beast you expected, you see an ancient scholar surrounded by books and artifacts. She reads from ancient tomes, occasionally sighing with what sounds like loneliness.\n\nYou witness her caring for the ancient knowledge, preserving scrolls and protecting artifacts with the devotion of a librarian. This is clearly not a monster, but a guardian of learning.",
    choices: [
      {
        text: "Enter openly and respectfully",
        action: () => {
          actions.addScore(75);
          actions.changeScene("understanding_approach");
        }
      },
      {
        text: "Announce yourself as a fellow scholar",
        action: () => actions.changeScene("scholarly_introduction")
      },
      {
        text: "Wait and observe more",
        action: () => actions.changeScene("deeper_observation")
      }
    ]
  },

  balance_solution: {
    title: "The Path of Harmony",
    description: "Your choice of the balance and harmony sequence causes the temple stones to resonate with a deep, musical tone. The air fills with golden light as hidden mechanisms activate, revealing a passage marked with symbols of peace and understanding.\n\nThis path represents the middle way - neither pure force nor pure wisdom, but the balance between all virtues. As you step forward, you feel a sense of profound equilibrium.",
    choices: [
      {
        text: "Enter the harmony passage",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Seeker of Balance");
          actions.changeScene("harmony_chamber");
        }
      },
      {
        text: "Study the symbols more carefully",
        action: () => actions.changeScene("symbol_study")
      }
    ]
  },

  master_solution: {
    title: "The Unity of All Paths",
    description: "By attempting to activate both sequences simultaneously, you demonstrate an understanding that transcends simple choices. The temple responds with wonder - all stones begin to glow in perfect harmony, and multiple passages open before you.\n\nYou have discovered that the greatest wisdom lies not in choosing one path over another, but in understanding how all virtues work together to create something greater than their parts.",
    choices: [
      {
        text: "Enter the combined passage of all virtues",
        action: () => {
          actions.addScore(150);
          actions.addAchievement("Master of Wisdom");
          actions.changeScene("master_chamber");
        }
      },
      {
        text: "Share this discovery with the dragon",
        action: () => actions.changeScene("unity_sharing")
      }
    ]
  }
});
