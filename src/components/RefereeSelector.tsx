import { Gavel } from 'lucide-react';

interface RefereeSelectorProps {
  currentSection: string;
}

export default function RefereeSelector({ currentSection }: RefereeSelectorProps) {

  // 🔹 Fixed mapping of section to referee
  const sectionRefereeMap: Record<string, string> = {
    hollywood: 'Amish',   // Guess the Hollywood Frame
    indian: 'Aman',       // Guess the Indian Movie Frame
    dialogues: 'Aziz',    // Guess the Dialogues
    riddles: 'WVish',     // Riddles & Quizzes
  };

  const currentReferee = sectionRefereeMap[currentSection];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Gavel className="text-purple-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Round Referee</h3>
      </div>

      <div className="text-center">
        <div className="animate-scale-in">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {currentReferee}
          </div>
          <p className="text-sm text-gray-600">is the referee for this round!</p>
        </div>
      </div>
    </div>
  );
}
