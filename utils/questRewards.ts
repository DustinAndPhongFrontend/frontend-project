import itemsData from '@/data/items.json';

export interface ParsedReward {
   gold: number;
   items: string[];
}

export function parseQuestReward(rewardString: string): ParsedReward {
   const parts = rewardString.split(',').map(part => part.trim());
   
   let gold = 0;
   const items: string[] = [];
   
   parts.forEach(part => {
      // reward gold amount
      const goldMatch = part.match(/(\d+)\s*gold/i);
      if (goldMatch) {
         gold = parseInt(goldMatch[1]);
      } else {
         // find matching item ID
         const itemId = findItemIdByName(part);
         if (itemId) {
               items.push(itemId);
         } else {
               console.warn(`Could not find item ID for: "${part}"`);
         }
      }
   });
   
   return { gold, items };
}

function findItemIdByName(itemName: string): string | null {
   const allItems = [
      ...itemsData.weapons,
      ...itemsData.armor,
      ...itemsData.helmets,
      ...itemsData.boots,
      ...itemsData.shields,
      ...itemsData.accessories,
      ...itemsData.materials,
      ...itemsData.consumables
   ];
   
   let item = allItems.find(item => 
      item.name.toLowerCase() === itemName.toLowerCase()
   );
   
   if (!item) {
      item = allItems.find(item => 
         item.name.toLowerCase().includes(itemName.toLowerCase()) ||
         itemName.toLowerCase().includes(item.name.toLowerCase())
      );
   }
   
   return item ? item.id : null;
}

export function getItemById(itemId: string) {
   const allItems = [
      ...itemsData.weapons,
      ...itemsData.armor,
      ...itemsData.helmets,
      ...itemsData.boots,
      ...itemsData.shields,
      ...itemsData.accessories,
      ...itemsData.materials,
      ...itemsData.consumables
   ];
   
   return allItems.find(item => item.id === itemId);
}

// Helper function to get item names for display
export function getItemNamesByIds(itemIds: string[]): string[] {
   return itemIds
      .map(id => getItemById(id))
      .filter(Boolean)
      .map(item => item!.name);
}