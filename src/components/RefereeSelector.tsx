import { useState, useEffect } from 'react';
import { Gavel } from 'lucide-react';

interface RefereeSelectorProps {
  onRefereeSelected: (referee: string) => void;
  usedReferees: string[];
}

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

export default function RefereeSelector({ onRefereeSelected, usedReferees }: RefereeSelectorProps) {
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentName, setCurrentName] = useState('');
  const [selectedReferee, setSelectedReferee] = useState('');

  const availablePlayers = PLAYERS.filter(p => !usedReferees.includes(p));

  const startShuffle = () => {
    if (availablePlayers.length === 0) return;

    setIsShuffling(true);
    setSelectedReferee('');

    let count = 0;
    const shuffleInterval = setInterval(() => {
      const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
      setCurrentName(randomPlayer);
      count++;

      if (count >= 15) {
        clearInterval(shuffleInterval);
        const finalReferee = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
        setCurrentName(finalReferee);
        setSelectedReferee(finalReferee);
        setIsShuffling(false);
        setTimeout(() => {
          onRefereeSelected(finalReferee);
        }, 1000);
      }
    }, 100);
  };

  useEffect(() => {
    if (availablePlayers.length > 0 && !selectedReferee) {
      startShuffle();
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Gavel className="text-purple-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Round Referee</h3>
      </div>

      <div className="text-center">
        {isShuffling ? (
          <div className="animate-pulse">
            <div className="text-4xl font-bold text-purple-600 mb-2 animate-bounce">
              {currentName}
            </div>
            <p className="text-sm text-gray-600">Selecting referee...</p>
          </div>
        ) : selectedReferee ? (
          <div className="animate-scale-in">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {selectedReferee}
            </div>
            <p className="text-sm text-gray-600">is the referee for this round!</p>
          </div>
        ) : (
          <div className="text-gray-500">Waiting to select referee...</div>
        )}
      </div>

      {availablePlayers.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
          All players have been referees. Cycle complete!
        </p>
      )}
    </div>
  );
}
