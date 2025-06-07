// src/components/GameUI.tsx
import React from "react";
import { GameState } from "../types/game";

interface StatusPanelProps {
  title: string;
  children: React.ReactNode;
  color?: string;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ title, children, color = "blue" }) => (
  <div className={`bg-gradient-to-r from-${color}-800/40 to-${color}-700/40 rounded-lg p-4 mb-4 border border-${color}-400/30`}>
    <h3 className={`text-lg font-bold text-${color}-300 mb-3`}>{title}</h3>
    {children}
  </div>
);

const ProgressBar: React.FC<{ current: number; max: number; color: string }> = ({ current, max, color }) => (
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div 
      className={`h-2 rounded-full bg-${color}-400 transition-all duration-300`}
      style={{ width: `${(current / max) * 100}%` }}
    />
  </div>
);

export const GameStatus: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  const healthPercent = (gameState.health / gameState.maxHealth) * 100;
  const healthColor = healthPercent > 75 ? 'green' : healthPercent > 50 ? 'yellow' : healthPercent > 25 ? 'orange' : 'red';

  return (
    <StatusPanel title="Character Status" color="purple">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Health</div>
          <div className={`text-xl font-bold text-${healthColor}-400`}>{gameState.health}/{gameState.maxHealth}</div>
          <ProgressBar current={gameState.health} max={gameState.maxHealth} color={healthColor} />
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Score</div>
          <div className="text-xl font-bold text-yellow-300">{gameState.score}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Level</div>
          <div className="text-xl font-bold text-purple-300">{gameState.level}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">EXP</div>
          <div className="text-xl font-bold text-blue-300">{gameState.experience}/{gameState.level * 100}</div>
        </div>
      </div>
    </StatusPanel>
  );
};

export const SkillsDisplay: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <StatusPanel title="Skills" color="green">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Object.entries(gameState.skills).map(([skill, level]) => (
        <div key={skill} className="text-center">
          <div className="text-sm text-gray-300 capitalize">{skill}</div>
          <div className="text-lg font-bold text-green-400">{level}</div>
          <ProgressBar current={level} max={100} color="green" />
        </div>
      ))}
    </div>
  </StatusPanel>
);

export const InventoryDisplay: React.FC<{ gameState: GameState }> = ({ gameState }) => {
  if (gameState.inventory.length === 0) return null;
  
  return (
    <StatusPanel title="Inventory" color="yellow">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {gameState.inventory.map((item, index) => (
          <div key={index} className="bg-black/30 rounded-md p-2 border border-yellow-500/20">
            <div className="text-sm font-medium text-yellow-300">{item}</div>
          </div>
        ))}
      </div>
    </StatusPanel>
  );
};

export const AchievementNotification: React.FC<{ achievement: string; onClose: () => void }> = ({ achievement, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
      <div className="font-bold">🏆 Achievement Unlocked!</div>
      <div className="text-sm">{achievement}</div>
    </div>
  );
};
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
import React, { useState } from "react";
import { GameState } from "../types/game";
import { EnhancedGameState } from "../types/enhancedGame";
import { COMPANIONS, POLITICAL_FACTIONS, MAGICAL_ABILITIES, MAJOR_QUESTLINES } from "../systems/expansionSystems";

interface CompanionPanelProps {
  gameState: EnhancedGameState;
  companions: string[];
}

