'use client'

import { useState, useEffect, useCallback } from "react";
import questsData from "@/data/quests.json";
import { QuestDisplay } from './QuestDisplay';
import { useApp, useAppDispatch, Quest } from "@/components/AppContext";
import { 
  MESSAGE_BOARD_CONFIG, 
  NAV_BUTTONS, 
  MODAL_BUTTONS, 
  MESSAGES,
  isMobile
} from './messageBoardConfig';
import styles from './MessageBoard.module.css';

export default function MessageBoard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedQuests, setDisplayedQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  
  const { acceptedQuests } = useApp();
  const dispatch = useAppDispatch();

  // Initialize quests on mount
  useEffect(() => {
    if (questsData && questsData.length > 0) {
      const shuffled = [...questsData].sort(() => 0.6 - Math.random());
      setDisplayedQuests(shuffled.slice(0, MESSAGE_BOARD_CONFIG.DISPLAYED_QUEST_COUNT));
    } else {
      console.error("questsData is empty or invalid:", questsData);
    }
  }, []);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = MESSAGE_BOARD_CONFIG.GOOGLE_FONTS_URL;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const replaceQuestWithNewOne = (questToReplaceId: number) => {
    const usedQuestIds = [
      ...displayedQuests.map(q => q.id),
      ...acceptedQuests.map(q => q.id)
    ];
    
    const availableQuests = questsData.filter(q => !usedQuestIds.includes(q.id));
    
    if (availableQuests.length > 0) {
      const randomQuest = availableQuests[Math.floor(Math.random() * availableQuests.length)];
      
      setDisplayedQuests(prev => 
        prev.map(quest => 
          quest.id === questToReplaceId ? randomQuest : quest
        )
      );
      
      console.log(MESSAGES.QUEST_REPLACED(questToReplaceId, randomQuest.title));
    } else {
      console.log(MESSAGES.NO_MORE_QUESTS);
    }
  };

  // Filter out already accepted quests from display
  const filterAcceptedQuests = useCallback(() => {
    const acceptedQuestIds = acceptedQuests.map(q => q.id);
    const filteredQuests = displayedQuests.filter(q => !acceptedQuestIds.includes(q.id));
    
    // If we filtered out quests, replace them with new ones
    if (filteredQuests.length < displayedQuests.length) {
      const usedQuestIds = [
        ...filteredQuests.map(q => q.id),
        ...acceptedQuests.map(q => q.id)
      ];
      
      const availableQuests = questsData.filter(q => !usedQuestIds.includes(q.id));
      const questsNeeded = MESSAGE_BOARD_CONFIG.DISPLAYED_QUEST_COUNT - filteredQuests.length;
      
      // Add random quests to fill the slots
      for (let i = 0; i < questsNeeded && i < availableQuests.length; i++) {
        const randomIndex = Math.floor(Math.random() * availableQuests.length);
        filteredQuests.push(availableQuests.splice(randomIndex, 1)[0]);
      }
      
      setDisplayedQuests(filteredQuests);
      
      // Reset current index if it's out of bounds
      if (currentIndex >= filteredQuests.length) {
        setCurrentIndex(0);
      }
    }
  }, [acceptedQuests, displayedQuests, currentIndex]);

  // Filter accepted quests whenever dependencies change
  useEffect(() => {
    if (displayedQuests.length > 0) {
      filterAcceptedQuests();
    }
  }, [filterAcceptedQuests, displayedQuests.length]);

  const handleQuestAction = (accept: boolean) => {
    if (!selectedQuest) return;

    if (accept) {
      const isAlreadyAccepted = acceptedQuests.some(q => q.id === selectedQuest.id);
      
      if (isAlreadyAccepted) {
        alert(MESSAGES.ALREADY_ACCEPTED);
        setSelectedQuest(null);
        return;
      }

      dispatch({
        type: 'ACCEPT_QUEST',
        quest: selectedQuest
      });

      replaceQuestWithNewOne(selectedQuest.id);
      console.log(MESSAGES.QUEST_ACCEPTED(selectedQuest.title));
    }
    
    setSelectedQuest(null);
  };

  const handleQuestClick = (quest: Quest & { _action?: string }) => {
    if (quest._action === 'decline') {
      replaceQuestWithNewOne(quest.id);
    } else if (quest._action === 'accept') {
      const isAlreadyAccepted = acceptedQuests.some(q => q.id === quest.id);
      
      if (isAlreadyAccepted) {
        alert(MESSAGES.ALREADY_ACCEPTED);
        return;
      }
      
      setSelectedQuest(quest);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : displayedQuests.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < displayedQuests.length - 1 ? prev + 1 : 0));
  };

  const currentQuest = displayedQuests[currentIndex];

  return (
    <div className={`${styles.container} bg-brown-800`}>
      <h1 className={styles.title}>Message Board</h1>
      
      <div className={styles.questCounter}>
        Active Quests: {acceptedQuests.length}
      </div>

      <div className={styles.questBoard}>
        <button
          onClick={goToPrevious}
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          aria-label={NAV_BUTTONS.PREVIOUS.ariaLabel}
        >
          {NAV_BUTTONS.PREVIOUS.text}
        </button>
        
        <div className={styles.questDisplay}>
          {currentQuest && (
            <QuestDisplay 
              quest={currentQuest} 
              onQuestClick={handleQuestClick} 
            />
          )}
        </div>
        
        <button
          onClick={goToNext}
          className={`${styles.navButton} ${styles.navButtonRight}`}
          aria-label={NAV_BUTTONS.NEXT.ariaLabel}
        >
          {NAV_BUTTONS.NEXT.text}
        </button>
      </div>

      {/* Quest Acceptance Modal */}
      {selectedQuest && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Accept Quest?
              </h2>
            </div>

            <div className={styles.modalContent}>
              <h3 className={styles.questTitle}>
                {selectedQuest.title}
              </h3>
              
              <p className={styles.questDetails}>
                {selectedQuest.details}
              </p>

              <div className={styles.rewardSection}>
                <div className={styles.rewardLabel}>
                  💰 REWARD
                </div>
                <div className={styles.rewardValue}>
                  {selectedQuest.reward}
                </div>
              </div>

              <div className={`${styles.buttonContainer} ${isMobileView ? styles.buttonContainerMobile : ''}`}>
                <button
                  className={`${styles.acceptButton} ${isMobileView ? styles.acceptButtonMobile : ''}`}
                  onClick={() => handleQuestAction(true)}
                >
                  {MODAL_BUTTONS.ACCEPT.text}
                </button>
                
                <button
                  className={`${styles.cancelButton} ${isMobileView ? styles.cancelButtonMobile : ''}`}
                  onClick={() => setSelectedQuest(null)}
                >
                  {MODAL_BUTTONS.CANCEL.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}