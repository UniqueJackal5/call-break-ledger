import React from 'react';
import type { Round } from '../types';
import ScoreBadge from './ScoreBadge';

interface RoundRowProps {
  round: Round;
  isCurrent: boolean;
  currentPhase: 'CALL' | 'ACTUAL' | 'NONE';
  onJumpToInput: (roundNumber: number, playerIndex: number, phase: 'CALL' | 'ACTUAL') => void;
}

const RoundRow: React.FC<RoundRowProps> = ({ round, isCurrent, currentPhase, onJumpToInput }) => {
  const handleCellClick = (playerIndex: number) => {
    const ps = round.playerScores[playerIndex];
    
    // Improved Adaptive Logic:
    // 1. If we are currently in the CALL phase for this round, always jump to CALL.
    // 2. Otherwise, if call is null, jump to CALL.
    // 3. Otherwise, jump to ACTUAL.
    
    if (isCurrent && currentPhase === 'CALL') {
      onJumpToInput(round.roundNumber, playerIndex, 'CALL');
    } else if (ps.call === null) {
      onJumpToInput(round.roundNumber, playerIndex, 'CALL');
    } else {
      onJumpToInput(round.roundNumber, playerIndex, 'ACTUAL');
    }
  };

  return (
    <tr 
      className={`border-b-2 border-gray-100 transition-colors group ${isCurrent ? 'bg-indigo-50/30' : 'hover:bg-gray-50'}`}
    >
      {round.playerScores.map((ps, i) => (
        <td 
          key={i} 
          onClick={() => handleCellClick(i)}
          className="py-8 px-4 border-r-2 last:border-r-0 border-gray-100 text-center relative overflow-hidden cursor-pointer hover:bg-indigo-50/50 transition-colors"
        >
          {isCurrent && (
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400 opacity-20"></div>
          )}
          <div className="flex flex-col items-center justify-center min-h-[60px]">
            <ScoreBadge score={ps.score} call={ps.call} actual={ps.actual} />
          </div>
        </td>
      ))}
    </tr>
  );
};

export default RoundRow;
