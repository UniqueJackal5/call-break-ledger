import React from 'react';
import type { GameState } from '../types';
import RoundRow from './RoundRow';
import InputPrompt from './InputPrompt';
import { calculateTotalScore, formatScore } from '../utils/scoring';

interface ScoreboardProps {
  gameState: GameState;
  onSubmitInput: (value: number) => void;
  onNextRound: () => void;
  onReset: () => void;
  onEditRound: (roundNumber: number) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ gameState, onSubmitInput, onNextRound, onReset, onEditRound }) => {
  const { players, rounds, currentRound, inputPhase, currentPlayerIndex, isTotalRevealed } = gameState;

  const playerTotals = players.map((_, i) => {
    const scores = rounds.map(r => r.playerScores[i].score);
    return calculateTotalScore(scores);
  });

  const isCurrentRoundComplete = rounds[currentRound - 1].playerScores.every(
    ps => ps.call !== null && ps.actual !== null
  );

  const maxScore = Math.max(...playerTotals);
  const isGameFinished = currentRound === 5 && isCurrentRoundComplete;
  const winners = playerTotals.map((score, i) => score === maxScore && isGameFinished ? i : -1).filter(i => i !== -1);

  return (
    <div className="min-h-screen bg-[#fdfaf6] p-4 font-mono pb-48">
      {/* SVG Filter for pencil effect */}
      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
        <filter id="pencil-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
        </filter>
      </svg>

      <div className="max-w-4xl mx-auto border-4 border-gray-800 bg-white shadow-[12px_12px_0px_0px_rgba(31,41,55,1)] rounded-sm">
        <div className="border-b-4 border-gray-800 p-6 flex justify-between items-center bg-gray-50">
          <div className="flex flex-col">
             <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">Call Break Ledger</h1>
             <p className="text-[10px] text-gray-500 font-bold uppercase mt-2">
               {isGameFinished ? 'Game Over' : `Round ${currentRound} in progress`} • Tap row to edit
             </p>
          </div>
          <button
            onClick={onReset}
            className="text-xs font-black uppercase bg-red-500 text-white px-3 py-1.5 rounded-sm hover:bg-red-600 transition shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-4 border-gray-800">
                {players.map((p, i) => (
                  <th key={i} className={`py-8 px-4 border-r-4 last:border-r-0 border-gray-800 relative ${isGameFinished && winners.includes(i) ? 'bg-yellow-100' : ''}`}>
                    <div className="flex flex-col items-center">
                      {isGameFinished && winners.includes(i) && (
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl">👑</span>
                      )}
                      <span className={`text-xl font-black uppercase tracking-widest transition-all duration-300 ${inputPhase !== 'NONE' && currentPlayerIndex === i ? 'text-indigo-600 scale-110' : 'text-gray-900'}`}>
                        {p.name}
                      </span>
                      {isTotalRevealed && (
                        <div className="mt-4 px-4 py-2 bg-gray-900 text-white text-2xl font-black animate-reveal shadow-[4px_4px_0px_0px_rgba(79,70,229,0.5)]">
                          {formatScore(playerTotals[i])}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="pencil-text">
              {rounds.map((r, i) => (
                <RoundRow
                  key={i}
                  round={r}
                  isCurrent={currentRound === r.roundNumber}
                  onEdit={() => onEditRound(r.roundNumber)}
                />
              ))}
            </tbody>
            {isTotalRevealed && (
              <tfoot className="border-t-8 border-double border-gray-800 bg-gray-50">
                <tr>
                  {playerTotals.map((total, i) => (
                    <td key={i} className="py-8 px-4 text-center border-r-4 last:border-r-0 border-gray-800">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-gray-500 uppercase mb-2">Grand Total</span>
                        <span className="text-4xl font-black text-gray-900 tracking-tighter">
                          {formatScore(total)}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 flex flex-col items-center space-y-6">
        {currentRound < 5 && isCurrentRoundComplete && inputPhase === 'NONE' && (
          <button
            onClick={onNextRound}
            className="bg-indigo-600 text-white px-12 py-5 rounded-sm font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95 active:shadow-none"
          >
            {currentRound === 4 ? 'Complete Round 4' : 'Start Next Round'}
          </button>
        )}

        {isGameFinished && inputPhase === 'NONE' && (
          <div className="text-center animate-bounce">
             <p className="text-3xl font-black uppercase text-gray-900 tracking-widest bg-yellow-300 px-8 py-2 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Final Standings!</p>
          </div>
        )}
      </div>

      {(inputPhase === 'CALL' || inputPhase === 'ACTUAL') && (
        <InputPrompt
          phase={inputPhase}
          playerName={players[currentPlayerIndex].name}
          roundNumber={currentRound}
          onSubmit={onSubmitInput}
        />
      )}
    </div>
  );
};

export default Scoreboard;
