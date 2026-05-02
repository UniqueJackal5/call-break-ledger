import React, { useState } from 'react';

interface InputPromptProps {
  phase: 'CALL' | 'ACTUAL';
  playerName: string;
  roundNumber: number;
  onSubmit: (value: number) => void;
}

const InputPrompt: React.FC<InputPromptProps> = ({ phase, playerName, roundNumber, onSubmit }) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      onSubmit(num);
      setValue('');
    }
  };

  const label = phase === 'CALL' ? 'Call' : 'Got';
  const min = phase === 'CALL' ? 1 : 0;
  const max = 13;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-900 p-6 shadow-[0_-8px_16px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Round {roundNumber}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="text-sm font-bold uppercase text-indigo-600">{playerName}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <label className="text-xl font-black uppercase text-gray-800">{label}:</label>
          <input
            type="number"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={min}
            max={max}
            className="w-20 text-3xl font-black text-center border-b-4 border-gray-900 outline-none p-1 focus:text-indigo-600 focus:border-indigo-600 transition"
            placeholder="-"
            required
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-sm font-black uppercase tracking-tighter hover:bg-indigo-600 transition transform active:scale-95"
          >
            OK
          </button>
        </form>
        
        <div className="mt-4 flex space-x-2">
           {Array.from({ length: 14 }, (_, i) => i).filter(i => i >= min).map(i => (
             <button
               key={i}
               type="button"
               onClick={() => { onSubmit(i); setValue(''); }}
               className="w-8 h-8 rounded-full border border-gray-200 text-xs font-bold hover:bg-gray-900 hover:text-white transition flex items-center justify-center"
             >
               {i}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default InputPrompt;
