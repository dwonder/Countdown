import React, { useState, useEffect, useRef } from 'react';
import { TIMEFRAMES } from '../constants';

interface CountdownTimerProps {
  duration: number;
}

const calculateInitialRemainingTime = (duration: number): number => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const remainder = nowInSeconds % duration;
  return duration - remainder;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration }) => {
  const [remainingTime, setRemainingTime] = useState(() => calculateInitialRemainingTime(duration));
  const [animateReset, setAnimateReset] = useState(false);
  const prevRemainingTimeRef = useRef<number>();

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      // Use a functional update to only re-render if the second has changed.
      setRemainingTime(prevTime => {
        const newRemainingTime = calculateInitialRemainingTime(duration);
        return newRemainingTime !== prevTime ? newRemainingTime : prevTime;
      });
      animationFrameId = requestAnimationFrame(tick);
    };

    // When duration changes, immediately set the new time and start the animation loop.
    setRemainingTime(calculateInitialRemainingTime(duration));
    animationFrameId = requestAnimationFrame(tick);
    
    // Cleanup function to cancel the animation frame on unmount or when duration changes.
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration]);

  useEffect(() => {
    const prevTime = prevRemainingTimeRef.current;
    // Detect reset when time jumps up from near zero
    if (prevTime !== undefined && remainingTime > prevTime && prevTime < 2) {
      setAnimateReset(true);
      const timeoutId = setTimeout(() => {
        setAnimateReset(false);
      }, 700); // Animation duration
      return () => clearTimeout(timeoutId);
    }
    prevRemainingTimeRef.current = remainingTime;
  }, [remainingTime]);


  const displaySeconds = remainingTime - 1;

  const formatTime = (seconds: number): string => {
    if (seconds < 0) seconds = duration - 1;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    const paddedS = s.toString().padStart(2, '0');
    
    if (duration >= 3600) {
      const paddedM = m.toString().padStart(2, '0');
      return `${h}:${paddedM}:${paddedS}`;
    }
    
    const paddedM = m.toString().padStart(2, '0');
    return `${paddedM}:${paddedS}`;
  };
  
  const selectedLabel = TIMEFRAMES.find(tf => tf.duration === duration)?.label || '';
  
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = remainingTime / duration;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          className="text-slate-800"
          stroke="currentColor"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          className={`text-cyan-400 transition-all duration-1000 ease-linear ${
            animateReset ? 'animate-ring-flash' : ''
          }`}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center text-center ${
          animateReset ? 'animate-text-pulse' : ''
        }`}>
        <span className="text-slate-400 text-lg font-semibold tracking-wider">
          {selectedLabel}
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tighter tabular-nums">
          {formatTime(displaySeconds)}
        </h2>
        <span className="text-slate-500 text-sm mt-1">
          Candle Close
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;