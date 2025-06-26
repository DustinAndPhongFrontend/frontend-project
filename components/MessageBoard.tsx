'use client'

import { useState, useEffect } from "react";
import questsData from "@/data/quests.json";
import { QuestDisplay } from './QuestDisplay';

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
      const shuffled = [...questsData].sort(() => 0.6 - Math.random());
      setDisplayedQuests(shuffled.slice(0, 6));
    } else {
      console.error("questsData is empty or invalid:", questsData);
    }
    console.log("Displayed Quests:", displayedQuests);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Crimson+Text:ital,wght@0,400;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleQuestAction = (accept: boolean) => {
    if (selectedQuest) {
      if (accept) {
        setDisplayedQuests(displayedQuests.map(quest =>
          quest.id === selectedQuest.id ? { ...quest, accepted: true } : quest
        ));
      }
      setSelectedQuest(null);
    }
  };

  const handleQuestClick = (quest: Quest & { _action?: string }) => {
    if (quest._action === 'decline') {
      const currentQuestIds = displayedQuests.map(q => q.id);
      const availableQuests = questsData.filter(q => !currentQuestIds.includes(q.id));
      
      if (availableQuests.length > 0) {
        const randomQuest = availableQuests[Math.floor(Math.random() * availableQuests.length)];
        const questIndex = displayedQuests.findIndex(q => q.id === quest.id);
        const newQuests = [...displayedQuests];
        newQuests[questIndex] = randomQuest;
        setDisplayedQuests(newQuests);
      }
    } else if (quest._action === 'accept') {
      setSelectedQuest(quest);
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
      <div className="relative w-full max-w-4xl overflow-visible">
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
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 0 30px rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="w-full p-10 rounded-lg shadow-2xl border-8 border-brown-700 h-[500px] z-10"
        >
          {currentQuest && <QuestDisplay quest={currentQuest} onQuestClick={handleQuestClick} />}
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
          <div className="bg-yellow-50 p-6 rounded-lg shadow-lg w-96 border-4 border-brown-700">
            <h2 className="text-2xl font-bold text-brown-900 mb-4">Accept Quest?</h2>
            <h3 className="text-xl font-semibold text-brown-800 mb-3">{selectedQuest.title}</h3>
            <p className="mt-2 text-brown-700 mb-6">{selectedQuest.details}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-bold transition-colors"
                onClick={() => handleQuestAction(true)}
              >
                Confirm
              </button>
              <button
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-bold transition-colors"
                onClick={() => setSelectedQuest(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}