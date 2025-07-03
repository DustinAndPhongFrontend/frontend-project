'use client'

import { useApp, useAppDispatch, Quest } from "@/components/AppContext";
import { useState, useEffect } from "react";
import { 
   QUEST_LOG_CONFIG, 
   TAB_CONFIG, 
   BUTTON_TEXT,
   isMobileView, 
   isTabletView,
   getGridClass,
   getCardClass,
   formatDate 
} from './questLogConfig';
import styles from './QuestLog.module.css';

export default function QuestLog() {
   const { acceptedQuests, completedQuests } = useApp();
   const dispatch = useAppDispatch();
   const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
   const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
   const [isMobile, setIsMobile] = useState(false);
   const [isTablet, setIsTablet] = useState(false);

   // Handle responsive layout
   useEffect(() => {
      const handleResize = () => {
         setIsMobile(isMobileView());
         setIsTablet(isTabletView());
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   const handleCompleteQuest = (questId: number) => {
      dispatch({
         type: 'FINISH_QUEST',
         questId: questId
      });
      setSelectedQuest(null);
   };

   const QuestCard = ({ quest, showCompleteButton = false }: { quest: Quest, showCompleteButton?: boolean }) => (
      <div 
         className={`${styles.questCard} ${styles[getCardClass(isMobile)]}`}
         onClick={() => setSelectedQuest(quest)}
      >
         <div className={styles.questContent}>
         <h3 className={styles.questTitle}>
            {quest.title}
         </h3>
         
         <p className={styles.questDescription}>
            {quest.description}
         </p>
         
         <div className={styles.questReward}>
            💰 Reward: {quest.reward}
         </div>
         
         {quest.dateAccepted && (
            <div className={styles.questDate}>
               📅 Accepted: {formatDate(quest.dateAccepted)}
            </div>
         )}
         
         {quest.dateCompleted && (
            <div className={styles.questDateCompleted}>
               ✅ Completed: {formatDate(quest.dateCompleted)}
            </div>
         )}
         </div>
         
         {showCompleteButton && (
         <button
            className={`${styles.completeButton} ${isMobile ? styles.completeButtonMobile : ''}`}
            onClick={(e) => {
               e.stopPropagation();
               handleCompleteQuest(quest.id);
            }}
         >
            {BUTTON_TEXT.COMPLETE}
         </button>
         )}
      </div>
   );

   const EmptyState = ({ type }: { type: 'active' | 'completed' }) => {
      const config = TAB_CONFIG[type.toUpperCase() as keyof typeof TAB_CONFIG];
      const icon = QUEST_LOG_CONFIG.EMPTY_STATE_ICONS[type.toUpperCase() as keyof typeof QUEST_LOG_CONFIG.EMPTY_STATE_ICONS];
      
      return (
         <div className={styles.emptyState}>
         <div>
            <div className={styles.emptyStateIcon}>{icon}</div>
            {config.emptyMessage}
         </div>
         </div>
      );
   };

   const renderQuestList = () => {
      const quests = activeTab === 'active' ? acceptedQuests : completedQuests;
      const showCompleteButton = activeTab === 'active';
      
      if (quests.length === 0) {
         return <EmptyState type={activeTab} />;
      }

      return (
         <div className={`${styles.questGrid} ${getGridClass(isTablet)}`}>
         {quests.map(quest => (
            <QuestCard 
               key={quest.id} 
               quest={quest} 
               showCompleteButton={showCompleteButton} 
            />
         ))}
         </div>
      );
   };

   return (
      <div className={styles.container}>
         <div className={styles.contentWrapper}>
         <h1 className={styles.title}>
            Quest Log
         </h1>

         {/* Tab Navigation */}
         <div className={styles.tabNavigation}>
            <button
               className={`${styles.tabButton} ${activeTab === 'active' ? styles.active : ''}`}
               onClick={() => setActiveTab('active')}
            >
               {TAB_CONFIG.ACTIVE.label} ({acceptedQuests.length})
            </button>
            
            <button
               className={`${styles.tabButton} ${activeTab === 'completed' ? styles.active : ''}`}
               onClick={() => setActiveTab('completed')}
            >
               {TAB_CONFIG.COMPLETED.label} ({completedQuests.length})
            </button>
         </div>

         {/* Quest List Container */}
         <div className={styles.questContainer}>
            {renderQuestList()}
         </div>
         </div>

         {/* Quest Detail Modal */}
         {selectedQuest && (
         <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
               <div className={styles.modalContent}>
               <h2 className={styles.modalTitle}>
                  {selectedQuest.title}
               </h2>
               
               <p className={styles.modalDescription}>
                  {selectedQuest.details}
               </p>
               
               <div className={styles.modalRewardSection}>
                  <span className={styles.modalRewardLabel}>
                     💰 Reward:
                  </span>
                  <span className={styles.modalRewardValue}>
                     {selectedQuest.reward}
                  </span>
               </div>
               
               <div className={`${styles.modalButtons} ${isMobile ? styles.modalButtonsColumn : ''}`}>
                  {activeTab === 'active' && (
                     <button
                     className={`${styles.modalButton} ${styles.modalButtonPrimary} ${isMobile ? styles.modalButtonMobile : ''}`}
                     onClick={() => handleCompleteQuest(selectedQuest.id)}
                     >
                     {BUTTON_TEXT.COMPLETE_QUEST}
                     </button>
                  )}
                  
                  <button
                     className={`${styles.modalButton} ${styles.modalButtonSecondary} ${isMobile ? styles.modalButtonMobile : ''}`}
                     onClick={() => setSelectedQuest(null)}
                  >
                     {BUTTON_TEXT.CLOSE}
                  </button>
               </div>
               </div>
            </div>
         </div>
         )}
      </div>
   );
}