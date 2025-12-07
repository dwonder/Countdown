
import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer';
import TimeframeSelector from './components/TimeframeSelector';
import { TIMEFRAMES } from './constants';

function App() {
  const [selectedDurations, setSelectedDurations] = useState<number[]>([
    300, // 5m
    900, // 15m
    1800, // 30m
    3600, // 1H
    14400, // 4H
  ]);

  const handleTimeframeToggle = (duration: number) => {
    setSelectedDurations(prevDurations => {
      const isSelected = prevDurations.includes(duration);
      if (isSelected) {
        // Prevent removing the last selected timeframe
        if (prevDurations.length === 1) {
          return prevDurations;
        }
        return prevDurations.filter(d => d !== duration);
      } else {
        // Add the new duration and sort them for consistent order
        const newDurations = [...prevDurations, duration];
        return newDurations.sort((a, b) => a - b);
      }
    });
  };

  return (
    <main className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center p-4 font-mono antialiased">
      <div className="w-full max-w-4xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-400 tracking-wide">
            Candle Countdown
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Select one or more timeframes to track
          </p>
        </header>

        <div className="flex flex-wrap justify-center items-start gap-8 mb-10 min-h-[320px]">
          {selectedDurations.map(duration => (
            <CountdownTimer key={duration} duration={duration} />
          ))}
        </div>

        <footer>
          <TimeframeSelector
            timeframes={TIMEFRAMES}
            selectedDurations={selectedDurations}
            onToggle={handleTimeframeToggle}
          />
        </footer>
      </div>
    </main>
  );
}

export default App;