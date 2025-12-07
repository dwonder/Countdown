
import React from 'react';
import { Timeframe } from '../types';

interface TimeframeSelectorProps {
  timeframes: Timeframe[];
  selectedDurations: number[];
  onToggle: (duration: number) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ timeframes, selectedDurations, onToggle }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 p-4 bg-slate-800/50 rounded-lg">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe.label}
          onClick={() => onToggle(timeframe.duration)}
          aria-pressed={selectedDurations.includes(timeframe.duration)}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-green-500 ${
            selectedDurations.includes(timeframe.duration)
              ? 'bg-green-600 text-white shadow-lg scale-105'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {timeframe.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;