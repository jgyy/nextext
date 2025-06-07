// src/hooks/useGameState.ts
import { useState, useCallback } from "react";
import { GameState, GameActions, INITIAL_STATE } from "../config/gameData";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  const createAction = useCallback((actionType: string) => {
    return (...args: any[]) => {
      setGameState(prev => {
        const newState = { ...prev };
        
        switch (actionType) {
          case 'addToInventory':
            newState.inventory = [...prev.inventory, args[0]];
            break;
          case 'removeFromInventory':
            newState.inventory = prev.inventory.filter(item => item !== args[0]);
            break;
          case 'takeDamage':
            newState.health = Math.max(0, prev.health - args[0]);
            newState.gameOver = newState.health <= 0;
            break;
          case 'heal':
            newState.health = Math.min(prev.maxHealth, prev.health + args[0]);
            break;
          case 'changeScene':
            newState.currentScene = args[0];
            break;
          case 'addAchievement':
            if (!prev.achievements.includes(args[0])) {
              newState.achievements = [...prev.achievements, args[0]];
              newState.score += 100;
              setShowAchievement(args[0]);
            }
            break;
          case 'addScore':
            newState.score += args[0];
            break;
          case 'gainExperience':
            const newExp = prev.experience + args[0];
            const expForNextLevel = prev.level * 100;
            if (newExp >= expForNextLevel) {
              newState.experience = newExp - expForNextLevel;
              newState.level += 1;
              newState.maxHealth += 20;
              newState.health += 20;
            } else {
              newState.experience = newExp;
            }
            break;
          case 'improveSkill':
            newState.skills = { ...prev.skills, [args[0]]: Math.min(100, prev.skills[args[0]] + args[1]) };
            break;
          case 'modifyRelationship':
            newState.relationships = { ...prev.relationships, [args[0]]: Math.max(-100, Math.min(100, prev.relationships[args[0]] + args[1])) };
            break;
          case 'affectWorldState':
            newState.worldState = { ...prev.worldState, [args[0]]: Math.max(0, Math.min(100, prev.worldState[args[0]] + args[1])) };
            break;
          case 'unlockSecret':
            if (!prev.secretsUnlocked.includes(args[0])) {
              newState.secretsUnlocked = [...prev.secretsUnlocked, args[0]];
            }
            break;
          case 'gainLore':
            if (!prev.loreDiscovered.includes(args[0])) {
              newState.loreDiscovered = [...prev.loreDiscovered, args[0]];
            }
            break;
          case 'recruitCompanion':
            if (!prev.companionsRecruited.includes(args[0])) {
              newState.companionsRecruited = [...prev.companionsRecruited, args[0]];
            }
            break;
          case 'learnMagicalAbility':
            if (!prev.magicalAbilities.includes(args[0])) {
              newState.magicalAbilities = [...prev.magicalAbilities, args[0]];
            }
            break;
          case 'saveGame':
            newState.saveSlots = { ...prev.saveSlots, [args[0]]: { ...prev, saveSlots: {} }};
            break;
          case 'loadGame':
            const savedState = prev.saveSlots[args[0]];
            if (savedState) return { ...savedState, saveSlots: prev.saveSlots };
            break;
          case 'restartGame':
            return { ...INITIAL_STATE, newGamePlusLevel: prev.newGamePlusLevel + (prev.victory ? 1 : 0) };
        }
        
        return newState;
      });
    };
  }, []);

  const actions: GameActions = {
    addToInventory: createAction('addToInventory'),
    removeFromInventory: createAction('removeFromInventory'),
    takeDamage: createAction('takeDamage'),
    heal: createAction('heal'),
    changeScene: createAction('changeScene'),
    restartGame: createAction('restartGame'),
    addAchievement: createAction('addAchievement'),
    addScore: createAction('addScore'),
    completeQuest: createAction('completeQuest'),
    gainExperience: createAction('gainExperience'),
    improveSkill: createAction('improveSkill'),
    modifyRelationship: createAction('modifyRelationship'),
    affectWorldState: createAction('affectWorldState'),
    unlockSecret: createAction('unlockSecret'),
    gainLore: createAction('gainLore'),
    recruitCompanion: createAction('recruitCompanion'),
    activateVision: createAction('activateVision'),
    learnMagicalAbility: createAction('learnMagicalAbility'),
    saveGame: createAction('saveGame'),
    loadGame: createAction('loadGame')
  };

  return { gameState, actions, showAchievement, setShowAchievement };
};
