import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  duration: number;
  isActive: boolean;
  onTimeUp: () => void;
  onReset?: () => void;
}

export default function Timer({ duration, isActive, onTimeUp, onReset }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, onReset]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 5;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className={`${isWarning ? 'text-red-600 animate-pulse' : 'text-blue-600'}`} size={24} />
          <span className="font-semibold text-gray-700">Time Remaining</span>
        </div>
        <span className={`text-3xl font-bold ${isWarning ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${
            isWarning ? 'bg-red-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
