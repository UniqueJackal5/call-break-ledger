import React from 'react';
import type { Round } from '../types';
import ScoreBadge from './ScoreBadge';

interface RoundRowProps {
  round: Round;
  isCurrent: boolean;
  onEdit: () => void;
}

const RoundRow: React.FC<RoundRowProps> = ({ round, isCurrent, onEdit }) => {
  return (
    <tr 
      onClick={onEdit}
      className={`border-b-2 border-gray-100 transition-colors cursor-pointer group ${isCurrent ? 'bg-indigo-50/30' : 'hover:bg-gray-50'}`}
    >
      {round.playerScores.map((ps, i) => (
        <td key={i} className="py-8 px-4 border-r-2 last:border-r-0 border-gray-100 text-center relative overflow-hidden">
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
