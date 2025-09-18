import { useState } from 'react';
import GameBoard from '../GameBoard';

export default function GameBoardExample() {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleGameStateChange = (newState: 'playing' | 'won' | 'lost') => {
    setGameState(newState);
    console.log('Game state changed to:', newState);
  };

  const resetGame = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="p-8 bg-background">
      <div className="space-y-4 flex flex-col items-center">
        <h3 className="text-lg font-semibold">遊戲板範例</h3>
        
        <div className="flex gap-4 items-center">
          <span className="text-sm">遊戲狀態: {gameState}</span>
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            重新開始
          </button>
        </div>
        
        <GameBoard
          width={9}
          height={9}
          mineCount={10}
          onGameStateChange={handleGameStateChange}
          resetTrigger={resetTrigger}
        />
      </div>
    </div>
  );
}