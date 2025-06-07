// src/components/ui/StatusPanel.tsx
import React, { useState } from 'react';

interface StatusPanelProps {
  title: string;
  children: React.ReactNode;
  color?: string;
  icon?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  title,
  children,
  color = 'blue',
  icon = '📊',
  collapsible = false,
  defaultExpanded = true,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const colorClasses = {
    bg: `bg-gradient-to-r from-${color}-800/40 to-${color}-700/40`,
    border: `border-${color}-400/30`,
    text: `text-${color}-300`
  };

  return (
    <div className={`${colorClasses.bg} rounded-lg p-4 mb-4 border ${colorClasses.border} ${className}`}>
      <div
        className={`flex items-center justify-between ${collapsible ? 'cursor-pointer' : ''} ${colorClasses.text}`}
        onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <h3 className="text-lg font-bold flex items-center">
          <span className="mr-2">{icon}</span>
          {title}
        </h3>
        {collapsible && (
          <span className="text-sm">{isExpanded ? '▼' : '▶'}</span>
        )}
      </div>
      
      {(!collapsible || isExpanded) && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
};
