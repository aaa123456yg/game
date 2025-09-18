import { RotateCcw, Timer, Bomb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface GameControlsProps {
  gameState: 'playing' | 'won' | 'lost';
  flagCount: number;
  totalMines: number;
  timeElapsed: number;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  onReset: () => void;
  onDifficultyChange: (difficulty: 'beginner' | 'intermediate' | 'expert') => void;
}

const difficultySettings = {
  beginner: { label: '初學者', width: 9, height: 9, mines: 10 },
  intermediate: { label: '中級', width: 16, height: 16, mines: 40 },
  expert: { label: '專家', width: 30, height: 16, mines: 99 }
};

export default function GameControls({
  gameState,
  flagCount,
  totalMines,
  timeElapsed,
  difficulty,
  onReset,
  onDifficultyChange
}: GameControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getGameStateEmoji = () => {
    switch (gameState) {
      case 'won': return '🎉';
      case 'lost': return '💥';
      default: return '🤔';
    }
  };

  const getGameStateText = () => {
    switch (gameState) {
      case 'won': return '恭喜獲勝！';
      case 'lost': return '遊戲結束';
      default: return '進行中';
    }
  };

  return (
    <Card className="w-full max-w-md" data-testid="game-controls">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Game Status */}
          <div className="text-center">
            <div className="text-2xl mb-1" data-testid="game-status-emoji">
              {getGameStateEmoji()}
            </div>
            <div className="text-lg font-semibold" data-testid="game-status-text">
              {getGameStateText()}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm" data-testid="mine-counter">
              <Bomb className="w-4 h-4 text-minesweeper-mine" />
              <span className="font-mono">
                {totalMines - flagCount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm" data-testid="timer">
              <Timer className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">
                {formatTime(timeElapsed)}
              </span>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">難度等級</label>
            <Select value={difficulty} onValueChange={onDifficultyChange} data-testid="difficulty-selector">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(difficultySettings).map(([key, settings]) => (
                  <SelectItem key={key} value={key}>
                    {settings.label} ({settings.width}×{settings.height}, {settings.mines} 地雷)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <Button 
            onClick={onReset}
            variant="outline"
            className="w-full"
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重新開始
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}