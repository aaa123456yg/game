import { useState, useCallback, useEffect } from "react";
import GameCell from "./GameCell";

export interface GameBoardProps {
  width: number;
  height: number;
  mineCount: number;
  onGameStateChange: (gameState: 'playing' | 'won' | 'lost') => void;
  resetTrigger: number;
}

interface CellState {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

type GameState = 'playing' | 'won' | 'lost';

export default function GameBoard({ 
  width, 
  height, 
  mineCount, 
  onGameStateChange,
  resetTrigger 
}: GameBoardProps) {
  const [board, setBoard] = useState<CellState[][]>([]);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isFirstClick, setIsFirstClick] = useState(true);

  // Initialize empty board
  const initializeBoard = useCallback(() => {
    const newBoard: CellState[][] = [];
    for (let row = 0; row < height; row++) {
      newBoard[row] = [];
      for (let col = 0; col < width; col++) {
        newBoard[row][col] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        };
      }
    }
    return newBoard;
  }, [width, height]);

  // Place mines randomly, avoiding the first clicked cell
  const placeMines = useCallback((board: CellState[][], firstClickRow: number, firstClickCol: number) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    let minesPlaced = 0;
    
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * height);
      const col = Math.floor(Math.random() * width);
      
      // Don't place mine on first clicked cell or if already has mine
      if ((row === firstClickRow && col === firstClickCol) || newBoard[row][col].isMine) {
        continue;
      }
      
      newBoard[row][col].isMine = true;
      minesPlaced++;
    }
    
    return newBoard;
  }, [width, height, mineCount]);

  // Calculate neighbor mine counts
  const calculateNeighborMines = useCallback((board: CellState[][]) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr;
              const newCol = col + dc;
              if (
                newRow >= 0 && newRow < height &&
                newCol >= 0 && newCol < width &&
                newBoard[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].neighborMines = count;
        }
      }
    }
    
    return newBoard;
  }, [width, height]);

  // Reveal cell and adjacent empty cells
  const revealCell = useCallback((board: CellState[][], row: number, col: number): CellState[][] => {
    if (
      row < 0 || row >= height ||
      col < 0 || col >= width ||
      board[row][col].isRevealed ||
      board[row][col].isFlagged
    ) {
      return board;
    }

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    newBoard[row][col].isRevealed = true;

    // If cell has no neighboring mines, reveal all adjacent cells
    if (!newBoard[row][col].isMine && newBoard[row][col].neighborMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const newRow = row + dr;
          const newCol = col + dc;
          if (newRow !== row || newCol !== col) {
            const updatedBoard = revealCell(newBoard, newRow, newCol);
            // Update the board with revealed cells
            for (let r = 0; r < height; r++) {
              for (let c = 0; c < width; c++) {
                newBoard[r][c] = updatedBoard[r][c];
              }
            }
          }
        }
      }
    }

    return newBoard;
  }, [width, height]);

  // Check if game is won
  const checkWinCondition = useCallback((board: CellState[][]) => {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const cell = board[row][col];
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  }, [width, height]);

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState !== 'playing') return;

    setBoard(prevBoard => {
      let newBoard = prevBoard;

      // First click: place mines and calculate neighbors
      if (isFirstClick) {
        newBoard = placeMines(prevBoard, row, col);
        newBoard = calculateNeighborMines(newBoard);
        setIsFirstClick(false);
      }

      // Reveal the cell
      newBoard = revealCell(newBoard, row, col);

      // Check for mine
      if (newBoard[row][col].isMine) {
        // Reveal all mines when game is lost
        for (let r = 0; r < height; r++) {
          for (let c = 0; c < width; c++) {
            if (newBoard[r][c].isMine) {
              newBoard[r][c].isRevealed = true;
            }
          }
        }
        setGameState('lost');
        onGameStateChange('lost');
      } else if (checkWinCondition(newBoard)) {
        setGameState('won');
        onGameStateChange('won');
      }

      return newBoard;
    });
  }, [gameState, isFirstClick, placeMines, calculateNeighborMines, revealCell, checkWinCondition, onGameStateChange, height]);

  // Handle right click (flag/unflag)
  const handleRightClick = useCallback((row: number, col: number) => {
    if (gameState !== 'playing') return;

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));
      if (!newBoard[row][col].isRevealed) {
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      }
      return newBoard;
    });
  }, [gameState]);

  // Reset board when resetTrigger changes
  useEffect(() => {
    const newBoard = initializeBoard();
    setBoard(newBoard);
    setGameState('playing');
    setIsFirstClick(true);
    onGameStateChange('playing');
  }, [resetTrigger, initializeBoard, onGameStateChange]);

  return (
    <div 
      className="inline-block p-4 bg-card rounded-lg border border-card-border"
      data-testid="game-board"
    >
      <div 
        className="grid gap-1"
        style={{ 
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              isRevealed={cell.isRevealed}
              isMine={cell.isMine}
              isFlagged={cell.isFlagged}
              neighborMines={cell.neighborMines}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onRightClick={() => handleRightClick(rowIndex, colIndex)}
              isGameOver={gameState !== 'playing'}
            />
          ))
        )}
      </div>
    </div>
  );
}