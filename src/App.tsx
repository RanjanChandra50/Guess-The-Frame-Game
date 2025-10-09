import { useState, useEffect } from 'react';
import { Film, Clapperboard, Brain, MessageSquareQuote, Gavel, Clock } from 'lucide-react';
import GuessHollywoodFrame from './components/GuessHollywoodFrame';
import GuessIndianFrame from './components/GuessIndianFrame';
import RiddlesQuiz from './components/RiddlesQuiz';
import GuessDialogues from './components/GuessDialogues';
import Scoreboard from './components/Scoreboard';

const PLAYERS = ['Aman', 'Amish', 'WVish', 'Aziz'];

function App() {
  const [currentSection, setCurrentSection] = useState('hollywood');
  const [scores, setScores] = useState({
    Aman: 0,
    Amish: 0,
    WVish: 0,
    Aziz: 0,
  });
  const [sectionReferees, setSectionReferees] = useState<Record<string, string>>({});
  const [usedReferees, setUsedReferees] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(18);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentReferee = sectionReferees[currentSection] || '';

  useEffect(() => {
    if (!sectionReferees[currentSection]) {
      const availablePlayers = PLAYERS.filter(player => !usedReferees.includes(player));
      if (availablePlayers.length > 0) {
        const randomReferee = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
        setSectionReferees(prev => ({
          ...prev,
          [currentSection]: randomReferee
        }));
        setUsedReferees(prev => [...prev, randomReferee]);
      }
    }
  }, [currentSection]);

  const updateScore = (player: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [player]: prev[player] + points,
    }));
  };

  const handleTimerStart = () => {
    setTimeLeft(18);
    setIsTimerActive(true);
  };

  const handleTimerStop = () => {
    setIsTimerActive(false);
  };

  const handleTimerUpdate = (time: number) => {
    setTimeLeft(time);
  };

  const sections = [
    { id: 'hollywood', label: 'Guess the Hollywood Frame', icon: Film },
    { id: 'indian', label: 'Guess the Indian Movie Frame', icon: Clapperboard },
    { id: 'riddles', label: 'Riddles & Quizzes', icon: Brain },
    { id: 'dialogues', label: 'Guess the Dialogues', icon: MessageSquareQuote },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center tracking-wide">
            Scoopcast💖
          </h1>
          <p className="text-center text-red-100 mt-2">The Ultimate Movie & Quiz Challenge</p>
        </div>
      </header>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex overflow-x-auto gap-2 flex-1">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all text-sm ${
                      currentSection === section.id
                        ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon size={18} />
                    {section.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Clock className={`${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`} size={18} />
                <span className={`font-bold text-lg ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg border border-purple-200">
                <Gavel className="text-purple-600" size={18} />
                <span className="font-semibold text-purple-700 text-sm">
                  {currentReferee || 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {currentSection === 'hollywood' && (
              <GuessHollywoodFrame
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === 'indian' && (
              <GuessIndianFrame
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === 'riddles' && (
              <RiddlesQuiz
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === 'dialogues' && (
              <GuessDialogues
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <Scoreboard scores={scores} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
