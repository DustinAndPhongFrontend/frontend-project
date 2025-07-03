import { parseQuestReward, getItemById } from './questRewards';
import { experienceRequiredToLevelUp, Item, Stats } from '@/components/items';
import { Quest } from '@/components/AppContext';

export interface QuestCompletionResult {
   newInventory: Item[];
   newGold: number;
   newStats: Stats;
   completedQuest: Quest;
   rewardSummary: {
      goldGained: number;
      itemsGained: string[];
      levelsGained: number;
      newLevel: number;
   };
}

export function processQuestCompletion(
   quest: Quest,
   currentInventory: Item[],
   currentGold: number,
   currentStats: Stats
): QuestCompletionResult {

   // Parse the quest reward
   const { gold: rewardGold, items: rewardItemIds } = parseQuestReward(quest.reward);

   // Process inventory additions
   const newInventory = [...currentInventory];
   const rewardItems = rewardItemIds.map(getItemById).filter(Boolean);
   const itemsGained: string[] = [];

   // Add each reward item to the first available empty slot
   rewardItems.forEach(item => {
      const emptySlotIndex = newInventory.findIndex(slot => slot.id === "");
      if (emptySlotIndex !== -1 && item) {
         newInventory[emptySlotIndex] = item;
         itemsGained.push(item.name);
      } else {
         console.warn("Inventory full! Could not add item:", item?.name);
      }
   });

   // Process experience and leveling
   const baseExpReward = 100;
   const newExperience = currentStats.experience + baseExpReward;
   const currentLevel = currentStats.level;

   // Calculate level ups
   let newLevel = currentLevel;
   let finalExperience = newExperience;

   while (finalExperience >= experienceRequiredToLevelUp(newLevel)) {
      finalExperience -= experienceRequiredToLevelUp(newLevel);
      newLevel++;
   }

   // Calculate stat increases
   const levelUps = newLevel - currentLevel;
   const statIncrease = levelUps * 2;
   const healthIncrease = levelUps * 20;
   const manaIncrease = levelUps * 15;

   // Create new stats object
   const newStats: Stats = {
      ...currentStats,
      level: newLevel,
      experience: finalExperience,
      strength: currentStats.strength + statIncrease,
      intelligence: currentStats.intelligence + statIncrease,
      dexterity: currentStats.dexterity + statIncrease,
      luck: currentStats.luck + statIncrease,
      maxHealth: currentStats.maxHealth + healthIncrease,
      maxMana: currentStats.maxMana + manaIncrease,
      // Heal player on level up
      currentHealth: levelUps > 0 
         ? Math.min(currentStats.currentHealth + healthIncrease, currentStats.maxHealth + healthIncrease)
         : currentStats.currentHealth,
      currentMana: levelUps > 0 
         ? Math.min(currentStats.currentMana + manaIncrease, currentStats.maxMana + manaIncrease)
         : currentStats.currentMana
   };

   // Create completed quest object
   const completedQuest: Quest = {
      ...quest,
      completed: true,
      dateCompleted: new Date().toLocaleDateString()
   };

   // Create reward summary
   const rewardSummary = {
      goldGained: rewardGold,
      itemsGained,
      levelsGained: levelUps,
      newLevel
   };

   // Log completion details
   console.log("Quest completed!", {
      quest: quest.title,
      goldReward: rewardGold,
      itemRewards: itemsGained,
      levelUps: levelUps,
      newLevel: newLevel
   });

   return {
      newInventory,
      newGold: currentGold + rewardGold,
      newStats,
      completedQuest,
      rewardSummary
   };
}