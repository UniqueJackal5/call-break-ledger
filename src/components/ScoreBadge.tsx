import React from 'react';
import { formatScore } from '../utils/scoring';

interface ScoreBadgeProps {
  score: number | null;
  call: number | null;
  actual: number | null;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, call, actual }) => {
  // If nothing is entered yet, show a faint placeholder
  if (call === null) return <span className="text-gray-200">...</span>;

  // If only call is entered, show just the call point
  if (actual === null) {
    return (
      <span className="text-gray-400 font-bold text-lg italic opacity-60">
        {call}
      </span>
    );
  }

  // If actual is entered, apply the scoring visuals
  if (score !== null && score < 0) {
    return (
      <div className="relative inline-flex items-center justify-center">
        <span className="text-gray-900 font-bold text-2xl z-10">{call}</span>
        <svg className="absolute w-12 h-12 text-red-500 opacity-80" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeDasharray="250" 
            className="animate-[draw_0.5s_ease-out_forwards]"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-900 font-bold text-2xl tracking-tighter">
        {formatScore(score)}
      </span>
      <span className="text-[10px] text-gray-400 font-black uppercase mt-[-4px]">
        {call} / {actual}
      </span>
    </div>
  );
};

export default ScoreBadge;
