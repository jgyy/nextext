// src/app/page.tsx
"use client";

import { useState } from "react";

interface GameState {
  currentScene: string;
  inventory: string[];
  health: number;
  hasKey: boolean;
  hasSword: boolean;
  hasPotion: boolean;
  hasBlessing: boolean;
  gameOver: boolean;
  victory: boolean;
  dragonDefeated: boolean;
  unicornMet: boolean;
}

interface Choice {
  text: string;
  action: () => void;
  condition?: () => boolean;
}

interface Scene {
  title: string;
  description: string;
  choices: Choice[];
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: "start",
    inventory: [],
    health: 100,
    hasKey: false,
    hasSword: false,
    hasPotion: false,
    hasBlessing: false,
    gameOver: false,
    victory: false,
    dragonDefeated: false,
    unicornMet: false,
  });

  const addToInventory = (item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
      ...(item === "Ancient Key" && { hasKey: true }),
      ...(item === "Enchanted Sword" && { hasSword: true }),
      ...(item === "Healing Potion" && { hasPotion: true }),
      ...(item === "Unicorn's Blessing" && { hasBlessing: true }),
    }));
  };

  const removeFromInventory = (item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(i => i !== item),
      ...(item === "Healing Potion" && { hasPotion: false }),
    }));
  };

  const takeDamage = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.max(0, prev.health - amount),
      gameOver: prev.health - amount <= 0,
    }));
  };

  const heal = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.min(100, prev.health + amount),
    }));
  };

  const changeScene = (sceneId: string) => {
    setGameState(prev => ({ ...prev, currentScene: sceneId }));
  };

  const restartGame = () => {
    setGameState({
      currentScene: "start",
      inventory: [],
      health: 100,
      hasKey: false,
      hasSword: false,
      hasPotion: false,
      hasBlessing: false,
      gameOver: false,
      victory: false,
      dragonDefeated: false,
      unicornMet: false,
    });
  };

  const scenes: Record<string, Scene> = {
    start: {
      title: "The Enchanted Forest",
      description: "You stand at the edge of a mystical forest. Ancient trees tower above you, their branches swaying in an otherworldly breeze. A worn path leads deeper into the woods, while to your right, you notice a small cottage with smoke rising from its chimney.",
      choices: [
        {
          text: "Follow the path into the forest",
          action: () => changeScene("forest_path")
        },
        {
          text: "Approach the cottage",
          action: () => changeScene("cottage")
        },
        {
          text: "Search the area around you",
          action: () => changeScene("search_start")
        }
      ]
    },

    cottage: {
      title: "The Hermit's Cottage",
      description: "An old hermit opens the door before you can knock. His eyes twinkle with ancient wisdom. 'I've been expecting you, traveler. The forest holds many dangers, but I can offer you aid.' He gestures to a table with various items.",
      choices: [
        {
          text: "Ask about the forest",
          action: () => changeScene("hermit_info")
        },
        {
          text: "Request a weapon",
          action: () => {
            addToInventory("Enchanted Sword");
            changeScene("got_sword");
          },
          condition: () => !gameState.hasSword
        },
        {
          text: "Ask for healing supplies",
          action: () => {
            addToInventory("Healing Potion");
            changeScene("got_potion");
          },
          condition: () => !gameState.hasPotion
        },
        {
          text: "Thank him and leave",
          action: () => changeScene("forest_path")
        }
      ]
    },

    hermit_info: {
      title: "Ancient Knowledge",
      description: "The hermit strokes his long beard. 'Deep in the forest lies an ancient temple guarded by a fearsome dragon. Legend speaks of a treasure that grants the finder their heart's desire. But beware - many have entered, none have returned.' He pauses. 'You'll need both courage and cunning to succeed.'",
      choices: [
        {
          text: "Ask for a weapon",
          action: () => {
            addToInventory("Enchanted Sword");
            changeScene("got_sword");
          },
          condition: () => !gameState.hasSword
        },
        {
          text: "Request healing supplies",
          action: () => {
            addToInventory("Healing Potion");
            changeScene("got_potion");
          },
          condition: () => !gameState.hasPotion
        },
        {
          text: "Ask about the temple specifically",
          action: () => changeScene("temple_info")
        },
        {
          text: "Thank him and leave for the forest",
          action: () => changeScene("forest_path")
        }
      ]
    },

    temple_info: {
      title: "Temple Secrets",
      description: "The hermit's expression grows grave. 'The temple has two entrances - the main hall where the dragon dwells, and a secret door that requires an ancient key. There are also rumors of magical creatures in the forest who might aid you.' He leans closer. 'The dragon is not evil, merely protective. Sometimes wisdom succeeds where force fails.'",
      choices: [
        {
          text: "Ask about the ancient key",
          action: () => changeScene("key_info")
        },
        {
          text: "Inquire about magical creatures",
          action: () => changeScene("creature_info")
        },
        {
          text: "Head into the forest",
          action: () => changeScene("forest_path")
        }
      ]
    },

    key_info: {
      title: "The Ancient Key",
      description: "The hermit nods knowingly. 'The key is hidden somewhere at the forest's edge, among the roots of the oldest trees. It bears mystical runes and pulses with magical energy. Finding it requires a keen eye and patient searching.'",
      choices: [
        {
          text: "Return to search for the key",
          action: () => changeScene("search_start")
        },
        {
          text: "Ask about magical creatures instead",
          action: () => changeScene("creature_info")
        },
        {
          text: "Head directly to the forest",
          action: () => changeScene("forest_path")
        }
      ]
    },

    creature_info: {
      title: "Magical Allies",
      description: "The hermit smiles warmly. 'A unicorn dwells by the crystal stream - pure souls may earn its blessing. There are also wise spirits in the ruins who test travelers' worthiness. Even the dragon itself may show mercy to those who approach with respect rather than aggression.'",
      choices: [
        {
          text: "Head to the forest to find the stream",
          action: () => changeScene("forest_path")
        },
        {
          text: "Ask about the ancient key",
          action: () => changeScene("key_info")
        },
        {
          text: "Request supplies before leaving",
          action: () => changeScene("cottage")
        }
      ]
    },

    got_sword: {
      title: "Armed and Ready",
      description: "The hermit hands you a beautifully crafted sword that seems to hum with magical energy. 'This blade has been in my family for generations. It will serve you well against the creatures of darkness.' You feel more confident with the weapon at your side.",
      choices: [
        {
          text: "Head into the forest",
          action: () => changeScene("forest_path")
        },
        {
          text: "Ask about the temple",
          action: () => changeScene("temple_info")
        },
        {
          text: "Request healing supplies as well",
          action: () => {
            addToInventory("Healing Potion");
            changeScene("fully_equipped");
          },
          condition: () => !gameState.hasPotion
        }
      ]
    },

    got_potion: {
      title: "Healing Gift",
      description: "The hermit gives you a small vial filled with glowing blue liquid. 'This potion will restore your health when you need it most. Use it wisely, for I have only one.' The potion feels warm in your hands.",
      choices: [
        {
          text: "Head into the forest",
          action: () => changeScene("forest_path")
        },
        {
          text: "Ask about the temple",
          action: () => changeScene("temple_info")
        },
        {
          text: "Request a weapon as well",
          action: () => {
            addToInventory("Enchanted Sword");
            changeScene("fully_equipped");
          },
          condition: () => !gameState.hasSword
        }
      ]
    },

    fully_equipped: {
      title: "Fully Prepared",
      description: "The hermit nods approvingly as you now carry both sword and potion. 'You are well-prepared, brave adventurer. May fortune smile upon your quest.' With both weapon and healing at your disposal, you feel ready for whatever challenges await.",
      choices: [
        {
          text: "Venture into the forest",
          action: () => changeScene("forest_path")
        },
        {
          text: "Ask final questions about the temple",
          action: () => changeScene("temple_info")
        }
      ]
    },

    search_start: {
      title: "Hidden Discovery",
      description: "Among the roots of an ancient oak tree, you discover a small, ornate key covered in strange runes. It seems to pulse with a faint magical energy. This could be important for your journey ahead.",
      choices: [
        {
          text: "Take the key",
          action: () => {
            addToInventory("Ancient Key");
            changeScene("found_key");
          }
        },
        {
          text: "Leave the key and visit the cottage",
          action: () => changeScene("cottage")
        },
        {
          text: "Leave the key and enter the forest",
          action: () => changeScene("forest_path")
        }
      ]
    },

    found_key: {
      title: "Ancient Power",
      description: "As you pick up the key, mystical runes along its surface glow brightly for a moment. You feel a surge of ancient magic - this key has been waiting for someone worthy to claim it. Your quest now has new possibilities.",
      choices: [
        {
          text: "Head to the forest with the key",
          action: () => changeScene("forest_path")
        },
        {
          text: "Visit the hermit to learn about the key",
          action: () => changeScene("cottage")
        }
      ]
    },

    forest_path: {
      title: "Deeper Into Mystery",
      description: "The forest grows darker as you venture deeper. Shafts of golden sunlight pierce through the canopy above. You hear the distant sound of running water and notice two paths branching ahead - one leads toward the sound of water, the other climbs uphill toward what appears to be ancient stone ruins.",
      choices: [
        {
          text: "Follow the sound of water",
          action: () => changeScene("river")
        },
        {
          text: "Climb toward the ruins",
          action: () => changeScene("ruins")
        },
        {
          text: "Rest and examine your inventory",
          action: () => changeScene("inventory_check")
        },
        {
          text: "Look for alternative paths",
          action: () => changeScene("hidden_paths")
        }
      ]
    },

    inventory_check: {
      title: "Taking Stock",
      description: `You pause to examine your belongings and assess your situation. Health: ${gameState.health}/100. ${gameState.inventory.length > 0 ? `You carry: ${gameState.inventory.join(", ")}.` : "Your hands are empty."} The forest around you hums with magical energy, and you sense great adventures ahead.`,
      choices: [
        {
          text: "Use Healing Potion",
          action: () => {
            heal(50);
            removeFromInventory("Healing Potion");
            changeScene("used_potion");
          },
          condition: () => gameState.hasPotion && gameState.health < 100
        },
        {
          text: "Continue to the stream",
          action: () => changeScene("river")
        },
        {
          text: "Head to the temple ruins",
          action: () => changeScene("ruins")
        },
        {
          text: "Return to the hermit's cottage",
          action: () => changeScene("cottage")
        }
      ]
    },

    used_potion: {
      title: "Magical Healing",
      description: "The potion's warm liquid flows through you, healing your wounds and restoring your strength. You feel refreshed and ready to continue your adventure. The empty vial crumbles to dust in your hands, its magic spent.",
      choices: [
        {
          text: "Continue to the stream",
          action: () => changeScene("river")
        },
        {
          text: "Head to the temple ruins",
          action: () => changeScene("ruins")
        }
      ]
    },

    hidden_paths: {
      title: "Secret Ways",
      description: "Your careful searching reveals a narrow, overgrown trail winding between massive tree trunks. Moss-covered stones suggest this was once a formal path. You also notice claw marks on nearby trees - something large has passed this way recently.",
      choices: [
        {
          text: "Follow the hidden trail",
          action: () => changeScene("secret_grove")
        },
        {
          text: "Investigate the claw marks",
          action: () => changeScene("beast_tracks")
        },
        {
          text: "Return to the main paths",
          action: () => changeScene("forest_path")
        }
      ]
    },

    secret_grove: {
      title: "The Fairy Circle",
      description: "The hidden path leads to a magical grove where mushrooms grow in a perfect circle. Tiny lights dance in the air - forest fairies! They chime like silver bells: 'A gift for the brave traveler who found our secret place!' They offer you a choice of enchantments.",
      choices: [
        {
          text: "Accept enhanced strength",
          action: () => {
            addToInventory("Fairy Strength");
            changeScene("fairy_gift");
          }
        },
        {
          text: "Request protection from harm",
          action: () => {
            addToInventory("Fairy Ward");
            changeScene("fairy_gift");
          }
        },
        {
          text: "Ask for wisdom and insight",
          action: () => {
            addToInventory("Fairy Wisdom");
            changeScene("fairy_gift");
          }
        }
      ]
    },

    fairy_gift: {
      title: "Blessed by Magic",
      description: "The fairies surround you with sparkling light as their gift takes effect. You feel changed, empowered for the challenges ahead. The fairies giggle and fade away, leaving only the memory of their kindness and the lingering scent of wildflowers.",
      choices: [
        {
          text: "Continue to the temple",
          action: () => changeScene("ruins")
        },
        {
          text: "Seek the crystal stream",
          action: () => changeScene("river")
        }
      ]
    },

    beast_tracks: {
      title: "Predator's Trail",
      description: "Following the claw marks, you discover they belong to a massive wolf, but these tracks are strangely glowing with magical energy. This is no ordinary beast. You hear a low growl from nearby bushes - you're being watched.",
      choices: [
        {
          text: "Approach peacefully with open hands",
          action: () => changeScene("spirit_wolf")
        },
        {
          text: "Draw your weapon defensively",
          action: () => changeScene("wolf_confrontation"),
          condition: () => gameState.hasSword
        },
        {
          text: "Back away slowly",
          action: () => changeScene("forest_path")
        },
        {
          text: "Try to communicate",
          action: () => changeScene("wolf_communication")
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
            addToInventory("Wolf's Guidance");
            changeScene("wolf_ally");
          }
        },
        {
          text: "Ask about the temple's dangers",
          action: () => changeScene("wolf_wisdom")
        },
        {
          text: "Politely decline and continue alone",
          action: () => changeScene("forest_path")
        }
      ]
    },

    wolf_ally: {
      title: "Ancient Alliance",
      description: "The spirit wolf touches your forehead with its ethereal muzzle, and suddenly you can sense the true nature of the forest around you. Hidden paths become visible, illusions fade, and you understand the sacred nature of your quest. The wolf will aid you when needed most.",
      choices: [
        {
          text: "Head directly to the temple",
          action: () => changeScene("ruins")
        },
        {
          text: "Visit the crystal stream first",
          action: () => changeScene("river")
        }
      ]
    },

    river: {
      title: "The Crystal Stream",
      description: "You emerge at a beautiful crystal-clear stream. The water sparkles like diamonds in the sunlight. As you approach, you notice something glinting beneath the surface. Suddenly, a majestic unicorn appears on the opposite bank, its horn glowing softly.",
      choices: [
        {
          text: "Approach the unicorn carefully",
          action: () => {
            setGameState(prev => ({ ...prev, unicornMet: true }));
            changeScene("unicorn_encounter");
          }
        },
        {
          text: "Try to retrieve the object from the water",
          action: () => changeScene("water_treasure")
        },
        {
          text: "Drink from the stream",
          action: () => {
            heal(25);
            changeScene("magical_healing");
          }
        }
      ]
    },

    water_treasure: {
      title: "Sunken Treasure",
      description: "You wade into the cool stream and retrieve a beautiful crystal pendant from the streambed. The moment you touch it, visions flash through your mind - ancient battles, forgotten magic, and the true history of the temple. The pendant pulses with power.",
      choices: [
        {
          text: "Wear the pendant",
          action: () => {
            addToInventory("Crystal of Visions");
            changeScene("vision_gained");
          }
        },
        {
          text: "Approach the unicorn while holding the crystal",
          action: () => {
            addToInventory("Crystal of Visions");
            setGameState(prev => ({ ...prev, unicornMet: true }));
            changeScene("unicorn_crystal");
          }
        },
        {
          text: "Leave the crystal and approach the unicorn",
          action: () => {
            setGameState(prev => ({ ...prev, unicornMet: true }));
            changeScene("unicorn_encounter");
          }
        }
      ]
    },

    vision_gained: {
      title: "Ancient Memories",
      description: "The crystal pendant shows you visions of the past: the temple was once a place of learning, the dragon was its guardian and teacher, not a monster. The treasure it guards is knowledge itself - the power to bring peace to the realm. This changes everything.",
      choices: [
        {
          text: "Seek the unicorn's wisdom about the visions",
          action: () => {
            setGameState(prev => ({ ...prev, unicornMet: true }));
            changeScene("unicorn_encounter");
          }
        },
        {
          text: "Head to the temple with new understanding",
          action: () => changeScene("ruins")
        }
      ]
    },

    unicorn_crystal: {
      title: "Resonance of Pure Magic",
      description: "The unicorn's horn glows brighter as you approach with the crystal. 'Ah, you have found the Crystal of Visions. Now you understand the true nature of your quest. The dragon is not your enemy, seeker. Will you choose the path of wisdom or the path of force?'",
      choices: [
        {
          text: "Ask the unicorn to guide you to wisdom",
          action: () => changeScene("unicorn_wisdom")
        },
        {
          text: "Request the unicorn's blessing",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Continue to the temple with your new knowledge",
          action: () => changeScene("ruins")
        }
      ]
    },

    magical_healing: {
      title: "Blessed Waters",
      description: "The stream's magical waters restore some of your health and energy. You feel refreshed and more attuned to the forest's mystical energies. The unicorn on the far bank watches you with approval, recognizing your respect for the sacred waters.",
      choices: [
        {
          text: "Cross the stream to approach the unicorn",
          action: () => {
            setGameState(prev => ({ ...prev, unicornMet: true }));
            changeScene("unicorn_encounter");
          }
        },
        {
          text: "Search the stream for hidden items",
          action: () => changeScene("water_treasure")
        },
        {
          text: "Continue to the temple ruins",
          action: () => changeScene("ruins")
        }
      ]
    },

    unicorn_encounter: {
      title: "Mystical Meeting",
      description: "The unicorn regards you with intelligent, ancient eyes. It speaks in a voice like silver bells: 'Pure of heart, I sense you are. The temple ahead holds great danger, but also great reward. I offer you my blessing.' A warm, golden light surrounds you.",
      choices: [
        {
          text: "Accept the blessing gratefully",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Ask about the temple",
          action: () => changeScene("unicorn_wisdom")
        },
        {
          text: "Inquire about the dragon",
          action: () => changeScene("unicorn_dragon_info")
        },
        {
          text: "Politely decline and continue your journey",
          action: () => changeScene("ruins")
        }
      ]
    },

    unicorn_wisdom: {
      title: "Ancient Counsel",
      description: "The unicorn's voice carries the wisdom of ages. 'The dragon you will face is ancient and wise, not evil as many believe. It guards knowledge that could heal the world's wounds. Approach with respect, not aggression, and you may find a teacher rather than an enemy. The choice of how to proceed will define not just your fate, but your character.'",
      choices: [
        {
          text: "Request the unicorn's blessing for wisdom",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Ask how to show proper respect to the dragon",
          action: () => changeScene("respect_guidance")
        },
        {
          text: "Thank the unicorn and head to the temple",
          action: () => changeScene("ruins")
        }
      ]
    },

    unicorn_dragon_info: {
      title: "Dragon's Truth",
      description: "The unicorn's expression grows solemn. 'The dragon Auraxes has guarded the temple for a thousand years. Once, it was a teacher to kings and scholars. Loneliness and the loss of its students to war and time have made it fierce. Show it that learning and wisdom still have value in this world.'",
      choices: [
        {
          text: "Ask how to prove your worth to the dragon",
          action: () => changeScene("proving_worth")
        },
        {
          text: "Request magical protection",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Head to the temple with this knowledge",
          action: () => changeScene("ruins")
        }
      ]
    },

    respect_guidance: {
      title: "The Art of Respect",
      description: "The unicorn nods sagely. 'Enter the dragon's domain with humility. Speak of your desire to learn, not to take. Show that you value knowledge over gold, wisdom over power. If you have found artifacts of learning or beauty, offer them as tokens of respect. The dragon will sense your true intentions.'",
      choices: [
        {
          text: "Accept the unicorn's blessing",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Proceed to the temple with this wisdom",
          action: () => changeScene("ruins")
        }
      ]
    },

    proving_worth: {
      title: "Tests of Character",
      description: "The unicorn explains: 'The dragon values courage, wisdom, and compassion above all. It will test not your strength in battle, but your character under pressure. Answer its riddles thoughtfully, show mercy when offered the chance for vengeance, and demonstrate that you seek to use power to help others, not yourself.'",
      choices: [
        {
          text: "Request the unicorn's blessing for the trials ahead",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Ask if there are any specific riddles to prepare for",
          action: () => changeScene("riddle_hints")
        },
        {
          text: "Head to the temple feeling prepared",
          action: () => changeScene("ruins")
        }
      ]
    },

    riddle_hints: {
      title: "Ancient Riddles",
      description: "The unicorn shares whispered wisdom: 'Dragons love riddles of paradox and wisdom. They might ask: What grows stronger when shared? What is more valuable than gold but costs nothing to give? What conquers all enemies without violence? Remember - the answers often lie in the virtues you already possess.'",
      choices: [
        {
          text: "Accept the blessing and face the challenges",
          action: () => {
            heal(50);
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Proceed to the temple with confidence",
          action: () => changeScene("ruins")
        }
      ]
    },

    blessed: {
      title: "Divine Protection",
      description: "You feel the unicorn's blessing flow through you like warm sunlight. Your health is restored, and you sense that you're now protected from lesser evils. The unicorn nods regally before disappearing into the forest like morning mist.",
      choices: [
        {
          text: "Continue to the temple ruins",
          action: () => changeScene("ruins")
        },
        {
          text: "Explore the stream area further",
          action: () => changeScene("water_treasure")
        }
      ]
    },

    ruins: {
      title: "The Ancient Temple",
      description: "Before you stands a magnificent temple carved from black stone, covered in glowing runes. Two massive doors bar your entrance - one requires a key and glows with protective magic, the other stands slightly ajar but you can hear the low rumble of something massive within.",
      choices: gameState.hasKey ? [
        {
          text: "Use the Ancient Key on the locked door",
          action: () => changeScene("secret_entrance")
        },
        {
          text: "Enter through the open door",
          action: () => changeScene("main_entrance")
        },
        {
          text: "Study the runes on the temple walls",
          action: () => changeScene("rune_study")
        }
      ] : [
        {
          text: "Enter through the open door",
          action: () => changeScene("main_entrance")
        },
        {
          text: "Search for another way in",
          action: () => changeScene("search_entrance")
        },
        {
          text: "Study the runes on the temple walls",
          action: () => changeScene("rune_study")
        }
      ]
    },

    rune_study: {
      title: "Ancient Inscriptions",
      description: "The glowing runes tell the temple's history: 'Here dwells Auraxes the Wise, Guardian of Knowledge, Teacher of Kings. Enter with respect and leave with wisdom. Those who seek only treasure shall find only themselves.' The runes pulse brighter as you read, as if responding to your attention.",
      choices: [
        {
          text: "Enter the main chamber with respectful intent",
          action: () => changeScene("main_entrance")
        },
        {
          text: "Use the Ancient Key if you have it",
          action: () => changeScene("secret_entrance"),
          condition: () => gameState.hasKey
        },
        {
          text: "Search for hidden entrances",
          action: () => changeScene("search_entrance")
        }
      ]
    },

    search_entrance: {
      title: "Hidden Passages",
      description: "Your careful search reveals a narrow side passage partially concealed by overgrown vines. Ancient carvings suggest this was once used by temple scholars. The passage is dark but appears to lead around the main chamber. You also notice that some temple stones can be pressed like buttons.",
      choices: [
        {
          text: "Enter through the hidden passage",
          action: () => changeScene("scholar_path")
        },
        {
          text: "Try pressing the moveable stones",
          action: () => changeScene("stone_puzzle")
        },
        {
          text: "Return to the main entrance",
          action: () => changeScene("main_entrance")
        }
      ]
    },

    scholar_path: {
      title: "The Scholar's Route",
      description: "The narrow passage leads to a small chamber filled with ancient books and scrolls. Dust motes dance in shafts of light from hidden openings above. This was clearly a study area. A passage continues deeper, and you can hear the dragon's breathing echoing from the main chamber nearby.",
      choices: [
        {
          text: "Study the ancient texts",
          action: () => changeScene("ancient_knowledge")
        },
        {
          text: "Continue through the passage to approach the dragon",
          action: () => changeScene("scholar_entrance")
        },
        {
          text: "Return to the temple entrance",
          action: () => changeScene("ruins")
        }
      ]
    },

    ancient_knowledge: {
      title: "Forbidden Wisdom",
      description: "The ancient texts reveal incredible secrets: spells of healing, the true names of stars, and the location of other magical places. One tome describes the dragon Auraxes as the last of the Great Teachers, who once instructed heroes in the arts of wisdom and compassion. This knowledge could be invaluable.",
      choices: [
        {
          text: "Take the most important tome",
          action: () => {
            addToInventory("Ancient Wisdom");
            changeScene("scholar_entrance");
          }
        },
        {
          text: "Memorize key passages and continue",
          action: () => changeScene("scholar_entrance")
        },
        {
          text: "Leave the books undisturbed and retreat",
          action: () => changeScene("ruins")
        }
      ]
    },

    scholar_entrance: {
      title: "The Learned Approach",
      description: "You emerge from the scholar's passage into the main chamber. The dragon Auraxes notices your arrival from this particular entrance and its massive head turns toward you with curiosity rather than hostility. 'Ah,' it rumbles, 'someone who chooses the path of learning. How... refreshing.'",
      choices: [
        {
          text: "Greet the dragon respectfully",
          action: () => changeScene("respectful_greeting")
        },
        {
          text: "Offer to share the knowledge you've gained",
          action: () => changeScene("knowledge_exchange"),
          condition: () => gameState.inventory.includes("Ancient Wisdom")
        },
        {
          text: "Ask to become the dragon's student",
          action: () => changeScene("student_request")
        }
      ]
    },

    stone_puzzle: {
      title: "The Temple's Test",
      description: "As you press different stones, runes light up in sequence. This appears to be a puzzle that tests knowledge of ancient lore. The patterns suggest questions about virtue, wisdom, and the proper use of power. Solving it correctly might open a new path.",
      choices: [
        {
          text: "Press stones representing wisdom, compassion, courage",
          action: () => changeScene("puzzle_success")
        },
        {
          text: "Press stones representing strength, gold, power",
          action: () => changeScene("puzzle_failure")
        },
        {
          text: "Study the pattern more carefully",
          action: () => changeScene("puzzle_study")
        }
      ]
    },

    puzzle_success: {
      title: "Wisdom Rewarded",
      description: "The stones glow brilliantly and a hidden door slides open, revealing a beautiful chamber filled with crystalline formations. The crystals hum with magical energy, and you realize this is a place of meditation and power. A path leads from here directly to the treasure chamber.",
      choices: [
        {
          text: "Enter the crystal chamber",
          action: () => changeScene("crystal_chamber")
        },
        {
          text: "Take time to meditate among the crystals",
          action: () => {
            heal(30);
            addToInventory("Crystal Harmony");
            changeScene("crystal_meditation");
          }
        }
      ]
    },

    crystal_chamber: {
      title: "Hall of Resonance",
      description: "The crystal chamber amplifies your magical awareness. You can sense the dragon's presence more clearly - it is indeed ancient and wise, lonely but not malevolent. The path ahead leads to the treasure chamber, but you also sense you could communicate with the dragon from here.",
      choices: [
        {
          text: "Proceed to the treasure chamber",
          action: () => changeScene("treasure_chamber")
        },
        {
          text: "Use the crystals to communicate with the dragon",
          action: () => changeScene("crystal_communication")
        }
      ]
    },

    crystal_communication: {
      title: "Minds Across Distance",
      description: "Using the crystals' power, you project your thoughts to the dragon. Auraxes responds with surprise and pleasure: 'It has been centuries since anyone used the crystal communion. You show promise, young seeker. Will you face me in person with the same wisdom you show here?'",
      choices: [
        {
          text: "Accept the dragon's invitation to meet",
          action: () => changeScene("invited_meeting")
        },
        {
          text: "Ask the dragon about the true treasure",
          action: () => changeScene("treasure_truth")
        },
        {
          text: "Request permission to take the treasure",
          action: () => changeScene("permission_request")
        }
      ]
    },

    secret_entrance: {
      title: "The Hidden Path",
      description: "The ancient key turns smoothly in the lock. The door opens to reveal a hidden passage that glows with soft blue light. This route appears safer and leads directly to the treasure chamber. You can see the legendary Golden Orb floating on a pedestal ahead, but something seems different about it now.",
      choices: [
        {
          text: "Approach the Golden Orb carefully",
          action: () => changeScene("trap_check")
        },
        {
          text: "Examine the chamber for other treasures",
          action: () => changeScene("treasure_examination")
        },
        {
          text: "Call out to announce your presence respectfully",
          action: () => changeScene("respectful_arrival")
        }
      ]
    },

    trap_check: {
      title: "Careful Examination",
      description: "Your cautious approach reveals that the chamber is not trapped, but rather protected by an illusion. The Golden Orb appears to be a test - touching it without understanding its true nature could be dangerous. Inscriptions around the pedestal suggest that the real treasure is earned through wisdom, not taken by force.",
      choices: [
        {
          text: "Read the inscriptions carefully",
          action: () => changeScene("inscription_wisdom")
        },
        {
          text: "Touch the orb with pure intentions",
          action: () => changeScene("pure_heart_test")
        },
        {
          text: "Seek the dragon to ask permission",
          action: () => changeScene("permission_seeking")
        }
      ]
    },

    inscription_wisdom: {
      title: "The True Test",
      description: "The inscriptions reveal the orb's true nature: it doesn't grant wishes, but rather shows the seeker their own true desires and the wisdom to pursue them properly. The real treasure is self-knowledge and the power to use one's gifts for the good of all. This changes everything about your quest.",
      choices: [
        {
          text: "Touch the orb with this new understanding",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            changeScene("wisdom_victory");
          }
        },
        {
          text: "Seek to meet the dragon as an equal",
          action: () => changeScene("dragon_meeting")
        }
      ]
    },

    main_entrance: {
      title: "Dragon's Lair",
      description: "You step into a vast chamber lit by flickering torches and magical light. In the center lies an enormous dragon, its scales shimmering like molten gold. Ancient books and artifacts surround its resting place. It opens one massive eye and regards you with ancient intelligence. 'Another treasure seeker comes before me. State your purpose, mortal.'",
      choices: [
        {
          text: "Announce you seek wisdom, not just treasure",
          action: () => changeScene("wisdom_seeker")
        },
        {
          text: "Draw your enchanted sword and fight",
          action: () => changeScene("dragon_battle"),
          condition: () => gameState.hasSword
        },
        {
          text: "Try to negotiate respectfully",
          action: () => changeScene("dragon_talk")
        },
        {
          text: "Attempt to sneak past",
          action: () => changeScene("sneak_attempt")
        },
        {
          text: "Offer something valuable as tribute",
          action: () => changeScene("tribute_offer"),
          condition: () => gameState.inventory.length > 0
        }
      ]
    },

    wisdom_seeker: {
      title: "A Different Kind of Seeker",
      description: "The dragon's expression changes, showing genuine interest. 'Wisdom? How long has it been since someone sought wisdom over gold?' Auraxes raises its great head, and you see intelligence and curiosity in its ancient eyes. 'Very well, seeker of wisdom. Let us see if you are worthy of what you claim to desire.'",
      choices: [
        {
          text: "Ask what test you must face",
          action: () => changeScene("wisdom_test")
        },
        {
          text: "Offer to share your own knowledge first",
          action: () => changeScene("knowledge_sharing")
        },
        {
          text: "Request to become the dragon's student",
          action: () => changeScene("student_request")
        }
      ]
    },

    wisdom_test: {
      title: "The Dragon's Challenge",
      description: "Auraxes poses a riddle: 'I give you a choice, wisdom-seeker. Behind me lies a treasure that could make you the richest person alive. But I also offer you knowledge that could heal the suffering of thousands, though you would remain poor. The treasure you cannot share, but the knowledge grows stronger when given away. Choose.'",
      choices: [
        {
          text: "Choose the knowledge that helps others",
          action: () => changeScene("compassion_choice")
        },
        {
          text: "Choose the treasure for yourself",
          action: () => changeScene("selfish_choice")
        },
        {
          text: "Ask if there's a third option",
          action: () => changeScene("creative_thinking")
        }
      ]
    },

    compassion_choice: {
      title: "The Heart of Wisdom",
      description: "The dragon's eyes shine with approval. 'You have chosen well. True treasure is not gold, but the power to ease suffering and bring joy to others.' Auraxes shares ancient knowledge of healing, peacemaking, and leadership. You feel transformed by wisdom that will serve you for life.",
      choices: [
        {
          text: "Accept the role of wisdom-keeper",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            changeScene("sage_ending");
          }
        },
        {
          text: "Ask to stay and learn more",
          action: () => changeScene("extended_learning")
        }
      ]
    },

    creative_thinking: {
      title: "Beyond the Expected",
      description: "The dragon chuckles, a sound like distant thunder. 'Clever! Yes, there is a third way - but it requires proving you understand the deeper lesson. If you can tell me why the choice itself was the true test, I will grant you both knowledge and the means to use it wisely.'",
      choices: [
        {
          text: "Explain that the choice reveals one's character",
          action: () => changeScene("character_insight")
        },
        {
          text: "Say that wisdom means knowing when not to choose",
          action: () => changeScene("wisdom_insight")
        },
        {
          text: "Suggest that both options serve different goods",
          action: () => changeScene("balance_insight")
        }
      ]
    },

    character_insight: {
      title: "Understanding the Self",
      description: "Auraxes nods gravely. 'Precisely. The choice reveals whether one seeks power for selfish gain or to serve others. You understand that character is the foundation of all wisdom. This insight makes you worthy of both knowledge and the resources to use it.' The dragon grants you both ancient wisdom and magical means to help others.",
      choices: [
        {
          text: "Accept this great responsibility",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            changeScene("guardian_ending");
          }
        }
      ]
    },

    dragon_battle: {
      title: "Epic Combat",
      description: "Your enchanted sword gleams as you face the mighty dragon. The battle is fierce and dramatic, with magical fire and clashing steel. But as you fight, you realize the dragon is holding back, testing your skill rather than trying to kill you. With a final, skillful strike, you prove your martial prowess.",
      choices: [
        {
          text: "Offer mercy to the dragon",
          action: () => changeScene("mercy_ending")
        },
        {
          text: "Demand the treasure as victor",
          action: () => changeScene("hollow_victory")
        },
        {
          text: "Ask why the dragon held back",
          action: () => changeScene("dragon_explanation")
        }
      ]
    },

    mercy_ending: {
      title: "The Greater Victory",
      description: "Your mercy surprises and pleases the ancient dragon. 'You could have struck the killing blow, but chose compassion. This is the mark of a true hero.' Auraxes grants you not just treasure, but wisdom and a lasting friendship. You leave as both a wealthy adventurer and a keeper of ancient knowledge.",
      choices: [
        {
          text: "Begin a new adventure as a wise hero",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            restartGame();
          }
        }
      ]
    },

    dragon_talk: {
      title: "Diplomatic Approach",
      description: "The dragon listens to your respectful words with growing interest. 'Interesting. Most who enter here speak only of treasure and glory. You show wisdom in seeking dialogue rather than drawing steel immediately.' The dragon settles into a more comfortable position. 'Very well, let us speak. What brings you to my domain?'",
      choices: [
        {
          text: "Explain your quest for knowledge and growth",
          action: () => changeScene("noble_purpose")
        },
        {
          text: "Ask about the dragon's history",
          action: () => changeScene("dragon_history")
        },
        {
          text: "Admit you came for treasure but now seek understanding",
          action: () => changeScene("honest_admission")
        }
      ]
    },

    noble_purpose: {
      title: "A Worthy Goal",
      description: "Auraxes listens thoughtfully to your explanation. 'Knowledge and growth - these are goals worthy of respect. Too many seek power without wisdom, wealth without understanding its responsibility. You speak of things I have not heard in many years.' The dragon's manner becomes more welcoming.",
      choices: [
        {
          text: "Ask to learn from the dragon's wisdom",
          action: () => changeScene("learning_request")
        },
        {
          text: "Offer to help the dragon with some task",
          action: () => changeScene("service_offer")
        },
        {
          text: "Share knowledge of the outside world",
          action: () => changeScene("world_news")
        }
      ]
    },

    dragon_history: {
      title: "Tales of Ages Past",
      description: "The dragon's eyes grow distant with memory. 'I have lived for over a thousand years, young one. I have seen kingdoms rise and fall, heroes become legends, and wisdom forgotten in favor of quick power. Once, this temple was a place of learning where the greatest minds came to study. Now... I am alone with books and memories.'",
      choices: [
        {
          text: "Offer to help restore the temple's purpose",
          action: () => changeScene("restoration_offer")
        },
        {
          text: "Ask what happened to the other scholars",
          action: () => changeScene("lost_scholars")
        },
        {
          text: "Suggest the dragon teach new students",
          action: () => changeScene("teaching_suggestion")
        }
      ]
    },

    sneak_attempt: {
      title: "Stealth and Consequence",
      description: gameState.hasBlessing || gameState.inventory.includes("Fairy Ward") ? 
        "Your magical protection helps muffle your movements, and you manage to slip past the dragon... but as you reach for the treasure, the dragon speaks without opening its eyes: 'I am impressed by your stealth, but disappointed by your intent. Did you think you could simply take what is not freely given?'" :
        "Despite your best efforts, the ancient dragon senses your presence immediately. 'Attempting stealth in my own domain? Bold, but foolish. If you wish something from me, have the courage to ask directly.' The dragon blocks your path to the treasure.",
      choices: [
        {
          text: "Apologize and ask to speak honestly",
          action: () => changeScene("honest_approach")
        },
        {
          text: "Admit your mistake and retreat",
          action: () => changeScene("respectful_retreat")
        },
        {
          text: "Stand your ground and state your purpose",
          action: () => changeScene("bold_declaration")
        }
      ]
    },

    honest_approach: {
      title: "Redemption Through Truth",
      description: "Your honest apology and willingness to speak directly impresses the dragon. 'There is hope for you yet, young one. Mistakes can be forgiven when followed by genuine honesty. Now, tell me truly - what do you seek in my domain, and why should I grant it?'",
      choices: [
        {
          text: "Explain your desire for adventure and growth",
          action: () => changeScene("growth_explanation")
        },
        {
          text: "Admit you want treasure but also seek wisdom",
          action: () => changeScene("mixed_motives")
        },
        {
          text: "Ask what the dragon would want in exchange",
          action: () => changeScene("fair_exchange")
        }
      ]
    },

    victory: {
      title: "Triumphant Return",
      description: "You claim the legendary Golden Orb, said to grant the holder's deepest desire. As you touch it, you feel its power flow through you. The orb disappears in a flash of light, but you know your greatest wish has been granted. You emerge from the temple as a true hero, forever changed by your adventure.",
      choices: [
        {
          text: "Begin a new adventure",
          action: restartGame
        }
      ]
    },

    wisdom_victory: {
      title: "The True Treasure",
      description: "As you touch the orb with understanding, it transforms into pure light that fills you with incredible wisdom and compassion. You realize the treasure was never gold or magic items - it was the journey itself, the choices you made, and the wisdom you gained. You leave the temple as a sage, ready to help others find their own paths to wisdom.",
      choices: [
        {
          text: "Begin a new adventure as a wise mentor",
          action: restartGame
        }
      ]
    },

    sage_ending: {
      title: "Keeper of Ancient Wisdom",
      description: "You accept the role of wisdom-keeper, becoming a bridge between the ancient knowledge and the modern world. The dragon Auraxes becomes your mentor and friend. Together, you work to bring healing, knowledge, and peace to a world that desperately needs both. Your adventure has become a lifelong mission of service.",
      choices: [
        {
          text: "Begin a new chapter of your story",
          action: restartGame
        }
      ]
    },

    guardian_ending: {
      title: "Guardian of Balance",
      description: "With both ancient wisdom and the means to use it, you become a guardian of balance in the world. You help those in need, teach the willing, and protect the innocent. The dragon grants you the ability to return to the temple whenever you need guidance. Your quest for treasure has become a quest for justice.",
      choices: [
        {
          text: "Continue your heroic journey",
          action: restartGame
        }
      ]
    },

    game_over: {
      title: "Adventure's End",
      description: `Your journey has come to an end. Though you did not achieve your goal this time, every adventure teaches us something valuable. You faced challenges with ${gameState.health <= 0 ? 'courage until the very end' : 'determination and spirit'}. Perhaps next time you'll make different choices and find a different fate.`,
      choices: [
        {
          text: "Try again with new wisdom",
          action: restartGame
        }
      ]
    }
  };

  const getCurrentScene = () => {
    if (gameState.gameOver) {
      return scenes.game_over;
    }
    
    const scene = scenes[gameState.currentScene];
    if (!scene) {
      console.error(`Scene not found: "${gameState.currentScene}"`);
      console.error("Available scenes:", Object.keys(scenes));
      console.error("Current game state:", gameState);
      return {
        title: "Error: Scene Not Found",
        description: `The scene "${gameState.currentScene}" could not be found. This might be due to a missing scene implementation or an invalid scene transition. Available scenes: ${Object.keys(scenes).join(", ")}. Please restart the game or report this issue.`,
        choices: [
          {
            text: "Restart Game",
            action: restartGame
          },
          {
            text: "Return to Start",
            action: () => changeScene("start")
          }
        ]
      };
    }
    
    return scene;
  };

  const currentScene = getCurrentScene();

  const availableChoices = currentScene.choices.filter(choice => 
    !choice.condition || choice.condition()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-yellow-300">The Enchanted Quest</h1>
          <p className="text-lg text-blue-200">A Mystical Text Adventure</p>
        </div>

        <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6 flex flex-wrap gap-4 justify-center">
          <div className="text-center">
            <div className="text-red-400 font-semibold">Health</div>
            <div className={`text-xl ${gameState.health <= 25 ? 'text-red-500' : gameState.health <= 50 ? 'text-yellow-500' : 'text-green-400'}`}>
              {gameState.health}/100
            </div>
          </div>
          {gameState.inventory.length > 0 && (
            <div className="text-center">
              <div className="text-green-400 font-semibold">Inventory</div>
              <div className="text-sm max-w-md">{gameState.inventory.join(", ")}</div>
            </div>
          )}
          {(gameState.unicornMet || gameState.dragonDefeated || gameState.hasBlessing) && (
            <div className="text-center">
              <div className="text-purple-400 font-semibold">Status</div>
              <div className="text-sm">
                {[
                  gameState.unicornMet && "Unicorn Met",
                  gameState.dragonDefeated && "Dragon Defeated", 
                  gameState.hasBlessing && "Blessed"
                ].filter(Boolean).join(", ")}
              </div>
            </div>
          )}
        </div>

        <div className="bg-black bg-opacity-40 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-200">{currentScene.title}</h2>
          <p className="text-lg leading-relaxed mb-6 text-gray-100">{currentScene.description}</p>
          
          <div className="space-y-3">
            {availableChoices.map((choice, index) => (
              <button
                key={index}
                onClick={choice.action}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg border border-blue-400"
              >
                <span className="text-yellow-300 font-semibold mr-2">→</span>
                {choice.text}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-blue-300">
          <p>Choose your path wisely, adventurer...</p>
          <p className="text-sm mt-2 text-blue-400">
            Scene: {gameState.currentScene} | 
            Scenes Available: {Object.keys(scenes).length}
          </p>
        </div>
      </div>
    </div>
  );
}
