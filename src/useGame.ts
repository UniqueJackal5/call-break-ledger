import { useState, useEffect } from 'react';
import type { GameState, Player, Round } from './types';
import { calculateRoundScore } from './utils/scoring';

const STORAGE_KEY = 'call_break_game_state_v2';

const createInitialRounds = (): Round[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    roundNumber: i + 1,
    playerScores: Array.from({ length: 4 }, () => ({
      call: null,
      actual: null,
      score: null,
    })),
  }));
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setGameState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved game state', e);
      }
    }
  }, []);

  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const startGame = (playerNames: string[]) => {
    const players: Player[] = playerNames.map(name => ({ name }));
    const rounds = createInitialRounds();
    setGameState({
      players,
      rounds,
      currentRound: 1,
      inputPhase: 'CALL',
      currentPlayerIndex: 0,
      isTotalRevealed: false,
    });
  };

  const submitInput = (value: number) => {
    if (!gameState) return;

    const { currentRound, inputPhase, currentPlayerIndex, rounds } = gameState;
    const newRounds = [...rounds];
    const roundIndex = currentRound - 1;
    const round = { ...newRounds[roundIndex] };
    const playerScores = [...round.playerScores];
    const playerScore = { ...playerScores[currentPlayerIndex] };

    if (inputPhase === 'CALL') {
      playerScore.call = value;
      playerScore.actual = null;
      playerScore.score = null;
    } else if (inputPhase === 'ACTUAL') {
      playerScore.actual = value;
      if (playerScore.call !== null) {
        playerScore.score = calculateRoundScore(playerScore.call, value);
      }
    }

    playerScores[currentPlayerIndex] = playerScore;
    round.playerScores = playerScores;
    newRounds[roundIndex] = round;

    let nextPlayerIndex = currentPlayerIndex + 1;
    let nextPhase = inputPhase;
    let nextRound = currentRound;

    if (nextPlayerIndex > 3) {
      nextPlayerIndex = 0;
      if (inputPhase === 'CALL') {
        const totalCalls = playerScores.reduce((sum, ps) => sum + (ps.call || 0), 0);
        if (totalCalls > 13) {
          // Re-collect calls if > 13
          alert(`Total calls (${totalCalls}) cannot exceed 13. Please re-enter calls.`);
          playerScores.forEach(ps => { ps.call = null; ps.score = null; });
          nextPhase = 'CALL';
        } else {
          nextPhase = 'ACTUAL';
        }
      } else {
        nextPhase = 'NONE';
      }
    }

    setGameState({
      ...gameState,
      rounds: newRounds,
      currentPlayerIndex: nextPlayerIndex,
      inputPhase: nextPhase,
      currentRound: nextRound,
    });
  };

  const nextRound = () => {
    if (!gameState || gameState.currentRound >= 5) return;
    const nextR = gameState.currentRound + 1;
    setGameState({
      ...gameState,
      currentRound: nextR,
      inputPhase: 'CALL',
      currentPlayerIndex: 0,
      isTotalRevealed: nextR > 4 || gameState.isTotalRevealed,
    });
  };

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(null);
  };

  const editRound = (roundNumber: number) => {
    if (!gameState) return;
    setGameState({
      ...gameState,
      currentRound: roundNumber,
      inputPhase: 'CALL',
      currentPlayerIndex: 0,
    });
  };

  return {
    gameState,
    startGame,
    submitInput,
    nextRound,
    resetGame,
    editRound,
  };
};
