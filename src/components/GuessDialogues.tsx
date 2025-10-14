import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
  Minus,
  Quote,
} from "lucide-react";

interface GuessDialoguesProps {
  updateScore: (player: string, points: number) => void;
  currentReferee: string;
  onTimerUpdate: (time: number) => void;
  onTimerStart: () => void;
  onTimerStop: () => void;
}

const PLAYERS = ["Aman", "Amish", "WVish", "Aziz"];

const dialogues = [
  { id: 1, dialogue: "My pain is my destiny and I can't avoid it", movieAnswer: "Kala Patther" },
  { id: 2, dialogue: "I’m not like Superman.", movieAnswer: "Superman (Hawkgirl)" },
  { id: 3, dialogue: "You know he tells people I’m a puke freak?", movieAnswer: "Green Lantern / Peacemaker S2" },
  { id: 4, dialogue: "Jaanta nahi kiske samne khada hai?..Bhagwan tum ho nahi sakte ... insaan tum lagte nahi ... aur shaitaan se main nahi darta", movieAnswer: "Badass Ravikumar / Himesh Reshammiya" },
  { id: 5, dialogue: "Hum bade professional log hai ... kaam kare ya na kare, payment poori lete hai", movieAnswer: "Jolly LLB3 / Arshad Warsi" },
  { id: 6, dialogue: "Ek din social media par nahi rahoge toh tumhare alava kisi ko ghanta farak padne wala nahi hai ... lekin social responsibilities nahi nibhaoge, toh society ko zaroor farak padega", movieAnswer: "Baaghi 4 / Tiger Shroff" },
  { id: 7, dialogue: "I figured out way back if God is all-powerful, He cannot be all good. And if He is all good, then He cannot be all-powerful", movieAnswer: "Batman V Superman / Lex Luthor" },
  { id: 8, dialogue: "Our shot is battling in the turns. We need to build our car for combat.", movieAnswer: "F1 / Sonny Hayes" },
  { id: 9, dialogue: "I'll solve equations with my right hand and write names with my left. I'll take a potato chip... and eat it!", movieAnswer: "Death Note / Light" },
  { id: 10, dialogue: "The most powerful thing in the universe... still just a puppet.", movieAnswer: "Watchmen / Laurie Juspeczyk" },
  { id: 11, dialogue: "Everybody wants a happy ending. Right? But it doesn't always roll that way. Maybe this time. I'm hoping if you play this back, it's in celebration. I hope families are reunited, I hope we get it back and something like a normal version of the planet has been restored, if there ever was such a thing. God, what a world", movieAnswer: "Avengers: Endgame / Tony Stark" },
];

export default function GuessDialogues({
  updateScore,
  currentReferee,
  onTimerUpdate,
  onTimerStart,
  onTimerStop,
}: GuessDialoguesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(18);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentDialogue = dialogues[currentIndex];

  useEffect(() => {
    setShowAnswer(false);
    setTimeLeft(18);
    setIsTimerActive(true);
    setTimerKey(prev => prev + 1);
    onTimerUpdate(18);
    onTimerStart();
  }, [currentIndex]);

  // Timer counts down but does NOT auto-reveal answer
  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        onTimerUpdate(newTime);
        if (newTime <= 0) {
          setIsTimerActive(false);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, onTimerUpdate]);

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setShowAnswer(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setShowAnswer(false);
      setCurrentIndex(prev => prev - 1);
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
          Guess the Dialogues
        </h2>

        <div className="relative bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-lg p-12 mb-6">
          <Quote className="absolute top-4 left-4 text-red-300" size={48} />
          <Quote className="absolute bottom-4 right-4 text-red-300 rotate-180" size={48} />
          <div className={`transition-all duration-500 ${showAnswer ? "blur-sm" : ""}`}>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center italic leading-relaxed">
              "{currentDialogue.dialogue}"
            </p>
          </div>
          {showAnswer && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg animate-fade-in">
              <div className="text-center px-6">
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl mb-2">
                  <Eye size={24} />
                  <span className="text-xl font-bold">Answer</span>
                </div>
                <p className="text-4xl font-bold text-white drop-shadow-lg mt-2">
                  {currentDialogue.movieAnswer}
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
              Dialogue {currentIndex + 1} of {dialogues.length}
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
            disabled={currentIndex === dialogues.length - 1}
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
                  player === currentReferee ? "border-purple-400 bg-purple-50" : "border-gray-200"
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
