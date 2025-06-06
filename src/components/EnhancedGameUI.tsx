// src/components/EnhancedGameUI.tsx
import React from "react";
import { EnhancedGameState } from "../types/enhancedGame";

interface SkillDisplayProps {
  gameState: EnhancedGameState;
}

export const SkillDisplay: React.FC<SkillDisplayProps> = ({ gameState }) => {
  const getSkillColor = (level: number) => {
    if (level >= 80) return 'text-purple-400';
    if (level >= 60) return 'text-blue-400';
    if (level >= 40) return 'text-green-400';
    if (level >= 20) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getSkillIcon = (skill: string) => {
    const icons: Record<string, string> = {
      wisdom: "🧠",
      courage: "❤️", 
      compassion: "🤝",
      diplomacy: "💬",
      survival: "🏕️"
    };
    return icons[skill] || "⭐";
  };

  return (
    <div className="bg-gradient-to-r from-purple-800/40 to-blue-800/40 rounded-lg p-4 mb-6 border border-purple-400/30">
      <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
        <span className="mr-2">📊</span> Character Development
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {Object.entries(gameState.skills).map(([skill, level]) => (
          <div key={skill} className="text-center">
            <div className="text-2xl mb-1">{getSkillIcon(skill)}</div>
            <div className="text-sm font-medium text-gray-300 capitalize">{skill}</div>
            <div className={`text-lg font-bold ${getSkillColor(level)}`}>{level}</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  level >= 80 ? 'bg-purple-400' :
                  level >= 60 ? 'bg-blue-400' :
                  level >= 40 ? 'bg-green-400' :
                  level >= 20 ? 'bg-yellow-400' : 'bg-gray-400'
                }`}
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface RelationshipDisplayProps {
  gameState: EnhancedGameState;
}

export const RelationshipDisplay: React.FC<RelationshipDisplayProps> = ({ gameState }) => {
  const getRelationshipStatus = (level: number) => {
    if (level >= 80) return { text: "Devoted Friend", color: "text-purple-400" };
    if (level >= 60) return { text: "Trusted Ally", color: "text-blue-400" };
    if (level >= 40) return { text: "Good Friend", color: "text-green-400" };
    if (level >= 20) return { text: "Acquaintance", color: "text-yellow-400" };
    if (level >= 0) return { text: "Neutral", color: "text-gray-400" };
    if (level >= -20) return { text: "Wary", color: "text-orange-400" };
    if (level >= -40) return { text: "Unfriendly", color: "text-red-400" };
    return { text: "Hostile", color: "text-red-600" };
  };

  const activeRelationships = Object.entries(gameState.relationships).filter(([_, level]) => level !== 0);

  if (activeRelationships.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-green-800/40 to-teal-800/40 rounded-lg p-4 mb-6 border border-green-400/30">
      <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center">
        <span className="mr-2">🤝</span> Relationships
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeRelationships.map(([character, level]) => {
          const status = getRelationshipStatus(level);
          return (
            <div key={character} className="flex items-center justify-between bg-black/30 rounded p-2">
              <span className="capitalize text-gray-300">{character.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="text-right">
                <div className={`text-sm font-medium ${status.color}`}>{status.text}</div>
                <div className="text-xs text-gray-400">{level > 0 ? '+' : ''}{level}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface WorldStateDisplayProps {
  gameState: EnhancedGameState;
}

export const WorldStateDisplay: React.FC<WorldStateDisplayProps> = ({ gameState }) => {
  const getStateColor = (level: number) => {
    if (level >= 80) return 'bg-purple-400';
    if (level >= 60) return 'bg-blue-400';
    if (level >= 40) return 'bg-green-400';
    if (level >= 20) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getStateIcon = (aspect: string) => {
    const icons: Record<string, string> = {
      forestHealth: "🌲",
      templeCondition: "🏛️",
      knowledgePreservation: "📚",
      worldHope: "✨"
    };
    return icons[aspect] || "🌍";
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800/40 to-purple-800/40 rounded-lg p-4 mb-6 border border-indigo-400/30">
      <h3 className="text-lg font-bold text-indigo-300 mb-3 flex items-center">
        <span className="mr-2">🌍</span> World Impact
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(gameState.worldState).map(([aspect, level]) => (
          <div key={aspect} className="text-center">
            <div className="text-2xl mb-1">{getStateIcon(aspect)}</div>
            <div className="text-xs text-gray-300 mb-1">
              {aspect.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getStateColor(level)}`}
                style={{ width: `${level}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">{level}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SaveLoadSystemProps {
  gameState: EnhancedGameState;
  onSave: (slotName: string) => void;
  onLoad: (slotName: string) => void;
}

export const SaveLoadSystem: React.FC<SaveLoadSystemProps> = ({ gameState, onSave, onLoad }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [saveSlotName, setSaveSlotName] = React.useState('');

  const saveSlots = Object.keys(gameState.saveSlots);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 rounded-lg px-4 py-2 text-white font-medium transition-all duration-200"
      >
        💾 Save / Load Game
      </button>

      {isOpen && (
        <div className="mt-4 bg-black/50 rounded-lg p-4 border border-gray-400/30">
          <div className="mb-4">
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
      )}
    </div>
  );
};

interface EnhancedAchievementDisplayProps {
  gameState: EnhancedGameState;
}

export const EnhancedAchievementDisplay: React.FC<EnhancedAchievementDisplayProps> = ({ gameState }) => {
  const achievementCategories = {
    wisdom: gameState.achievements.filter(a => 
      a.includes('Wisdom') || a.includes('Scholar') || a.includes('Knowledge')
    ),
    courage: gameState.achievements.filter(a => 
      a.includes('Courage') || a.includes('Brave') || a.includes('Hero')
    ),
    compassion: gameState.achievements.filter(a => 
      a.includes('Compassion') || a.includes('Kind') || a.includes('Helper')
    ),
    special: gameState.achievements.filter(a => 
      a.includes('Master') || a.includes('Guardian') || a.includes('Blessed')
    )
  };

  if (gameState.achievements.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-800/40 to-orange-800/40 rounded-lg p-4 mb-6 border border-yellow-400/30">
      <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center">
        <span className="mr-2">🏆</span> Achievements ({gameState.achievements.length})
      </h3>
      
      {Object.entries(achievementCategories).map(([category, achievements]) => {
        if (achievements.length === 0) return null;
        
        return (
          <div key={category} className="mb-3">
            <h4 className="text-sm font-semibold text-yellow-200 capitalize mb-1">{category}</h4>
            <div className="flex flex-wrap gap-1">
              {achievements.map((achievement, index) => (
                <span 
                  key={index}
                  className="text-xs bg-yellow-600/30 text-yellow-200 px-2 py-1 rounded border border-yellow-500/30"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface LoreDisplayProps {
  gameState: EnhancedGameState;
}

export const LoreDisplay: React.FC<LoreDisplayProps> = ({ gameState }) => {
  const [activeTab, setActiveTab] = React.useState<'lore' | 'memories' | 'secrets'>('lore');
  
  const currentData = {
    lore: gameState.loreCollected || [],
    memories: gameState.memoriesUnlocked || [],
    secrets: gameState.secretsDiscovered || []
  }[activeTab];

  const totalCollected = (gameState.loreCollected?.length || 0) + 
                        (gameState.memoriesUnlocked?.length || 0) + 
                        (gameState.secretsDiscovered?.length || 0);

  if (totalCollected === 0) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-800/40 to-blue-800/40 rounded-lg p-4 mb-6 border border-cyan-400/30">
      <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center">
        <span className="mr-2">📜</span> Collected Knowledge
      </h3>
      
      <div className="flex space-x-2 mb-3">
        {(['lore', 'memories', 'secrets'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'bg-cyan-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({currentData.length})
          </button>
        ))}
      </div>

      <div className="max-h-32 overflow-y-auto">
        {currentData.length > 0 ? (
          <div className="space-y-1">
            {currentData.map((item, index) => (
              <div key={index} className="text-sm text-cyan-200 bg-black/20 rounded p-2">
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400">No {activeTab} collected yet.</div>
        )}
      </div>
    </div>
  );
};
