import { Trophy, User } from 'lucide-react';

interface ScoreboardProps {
  scores: Record<string, number>;
  currentSection?: string; // to check if button should be enabled
  onFinalSubmit?: () => void; // callback when button pressed
}

export default function Scoreboard({ scores, currentSection, onFinalSubmit }: ScoreboardProps) {
  const sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Scoreboard</h2>
      </div>
      <div className="space-y-3">
        {sortedPlayers.map(([player, score], index) => (
          <div
            key={player}
            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0
                    ? 'bg-yellow-500 text-white'
                    : index === 1
                    ? 'bg-gray-400 text-white'
                    : index === 2
                    ? 'bg-orange-600 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {index + 1}
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-gray-600" />
                <span className="font-semibold text-gray-800">{player}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${index === 0 ? 'text-yellow-600' : 'text-blue-600'}`}>
                {score}
              </span>
              <span className="text-sm text-gray-500">pts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Final Submit Button */}
      {onFinalSubmit && (
        <button
          onClick={onFinalSubmit}
          disabled={currentSection !== "gamechanger"}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition-all mt-4 ${
            currentSection === "gamechanger"
              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:scale-105 shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Final Submit
        </button>
      )}
    </div>
  );
}
