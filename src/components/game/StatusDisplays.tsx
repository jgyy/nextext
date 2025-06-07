// src/components/game/StatusDisplays.tsx
import { StatusPanel, StatDisplay, ProgressBar } from '../ui';
import { GameState } from '../../types/game';

interface StatusDisplaysProps {
  gameState: GameState;
}

export const CharacterStatus: React.FC<StatusDisplaysProps> = ({ gameState }) => {
  const healthPercent = (gameState.health / gameState.maxHealth) * 100;
  const healthColor = healthPercent > 75 ? 'green' : 
                     healthPercent > 50 ? 'yellow' : 
                     healthPercent > 25 ? 'orange' : 'red';

  return (
    <StatusPanel title="Character Status" color="purple" icon="👤">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatDisplay
          label="Health"
          value={gameState.health}
          max={gameState.maxHealth}
          icon="❤️"
          showProgress
          color={healthColor}
        />
        <StatDisplay
          label="Level"
          value={gameState.level}
          icon="⭐"
          color="purple"
        />
        <StatDisplay
          label="Experience"
          value={gameState.experience}
          max={gameState.level * 100}
          icon="✨"
          showProgress
          color="blue"
        />
        <StatDisplay
          label="Score"
          value={gameState.score}
          icon="🏆"
          color="yellow"
        />
      </div>
    </StatusPanel>
  );
};

export const SkillsDisplay: React.FC<StatusDisplaysProps> = ({ gameState }) => (
  <StatusPanel title="Skills" color="green" icon="📊" collapsible>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {Object.entries(gameState.skills).map(([skill, level]) => (
        <StatDisplay
          key={skill}
          label={skill}
          value={level}
          max={100}
          showProgress
        />
      ))}
    </div>
  </StatusPanel>
);

export const RelationshipsDisplay: React.FC<StatusDisplaysProps> = ({ gameState }) => {
  const activeRelationships = Object.entries(gameState.relationships)
    .filter(([_, level]) => level !== 0);

  if (activeRelationships.length === 0) return null;

  return (
    <StatusPanel title="Relationships" color="pink" icon="🤝" collapsible>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeRelationships.map(([character, level]) => (
          <div key={character} className="flex items-center justify-between bg-black/30 rounded p-2">
            <span className="capitalize text-gray-300">
              {character.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <StatDisplay
              label=""
              value={level}
              color={level > 0 ? 'green' : 'red'}
            />
          </div>
        ))}
      </div>
    </StatusPanel>
  );
};

export const InventoryDisplay: React.FC<StatusDisplaysProps> = ({ gameState }) => {
  if (gameState.inventory.length === 0) return null;

  return (
    <StatusPanel title="Inventory" color="yellow" icon="🎒" collapsible>
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
