import React, { useEffect, useState } from 'react';
import { Instagram, Youtube } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
}

const Welcome_Page: React.FC<WelcomePageProps> = ({ onStart }) => {
  const [rulesVisible, setRulesVisible] = useState(false);

  // Rules fade-in on load
  useEffect(() => {
    const timer = setTimeout(() => setRulesVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-blue-500 text-white p-6">
      
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
          🎬 Welcome to Scoopcast💖
        </h1>
        <p className="text-lg drop-shadow-sm">
          The Ultimate Movie & Quiz Challenge
        </p>
      </div>

      {/* Container for left and right sections */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] gap-6">
        
        {/* Left: Rules */}
        <div className={`flex-1 bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg overflow-y-auto transition-opacity duration-1000 ${rulesVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-semibold mb-6 text-center">Rules & Regulations</h2>
          <ol className="list-decimal list-inside space-y-2 text-white text-sm md:text-base">
            <li>Pre-Selected Referee.</li>
            <li>Always press the Reveal button to display the correct answer.</li>
            <li>The Referee can award themselves points only if all other players have answered incorrectly.</li>
            <li>Game Changer Round has special points.</li>
            <li>In the 5th round of the game, click Final Submit to view the final scores and claim rewards.</li>
          </ol>
        </div>

        {/* Right: Profile + Socials + Start Button */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 mt-8 md:mt-0">
          
          <div className="flex flex-col items-center bg-white bg-opacity-10 p-6 rounded-2xl border-4 border-white shadow-2xl gap-4">
            
            {/* Full Name */}
            <p className="text-2xl font-semibold mb-2 drop-shadow-lg">🙌 Give me a huge shout-out! 🎉</p>
            <p className="text-2xl font-semibold mb-2 drop-shadow-lg">Ranjan Chandravanshi</p>

            {/* DP */}
            <img
              src="/frames/profile/me.png" 
              alt="DP"
              className="w-36 h-36 md:w-48 md:h-48 rounded-full mb-2 shadow-2xl border-4 border-white transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_#fff]"
            />

            {/* Social Links */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <a
                href="https://www.instagram.com/ranjan_chandra89/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xl font-medium drop-shadow-sm hover:underline"
              >
                <Instagram size={20} /> @ranjan_chandra89
              </a>
              <a
                href="https://www.youtube.com/@Popculturekiddaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xl font-medium drop-shadow-sm hover:underline"
              >
                <Youtube size={20} /> Pop Culture Kiddaa
              </a>
            </div>

            {/* Start Button */}
            <button
              onClick={onStart}
              className="px-10 py-4 bg-gradient-to-r from-red-600 via-blue-500 to-red-600 text-white rounded-lg text-lg md:text-xl shadow-xl hover:scale-105 transition-transform"
            >
              Start the Game
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Welcome_Page;
