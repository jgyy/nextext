// src/scenes/bridgeScenes.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createBridgeScenes = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  journey_reflection: {
    title: "Looking Back on Your Path",
    description: `You pause to reflect on how far you've come and what you've learned:\n\n• Health: ${gameState.health}/${gameState.maxHealth}\n• Score: ${gameState.score}\n• Items collected: ${gameState.inventory.length}\n• Achievements: ${gameState.achievements.length}\n\nYour journey has shaped you in ways you're only beginning to understand. Each choice has led you closer to discovering not just treasure, but your true self.`,
    choices: [
      {
        text: "Feel proud of your growth",
        action: () => {
          actions.addScore(25);
          actions.changeScene("pride_in_growth");
        }
      },
      {
        text: "Consider how to help others on similar journeys",
        action: () => actions.changeScene("mentoring_thoughts")
      },
      {
        text: "Focus on the challenges still ahead",
        action: () => actions.changeScene("future_focus")
      },
      {
        text: "Continue your quest with renewed purpose",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  pride_in_growth: {
    title: "Celebrating Progress",
    description: "You feel a quiet pride in how much you've grown since beginning this journey. You're no longer the same person who first entered this mystical realm - you've gained wisdom, compassion, and a deeper understanding of what truly matters.",
    choices: [
      {
        text: "Use this confidence to face new challenges",
        action: () => {
          actions.addScore(25);
          actions.changeScene("confident_advancement");
        }
      },
      {
        text: "Share your growth with others you meet",
        action: () => actions.changeScene("growth_sharing")
      },
      {
        text: "Continue your quest with renewed determination",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  mentoring_thoughts: {
    title: "The Teacher's Heart",
    description: "You find yourself thinking about how to help others who might face similar challenges. Your experiences have given you insights that could be valuable to future seekers - perhaps teaching is part of your destiny.",
    choices: [
      {
        text: "Resolve to become a mentor to other adventurers",
        action: () => {
          actions.addScore(50);
          actions.addAchievement("Future Teacher");
          actions.changeScene("mentor_commitment");
        }
      },
      {
        text: "Plan to document your journey for others",
        action: () => actions.changeScene("chronicler_path")
      },
      {
        text: "Focus on completing your own quest first",
        action: () => actions.changeScene("quest_focus")
      }
    ]
  },

  ethical_consideration: {
    title: "The Weight of Choices",
    description: "As you journey deeper into this mystical realm, you realize that every choice you make ripples outward, affecting not just your own fate but the lives of others. The power you're gaining comes with responsibility - how will you use it?",
    choices: [
      {
        text: "Commit to using any power for the greater good",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Noble Purpose");
          actions.changeScene("noble_commitment");
        }
      },
      {
        text: "Promise to help those who cannot help themselves",
        action: () => {
          actions.addScore(50);
          actions.changeScene("helper_vow");
        }
      },
      {
        text: "Resolve to seek wisdom in all decisions",
        action: () => {
          actions.addScore(50);
          actions.changeScene("wisdom_seeker_path");
        }
      },
      {
        text: "Continue with humility and openness to learning",
        action: () => actions.changeScene("humble_continuation")
      }
    ]
  },

  noble_commitment: {
    title: "A Sacred Vow",
    description: "You make a solemn commitment to use whatever power you gain for the greater good of all. This vow becomes a guiding principle that will shape every decision you make going forward. You feel the weight and honor of this responsibility.",
    choices: [
      {
        text: "Feel strengthened by your noble purpose",
        action: () => {
          actions.heal(20);
          actions.changeScene("purposeful_strength");
        }
      },
      {
        text: "Seek out ways to help others immediately",
        action: () => actions.changeScene("immediate_service")
      },
      {
        text: "Continue your quest with this sacred purpose",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  mysterious_guidance: {
    title: "A Voice on the Wind",
    description: "As you pause in your journey, you hear what sounds like a voice carried on the wind - ancient, wise, and filled with compassion. 'Young seeker,' it seems to say, 'remember that the greatest treasures are often hidden in plain sight, and the mightiest victories are won through understanding, not conquest.'",
    choices: [
      {
        text: "Listen carefully for more guidance",
        action: () => actions.changeScene("deeper_guidance")
      },
      {
        text: "Thank the voice and continue with its wisdom",
        action: () => {
          actions.addScore(25);
          actions.changeScene("guided_continuation");
        }
      },
      {
        text: "Ask the voice about the dragon",
        action: () => actions.changeScene("voice_dragon_wisdom")
      },
      {
        text: "Follow your intuition about where this voice leads",
        action: () => actions.changeScene("intuitive_following")
      }
    ]
  },

  deeper_guidance: {
    title: "Wisdom from Beyond",
    description: "The voice continues, offering profound guidance: 'Trust in the connections you make, for no treasure equals the bond between kindred spirits. Show mercy to your enemies, for today's foe may become tomorrow's greatest ally. And remember - the question is not whether you are worthy of treasure, but whether treasure is worthy of you.'",
    choices: [
      {
        text: "Take these words to heart",
        action: () => {
          actions.addScore(50);
          actions.addAchievement("Guided by Wisdom");
          actions.changeScene("wisdom_embraced");
        }
      },
      {
        text: "Ask about the nature of true worthiness",
        action: () => actions.changeScene("worthiness_discussion")
      },
      {
        text: "Continue your journey with this guidance",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  tactical_assessment: {
    title: "Planning Your Approach",
    description: "You take time to carefully assess your situation, resources, and options. The temple lies ahead, but you have multiple paths available and various allies and items that could aid your quest. How do you want to proceed?",
    choices: [
      {
        text: "Use magical abilities to scout ahead",
        action: () => actions.changeScene("magical_scouting"),
        condition: () => gameState.inventory.some(item => 
          item.includes("Elemental") || item.includes("Nature") || item.includes("Psychic")
        )
      },
      {
        text: "Rely on allies and relationships you've built",
        action: () => actions.changeScene("alliance_approach"),
        condition: () => gameState.inventory.some(item => 
          item.includes("Wolf") || item.includes("Unicorn") || item.includes("Fairy")
        )
      },
      {
        text: "Trust in the wisdom you've gained",
        action: () => actions.changeScene("wisdom_approach"),
        condition: () => gameState.achievements.length > 2
      },
      {
        text: "Proceed with authentic, unenhanced self",
        action: () => actions.changeScene("authentic_approach")
      }
    ]
  },

  magical_scouting: {
    title: "Eyes of Power",
    description: "Using your magical abilities, you scout ahead to better understand what awaits you. Your enhanced perception reveals much about the temple and its guardian that would have remained hidden to ordinary sight.",
    choices: [
      {
        text: "Use this knowledge to plan a careful approach",
        action: () => {
          actions.addScore(50);
          actions.changeScene("informed_planning");
        }
      },
      {
        text: "Share your discoveries with any allies",
        action: () => actions.changeScene("knowledge_sharing")
      },
      {
        text: "Proceed to the temple with your insights",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  alliance_approach: {
    title: "Strength in Fellowship",
    description: "You draw upon the relationships and alliances you've built during your journey. The blessing of the unicorn, the wisdom of the wolf, the magic of the fairies - all serve as sources of strength and guidance as you approach your greatest challenge.",
    choices: [
      {
        text: "Call upon your allies for support",
        action: () => {
          actions.addScore(75);
          actions.changeScene("allied_advance");
        }
      },
      {
        text: "Draw strength from their memory and teachings",
        action: () => {
          actions.heal(30);
          actions.changeScene("strengthened_approach");
        }
      },
      {
        text: "Approach the temple as a representative of all who helped you",
        action: () => actions.changeScene("representative_approach")
      }
    ]
  },

  wisdom_approach: {
    title: "The Scholar's Path",
    description: "Your accumulated wisdom becomes your greatest asset. Every lesson learned, every moment of growth, every choice that expanded your understanding - all of these combine to guide you toward the best possible approach to the challenges ahead.",
    choices: [
      {
        text: "Trust completely in your accumulated wisdom",
        action: () => {
          actions.addScore(100);
          actions.changeScene("wisdom_guided");
        }
      },
      {
        text: "Combine wisdom with compassionate action",
        action: () => actions.changeScene("wise_compassion")
      },
      {
        text: "Proceed to the temple as a true seeker of understanding",
        action: () => actions.changeScene("temple_approach")
      }
    ]
  },

  authentic_approach: {
    title: "True to Yourself",
    description: "You choose to proceed as your authentic self - no magical enhancements, no borrowed power, just the person you've become through your choices and experiences. This decision reflects a deep confidence in who you are.",
    choices: [
      {
        text: "Feel proud of your authentic strength",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Authentic Hero");
          actions.changeScene("authentic_pride");
        }
      },
      {
        text: "Approach the temple with quiet confidence",
        action: () => actions.changeScene("temple_approach")
      },
      {
        text: "Reflect on the power of being genuine",
        action: () => actions.changeScene("authenticity_reflection")
      }
    ]
  }
});
