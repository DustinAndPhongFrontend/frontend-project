'use client'

import { useState, useEffect } from "react";
import questsData from "@/data/quests.json";

// Type definition for a quest
type Quest = {
  id: number;
  title: string;
  description: string;
  reward: string;
  accepted?: boolean;
  details: string;
};

export default function MessageBoard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedQuests, setDisplayedQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  // Select 5 random quests on component mount
  useEffect(() => {
    if (questsData && questsData.length > 0) {
      const shuffled = [...questsData].sort(() => 0.5 - Math.random());
      setDisplayedQuests(shuffled.slice(0, 5));
    } else {
      console.error("questsData is empty or invalid:", questsData);
    }
    console.log("Displayed Quests:", displayedQuests); // Log after set
  }, []);

  const handleQuestAction = (accept: boolean) => {
    if (selectedQuest) {
      setDisplayedQuests(displayedQuests.map(quest =>
        quest.id === selectedQuest.id ? { ...quest, accepted: accept } : quest
      ));
      setSelectedQuest(null);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : displayedQuests.length - 1));
    console.log("Going to Previous, Current Index:", currentIndex, "Quests Length:", displayedQuests.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < displayedQuests.length - 1 ? prev + 1 : 0));
    console.log("Going to Next, Current Index:", currentIndex, "Quests Length:", displayedQuests.length);
  };

  const currentQuest = displayedQuests[currentIndex];

  return (
    <div className="min-h-screen bg-brown-800 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-yellow-100 mb-10 drop-shadow-lg">Notice Board</h1>
      <div className="relative w-full max-w-4xl overflow-visible"> {/* Added overflow-visible */}
        <button
          onClick={goToPrevious}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-600 shadow-lg z-30"
          aria-label="Previous Quest"
        >
          ←
        </button>
        <div
          style={{
            backgroundImage: `url('/wood.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="w-full p-10 rounded-lg shadow-2xl border-8 border-brown-700 relative flex items-center justify-center h-[500px] z-10"
        >
          {currentQuest && (
            <div
              style={{
                backgroundImage: `url('/parchment.jpg')`,
                backgroundSize: '100% 100%',
                color: '#2a1b0a',
                textAlign: 'center',
                padding: '3rem',
                width: '85%',
                height: '85%',
              }}
              className="flex flex-col justify-center items-center text-shadow"
            >
              <h2 className="text-4xl font-bold mb-8">{currentQuest.title}</h2>
              <p className="text-2xl mb-8">{currentQuest.description}</p>
              <p className="text-2xl text-yellow-600">Reward: {currentQuest.reward}</p>
            </div>
          )}
        </div>
        <button
          onClick={goToNext}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-600 shadow-lg z-30"
          aria-label="Next Quest"
        >
          →
        </button>
      </div>

      {selectedQuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-parchment p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-brown-900">{selectedQuest.title}</h2>
            <p className="mt-2 text-brown-700">{selectedQuest.details}</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleQuestAction(true)}
              >
                Accept
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleQuestAction(false)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}