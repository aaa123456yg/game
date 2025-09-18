import GameCell from '../GameCell';

export default function GameCellExample() {
  const handleCellClick = () => {
    console.log('Cell clicked');
  };

  const handleRightClick = (e: React.MouseEvent) => {
    console.log('Cell right clicked');
  };

  return (
    <div className="p-8 bg-background">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">遊戲格子範例</h3>
        
        <div className="grid grid-cols-4 gap-2 w-fit">
          {/* Unrevealed cell */}
          <GameCell
            isRevealed={false}
            isMine={false}
            isFlagged={false}
            neighborMines={0}
            onClick={handleCellClick}
            onRightClick={handleRightClick}
          />
          
          {/* Flagged cell */}
          <GameCell
            isRevealed={false}
            isMine={false}
            isFlagged={true}
            neighborMines={0}
            onClick={handleCellClick}
            onRightClick={handleRightClick}
          />
          
          {/* Revealed cell with number */}
          <GameCell
            isRevealed={true}
            isMine={false}
            isFlagged={false}
            neighborMines={3}
            onClick={handleCellClick}
            onRightClick={handleRightClick}
          />
          
          {/* Mine cell */}
          <GameCell
            isRevealed={true}
            isMine={true}
            isFlagged={false}
            neighborMines={0}
            onClick={handleCellClick}
            onRightClick={handleRightClick}
            isGameOver={true}
          />
        </div>
        
        <div className="grid grid-cols-8 gap-1 w-fit">
          {[1,2,3,4,5,6,7,8].map(num => (
            <GameCell
              key={num}
              isRevealed={true}
              isMine={false}
              isFlagged={false}
              neighborMines={num}
              onClick={handleCellClick}
              onRightClick={handleRightClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}