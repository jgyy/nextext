// src/types/enhancedGame.ts
export interface EnhancedGameState extends GameState {
  background: 'scholar' | 'noble' | 'wanderer' | 'none';
  characterLevel: number;
  experience: number;
  skills: {
    wisdom: number;
    courage: number;
    compassion: number;
    diplomacy: number;
    survival: number;
  };
  
  relationships: {
    auraxes: number; 
    hermit: number;
    unicorn: number;
    wolfSpirit: number;
    fairies: number;
    forestCreatures: number;
  };
  
  timeElapsed: number;
  worldState: {
    forestHealth: number;
    templeCondition: number;
    knowledgePreservation: number;
    worldHope: number;
  };
  
  loreCollected: string[];
  memoriesUnlocked: string[];
  secretsDiscovered: string[];
  
  saveSlots: {
    [key: string]: Partial<EnhancedGameState>;
  };
}
