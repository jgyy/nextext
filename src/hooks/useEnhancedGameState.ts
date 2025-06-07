// src/hooks/useEnhancedGameState.ts
import { useState, useCallback } from "react";
import { GameState, GameActions } from "../types/game";
import { EnhancedGameState, EnhancedGameActions } from "../types/enhancedGame";

const initialEnhancedGameState: EnhancedGameState = {
  currentScene: "character_creation",
  inventory: [],
  health: 100,
  maxHealth: 100,
  hasKey: false,
  hasSword: false,
  hasPotion: false,
  hasBlessing: false,
  gameOver: false,
  victory: false,
  dragonDefeated: false,
  unicornMet: false,
  score: 0,
  achievements: [],
  questsCompleted: [],
  
  characterClass: 'scholar',
  level: 1,
  experience: 0,
  skills: {
    wisdom: 10,
    courage: 10,
    compassion: 10,
    diplomacy: 10,
    survival: 10,
    mysticism: 10
  },
  
  relationships: {
    auraxes: 0,
    hermit: 0,
    unicorn: 0,
    wolfSpirit: 0,
    fairies: 0,
    forestGuardian: 0,
    treasureHunters: 0,
    villagers: 0
  },
  
  worldState: {
    forestHealth: 100,
    knowledgePreservation: 50,
    dragonTrust: 0,
    realmPeace: 70,
    magicalBalance: 50
  },
  
  chaptersCompleted: [],
  secretsUnlocked: [],
  loreDiscovered: [],
  companionsRecruited: [],
  
  reputation: {
    scholars: 0,
    mystics: 0,
    nobles: 0,
    commoners: 0
  },
  
  visionsSeen: [],
  propheciesHeard: [],
  ancientMemoriesAccessed: [],
  magicalAbilities: [],
  
  newGamePlusLevel: 0,
  unlockedStartingPaths: [],
  permanentAchievements: [],
  
  saveSlots: {},
  loreCollected: [],
  memoriesUnlocked: [],
  secretsDiscovered: []
};

