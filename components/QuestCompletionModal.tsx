'use client'

import React, { useEffect, useState } from 'react';
import { useApp, useAppDispatch } from '@/components/AppContext';
import styles from './QuestCompletionModal.module.css';

export default function QuestCompletionModal() {
   const { completionResult } = useApp();
   const dispatch = useAppDispatch();
   const [showContent, setShowContent] = useState(false);
   const [animationStep, setAnimationStep] = useState(0);

   useEffect(() => {
      if (!completionResult) return;
      
      // Reset animations when modal appears
      setShowContent(false);
      setAnimationStep(0);
      
      // Stagger the animations
      const timer1 = setTimeout(() => setShowContent(true), 300);
      const timer2 = setTimeout(() => setAnimationStep(1), 800);
      const timer3 = setTimeout(() => setAnimationStep(2), 1400);
      const timer4 = setTimeout(() => setAnimationStep(3), 2000);

      return () => {
         clearTimeout(timer1);
         clearTimeout(timer2);
         clearTimeout(timer3);
         clearTimeout(timer4);
      };
   }, [completionResult]);

   const handleClose = () => {
      dispatch({ type: "HIDE_COMPLETION_RESULT" });
   };

   // Don't render if no completion result
   if (!completionResult) return null;

   const { rewardSummary, completedQuest } = completionResult;
   const { goldGained, itemsGained, levelsGained, newLevel } = rewardSummary;

   return (
      <div className={styles.modalOverlay} onClick={handleClose}>
         <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
         
         {/* Header */}
         <div className={styles.header}>
            <div className={styles.questCompleteTitle}>
               ⚔️ QUEST COMPLETE! ⚔️
            </div>
            <div className={styles.questName}>
               {completedQuest.title}
            </div>
         </div>

         {/* Content */}
         {showContent && (
            <div className={styles.content}>
               
               {/* Gold Reward */}
               <div className={`${styles.rewardSection} ${animationStep >= 1 ? styles.visible : ''}`}>
                  <div className={styles.rewardIcon}>💰</div>
                  <div className={styles.rewardText}>
                     <span className={styles.rewardLabel}>Gold Earned:</span>
                     <span className={styles.rewardValue}>{goldGained}</span>
                  </div>
               </div>

               {/* Items Reward */}
               {itemsGained.length > 0 && (
                  <div className={`${styles.rewardSection} ${animationStep >= 1 ? styles.visible : ''}`}>
                     <div className={styles.rewardIcon}>⚔️</div>
                     <div className={styles.rewardText}>
                        <span className={styles.rewardLabel}>Items Received:</span>
                        <div className={styles.itemsList}>
                           {itemsGained.map((item, index) => (
                              <span key={index} className={styles.itemName}>
                                 {item}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {/* Level Up Section */}
               {levelsGained > 0 && (
                  <div className={`${styles.levelUpSection} ${animationStep >= 2 ? styles.visible : ''}`}>
                     <div className={styles.levelUpBanner}>
                        ⭐ LEVEL UP! ⭐
                     </div>
                     <div className={styles.levelDisplay}>
                        <span className={styles.levelText}>
                        Level {newLevel - levelsGained} → Level {newLevel}
                        </span>
                     </div>
                     
                     {/* Stat Increases */}
                     <div className={styles.statIncreases}>
                        <div className={styles.statLabel}>Stat Increases:</div>
                        <div className={styles.statGrid}>
                           <div className={styles.statItem}>
                              <span className={styles.statName}>Strength</span>
                              <span className={styles.statIncrease}>+{levelsGained * 2}</span>
                           </div>
                           <div className={styles.statItem}>
                              <span className={styles.statName}>Intelligence</span>
                              <span className={styles.statIncrease}>+{levelsGained * 2}</span>
                           </div>
                           <div className={styles.statItem}>
                              <span className={styles.statName}>Dexterity</span>
                              <span className={styles.statIncrease}>+{levelsGained * 2}</span>
                           </div>
                           <div className={styles.statItem}>
                              <span className={styles.statName}>Luck</span>
                              <span className={styles.statIncrease}>+{levelsGained * 2}</span>
                           </div>
                           <div className={styles.statItem}>
                              <span className={styles.statName}>Max Health</span>
                              <span className={styles.statIncrease}>+{levelsGained * 20}</span>
                           </div>
                           <div className={styles.statItem}>
                              <span className={styles.statName}>Max Mana</span>
                              <span className={styles.statIncrease}>+{levelsGained * 15}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* Close Button */}
               <div className={`${styles.buttonSection} ${animationStep >= 3 ? styles.visible : ''}`}>
                  <button 
                     className={styles.closeButton}
                     onClick={handleClose}
                  >
                     Continue Adventure
                  </button>
               </div>
            </div>
         )}
         </div>
      </div>
   );
}