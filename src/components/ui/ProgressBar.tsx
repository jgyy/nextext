// src/components/ui/ProgressBar.tsx
interface ProgressBarProps {
  current: number;
  max: number;
  color?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  color = 'blue',
  showText = false,
  size = 'md'
}) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

  return (
    <div className="w-full">
      {showText && (
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>{current}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full bg-${color}-400 transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
