import { useState } from "react";
import {
  Film,
  Clapperboard,
  Brain,
  MessageSquareQuote,
  Scale,
  Clock,
} from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import GuessHollywoodFrame from "./components/GuessHollywoodFrame";
import GuessIndianFrame from "./components/GuessIndianFrame";
import RiddlesQuiz from "./components/RiddlesQuiz";
import GuessDialogues from "./components/GuessDialogues";
import GameChangerRound from "./components/GameChangerRound";
import Scoreboard from "./components/Scoreboard";
import Welcome_Page from "./components/welcome_Page";
import FinalSubmit from "./components/FinalSubmit";

const PLAYERS = ["Aman", "Amish", "WVish", "Aziz"];

function AppContent() {
  const [currentSection, setCurrentSection] = useState("hollywood");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showGameChangerModal, setShowGameChangerModal] = useState(false);
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    Aman: 0,
    Amish: 0,
    WVish: 0,
    Aziz: 0,
  });
  const [timeLeft, setTimeLeft] = useState(18);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const sectionRefereeMap: Record<string, string> = {
    hollywood: "Amish",
    indian: "Aman",
    dialogues: "Aziz",
    riddles: "WVish",
    gamechanger: "None",
  };

  const currentReferee = sectionRefereeMap[currentSection];

  const updateScore = (player: string, points: number) => {
    setScores((prev) => ({
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
    { id: "hollywood", label: "Guess the Hollywood Frame", icon: Film },
    { id: "indian", label: "Guess the Indian Movie Frame", icon: Clapperboard },
    { id: "riddles", label: "Riddles & Quizzes", icon: Brain },
    { id: "dialogues", label: "Guess the Dialogues", icon: MessageSquareQuote },
    { id: "gamechanger", label: "Game Changer Round", icon: Scale },
  ];

  const handleSectionClick = (id: string) => {
    if (id === "gamechanger") {
      setShowGameChangerModal(true);
    } else {
      setCurrentSection(id);
    }
  };

  if (!isGameStarted) {
    return <Welcome_Page onStart={() => setIsGameStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center tracking-wide">
            Scoopcast💖
          </h1>
          <p className="text-center text-red-100 mt-2">
            The Ultimate Movie & Quiz Challenge
          </p>
        </div>
      </header>

      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex overflow-x-auto gap-2 flex-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all text-sm ${
                      currentSection === section.id
                        ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                <Clock
                  className={`${
                    timeLeft <= 5
                      ? "text-red-600 animate-pulse"
                      : "text-blue-600"
                  }`}
                  size={18}
                />
                <span
                  className={`font-bold text-lg ${
                    timeLeft <= 5
                      ? "text-red-600 animate-pulse"
                      : "text-blue-600"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-6 py-2 rounded-lg border border-purple-700">
                <Scale className="text-purple-600" size={28} />
                <span className="font-semibold text-purple-900 text-xl">
                  {currentReferee}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Game Changer Warning Modal */}
      {showGameChangerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-red-600 bg-opacity-70 backdrop-blur-sm"
            onClick={() => setShowGameChangerModal(false)}
          ></div>

          <div className="relative bg-white rounded-xl p-8 shadow-2xl max-w-2xl w-full animate-scale-in">
            <h2 className="text-4xl font-extrabold text-center mb-4">
              ☠️ Warning ☠️
            </h2>
            <ul className="text-lg text-gray-700 mb-10 list-disc list-inside space-y-6">
              <li>All players must participate carefully!</li>
              <li>
                4 questions for all 4 players – select by mutual discussion.
              </li>
              <li>Correct answer: +50 points, Wrong answer: -30 points.</li>
              <li>No time limits for answering.</li>
              <li>If a player skips, their current score remains safe.</li>
              <li>Have fun but be attentive!</li>
            </ul>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowGameChangerModal(false);
                  setCurrentSection("gamechanger");
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl transform transition-all hover:scale-105 hover:brightness-110"
              >
                Play!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {currentSection === "hollywood" && (
              <GuessHollywoodFrame
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === "indian" && (
              <GuessIndianFrame
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === "riddles" && (
              <RiddlesQuiz
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === "dialogues" && (
              <GuessDialogues
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
            {currentSection === "gamechanger" && (
              <GameChangerRound
                updateScore={updateScore}
                currentReferee={currentReferee}
                onTimerUpdate={handleTimerUpdate}
                onTimerStart={handleTimerStart}
                onTimerStop={handleTimerStop}
              />
            )}
          </div>

          {/* SCOREBOARD + FINAL SUBMIT BUTTON */}
          <div className="lg:col-span-1 flex flex-col gap-4 sticky top-24">
            <Scoreboard
              scores={scores}
              currentSection={currentSection}
              onFinalSubmit={() =>
                navigate("/finalsubmit", { state: { scores } })
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/finalsubmit" element={<FinalSubmit />} />
      </Routes>
    </Router>
  );
}

export default App;
