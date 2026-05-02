import React, { useState } from 'react';

interface SetupProps {
  onStart: (names: string[]) => void;
}

const Setup: React.FC<SetupProps> = ({ onStart }) => {
  const [names, setNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);

  const handleChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(names);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Call Break Tracker</h1>
        <p className="text-gray-600 mb-6 text-center">Enter player names to start the game.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {names.map((name, i) => (
            <div key={i} className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Player {i + 1}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition transform active:scale-95 shadow-md mt-6"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setup;
