// src/components/game/SaveSystem.tsx
import React, { useState } from 'react';
import { StatusPanel } from '../ui';

interface SaveSystemProps {
  gameState: GameState;
  onSave: (slotName: string) => void;
  onLoad: (slotName: string) => void;
}

export const SaveSystem: React.FC<SaveSystemProps> = ({ gameState, onSave, onLoad }) => {
  const [saveSlotName, setSaveSlotName] = useState('');
  const saveSlots = Object.keys(gameState.saveSlots);

  return (
    <StatusPanel title="Save / Load Game" color="gray" icon="💾" collapsible defaultExpanded={false}>
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-bold text-gray-200 mb-2">Save Current Progress</h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={saveSlotName}
              onChange={(e) => setSaveSlotName(e.target.value)}
              placeholder="Enter save name..."
              className="flex-1 bg-gray-700 text-white rounded px-3 py-2 border border-gray-500"
            />
            <button
              onClick={() => {
                if (saveSlotName.trim()) {
                  onSave(saveSlotName.trim());
                  setSaveSlotName('');
                }
              }}
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
            >
              Save
            </button>
          </div>
        </div>

        {saveSlots.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-200 mb-2">Load Saved Game</h4>
            <div className="space-y-2">
              {saveSlots.map(slotName => (
                <div key={slotName} className="flex items-center justify-between bg-gray-700/50 rounded p-3">
                  <span className="text-gray-200">{slotName}</span>
                  <button
                    onClick={() => onLoad(slotName)}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white text-sm"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StatusPanel>
  );
};
