import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, CheckCircle, XCircle, Plus, Minus } from 'lucide-react';

interface RiddlesQuizProps {
  updateScore: (player: string, points: number) => void;
  currentReferee: string;
  onTimerUpdate: (time: number) => void;
  onTimerStart: () => void;
  onTimerStop: () => void;
}

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

const riddles = [
  {
    id: 1,
    question: "A small group works in secret to turn the tide against powerful enemies, using wit and disguise rather than brute force. Which movie tells their daring story?",
    options: ['Inglourious Basterds', 'Fury', 'The Dirty Dozen', 'Hacksaw Ridge'],
    correctAnswer: 0,
    explanation: 'Classic war movie with covert operations.',
  },
  {
    id: 2,
    question: 'A kingdom torn by betrayal sees a young warrior rise, unaware of his royal legacy. With courage, strategy, and allies by his side, he challenges impossible odds to reclaim what is rightfully his. Which movie tells this epic tale of power and destiny?',
    options: ['Magadheera', 'Padmaavat', 'Bahubali', 'RRR'],
    correctAnswer: 2,
    explanation: 'Epic Indian saga of a hero reclaiming his kingdom.',
  },
  {
    id: 3,
    question: 'On a distant world, a human finds himself torn between loyalty to his own kind and the beings who call the planet home. Amid lush landscapes and conflict over survival, he must choose where his heart truly belongs. Which movie tells this story of connection and courage?',
    options: ['Star Wars: A New Hope', 'Guardians of the Galaxy', 'Avatar', 'John Carter'],
    correctAnswer: 2,
    explanation: 'Sci-fi story about humans connecting with another world.',
  },
  {
    id: 4,
    question: 'Most fans have the misconception that Captain America was the first Marvel hero, but the first Marvel hero, appearing in ‘Marvel Comics No.1’ in 1939 was...?',
    options: ['The Human Torch', 'Captain America', 'Iron Man', 'Namor the Sub-Mariner'],
    correctAnswer: 0,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 5,
    question: 'What was the first feature-length animated movie ever released....?',
    options: ['Fantasia', 'Cinderella', 'Pinocchio', 'Snow White and the Seven Dwarfs'],
    correctAnswer: 3,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 6,
    question: 'Star-Lord, also known as Peter Quill, discovers that his father Ego is actually a what...?',
    options: ['Eternal', 'God', 'Celestial', 'Titan'],
    correctAnswer: 2,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 7,
    question: 'What video game does Thor get addicted to in Avengers: Endgame..?',
    options: ['Call of Duty', 'Minecraft', 'Fortnite', 'PUBG'],
    correctAnswer: 2,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 8,
    question: 'In the iconic film Sholay, Amjad Khan was almost replaced as Gabbar because his voice was considered too weak. Which actor was originally chosen for the role..?',
    options: ['Pran', 'Amrish Puri', 'Anupam Kher', 'Danny Denzongpa'],
    correctAnswer: 3,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 9,
    question: 'Which two Indian films are known for being among the longest ever made, each with a runtime of around 255 minutes...?',
    options: ['Mera Naam Joker & LOC: Kargil', 'Lagaan & Swades', 'Gangs of Wasseypur & Mughal-e-Azam', 'Kabhi Khushi Kabhie Gham & Baahubali 2'],
    correctAnswer: 0,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 10,
    question: 'The iconic Star Wars villain Darth Vader was partly inspired by which Marvel character..?',
    options: ['Doctor Doom', 'Magneto', 'Thanos', 'Red Skull'],
    correctAnswer: 0,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  {
    id: 11,
    question: 'In 1972, Marvel became the first comic publisher to give a black superhero his own comic. Which hero made this historic debut...?',
    options: ['Black Panther', 'Luke Cage', 'Falcon', 'Blade'],
    correctAnswer: 0,
    explanation: 'Namor, the Sub-Mariner, debuted first in Marvel comics.',
  },
  
];

export default function RiddlesQuiz({
  updateScore,
  currentReferee,
  onTimerUpdate,
  onTimerStart,
  onTimerStop
}: RiddlesQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const currentRiddle = riddles[currentIndex];

  useEffect(() => {
    resetRound();
  }, [currentIndex]);

  // Timer runs down to 0, but does NOT auto-reveal answer
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
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
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

  const isCorrect = selectedOption === currentRiddle.correctAnswer;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Riddles & Quizzes
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-6">
          <p className="text-xl font-semibold text-gray-800 text-center">
            {currentRiddle.question}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentRiddle.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === currentRiddle.correctAnswer;
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

        {/* No extra green answer section below */}

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
              Question {currentIndex + 1} of {riddles.length}
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
            disabled={currentIndex === riddles.length - 1}
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
                className={`bg-white rounded-lg p-4 border-2 ${
                  player === currentReferee ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="text-center mb-2">
                  <span className="font-semibold text-gray-700">{player}</span>
                  {player === currentReferee && (
                    <span className="block text-xs text-purple-600 font-medium">Referee</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleScoreChange(player, -10)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 transition-colors"
                    disabled={player === currentReferee}
                  >
                    <Minus size={16} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => handleScoreChange(player, 10)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 transition-colors"
                    disabled={player === currentReferee}
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
