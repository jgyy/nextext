// src/components/Game.tsx
import React from "react";
import { useGameState } from "../hooks/useGameState";
import { SceneFactory } from "../utils/sceneFactory";
import { GameStatus, SkillsDisplay, InventoryDisplay, AchievementNotification } from "./GameUI";

export default function Game() {
  const { gameState, actions, showAchievement, setShowAchievement } = useGameState();
  
  const scenes = SceneFactory.getAllScenes(gameState, actions);
  const currentScene = scenes[gameState.currentScene] || scenes.start;
  
  const availableChoices = currentScene.choices.filter(choice => 
    !choice.condition || choice.condition()
  );

  const checkSkillRequirement = (skillCheck: {type: string, difficulty: number}): boolean => {
    const skillLevel = gameState.skills[skillCheck.type] || 0;
    return skillLevel >= skillCheck.difficulty;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {showAchievement && (
          <AchievementNotification 
            achievement={showAchievement} 
            onClose={() => setShowAchievement(null)} 
          />
        )}

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
            The Enchanted Quest
          </h1>
          <p className="text-xl text-blue-200">A Mystical Text Adventure</p>
        </div>

        <GameStatus gameState={gameState} />
        <SkillsDisplay gameState={gameState} />
        <InventoryDisplay gameState={gameState} />

        <div className="bg-gradient-to-br from-black/50 to-purple-900/30 rounded-lg p-6 mb-6 border border-purple-400/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4 text-yellow-200">{currentScene.title}</h2>
          <div className="text-lg leading-relaxed mb-6 text-gray-100 whitespace-pre-wrap">
            {currentScene.description}
          </div>
          
          <div className="space-y-3">
            {availableChoices.map((choice, index) => {
              const canSelect = !choice.skillCheck || checkSkillRequirement(choice.skillCheck);
              
              return (
                <button
                  key={index}
                  onClick={canSelect ? choice.action : undefined}
                  disabled={!canSelect}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-200 transform border mb-2 ${
                    canSelect 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg border-blue-400' 
                      : 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-yellow-300 font-semibold mr-3">→</span>
                    <div className="flex-1">
                      <div>{choice.text}</div>
                      {choice.skillCheck && (
                        <div className="text-xs text-blue-200 mt-1">
                          {choice.skillCheck.type.charAt(0).toUpperCase() + choice.skillCheck.type.slice(1)} Check (Difficulty: {choice.skillCheck.difficulty})
                        </div>
                      )}
                      {!canSelect && choice.skillCheck && (
                        <div className="text-xs text-red-300 mt-1">Skill requirement not met</div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center text-blue-300 mt-6">
          <p className="text-lg">Choose your path wisely, adventurer...</p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-blue-400">
            <span>Scene: {gameState.currentScene}</span>
            <span>Achievements: {gameState.achievements.length}</span>
            {gameState.companionsRecruited.length > 0 && (
              <span>Companions: {gameState.companionsRecruited.length}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
