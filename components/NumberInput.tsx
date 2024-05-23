import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  min: number;
  max?: number;
  step: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, min, max, step, onChange }) => {
  const handleIncrement = () => {
    if (value <= max && value != max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  return (
    <div className="border-slate-700 border flex flex-col items-center bg-gradient-to-r from-gray-900 to-slate-800 px-2 pt-6 pb-2 rounded-lg relative w-3/6">
      <div className="flex items-center w-full">
        <button
          onClick={handleDecrement}
          className="text-white bg-gray-700 rounded-lg w-8 h-8 flex items-center justify-center"
        >
          &#9660;
        </button>
        <div className="text-white text-lg mx-2  w-2/4">
          <div className="text-center absolute inset-x-0 top-2 text-xs">{label}</div>
          <div className="text-center bg-slate-950 rounded-lg" >{value.toFixed(2)}</div>
        </div>
        <button
          onClick={handleIncrement}
          className="text-white bg-gray-700 rounded-lg w-8 h-8 flex items-center justify-center"
        >
          &#9650;
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
