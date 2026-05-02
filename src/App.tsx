import Setup from './components/Setup';
import Scoreboard from './components/Scoreboard';
import { useGame } from './useGame';

function App() {
  const { gameState, startGame, submitInput, nextRound, resetGame, editRound } = useGame();

  if (!gameState) {
    return <Setup onStart={startGame} />;
  }

  return (
    <Scoreboard
      gameState={gameState}
      onSubmitInput={submitInput}
      onNextRound={nextRound}
      onReset={resetGame}
      onEditRound={editRound}
    />
  );
}

export default App;
