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
  question: "Which movie reportedly used the largest amount of fake blood in a single scene?",
  options: ["Evil Dead (2013)", "It: Chapter Two", "The Substance", "Evil Dead Rise (2023)"],
  correctAnswer: 2,
  explanation: "Director Coralie Fargeat has said ~36,000 gallons of fake blood were used for one scene in The Substance; It: Chapter Two is reported to have used ~4,500–5,000 gallons for a single bathroom scene. Evil Dead (2013) and Evil Dead Rise (2023) had large overall amounts but not on the same single-scene scale."
  },
  {
  id: 2,
  question: "Which movie holds the record as the highest-grossing zombie film of all time?",
  options: ["Train to Busan", "Resident Evil: Afterlife", "Zombieland: Double Tap", "World War Z"],
  correctAnswer: 3,
  explanation: "World War Z (2013), starring Brad Pitt, grossed around $540 million worldwide — making it the highest-grossing zombie movie ever. Resident Evil: Afterlife follows with about $300 million globally."
  },
  {
  id: 3,
  question: "Black Panther made history as the first superhero film ever nominated for Best Picture. Unfortunately, it did not win. Which movie won that award?",
  options: ["Bohemian Rhapsody", "Green Book", "Roma", "A Star Is Born"],
  correctAnswer: 1,
  explanation: "At the 91st Academy Awards in 2019, 'Green Book' won the Best Picture Oscar, while 'Black Panther' made history as the first superhero film nominated in that category."
  },
  {
  id: 4,
  question: "Which part of the Final Destination movie franchise is reported to have the highest number of deaths?",
  options: ["Final Destination Bloodlines", "Final Destination 2", "Final Destination 3", "The Final Destination"],
  correctAnswer: 1,
  explanation: "'Final Destination 2' (2003) is known for having the highest number of deaths in the franchise, featuring the iconic highway pileup scene that triggers a chain of deadly events."
  },
  {
  id: 5,
  question: "Which is the second highest-grossing movie in the MonsterVerse franchise?",
  options: ["Godzilla (2014)", "Kong: Skull Island (2017)", "Godzilla vs. Kong (2021)", "Godzilla: King of the Monsters (2019)"],
  correctAnswer: 1,
  explanation: "'Kong: Skull Island' (2017) earned approximately $570.9 million worldwide, making it the second highest-grossing film in the MonsterVerse after 'Godzilla x Kong: The New Empire' (2024)."
  },
  {
  id: 6,
  question: "Which Bollywood film was the first to be shot using IMAX cameras?",
  options: ["Pathaan", "War", "Tiger Zinda Hai", "Dhoom 3"],
  correctAnswer: 0,
  explanation: "'Pathaan' is the first Bollywood film to be shot using IMAX cameras and is also Yash Raj Films' first Dolby Cinema release."
  },
  {
  id: 7,
  question: "Nagarjuna's last Bollywood film was 'Brahmastra'. What was his second-to-last Bollywood film?",
  options: ["LOC Kargil", "Khuda Gawah", "Shiva", "Criminal"],
  correctAnswer: 0,
  explanation: "Before 'Brahmastra', Nagarjuna's second-to-last Bollywood film was 'Criminal'."
  },
  {
    id: 8,
    question: 'Past sins awaken in a house that once held laughter, love is trapped between whispers of the unseen, and shadows creep with a will of their own. Every heartbeat echoes danger, every corner hides a secret. Name the movie where fear lives and darkness plays with every emotion.',
    options: ['Raaz', '1920', '1920: Evil Returns', 'Ek Thi Daayan'],
    correctAnswer: 2,
    explanation: '1920: Evil Returns is a supernatural horror film where a couple faces possession and dark forces in a haunted house, making it the perfect match for this eerie description.',
  },
  {
  id: 9,
  question: "In a land of hidden wealth and looming shadows, silent threats stalk the innocent, and justice struggles to catch those who kill for greed. Which story unfolds in this tense historical setting?",
  options: ["There Will Be Blood", "No Country for Old Men", "Hostiles", "Killers of the Flower Moon"],
  correctAnswer: 3,
  explanation: "'Killers of the Flower Moon' tells the story of the Osage murders, where greed and hidden killers threaten a wealthy Native American community, and law enforcement struggles to bring justice."
  },
  {
    id: 10,
    question: 'The ground shakes, buildings crumble, and the sky seems to burn. A father races against time across a shattered city, battling nature’s fury to save his family from a disaster of unimaginable scale. Every second counts, every choice could mean life or death.....',
    options: ['2012 (2009)', 'Geostorm (2017)', 'Greenland (2020)', 'San Andreas (2015)'],
    correctAnswer: 3,
    explanation: 'San Andreas (2015) is a disaster-action film where a massive earthquake hits California, and a rescue-chopper pilot races to save his family amidst collapsing cities and natural fury.',
  },
  {
    id: 11,
    question: 'A young hero rises from humble beginnings on a desert planet, unaware of the power that flows within him. Across galaxies, empires clash, dark forces threaten peace, and mentors guide the path between light and shadow......',
    options: ['Dune (2021)', 'The Mandalorian (2019)', 'Guardians of the Galaxy (2014)', 'Star Wars (1977)'],
    correctAnswer: 3,
    explanation: 'Star Wars is the iconic space opera where Luke Skywalker rises from a desert planet to confront the Galactic Empire, discovering the Force and his destiny, making it the perfect fit for this interstellar riddle.',
}
  
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