export const CompanionPanel: React.FC<CompanionPanelProps> = ({ gameState, companions }) => {
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);

  if (companions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-purple-800/40 to-pink-800/40 rounded-lg p-4 mb-6 border border-purple-400/30">
      <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
        <span className="mr-2">👥</span> Companions ({companions.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {companions.map(companionId => {
          const companion = COMPANIONS[companionId];
          if (!companion) return null;
          
          const moodColor = {
            happy: 'text-green-400',
            neutral: 'text-blue-400', 
            concerned: 'text-yellow-400',
            conflicted: 'text-orange-400',
            angry: 'text-red-400'
          }[companion.currentMood];

          return (
            <div 
              key={companionId}
              className="bg-black/30 rounded p-3 cursor-pointer hover:bg-black/50 transition-colors"
              onClick={() => setSelectedCompanion(selectedCompanion === companionId ? null : companionId)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-purple-200">{companion.name}</span>
                <span className={`text-sm ${moodColor}`}>
                  {companion.currentMood} ({companion.trustLevel}% trust)
                </span>
              </div>
              
              {selectedCompanion === companionId && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-gray-300">{companion.backstory}</p>
                  <div className="text-xs text-purple-300">
                    <strong>Personal Quest:</strong> {companion.personalQuest}
                  </div>
                  <div className="text-xs text-blue-300">
                    <strong>Abilities:</strong> {companion.abilities.join(", ")}
                  </div>
                  
                  {/* Trust Level Visual Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{ width: `${companion.trustLevel}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface PoliticalPanelProps {
  gameState: EnhancedGameState;
}

export const PoliticalPanel: React.FC<PoliticalPanelProps> = ({ gameState }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-800/40 to-cyan-800/40 rounded-lg p-4 mb-6 border border-indigo-400/30">
      <h3 className="text-lg font-bold text-indigo-300 mb-3 flex items-center">
        <span className="mr-2">🏛️</span> Political Standing
      </h3>
      
      <div className="space-y-3">
        {Object.entries(POLITICAL_FACTIONS).map(([factionId, faction]) => {
          const reputation = faction.reputation;
          const reputationColor = reputation > 50 ? 'text-green-400' : 
                                  reputation > 0 ? 'text-blue-400' : 
                                  reputation > -50 ? 'text-yellow-400' : 'text-red-400';
          
          const stanceIcon = {
            hostile: '⚔️',
            neutral: '🤝',
            supportive: '❤️',
            complex: '🤔'
          }[faction.stance_on_dragon];

          return (
            <div key={factionId} className="bg-black/30 rounded p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-indigo-200">{faction.name}</span>
                <span className={`text-sm ${reputationColor}`}>
                  {reputation > 0 ? '+' : ''}{reputation}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  Influence: {faction.influence}%
                </span>
                <span className="text-xs text-gray-400">
                  Dragon Stance: {stanceIcon} {faction.stance_on_dragon}
                </span>
              </div>
              
              {/* Reputation Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    reputation > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ 
                    width: `${Math.abs(reputation)}%`,
                    marginLeft: reputation < 0 ? `${100 - Math.abs(reputation)}%` : '0'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface MagicalAbilitiesPanelProps {
  gameState: EnhancedGameState;
  abilities: string[];
}

export const MagicalAbilitiesPanel: React.FC<MagicalAbilitiesPanelProps> = ({ gameState, abilities }) => {
  if (abilities.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-violet-800/40 to-purple-800/40 rounded-lg p-4 mb-6 border border-violet-400/30">
      <h3 className="text-lg font-bold text-violet-300 mb-3 flex items-center">
        <span className="mr-2">✨</span> Magical Abilities ({abilities.length})
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {abilities.map(abilityId => {
          const ability = MAGICAL_ABILITIES[abilityId];
          if (!ability) return null;
          
          const schoolColor = {
            elemental: 'text-orange-400',
            temporal: 'text-blue-400',
            mental: 'text-purple-400',
            spirit: 'text-green-400',
            reality: 'text-red-400',
            life: 'text-yellow-400'
          }[ability.school];

          return (
            <div key={abilityId} className="bg-black/30 rounded p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-violet-200">{ability.name}</span>
                <span className={`text-sm ${schoolColor}`}>
                  Lv.{ability.power_level}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">{ability.description}</p>
              <div className="text-xs text-violet-400 mt-2">
                School: {ability.school}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface QuestProgressPanelProps {
  gameState: EnhancedGameState;
  activeQuests: string[];
}

export const QuestProgressPanel: React.FC<QuestProgressPanelProps> = ({ gameState, activeQuests }) => {
  if (activeQuests.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-800/40 to-teal-800/40 rounded-lg p-4 mb-6 border border-emerald-400/30">
      <h3 className="text-lg font-bold text-emerald-300 mb-3 flex items-center">
        <span className="mr-2">📋</span> Active Quests ({activeQuests.length})
      </h3>
      
      <div className="space-y-4">
        {activeQuests.map(questId => {
          const quest = MAJOR_QUESTLINES.find(q => q.id === questId);
          if (!quest) return null;
          
          const completedStages = quest.stages.filter(s => s.completed).length;
          const progressPercentage = (completedStages / quest.stages.length) * 100;

          return (
            <div key={questId} className="bg-black/30 rounded p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-emerald-200">{quest.name}</span>
                <span className="text-sm text-gray-400">
                  {completedStages}/{quest.stages.length}
                </span>
              </div>
              
              <p className="text-xs text-gray-300 mt-1">{quest.description}</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              {/* Current Stage */}
              {quest.current_stage < quest.stages.length && (
                <div className="mt-2 text-xs text-emerald-400">
                  <strong>Current:</strong> {quest.stages[quest.current_stage].description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface TimelineKnowledgePanelProps {
  gameState: EnhancedGameState;
  knownTimelines: string[];
}

export const TimelineKnowledgePanel: React.FC<TimelineKnowledgePanelProps> = ({ gameState, knownTimelines }) => {
  if (knownTimelines.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-800/40 to-indigo-800/40 rounded-lg p-4 mb-6 border border-blue-400/30">
      <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center">
        <span className="mr-2">🌌</span> Timeline Knowledge ({knownTimelines.length})
      </h3>
      
      <div className="space-y-2">
        {knownTimelines.map((timeline, index) => (
          <div key={index} className="bg-black/30 rounded p-2 text-sm text-blue-200">
            <span className="font-medium">Timeline {index + 1}:</span> {timeline}
          </div>
        ))}
      </div>
    </div>
  );
};

interface WorldEventNotificationProps {
  eventName: string;
  description: string;
  onDismiss: () => void;
}

export const WorldEventNotification: React.FC<WorldEventNotificationProps> = ({ 
  eventName, 
  description, 
  onDismiss 
}) => {
  return (
    <div className="fixed top-4 left-4 right-4 bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 rounded-lg shadow-lg z-50 animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold text-lg">🌍 World Event: {eventName}</div>
          <div className="text-sm mt-1">{description}</div>
        </div>
        <button 
          onClick={onDismiss}
          className="text-white hover:text-gray-300 ml-4"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

interface EnhancedChoiceButtonProps {
  text: string;
  onClick: () => void;
  requirements?: {
    achievements?: string[];
    companions?: string[];
    political_standing?: Record<string, number>;
    magical_abilities?: string[];
  };
  gameState: EnhancedGameState;
}

export const EnhancedChoiceButton: React.FC<EnhancedChoiceButtonProps> = ({ 
  text, 
  onClick, 
  requirements,
  gameState 
}) => {
  const meetsRequirements = () => {
    if (!requirements) return true;
    
    if (requirements.achievements) {
      if (!requirements.achievements.every(ach => gameState.achievements.includes(ach))) {
        return false;
      }
    }
    
    if (requirements.companions) {
      if (!requirements.companions.every(comp => gameState.inventory.includes(comp))) {
        return false;
      }
    }
    
    return true;
  };

  const canSelect = meetsRequirements();
  
  return (
    <button
      onClick={canSelect ? onClick : undefined}
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
          <div>{text}</div>
          {!canSelect && requirements && (
            <div className="text-xs text-red-300 mt-1">
              Requirements not met
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

interface ComprehensiveStatusProps {
  gameState: EnhancedGameState;
  companions: string[];
  activeQuests: string[];
  magicalAbilities: string[];
  knownTimelines: string[];
}

export const ComprehensiveStatusPanel: React.FC<ComprehensiveStatusProps> = ({
  gameState,
  companions,
  activeQuests,
  magicalAbilities,
  knownTimelines
}) => {
  const [activeTab, setActiveTab] = useState<'companions' | 'politics' | 'magic' | 'quests' | 'timelines'>('companions');

  return (
    <div className="mb-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4">
        {(['companions', 'politics', 'magic', 'quests', 'timelines'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-black/20 rounded-lg rounded-tl-none p-1">
        {activeTab === 'companions' && (
          <CompanionPanel gameState={gameState} companions={companions} />
        )}
        {activeTab === 'politics' && (
          <PoliticalPanel gameState={gameState} />
        )}
        {activeTab === 'magic' && (
          <MagicalAbilitiesPanel gameState={gameState} abilities={magicalAbilities} />
        )}
        {activeTab === 'quests' && (
          <QuestProgressPanel gameState={gameState} activeQuests={activeQuests} />
        )}
        {activeTab === 'timelines' && (
          <TimelineKnowledgePanel gameState={gameState} knownTimelines={knownTimelines} />
        )}
      </div>
    </div>
  );
};
import React, { useState } from "react";
import { GameState, GameActions, GAME_CONFIG } from "../types/unified";

interface UnifiedPanelProps {
  title: string;
  data: Record<string, any>;
  type: 'stats' | 'progress' | 'collection' | 'status';
  icon?: string;
  color?: string;
  renderItem?: (key: string, value: any) => React.ReactNode;
  maxHeight?: string;
}

const UnifiedPanel: React.FC<UnifiedPanelProps> = ({ 
  title, data, type, icon = "📊", color = "blue", renderItem, maxHeight = "auto" 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (Object.keys(data).length === 0) return null;

  const getColorClasses = (color: string) => ({
    bg: `bg-gradient-to-r from-${color}-800/40 to-${color}-700/40`,
    border: `border-${color}-400/30`,
    text: `text-${color}-300`
  });

  const colorClasses = getColorClasses(color);

  const defaultRender = (key: string, value: any) => {
    if (type === 'stats' && typeof value === 'number') {
      return (
        <div key={key} className="text-center">
          <div className="text-sm text-gray-300 capitalize">{key}</div>
          <div className={`text-lg font-bold ${getStatColor(value)}`}>{value}</div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-300 ${getStatColor(value).replace('text-', 'bg-')}`}
              style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
          </div>
        </div>
      );
    }
    
    if (type === 'collection') {
      return (
        <div key={key} className="bg-black/30 rounded p-2 text-sm">
          {typeof value === 'string' ? value : key}
        </div>
      );
    }
    
    return (
      <div key={key} className="flex justify-between">
        <span className="capitalize">{key}</span>
        <span>{typeof value === 'number' ? value : value.toString()}</span>
      </div>
    );
  };

  const getStatColor = (value: number) => {
    if (value >= 80) return 'text-purple-400';
    if (value >= 60) return 'text-blue-400';
    if (value >= 40) return 'text-green-400';
    if (value >= 20) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className={`${colorClasses.bg} rounded-lg p-4 mb-4 ${colorClasses.border} border`}>
      <div 
        className={`flex items-center justify-between cursor-pointer ${colorClasses.text}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-bold flex items-center">
          <span className="mr-2">{icon}</span> {title}
        </h3>
        <span>{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div 
          className={`mt-3 ${type === 'stats' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 
                      type === 'collection' ? 'grid grid-cols-2 md:grid-cols-3 gap-2' : 'space-y-2'}`}
          style={{ maxHeight, overflowY: maxHeight !== 'auto' ? 'auto' : 'visible' }}
        >
          {Object.entries(data).map(([key, value]) => 
            renderItem ? renderItem(key, value) : defaultRender(key, value)
          )}
        </div>
      )}
    </div>
  );
};

interface UniversalChoiceProps {
  choice: { text: string; action: () => void; skillCheck?: any; condition?: () => boolean };
  index: number;
  gameState: GameState;
}

const UniversalChoice: React.FC<UniversalChoiceProps> = ({ choice, index, gameState }) => {
  const canSelect = !choice.condition || choice.condition();
  const hasSkillCheck = choice.skillCheck;
  
  const getChoiceColor = () => {
    if (!canSelect) return 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed';
    if (hasSkillCheck) return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-purple-400';
    return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-blue-400';
  };

  return (
    <button
      onClick={canSelect ? choice.action : undefined}
      disabled={!canSelect}
      className={`w-full p-4 rounded-lg text-left transition-all duration-200 transform border mb-2 ${getChoiceColor()} ${canSelect ? 'hover:scale-105 hover:shadow-lg' : ''}`}
    >
      <div className="flex items-center">
        <span className="text-yellow-300 font-semibold mr-3">→</span>
        <div className="flex-1">
          <div>{choice.text}</div>
          {hasSkillCheck && (
            <div className="text-xs text-blue-200 mt-1">
              {choice.skillCheck.type.charAt(0).toUpperCase() + choice.skillCheck.type.slice(1)} Check 
              (Difficulty: {choice.skillCheck.difficulty})
            </div>
          )}
          {!canSelect && (
            <div className="text-xs text-red-300 mt-1">Requirements not met</div>
          )}
        </div>
      </div>
    </button>
  );
};

export const UnifiedGame: React.FC = () => {
  const { gameState, actions, showAchievement, setShowAchievement } = useGameState();
  
  const scenes = generateAllScenes(gameState, actions);
  const currentScene = scenes[gameState.currentScene] || scenes.missing_scene_fallback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Achievement notification */}
        {showAchievement && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
            <div className="font-bold">🏆 Achievement Unlocked!</div>
            <div className="text-sm">{showAchievement}</div>
            <button 
              onClick={() => setShowAchievement(null)}
              className="absolute top-1 right-2 text-white hover:text-gray-300"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
            The Enchanted Quest
          </h1>
          <p className="text-xl text-blue-200">A Mystical Text Adventure</p>
          <div className="mt-4 text-sm text-blue-300">
            <span>Level {gameState.level}</span> | 
            <span> EXP: {gameState.experience}/{gameState.level * 100}</span> | 
            <span> Score: {gameState.score}</span> | 
            <span> Achievements: {gameState.achievements.length}</span>
          </div>
        </div>

        {/* Status panels using unified component */}
        <UnifiedPanel 
          title="Character Status" 
          data={{ 
            Health: `${gameState.health}/${gameState.maxHealth}`,
            Level: gameState.level,
            Experience: gameState.experience,
            Class: gameState.characterClass 
          }}
          type="status" 
          icon="👤" 
          color="purple" 
        />

        <UnifiedPanel 
          title="Skills" 
          data={gameState.stats.skills} 
          type="stats" 
          icon="📊" 
          color="green" 
        />

        <UnifiedPanel 
          title="Relationships" 
          data={Object.fromEntries(
            Object.entries(gameState.stats.relationships).filter(([_, value]) => value !== 0)
          )} 
          type="stats" 
          icon="🤝" 
          color="pink" 
        />

        <UnifiedPanel 
          title="World State" 
          data={gameState.stats.worldState} 
          type="stats" 
          icon="🌍" 
          color="indigo" 
        />

        {gameState.inventory.length > 0 && (
          <UnifiedPanel 
            title="Inventory" 
            data={Object.fromEntries(gameState.inventory.map((item, i) => [i.toString(), item]))} 
            type="collection" 
            icon="🎒" 
            color="yellow" 
          />
        )}

        {Object.values(gameState.collections).some(arr => arr.length > 0) && (
          <UnifiedPanel 
            title="Collections" 
            data={{
              'Companions': gameState.collections.companions.length,
              'Magical Abilities': gameState.collections.magicalAbilities.length,
              'Lore': gameState.collections.lore.length,
              'Secrets': gameState.collections.secrets.length,
              'Visions': gameState.collections.visions.length
            }} 
            type="status" 
            icon="🗂️" 
            color="cyan" 
          />
        )}

        {/* Main scene display */}
        <div className="bg-gradient-to-br from-black/50 to-purple-900/30 rounded-lg p-6 mb-6 border border-purple-400/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4 text-yellow-200">{currentScene.title}</h2>
          <div className="text-lg leading-relaxed mb-6 text-gray-100 whitespace-pre-wrap">
            {currentScene.description}
          </div>
          
          <div className="space-y-3">
            {currentScene.choices.map((choice, index) => (
              <UniversalChoice 
                key={index} 
                choice={choice} 
                index={index} 
                gameState={gameState} 
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-blue-300 mt-6">
          <p className="text-lg">Choose your path wisely, adventurer...</p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-blue-400">
            <span>Scene: {gameState.currentScene}</span>
            <span>Health: {gameState.health}/{gameState.maxHealth}</span>
            <span>Items: {gameState.inventory.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SaveSystem: React.FC<{ gameState: GameState; onSave: (name: string) => void; onLoad: (name: string) => void }> = 
({ gameState, onSave, onLoad }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  
  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-600 hover:bg-gray-500 rounded px-4 py-2 text-white"
      >
        💾 Save / Load
      </button>
      
      {isOpen && (
        <div className="mt-4 bg-black/50 rounded-lg p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Save name..."
              className="flex-1 bg-gray-700 text-white rounded px-3 py-2"
            />
            <button
              onClick={() => saveName && onSave(saveName)}
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
            >
              Save
            </button>
          </div>
          
          {Object.keys(gameState.meta.saveSlots).map(slot => (
            <div key={slot} className="flex justify-between items-center bg-gray-700/50 rounded p-2 mb-2">
              <span>{slot}</span>
              <button
                onClick={() => onLoad(slot)}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-white text-sm"
              >
                Load
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
