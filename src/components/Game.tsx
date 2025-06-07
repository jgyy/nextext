// src/components/Game.tsx
import React from 'react';
import { GameState, GameActions, Scene } from '../types/game';
import { GameHeader } from './game/GameHeader';
import { CharacterStatus, SkillsDisplay, RelationshipsDisplay, InventoryDisplay } from './game/StatusDisplays';
import { SceneDisplay } from './game/SceneDisplay';
import { ChoiceButton } from './game/ChoiceButton';
import { SaveSystem } from './game/SaveSystem';
import { Notification } from './game/NotificationSystem';

interface GameProps {
  gameState: GameState;
  actions: GameActions;
  currentScene: Scene;
  showNotification?: string;
  notificationType?: 'achievement' | 'event' | 'warning';
  onCloseNotification?: () => void;
}

export const Game: React.FC<GameProps> = ({
  gameState,
  actions,
  currentScene,
  showNotification,
  notificationType = 'achievement',
  onCloseNotification
}) => {
  const availableChoices = currentScene.choices.filter(choice =>
    !choice.condition || choice.condition()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {showNotification && onCloseNotification && (
          <Notification
            message={showNotification}
            type={notificationType}
            onClose={onCloseNotification}
          />
        )}

        <GameHeader gameState={gameState} />

        <CharacterStatus gameState={gameState} />
        <SkillsDisplay gameState={gameState} />
        <RelationshipsDisplay gameState={gameState} />
        <InventoryDisplay gameState={gameState} />

        <SaveSystem
          gameState={gameState}
          onSave={actions.saveGame}
          onLoad={actions.loadGame}
        />

        <SceneDisplay title={currentScene.title} description={currentScene.description}>
          <div className="space-y-3">
            {availableChoices.map((choice, index) => (
              <ChoiceButton
                key={index}
                choice={choice}
                index={index}
                gameState={gameState}
              />
            ))}
          </div>
        </SceneDisplay>

        <div className="text-center text-blue-300 mt-6">
          <p className="text-lg">Choose your path wisely, adventurer...</p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-blue-400">
            <span>Scene: {gameState.currentScene}</span>
            <span>Health: {gameState.health}/{gameState.maxHealth}</span>
            <span>Items: {gameState.inventory.length}</span>
            {gameState.companionsRecruited.length > 0 && (
              <span>Companions: {gameState.companionsRecruited.length}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
