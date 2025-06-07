// src/components/ui/StatDisplay.tsx
interface StatDisplayProps {
  label: string;
  value: number;
  max?: number;
  icon?: string;
  showProgress?: boolean;
  color?: string;
}

export const StatDisplay: React.FC<StatDisplayProps> = ({
  label,
  value,
  max,
  icon,
  showProgress = false,
  color
}) => {
  const getStatColor = (val: number, maximum?: number) => {
    if (color) return `text-${color}-400`;
    
    const percentage = maximum ? (val / maximum) * 100 : val;
    if (percentage >= 80) return 'text-purple-400';
    if (percentage >= 60) return 'text-blue-400';
    if (percentage >= 40) return 'text-green-400';
    if (percentage >= 20) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="text-center">
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <div className="text-sm text-gray-300 mb-1 capitalize">{label}</div>
      <div className={`text-lg font-bold ${getStatColor(value, max)}`}>
        {max ? `${value}/${max}` : value}
      </div>
      {showProgress && max && (
        <ProgressBar
          current={value}
          max={max}
          color={getStatColor(value, max).replace('text-', '').replace('-400', '')}
        />
      )}
    </div>
  );
};
