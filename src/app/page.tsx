// src/app/page.tsx
"use client";

import React, { useState } from "react";
import Game from "../components/Game";
import EnhancedGame from "../components/EnhancedGame";

export default function Home() {
  const [gameMode, setGameMode] = useState<'selection' | 'basic' | 'enhanced'>('selection');

  if (gameMode === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              The Enchanted Quest
            </h1>
            <p className="text-2xl text-blue-200">Choose Your Adventure Mode</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/30 rounded-lg p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all">
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">Classic Adventure</h2>
              <p className="text-gray-300 mb-6">
                Experience the original quest for the Golden Orb. Perfect for first-time players or those who enjoy a streamlined adventure focused on meaningful choices and story.
              </p>
              <ul className="text-sm text-blue-200 mb-6 space-y-2">
                <li>• Traditional text adventure gameplay</li>
                <li>• Focus on story and choices</li>
                <li>• Multiple endings based on your decisions</li>
                <li>• Achievement system</li>
              </ul>
              <button
                onClick={() => setGameMode('basic')}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
              >
                Play Classic Mode
              </button>
            </div>

            <div className="bg-black/30 rounded-lg p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Enhanced RPG Mode</h2>
              <p className="text-gray-300 mb-6">
                A deeper adventure with character classes, skills, relationships, and world-changing decisions. Build your character and shape the realm's destiny.
              </p>
              <ul className="text-sm text-purple-200 mb-6 space-y-2">
                <li>• Character classes and skill progression</li>
                <li>• Relationship system with multiple factions</li>
                <li>• World state that changes based on actions</li>
                <li>• Save/Load system</li>
                <li>• New Game+ mode</li>
                <li>• Expanded lore and secrets</li>
              </ul>
              <button
                onClick={() => setGameMode('enhanced')}
                className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
              >
                Play Enhanced Mode
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>Both modes feature the same core story but offer different gameplay experiences.</p>
            <p className="mt-2">You can switch between modes at any time by refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  return gameMode === 'basic' ? <Game /> : <EnhancedGame />;
}
