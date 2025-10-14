import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Plus, Minus } from 'lucide-react';

interface GameChangerRoundProps {
  updateScore: (player: string, points: number) => void;
  currentReferee: string; // Navbar me None dikhega
  onTimerUpdate: (time: number) => void;
  onTimerStart: () => void;
  onTimerStop: () => void;
}

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

const questions = [
  {
    id: 1,
    question: "This is a Game Change round dummy question?",
    options: ['Correct Option', 'Wrong Option 1', 'Wrong Option 2', 'Wrong Option 3'],
    correctAnswer: 0,
    explanation: 'This is just a demo explanation for the correct answer.',
  },
  {
    id: 2,
    question: "This is a Game Change round dummy question?",
    options: ['Correct Option', 'Wrong Option 1', 'Wrong Option 2', 'Wrong Option 3'],
    correctAnswer: 0,
    explanation: 'This is just a demo explanation for the correct answer.',
  },
  {
    id: 3,
    question: "This is a Game Change round dummy question?",
    options: ['Correct Option', 'Wrong Option 1', 'Wrong Option 2', 'Wrong Option 3'],
    correctAnswer: 0,
    explanation: 'This is just a demo explanation for the correct answer.',
  },
  {
    id: 4,
    question: "This is a Game Change round dummy question?",
    options: ['Correct Option', 'Wrong Option 1', 'Wrong Option 2', 'Wrong Option 3'],
    correctAnswer: 0,
    explanation: 'This is just a demo explanation for the correct answer.',
  },
];

export default function GameChangerRound({
  updateScore,
  currentReferee,
  onTimerUpdate,
  onTimerStart,
  onTimerStop
}: GameChangerRoundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    resetRound();
  }, [currentIndex]);

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
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };
  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };
  const handleRevealAnswer = () => {
    setAnswerRevealed(true);
    setIsTimerActive(false);
    onTimerStop();
  };
  const resetRound = () => {
    setSelectedOption(null);
    setAnswerRevealed(false);
    setTimeLeft(25);
    setIsTimerActive(true);
    onTimerUpdate(25);
    onTimerStart();
  };
  const handleOptionSelect = (optionIndex: number) => {
    if (answerRevealed) return;
    setSelectedOption(optionIndex);
  };
  const handleScoreChange = (player: string, delta: number) => {
    updateScore(player, delta);
  };

  const isCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Game Change Round
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-6">
          <p className="text-xl font-semibold text-gray-800 text-center">
            {currentQ.question}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === currentQ.correctAnswer;
            const showCorrect = answerRevealed && isCorrectOption;
            const showIncorrect = answerRevealed && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={answerRevealed}
                className={`p-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                  showCorrect
                    ? 'bg-green-500 text-white animate-pulse-green border-4 border-green-600'
                    : showIncorrect
                    ? 'bg-red-500 text-white animate-shake border-4 border-red-600'
                    : isSelected
                    ? 'bg-blue-500 text-white border-2 border-blue-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-300'
                } ${answerRevealed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showCorrect && <CheckCircle className="animate-bounce" size={24} />}
                  {showIncorrect && <XCircle className="animate-bounce" size={24} />}
                </div>
              </button>
            );
          })}
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
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          <button
            onClick={handleRevealAnswer}
            disabled={answerRevealed}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            <Eye size={20} />
            Reveal
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Manual Scoring</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLAYERS.map(player => (
              <div
                key={player}
                className={`bg-white rounded-lg p-4 border-2`}
              >
                <div className="text-center mb-2">
                  <span className="font-semibold text-gray-700">{player}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleScoreChange(player, -10)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 transition-colors"
                  >
                    <Minus size={16} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => handleScoreChange(player, 10)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 transition-colors"
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
