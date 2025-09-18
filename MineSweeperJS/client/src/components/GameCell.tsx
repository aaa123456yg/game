import { Bomb, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GameCellProps {
  isRevealed: boolean;
  isMine: boolean;
  isFlagged: boolean;
  neighborMines: number;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  isGameOver?: boolean;
}

const numberColors = {
  1: "text-minesweeper-1",
  2: "text-minesweeper-2", 
  3: "text-minesweeper-3",
  4: "text-minesweeper-4",
  5: "text-minesweeper-5",
  6: "text-minesweeper-6",
  7: "text-minesweeper-7",
  8: "text-minesweeper-8",
};

export default function GameCell({
  isRevealed,
  isMine,
  isFlagged,
  neighborMines,
  onClick,
  onRightClick,
  isGameOver = false
}: GameCellProps) {
  const handleClick = () => {
    if (!isRevealed && !isFlagged) {
      onClick();
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isRevealed) {
      onRightClick(e);
    }
  };

  const getCellContent = () => {
    if (isFlagged) {
      return <Flag className="w-4 h-4 text-minesweeper-flag" data-testid="cell-flag" />;
    }

    if (!isRevealed) {
      return null;
    }

    if (isMine) {
      return <Bomb className="w-4 h-4 text-minesweeper-mine" data-testid="cell-mine" />;
    }

    if (neighborMines > 0) {
      return (
        <span 
          className={`font-mono font-bold text-sm ${numberColors[neighborMines as keyof typeof numberColors]}`}
          data-testid={`cell-number-${neighborMines}`}
        >
          {neighborMines}
        </span>
      );
    }

    return null;
  };

  const getCellStyle = () => {
    if (isRevealed) {
      if (isMine && isGameOver) {
        return "bg-minesweeper-mine/20 border-minesweeper-mine";
      }
      return "bg-minesweeper-revealed border-border";
    }
    return "bg-minesweeper-unrevealed border-border hover-elevate";
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`
        w-8 h-8 p-0 border rounded-md font-mono text-sm
        ${getCellStyle()}
        ${!isRevealed && !isFlagged ? 'cursor-pointer' : ''}
        ${isRevealed && isMine && isGameOver ? 'animate-pulse' : ''}
      `}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      data-testid={`cell-${isRevealed ? 'revealed' : 'unrevealed'}`}
      disabled={isRevealed || isGameOver}
    >
      {getCellContent()}
    </Button>
  );
}