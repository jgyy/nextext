// src/components/game/ChoiceButton.tsx
import { GameState, Choice } from '../../types/game';

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  gameState: GameState;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, index, gameState }) => {
  const meetsRequirements = () => {
    if (!choice.requirements) return true;

    const { achievements, companions, items, skills } = choice.requirements;

    if (achievements && !achievements.every(ach => gameState.achievements.includes(ach))) {
      return false;
    }

    if (companions && !companions.every(comp => gameState.companionsRecruited.includes(comp))) {
      return false;
    }

    if (items && !items.every(item => gameState.inventory.includes(item))) {
      return false;
    }

    if (skills) {
      for (const [skill, required] of Object.entries(skills)) {
        if ((gameState.skills[skill] || 0) < required) {
          return false;
        }
      }
    }

    return true;
  };

  const meetsSkillCheck = () => {
    if (!choice.skillCheck) return true;
    const skillLevel = gameState.skills[choice.skillCheck.type] || 0;
    return skillLevel >= choice.skillCheck.difficulty;
  };

  const canSelect = (!choice.condition || choice.condition()) && 
                   meetsRequirements() && 
                   meetsSkillCheck();

  const getButtonColor = () => {
    if (!canSelect) return 'bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed';
    if (choice.skillCheck) return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-purple-400';
    return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-blue-400';
  };

  return (
    <button
      onClick={canSelect ? choice.action : undefined}
      disabled={!canSelect}
      className={`w-full p-4 rounded-lg text-left transition-all duration-200 transform border mb-2 ${getButtonColor()} ${canSelect ? 'hover:scale-105 hover:shadow-lg' : ''}`}
    >
      <div className="flex items-center">
        <span className="text-yellow-300 font-semibold mr-3">→</span>
        <div className="flex-1">
          <div>{choice.text}</div>
          
          {choice.skillCheck && (
            <div className="text-xs text-blue-200 mt-1">
              {choice.skillCheck.type.charAt(0).toUpperCase() + choice.skillCheck.type.slice(1)} Check
              (Difficulty: {choice.skillCheck.difficulty})
            </div>
          )}
          
          {!canSelect && (
            <div className="text-xs text-red-300 mt-1">
              {!meetsRequirements() && "Requirements not met"}
              {!meetsSkillCheck() && "Skill requirement not met"}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
