// src/components/game/NotificationSystem.tsx
import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'achievement' | 'event' | 'warning';
  onClose: () => void;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'achievement',
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getNotificationStyle = () => {
    switch (type) {
      case 'achievement':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 animate-bounce';
      case 'event':
        return 'bg-gradient-to-r from-red-600 to-orange-600 animate-pulse';
      case 'warning':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'event': return '🌍';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`fixed top-4 right-4 text-white p-4 rounded-lg shadow-lg z-50 ${getNotificationStyle()}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold">
            {getIcon()} {type === 'achievement' ? 'Achievement Unlocked!' : 'Notification'}
          </div>
          <div className="text-sm mt-1">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 ml-4"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
