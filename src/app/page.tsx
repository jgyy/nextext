// src/app/page.tsx
"use client";
import { useState } from "react";
import Game from "../components/Game";

export default function Home() {
  const [gameMode, setGameMode] = useState<'selection' | 'play'>('selection');

  if (gameMode === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
            The Enchanted Quest
          </h1>
          <p className="text-2xl text-blue-200 mb-8">A Mystical Text Adventure</p>
          
          <div className="bg-black/30 rounded-lg p-6 border border-blue-400/30">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">Enter the Mystical Realm</h2>
            <p className="text-gray-300 mb-6">
              Embark on an epic quest for the Golden Orb of Eternal Wisdom. Your choices will shape your destiny and the fate of the entire realm.
            </p>
            <button
              onClick={() => setGameMode('play')}
              className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold transition-all duration-200 transform hover:scale-105"
            >
              Begin Your Adventure
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Game />;
}
