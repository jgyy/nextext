// src/components/game/SceneDisplay.tsx
interface SceneDisplayProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SceneDisplay: React.FC<SceneDisplayProps> = ({ title, description, children }) => (
  <div className="bg-gradient-to-br from-black/50 to-purple-900/30 rounded-lg p-6 mb-6 border border-purple-400/20 backdrop-blur-sm">
    <h2 className="text-3xl font-bold mb-4 text-yellow-200">{title}</h2>
    <div className="text-lg leading-relaxed mb-6 text-gray-100 whitespace-pre-wrap">
      {description}
    </div>
    {children}
  </div>
);
