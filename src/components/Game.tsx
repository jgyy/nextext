// src/components/Game.tsx
"use client";

import React from "react";
import { useGameState } from "../hooks/useGameState";
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

export default function Game() {
  const [gameState, actions, showAchievement, setShowAchievement] = useGameState();

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
        
        <GameStatus gameState={gameState} />

        <InventoryDisplay gameState={gameState} />

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
      </div>
    </div>
  );
}
