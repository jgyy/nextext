// src/components/EnhancedGame.tsx
"use client";

import React from "react";
import { useEnhancedGameState } from "../hooks/useEnhancedGameState";
import { getAllScenes } from "../scenes/sceneManager";
import { 
  GameHeader, 
  GameStatus, 
  SceneDisplay, 
  ChoiceButton, 
  GameFooter, 
  InventoryDisplay,
  AchievementNotification 
} from "./GameUI";
import {
  SkillDisplay,
  RelationshipDisplay,
  WorldStateDisplay,
  SaveLoadSystem,
  EnhancedAchievementDisplay,
  LoreDisplay
} from "./EnhancedGameUI";

export default function EnhancedGame() {
  const [gameState, actions, showAchievement, setShowAchievement] = useEnhancedGameState();

  const getCurrentScene = () => {
    if (gameState.gameOver) {
      return getAllScenes(gameState, actions).game_over;
    }
    
    const scenes = getAllScenes(gameState, actions);
    const scene = scenes[gameState.currentScene];
    
    if (!scene) {
      console.error(`Scene not found: "${gameState.currentScene}"`);
      console.error("Available scenes:", Object.keys(scenes));
      console.error("Current game state:", gameState);
      
      return {
        title: "Lost in the Woods",
        description: `You seem to have wandered off the known paths. The scene "${gameState.currentScene}" doesn't exist in this realm. Perhaps you should return to familiar territory.`,
        choices: [
          {
            text: "Return to the forest path",
            action: () => actions.changeScene("forest_path")
          },
          {
            text: "Go back to the beginning", 
            action: () => actions.changeScene("start")
          },
          {
            text: "Begin character creation (Enhanced Mode)",
            action: () => actions.changeScene("character_creation")
          },
          {
            text: "Restart your adventure",
            action: actions.restartGame
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {showAchievement && (
          <AchievementNotification 
            achievement={showAchievement} 
            onClose={() => setShowAchievement(null)} 
          />
        )}

        <GameHeader />
        
        <div className="mb-4 text-center">
          <span className="text-yellow-300 font-bold">Level {gameState.level}</span>
          <span className="mx-4">|</span>
          <span className="text-blue-300">EXP: {gameState.experience}/{gameState.level * 100}</span>
          <span className="mx-4">|</span>
          <span className="text-purple-300 capitalize">{gameState.characterClass}</span>
        </div>
        
        <GameStatus gameState={gameState} />

        <SkillDisplay gameState={gameState} />

        <RelationshipDisplay gameState={gameState} />

        <WorldStateDisplay gameState={gameState} />

        <InventoryDisplay gameState={gameState} />

        <LoreDisplay gameState={gameState} />

        <EnhancedAchievementDisplay gameState={gameState} />

        <SaveLoadSystem 
          gameState={gameState} 
          onSave={actions.saveGame} 
          onLoad={actions.loadGame} 
        />

        <SceneDisplay title={currentScene.title} description={currentScene.description}>
          <div className="space-y-3">
            {availableChoices.map((choice, index) => (
              <ChoiceButton
                key={index}
                text={choice.text}
                onClick={choice.action}
                index={index}
                skillCheck={choice.skillCheck}
              />
            ))}
          </div>
        </SceneDisplay>

        <GameFooter 
          currentScene={gameState.currentScene} 
          gameState={gameState}
        />

        {gameState.companionsRecruited.length > 0 && (
          <div className="mt-4 text-center text-sm text-blue-300">
            Companions: {gameState.companionsRecruited.join(", ")}
          </div>
        )}

        {gameState.magicalAbilities.length > 0 && (
          <div className="mt-2 text-center text-sm text-purple-300">
            Magical Abilities: {gameState.magicalAbilities.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
