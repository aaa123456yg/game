import { useState } from 'react';
import GameControls from '../GameControls';

export default function GameControlsExample() {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');

  const handleReset = () => {
    setGameState('playing');
    console.log('Game reset');
  };

  const handleDifficultyChange = (newDifficulty: 'beginner' | 'intermediate' | 'expert') => {
    setDifficulty(newDifficulty);
    console.log('Difficulty changed to:', newDifficulty);
  };

  const cycleGameState = () => {
    const states: ('playing' | 'won' | 'lost')[] = ['playing', 'won', 'lost'];
    const currentIndex = states.indexOf(gameState);
    const nextIndex = (currentIndex + 1) % states.length;
    setGameState(states[nextIndex]);
  };

  return (
    <div className="p-8 bg-background">
      <div className="space-y-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold">遊戲控制面板範例</h3>
        
        <button 
          onClick={cycleGameState}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
        >
          切換遊戲狀態 (當前: {gameState})
        </button>
        
        <GameControls
          gameState={gameState}
          flagCount={3}
          totalMines={10}
          timeElapsed={125}
          difficulty={difficulty}
          onReset={handleReset}
          onDifficultyChange={handleDifficultyChange}
        />
      </div>
    </div>
  );
}