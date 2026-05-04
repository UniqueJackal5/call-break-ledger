import Setup from './components/Setup';
import Scoreboard from './components/Scoreboard';
import { useGame } from './useGame';

function App() {
  const { gameState, startGame, submitInput, nextRound, resetGame, jumpToInput } = useGame();

  if (!gameState) {
    return <Setup onStart={startGame} />;
  }

  return (
    <Scoreboard
      gameState={gameState}
      onSubmitInput={submitInput}
      onNextRound={nextRound}
      onReset={resetGame}
      onJumpToInput={jumpToInput}
    />
  );
}

export default App;
