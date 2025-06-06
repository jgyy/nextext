// src/scenes/expansionScenesFix.ts
import { Scene, GameState, GameActions } from "../types/game";

export const createExpansionScenesFix = (gameState: GameState, actions: GameActions): Record<string, Scene> => ({
  scholar_background: {
    title: "The Scholar's Journey Begins",
    description: "Your years of study have prepared you well for this quest. You carry ancient maps, know forgotten languages, and understand the historical significance of the Golden Orb. However, your physical training has been limited, and you may need to rely more on wit than strength.\n\nThe weight of your books and scrolls is familiar and comforting. You know that knowledge is power, and you have plenty of it.",
    choices: [
      {
        text: "Use your knowledge to research the forest's history",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_research");
        }
      },
      {
        text: "Seek out the hermit for scholarly discussion",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Enter the forest with confidence in your preparation",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  forest_research: {
    title: "Delving into Ancient Texts",
    description: "You spend time cross-referencing your maps and texts about the Enchanted Forest. Your research reveals that this forest was once home to a great alliance between dragons and scholars. The temple you seek was originally a center of learning, not a treasure vault.\n\nThis knowledge changes your entire perspective on the quest ahead.",
    choices: [
      {
        text: "Approach the quest as a scholarly endeavor",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("True Scholar");
          actions.changeScene("scholarly_approach");
        }
      },
      {
        text: "Share this knowledge with the hermit",
        action: () => actions.changeScene("cottage")
      },
      {
        text: "Enter the forest with new understanding",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  noble_background: {
    title: "Noblesse Oblige",
    description: "Your noble upbringing has taught you the importance of honor, duty, and protecting those who cannot protect themselves. You carry the responsibility of your family name and the expectation that you will use any power you gain for the betterment of all.\n\nYour diplomatic training and understanding of court politics may prove invaluable in negotiations.",
    choices: [
      {
        text: "Vow to use the Golden Orb for your people's benefit",
        action: () => {
          actions.addScore(75);
          actions.addAchievement("Noble Purpose");
          actions.changeScene("noble_vow");
        }
      },
      {
        text: "Consider the political implications of your quest",
        action: () => actions.changeScene("political_considerations")
      },
      {
        text: "Approach the cottage to speak with the hermit as an equal",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  noble_vow: {
    title: "A Sacred Promise",
    description: "You make a solemn vow that any power or knowledge gained from this quest will be used for the benefit of all people, not just the nobility. This promise feels like a sacred oath, binding you to a higher purpose than mere adventure.\n\nThe weight of responsibility settles on your shoulders, but it feels right.",
    choices: [
      {
        text: "Begin your quest with noble purpose",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Seek the hermit's wisdom on fulfilling such vows",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  political_considerations: {
    title: "The Game of Thrones",
    description: "You consider how possession of the Golden Orb might shift the balance of power between kingdoms. Used wisely, it could bring peace and prosperity. Used poorly, it could spark wars and conquest. Your diplomatic training helps you see all the angles of this complex situation.",
    choices: [
      {
        text: "Plan to use the Orb to unite the kingdoms",
        action: () => {
          actions.addScore(50);
          actions.changeScene("unity_planning");
        }
      },
      {
        text: "Consider keeping the Orb's power neutral",
        action: () => actions.changeScene("neutrality_planning")
      },
      {
        text: "Focus on the quest itself for now",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  wanderer_background: {
    title: "The Road Less Traveled",
    description: "Your life on the road has taught you to read the subtle signs of danger and opportunity. You understand the wild places of the world and have learned that the greatest treasures are often found in the most unexpected places.\n\nYour practical skills and adaptability will serve you well in the challenges ahead.",
    choices: [
      {
        text: "Use your survival skills to find hidden paths",
        action: () => {
          actions.addScore(50);
          actions.changeScene("survival_advantage");
        }
      },
      {
        text: "Trust your instincts about the forest's dangers",
        action: () => actions.changeScene("instinct_guidance")
      },
      {
        text: "Enter the forest with wanderer's wisdom",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  survival_advantage: {
    title: "Reading the Wild",
    description: "Your trained eye spots signs that others would miss - broken twigs indicating recent passage, unusual plant growth suggesting magical influence, and animal behaviors that hint at hidden dangers or opportunities.\n\nYou quickly identify several safe paths through the forest that avoid the most dangerous areas.",
    choices: [
      {
        text: "Take the path of least resistance",
        action: () => {
          actions.addScore(50);
          actions.changeScene("safe_path");
        }
      },
      {
        text: "Follow the signs of magical creatures",
        action: () => actions.changeScene("magical_tracking")
      },
      {
        text: "Choose the most direct route despite dangers",
        action: () => actions.changeScene("dangerous_shortcut")
      }
    ]
  },

  instinct_guidance: {
    title: "The Wanderer's Intuition",
    description: "Your instincts, honed by years of travel, tell you this forest is unlike any you've encountered. There's an intelligence here, a watchfulness. You sense that the forest itself is testing visitors, and that approaching with respect rather than conquest is key.",
    choices: [
      {
        text: "Move through the forest with reverence",
        action: () => {
          actions.addScore(75);
          actions.changeScene("respectful_journey");
        }
      },
      {
        text: "Try to communicate with the forest spirit",
        action: () => actions.changeScene("forest_communication")
      },
      {
        text: "Proceed cautiously but purposefully",
        action: () => actions.changeScene("forest_path")
      }
    ]
  },

  scholarly_approach: {
    title: "The Path of Knowledge",
    description: "You decide to approach this entire quest as a scholarly expedition rather than a treasure hunt. Your goal shifts from claiming the Golden Orb to understanding its true nature and the history of dragon-human cooperation.\n\nThis philosophical shift seems to resonate with the very forest around you.",
    choices: [
      {
        text: "Document everything you encounter",
        action: () => {
          actions.addToInventory("Research Notes");
          actions.changeScene("documentation_begin");
        }
      },
      {
        text: "Seek out sources of ancient knowledge",
        action: () => actions.changeScene("knowledge_seeking")
      },
      {
        text: "Approach the hermit as a fellow scholar",
        action: () => actions.changeScene("cottage")
      }
    ]
  },

  unity_planning: {
    title: "A Vision of Unity",
    description: "You envision using the Golden Orb's power to create lasting peace between the warring kingdoms. Treaties could be enforced, resources shared fairly, and conflicts resolved through wisdom rather than warfare.\n\nThis noble goal strengthens your resolve to succeed in your quest.",
    choices: [
      {
        text: "Begin your quest with this vision in mind",
        action: () => {
          actions.addScore(50);
          actions.changeScene("forest_path");
        }
      },
      {
        text: "Seek allies who share this vision",
        action: () => actions.changeScene("ally_seeking")
      }
    ]
  },

  hermit_tale: {
    title: "The Hermit's Dedication",
    description: "You tell Auraxes about Eldric the hermit, how he has spent decades alone preserving knowledge, freely sharing wisdom with any who seek it. You describe his joy when discussing ancient lore and his sadness that so few come to learn anymore.\n\nAuraxes listens intently, clearly moved by the parallel to her own situation.",
    choices: [
      {
        text: "Suggest the hermit could be her ally",
        action: () => {
          actions.addScore(100);
          actions.changeScene("hermit_alliance");
        }
      },
      {
        text: "Share more stories of knowledge seekers",
        action: () => actions.changeScene("more_stories")
      },
      {
        text: "Ask if she knows of the hermit",
        action: () => actions.changeScene("hermit_connection")
      }
    ]
  },

  test_ready: {
    title: "Prepared for Any Trial",
    description: "After your mental preparations, you feel ready to face whatever test the dragon might present. Your values are clear, your purpose is noble, and your commitment to choosing wisdom over wealth is unshakeable.\n\nYou stand at the temple entrance with quiet confidence.",
    choices: [
      {
        text: "Enter the temple with serene confidence",
        action: () => {
          actions.addScore(100);
          actions.changeScene("main_hall");
        }
      },
      {
        text: "Take one final moment to center yourself",
        action: () => {
          actions.heal(25);
          actions.changeScene("final_centering");
        }
      }
    ]
  },

  dream_promise: {
    title: "Sworn to Dreams",
    description: "You make a heartfelt promise to help Auraxes realize her dreams of renewed teaching and ended isolation. The sincerity in your voice and the determination in your eyes convince her that you truly mean it.\n\n'Your words give me hope I had forgotten how to feel,' she says softly.",
    choices: [
      {
        text: "Begin planning how to fulfill this promise",
        action: () => {
          actions.addScore(100);
          actions.changeScene("promise_planning");
        }
      },
      {
        text: "Ask what first steps she recommends",
        action: () => actions.changeScene("first_steps")
      },
      {
        text: "Seal the promise with a magical oath",
        action: () => actions.changeScene("magical_oath")
      }
    ]
  },

  small_beginnings: {
    title: "Seeds of Change",
    description: "Your suggestion to start small resonates with Auraxes. 'Yes, perhaps that is wisdom - not trying to recreate the past glory all at once, but planting seeds that can grow naturally. Even one dedicated student could become a teacher to others.'",
    choices: [
      {
        text: "Volunteer to be that first student",
        action: () => {
          actions.addScore(150);
          actions.changeScene("first_student");
        }
      },
      {
        text: "Suggest recruiting from nearby villages",
        action: () => actions.changeScene("village_recruitment")
      },
      {
        text: "Propose a gradual expansion plan",
        action: () => actions.changeScene("expansion_planning")
      }
    ]
  },

  first_student: {
    title: "The First in Centuries",
    description: "Auraxes's eyes fill with joy as you offer to be her first student in hundreds of years. 'You would honor me greatly,' she says, her voice thick with emotion. 'To teach again, to share knowledge with an eager mind... this is worth more than all the gold in my hoard.'",
    choices: [
      {
        text: "Begin your studies immediately",
        action: () => {
          actions.addScore(200);
          actions.addAchievement("Dragon's Pupil");
          actions.changeScene("study_beginning");
        }
      },
      {
        text: "Ask what subjects she most wants to teach",
        action: () => actions.changeScene("curriculum_discussion")
      },
      {
        text: "Suggest creating a formal teacher-student bond",
        action: () => actions.changeScene("formal_bond")
      }
    ]
  },

  traveling_school: {
    title: "Knowledge on the Move",
    description: "Together, you and Auraxes develop a plan for a traveling school that brings wisdom to those who need it most. Using her ability to fly and your knowledge of the world's communities, you could reach remote villages, war-torn regions, and forgotten peoples.\n\nThis approach would spread knowledge while keeping Auraxes safe from those who might still see her as a monster to be slain.",
    choices: [
      {
        text: "Begin planning the first journey",
        action: () => {
          actions.addScore(300);
          actions.changeScene("journey_planning");
        }
      },
      {
        text: "Recruit other teachers for the traveling school",
        action: () => actions.changeScene("teacher_recruitment")
      },
      {
        text: "Create magical tools for remote teaching",
        action: () => actions.changeScene("magical_education")
      }
    ]
  },

  bond_acknowledged: {
    title: "Kindred Spirits United",
    description: "As you acknowledge the deep connection between you and Auraxes, something magical happens. A golden thread of light appears, connecting your heart to hers - a visible manifestation of your bond. You are no longer just teacher and student, but true companions in the pursuit of wisdom.\n\n'This bond is ancient magic,' Auraxes explains with wonder. 'It only forms between those whose souls truly understand each other.'",
    choices: [
      {
        text: "Embrace the magical connection",
        action: () => {
          actions.addScore(250);
          actions.addAchievement("Soul Bonded");
          actions.changeScene("magical_bond");
        }
      },
      {
        text: "Ask about the bond's significance",
        action: () => actions.changeScene("bond_explanation")
      },
      {
        text: "Promise to honor this connection always",
        action: () => actions.changeScene("eternal_promise")
      }
    ]
  }
});
