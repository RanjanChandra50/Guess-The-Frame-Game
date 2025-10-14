import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Plus, Minus } from "lucide-react";

interface GuessIndianFrameProps {
  updateScore: (player: string, points: number) => void;
  currentReferee: string;
  onTimerUpdate: (time: number) => void;
  onTimerStart: () => void;
  onTimerStop: () => void;
}

const PLAYERS = ["Aman", "Amish", "WVish", "Aziz"];

const indianFrames = [
  { id: 1, image: "/frames/indian/frame1.png", answer: "Thugs of hindostan" },
  { id: 2, image: "/frames/indian/frame2.png", answer: "Padmavat" },
  { id: 3, image: "/frames/indian/frame3.png", answer: "Shivaay" },
  { id: 4, image: "/frames/indian/frame4.png", answer: "Paradise" },
  { id: 5, image: "/frames/indian/frame5.png", answer: "Brothers" },
  { id: 6, image: "/frames/indian/frame6.png", answer: "Ghatak" },
  { id: 7, image: "/frames/indian/frame7.png", answer: "Tik Tic Tik" },
  { id: 8, image: "/frames/indian/frame8.png", answer: "An Action Hero" },
  { id: 9, image: "/frames/indian/frame9.png", answer: "Vikram Vedha" },
  { id: 10, image: "/frames/indian/frame10.png", answer: "Jersey (Nani wale)" },
  { id: 11, image: "/frames/indian/frame11.png", answer: "Hasee Toh Phasee" },
];

export default function GuessIndianFrame({
  updateScore,
  currentReferee,
  onTimerUpdate,
  onTimerStart,
  onTimerStop,
}: GuessIndianFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(18);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentFrame = indianFrames[currentIndex];

  // Reset round strictly on index change
  useEffect(() => {
    setShowAnswer(false); // hide answer immediately
    setTimeLeft(18);
    setIsTimerActive(true);
    setTimerKey((prev) => prev + 1);
    onTimerUpdate(18);
    onTimerStart();
  }, [currentIndex]);

  // Timer logic
  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          // setShowAnswer(true);
          setIsTimerActive(false);
          onTimerStop();
          return 0;
        }
        onTimerUpdate(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, onTimerUpdate, onTimerStop]);

  const handleNext = () => {
    if (currentIndex < indianFrames.length - 1) {
      setShowAnswer(false); // hide previous answer immediately
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setShowAnswer(false); // hide previous answer immediately
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setIsTimerActive(false);
    onTimerStop();
  };

  const handleScoreChange = (player: string, delta: number) => {
    updateScore(player, delta);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Guess the Indian Movie Frame
        </h2>

        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
          <img
            src={currentFrame.image}
            alt="Movie frame"
            className={`max-w-full max-h-full object-contain transition-all duration-500 ${
              showAnswer ? "blur-md" : ""
            }`}
          />
          {showAnswer && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
              <div className="text-center px-6">
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl mb-2">
                  <Eye size={24} />
                  <span className="text-xl font-bold">Answer</span>
                </div>
                <p className="text-4xl font-bold text-white drop-shadow-lg mt-2">
                  {currentFrame.answer}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              Frame {currentIndex + 1} of {indianFrames.length}
            </span>
          </div>

          <button
            onClick={handleRevealAnswer}
            disabled={showAnswer}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <Eye size={20} />
            Reveal
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === indianFrames.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Manual Scoring
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLAYERS.map((player) => (
              <div
                key={player}
                className={`bg-white rounded-lg p-4 border-2 ${
                  player === currentReferee
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <div className="text-center mb-2">
                  <span className="font-semibold text-gray-700">{player}</span>
                  {player === currentReferee && (
                    <span className="block text-xs text-purple-600 font-medium">
                      Referee
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleScoreChange(player, -10)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 transition-colors"
                    // disabled={player === currentReferee}
                  >
                    <Minus size={16} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => handleScoreChange(player, 10)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 transition-colors"
                    // disabled={player === currentReferee}
                  >
                    <Plus size={16} className="mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
