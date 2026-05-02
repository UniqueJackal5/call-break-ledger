import React from 'react';

interface InputCellProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min: number;
  max: number;
  disabled?: boolean;
}

const InputCell: React.FC<InputCellProps> = ({ label, value, onChange, min, max, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? null : parseInt(e.target.value, 10);
    if (val === null || (val >= min && val <= max)) {
      onChange(val);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-[9px] uppercase font-bold text-gray-400 leading-none mb-1">{label}</span>
      <input
        type="number"
        value={value === null ? '' : value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-9 h-8 text-center border-b-2 bg-transparent focus:border-indigo-500 outline-none transition text-sm font-medium
          ${disabled ? 'text-gray-400 border-gray-100' : 'text-gray-800 border-gray-300'}
        `}
        placeholder="-"
      />
    </div>
  );
};

export default InputCell;
