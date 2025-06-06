// src/app/page.tsx
"use client";

import { useState } from "react";

interface GameState {
  currentScene: string;
  inventory: string[];
  health: number;
  hasKey: boolean;
  hasSword: boolean;
  gameOver: boolean;
  victory: boolean;
}

interface Choice {
  text: string;
  action: () => void;
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
    gameOver: false,
    victory: false,
  });

  const addToInventory = (item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
      ...(item === "Ancient Key" && { hasKey: true }),
      ...(item === "Enchanted Sword" && { hasSword: true }),
    }));
  };

  const takeDamage = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.max(0, prev.health - amount),
      gameOver: prev.health - amount <= 0,
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
      gameOver: false,
      victory: false,
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
          }
        },
        {
          text: "Ask for healing supplies",
          action: () => {
            addToInventory("Healing Potion");
            changeScene("got_potion");
          }
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
          }
        },
        {
          text: "Request healing supplies",
          action: () => {
            addToInventory("Healing Potion");
            changeScene("got_potion");
          }
        },
        {
          text: "Thank him and leave for the forest",
          action: () => changeScene("forest_path")
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
            changeScene("forest_path");
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
        }
      ]
    },

    river: {
      title: "The Crystal Stream",
      description: "You emerge at a beautiful crystal-clear stream. The water sparkles like diamonds in the sunlight. As you approach, you notice something glinting beneath the surface. Suddenly, a majestic unicorn appears on the opposite bank, its horn glowing softly.",
      choices: [
        {
          text: "Approach the unicorn carefully",
          action: () => changeScene("unicorn_encounter")
        },
        {
          text: "Try to retrieve the object from the water",
          action: () => changeScene("water_treasure")
        },
        {
          text: "Drink from the stream",
          action: () => {
            setGameState(prev => ({ ...prev, health: 100 }));
            changeScene("magical_healing");
          }
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
            setGameState(prev => ({ ...prev, health: 100 }));
            addToInventory("Unicorn's Blessing");
            changeScene("blessed");
          }
        },
        {
          text: "Ask about the temple",
          action: () => changeScene("unicorn_wisdom")
        },
        {
          text: "Politely decline and continue your journey",
          action: () => changeScene("ruins")
        }
      ]
    },

    blessed: {
      title: "Divine Protection",
      description: "You feel the unicorn's blessing flow through you like warm sunlight. Your health is fully restored, and you sense that you're now protected from lesser evils. The unicorn nods regally before disappearing into the forest like morning mist.",
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
      description: "Before you stands a magnificent temple carved from black stone, covered in glowing runes. Two massive doors bar your entrance - one requires a key, the other stands slightly ajar but you can hear the low growl of something dangerous within.",
      choices: gameState.hasKey ? [
        {
          text: "Use the Ancient Key on the locked door",
          action: () => changeScene("secret_entrance")
        },
        {
          text: "Enter through the open door",
          action: () => changeScene("main_entrance")
        }
      ] : [
        {
          text: "Enter through the open door",
          action: () => changeScene("main_entrance")
        },
        {
          text: "Search for another way in",
          action: () => changeScene("search_entrance")
        }
      ]
    },

    secret_entrance: {
      title: "The Hidden Path",
      description: "The ancient key turns smoothly in the lock. The door opens to reveal a hidden passage that glows with soft blue light. This route appears safer and leads directly to the treasure chamber. You can see the legendary Golden Orb floating on a pedestal ahead.",
      choices: [
        {
          text: "Approach the Golden Orb",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            changeScene("victory");
          }
        },
        {
          text: "Examine the chamber for traps",
          action: () => changeScene("trap_check")
        }
      ]
    },

    main_entrance: {
      title: "Dragon's Lair",
      description: "You step into a vast chamber lit by flickering torches. In the center lies an enormous dragon, its scales shimmering like molten gold. It opens one massive eye and regards you with ancient intelligence. 'Another treasure seeker comes before me. Prove your worth, mortal, or become ash.'",
      choices: gameState.hasSword ? [
        {
          text: "Draw your enchanted sword and fight",
          action: () => changeScene("dragon_battle")
        },
        {
          text: "Try to negotiate with the dragon",
          action: () => changeScene("dragon_talk")
        },
        {
          text: "Attempt to sneak past",
          action: () => changeScene("sneak_attempt")
        }
      ] : [
        {
          text: "Try to negotiate with the dragon",
          action: () => changeScene("dragon_talk")
        },
        {
          text: "Attempt to sneak past",
          action: () => changeScene("sneak_attempt")
        },
        {
          text: "Run away",
          action: () => changeScene("forest_path")
        }
      ]
    },

    dragon_battle: {
      title: "Epic Combat",
      description: "Your enchanted sword gleams as you face the mighty dragon. The battle is fierce, but your magical blade proves true. With a final, powerful strike, you defeat the ancient beast. As it falls, it speaks: 'You have proven yourself worthy, brave one. The treasure is yours.'",
      choices: [
        {
          text: "Approach the treasure",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            changeScene("victory");
          }
        },
        {
          text: "Show mercy to the defeated dragon",
          action: () => changeScene("mercy_ending")
        }
      ]
    },

    dragon_talk: {
      title: "Wisdom of Ages",
      description: "The dragon listens to your words with growing respect. 'Few mortals speak with such wisdom and courage. You seek not just treasure, but understanding. Very well - I shall grant you a choice: take the golden treasure, or accept something far more valuable.'",
      choices: [
        {
          text: "Choose the golden treasure",
          action: () => {
            setGameState(prev => ({ ...prev, victory: true }));
            changeScene("victory");
          }
        },
        {
          text: "Ask about the more valuable option",
          action: () => changeScene("wisdom_choice")
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

    game_over: {
      title: "Adventure's End",
      description: "Your journey has come to an end. Though you did not achieve your goal this time, every adventure teaches us something valuable. Perhaps next time you'll make different choices and find a different fate.",
      choices: [
        {
          text: "Try again",
          action: restartGame
        }
      ]
    }
  };

  const currentScene = gameState.gameOver ? scenes.game_over : scenes[gameState.currentScene];

  if (!currentScene) {
    return <div>Error: Scene not found</div>;
  }

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
            <div className="text-xl">{gameState.health}/100</div>
          </div>
          {gameState.inventory.length > 0 && (
            <div className="text-center">
              <div className="text-green-400 font-semibold">Inventory</div>
              <div className="text-sm">{gameState.inventory.join(", ")}</div>
            </div>
          )}
        </div>

        <div className="bg-black bg-opacity-40 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-200">{currentScene.title}</h2>
          <p className="text-lg leading-relaxed mb-6 text-gray-100">{currentScene.description}</p>
          
          <div className="space-y-3">
            {currentScene.choices.map((choice, index) => (
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
        </div>
      </div>
    </div>
  );
}
