import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Gift } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface PlayerScores {
  [key: string]: number;
}

interface LocationState {
  scores: PlayerScores;
}

const rewards = [
  "🎁 iPhone 16s",
  "🎧 Sony WH-1000XM5",
  "⌚ Apple Watch SE",
  "🍫 Dairy Milk Celebration Pack",
];

export default function FinalSubmit() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  // Use passed scores or default 0
  const scores: PlayerScores = state?.scores || {
    Aman: 0,
    Amish: 0,
    WVish: 0,
    Aziz: 0,
  };

  const sortedPlayers = Object.entries(scores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);

  const [visibleReward, setVisibleReward] = useState<number | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const handleSeeReward = (index: number) => {
    setVisibleReward(index);
    triggerConfetti();
    // reward stays until user clicks close
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🏆 Final Results 🏆
      </motion.h1>

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl border-t-8 border-gradient-to-r from-red-500 to-blue-500">
        <div className="space-y-6">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex items-center justify-between p-5 rounded-xl shadow-md border-2 ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-400"
                  : index === 1
                  ? "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300"
                  : index === 2
                  ? "bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300"
                  : "bg-gradient-to-r from-blue-50 to-white border-blue-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <Trophy
                  size={32}
                  className={
                    index === 0
                      ? "text-yellow-500"
                      : index === 1
                      ? "text-gray-400"
                      : index === 2
                      ? "text-orange-400"
                      : "text-blue-400"
                  }
                />
                <div>
                  <p className="text-xl font-bold text-gray-800">
                    {index + 1}. {player.name}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Score: {player.score}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSeeReward(index)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
              >
                <Gift size={18} /> See Reward
              </button>
            </motion.div>
          ))}
        </div>

        {/* Reward popup */}
        <AnimatePresence>
          {visibleReward !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md w-full"
              >
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  🎉 Congratulations, {sortedPlayers[visibleReward].name}!
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  You’ve unlocked:{" "}
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    {rewards[visibleReward]}
                  </span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setVisibleReward(null)}
                  className="mt-2 px-6 py-3 bg-gradient-to-r from-red-500 to-blue-500 text-white font-semibold rounded-lg"
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-10">
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:brightness-110"
          >
            🔄 Back to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
}
