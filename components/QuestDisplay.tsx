import React, { useState } from 'react';
import styles from './QuestDisplay.module.css';

interface Quest {
   id: number;
   title: string;
   description: string;
   reward: string;
   accepted?: boolean;
   details: string;
}

interface QuestDisplayProps {
   quest: Quest;
   onQuestClick?: (quest: Quest) => void;
}

export const QuestDisplay: React.FC<QuestDisplayProps> = ({ quest, onQuestClick }) => {
   const [isFlipped, setIsFlipped] = useState(false);

   const handleViewDetails = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped(true);
   };

   const handleBackToFront = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped(false);
   };

   const handleAcceptDecline = (e: React.MouseEvent, quest: Quest, accept: boolean) => {
      e.stopPropagation();
      setIsFlipped(false);
      
      // Create a modified quest object with the action
      const modifiedQuest = { ...quest, _action: accept ? 'accept' : 'decline' };
      onQuestClick?.(modifiedQuest);
   };

   return (
      <div className={styles.flipContainer}>
         <div className={`${styles.flipCard} ${isFlipped ? styles.flipped : ''}`}>
            {/* Front of the parchment */}
            <div className={`${styles.flipFront}`}>
               <div 
                  className={styles.questParchment}
                  style={{
                     backgroundImage: `url('/parchment.jpg')`,
                  }}
               >
                  {/* Quest Header with decorative elements */}
                  <div className={styles.questHeader}>
                     <span>QUEST</span>
                  </div>
                  
                  {/* Quest Title */}
                  <h2 className={styles.questTitle}>{quest.title}</h2>
                  
                  {/* Quest Description */}
                  <p className={styles.questDescription}>{quest.description}</p>
                  
                  {/* Reward Section */}
                  <div className={styles.questReward}>
                     <div className={styles.waxSeal}>★</div>
                     <div className={styles.rewardLabel}>
                        <span>REWARD</span>
                     </div>
                     <p className={styles.rewardDetails}>{quest.reward}</p>
                  </div>
                  
                  {/* View Details Button */}
                  <div className={styles.questButtons}>
                     <button 
                        className={styles.acceptButton}
                        onClick={handleViewDetails}
                     >
                        View Details
                     </button>
                  </div>
                  
                  {/* Quest Status Indicator - Only show if accepted */}
                  {quest.accepted === true && (
                     <div className={styles.questStatus}>
                        <span className={styles.acceptedStatus}>✓ Accepted</span>
                     </div>
                  )}
               </div>
            </div>

            {/* Back of the parchment - Quest Details */}
            <div className={`${styles.flipBack}`}>
               <div 
                  className={styles.questParchment}
                  style={{
                     backgroundImage: `url('/parchment.jpg')`,
                  }}
               >
                  <div className={styles.detailsHeader}>
                     <span>QUEST DETAILS</span>
                  </div>
                  
                  <h2 className={styles.detailsTitle}>{quest.title}</h2>
                  
                  <div className={styles.detailsContent}>
                     <p>{quest.details}</p>
                  </div>
                  
                  <div className={styles.detailsButtons}>
                     <button 
                        className={styles.acceptButton}
                        onClick={(e) => handleAcceptDecline(e, quest, true)}
                     >
                        Accept Quest
                     </button>
                     <button 
                        className={styles.declineButton}
                        onClick={(e) => handleAcceptDecline(e, quest, false)}
                     >
                        Decline Quest
                     </button>
                  </div>
                  
                  <button 
                     className={styles.backButton}
                     onClick={handleBackToFront}
                  >
                     ← Back to Quest
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};