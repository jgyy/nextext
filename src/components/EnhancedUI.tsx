// src/components/EnhancedUI.tsx
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