export const useEnhancedGameState = (): [EnhancedGameState, EnhancedGameActions, string | null, (achievement: string | null) => void] => {
  const [gameState, setGameState] = useState<EnhancedGameState>(initialEnhancedGameState);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  const addToInventory = useCallback((item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
      ...(item === "Ancient Key" && { hasKey: true }),
      ...(item === "Enchanted Sword" && { hasSword: true }),
      ...(item === "Healing Potion" && { hasPotion: true }),
      ...(item === "Unicorn's Blessing" && { hasBlessing: true }),
    }));
  }, []);

  const removeFromInventory = useCallback((item: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(i => i !== item),
      ...(item === "Healing Potion" && { hasPotion: false }),
    }));
  }, []);

  const takeDamage = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.max(0, prev.health - amount),
      gameOver: prev.health - amount <= 0,
    }));
  }, []);

  const heal = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + amount),
    }));
  }, []);

  const changeScene = useCallback((sceneId: string) => {
    setGameState(prev => ({ ...prev, currentScene: sceneId }));
  }, []);

  const restartGame = useCallback(() => {
    setGameState(prev => ({
      ...initialEnhancedGameState,
      newGamePlusLevel: prev.newGamePlusLevel + (prev.victory ? 1 : 0),
      permanentAchievements: prev.permanentAchievements,
      unlockedStartingPaths: prev.unlockedStartingPaths
    }));
    setShowAchievement(null);
  }, []);

  const addAchievement = useCallback((achievement: string) => {
    setGameState(prev => {
      if (!prev.achievements.includes(achievement)) {
        setShowAchievement(achievement);
        return {
          ...prev,
          achievements: [...prev.achievements, achievement],
          permanentAchievements: prev.permanentAchievements.includes(achievement) 
            ? prev.permanentAchievements 
            : [...prev.permanentAchievements, achievement],
          score: prev.score + 100
        };
      }
      return prev;
    });
  }, []);

  const addScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  const completeQuest = useCallback((quest: string) => {
    setGameState(prev => ({
      ...prev,
      questsCompleted: [...prev.questsCompleted, quest],
      score: prev.score + 250
    }));
  }, []);

  const gainExperience = useCallback((amount: number) => {
    setGameState(prev => {
      const newExp = prev.experience + amount;
      const expForNextLevel = prev.level * 100;
      
      if (newExp >= expForNextLevel) {
        return {
          ...prev,
          experience: newExp - expForNextLevel,
          level: prev.level + 1,
          maxHealth: prev.maxHealth + 20,
          health: prev.health + 20
        };
      }
      
      return {
        ...prev,
        experience: newExp
      };
    });
  }, []);

  const levelUp = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1,
      maxHealth: prev.maxHealth + 20,
      health: prev.maxHealth + 20,
      experience: 0
    }));
  }, []);

  const improveSkill = useCallback((skill: keyof EnhancedGameState['skills'], amount: number) => {
    setGameState(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: Math.min(100, prev.skills[skill] + amount)
      }
    }));
  }, []);

  const modifyRelationship = useCallback((character: keyof EnhancedGameState['relationships'], change: number) => {
    setGameState(prev => ({
      ...prev,
      relationships: {
        ...prev.relationships,
        [character]: Math.max(-100, Math.min(100, prev.relationships[character] + change))
      }
    }));
  }, []);

  const affectWorldState = useCallback((aspect: keyof EnhancedGameState['worldState'], change: number) => {
    setGameState(prev => ({
      ...prev,
      worldState: {
        ...prev.worldState,
        [aspect]: Math.max(0, Math.min(100, prev.worldState[aspect] + change))
      }
    }));
  }, []);

  const unlockSecret = useCallback((secret: string) => {
    setGameState(prev => ({
      ...prev,
      secretsUnlocked: prev.secretsUnlocked.includes(secret) 
        ? prev.secretsUnlocked 
        : [...prev.secretsUnlocked, secret],
      secretsDiscovered: prev.secretsDiscovered.includes(secret)
        ? prev.secretsDiscovered
        : [...prev.secretsDiscovered, secret]
    }));
  }, []);

  const gainLore = useCallback((lore: string) => {
    setGameState(prev => ({
      ...prev,
      loreDiscovered: prev.loreDiscovered.includes(lore) 
        ? prev.loreDiscovered 
        : [...prev.loreDiscovered, lore],
      loreCollected: prev.loreCollected.includes(lore)
        ? prev.loreCollected
        : [...prev.loreCollected, lore]
    }));
  }, []);

  const recruitCompanion = useCallback((companion: string) => {
    setGameState(prev => ({
      ...prev,
      companionsRecruited: prev.companionsRecruited.includes(companion) 
        ? prev.companionsRecruited 
        : [...prev.companionsRecruited, companion]
    }));
  }, []);

  const activateVision = useCallback((vision: string) => {
    setGameState(prev => ({
      ...prev,
      visionsSeen: prev.visionsSeen.includes(vision) 
        ? prev.visionsSeen 
        : [...prev.visionsSeen, vision]
    }));
  }, []);

  const learnMagicalAbility = useCallback((ability: string) => {
    setGameState(prev => ({
      ...prev,
      magicalAbilities: prev.magicalAbilities.includes(ability) 
        ? prev.magicalAbilities 
        : [...prev.magicalAbilities, ability]
    }));
  }, []);

  const startNewGamePlus = useCallback(() => {
    restartGame();
  }, [restartGame]);

  const saveGame = useCallback((slotName: string) => {
    setGameState(prev => ({
      ...prev,
      saveSlots: {
        ...prev.saveSlots,
        [slotName]: { ...prev, saveSlots: {} }
      }
    }));
  }, []);

  const loadGame = useCallback((slotName: string) => {
    setGameState(prev => {
      const savedState = prev.saveSlots[slotName];
      if (savedState) {
        return {
          ...savedState,
          saveSlots: prev.saveSlots
        };
      }
      return prev;
    });
  }, []);

  const actions: EnhancedGameActions = {
    addToInventory,
    removeFromInventory,
    takeDamage,
    heal,
    changeScene,
    restartGame,
    addAchievement,
    addScore,
    completeQuest,
    
    gainExperience,
    levelUp,
    improveSkill,
    modifyRelationship,
    affectWorldState,
    unlockSecret,
    gainLore,
    recruitCompanion,
    activateVision,
    learnMagicalAbility,
    startNewGamePlus,
    saveGame,
    loadGame
  };

  return [gameState, actions, showAchievement, setShowAchievement];
};
