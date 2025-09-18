import { useState, useEffect, useCallback } from "react";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";

const difficultySettings = {
  beginner: { width: 9, height: 9, mines: 10 },
  intermediate: { width: 16, height: 16, mines: 40 },
  expert: { width: 30, height: 16, mines: 99 }
};

export default function MinesweeperGame() {
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [resetTrigger, setResetTrigger] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [flagCount, setFlagCount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const settings = difficultySettings[difficulty];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && gameState === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, gameState]);

  // Handle game state changes
  const handleGameStateChange = useCallback((newState: 'playing' | 'won' | 'lost') => {
    setGameState(newState);
    
    if (newState === 'playing') {
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
    }
  }, []);

  // Reset game
  const handleReset = useCallback(() => {
    setResetTrigger(prev => prev + 1);
    setTimeElapsed(0);
    setFlagCount(0);
    setIsTimerRunning(false);
    setGameState('playing');
  }, []);

  // Change difficulty
  const handleDifficultyChange = useCallback((newDifficulty: 'beginner' | 'intermediate' | 'expert') => {
    setDifficulty(newDifficulty);
    handleReset();
  }, [handleReset]);

  // Start timer on first interaction
  useEffect(() => {
    if (gameState === 'playing' && !isTimerRunning && timeElapsed === 0) {
      const timer = setTimeout(() => {
        setIsTimerRunning(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [gameState, isTimerRunning, timeElapsed]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2" data-testid="game-title">
            踩地雷遊戲
          </h1>
          <p className="text-muted-foreground">
            左鍵點擊開啟格子，右鍵插旗標記地雷
          </p>
        </div>

        {/* Game Area */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Controls */}
          <div className="order-2 lg:order-1">
            <GameControls
              gameState={gameState}
              flagCount={flagCount}
              totalMines={settings.mines}
              timeElapsed={timeElapsed}
              difficulty={difficulty}
              onReset={handleReset}
              onDifficultyChange={handleDifficultyChange}
            />
          </div>

          {/* Game Board */}
          <div className="order-1 lg:order-2 flex justify-center">
            <GameBoard
              width={settings.width}
              height={settings.height}
              mineCount={settings.mines}
              onGameStateChange={handleGameStateChange}
              resetTrigger={resetTrigger}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-card p-6 rounded-lg border border-card-border max-w-2xl">
            <h2 className="text-lg font-semibold mb-3">遊戲說明</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• 左鍵點擊格子來探索，避免點到地雷</p>
              <p>• 右鍵點擊插旗標記你認為有地雷的格子</p>
              <p>• 數字表示周圍八格中地雷的數量</p>
              <p>• 找出所有非地雷格子即可獲勝</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}