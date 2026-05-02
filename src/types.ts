export interface Player {
  name: string;
}

export interface RoundScore {
  call: number | null;
  actual: number | null;
  score: number | null;
}

export interface Round {
  roundNumber: number;
  playerScores: RoundScore[];
}

export type InputPhase = 'CALL' | 'ACTUAL' | 'NONE';

export interface GameState {
  players: Player[];
  rounds: Round[];
  currentRound: number; // 1 to 5
  inputPhase: InputPhase;
  currentPlayerIndex: number; // 0 to 3
  isTotalRevealed: boolean;
}
