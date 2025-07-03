'use client'

import React, {createContext, useContext, useReducer} from 'react'
import {CharacterClass, EQUIPMENT, EquipmentItem, EquipmentSlots, Item, ITEMS, Stats} from "@/components/items";
import { processQuestCompletion } from '@/utils/questCompletion';

// Quest type definition
export type Quest = {
    id: number;
    title: string;
    description: string;
    reward: string;
    details: string;
    accepted?: boolean;
    completed?: boolean;
    dateAccepted?: string;
    dateCompleted?: string;
};

const sampleItems: Item[] = [
    ITEMS[0],
    EQUIPMENT[0],
    EQUIPMENT[1],
    EQUIPMENT[2],
    EQUIPMENT[3],
]

const INVENTORY_SIZE = 16
export const EMPTY_ITEM: Item = {
    type: "",
    id: "",
    name: "",
    description: "",
    image: ""
}

export type EquippedItems = {
    helmet: EquipmentItem | null,
    armor: EquipmentItem | null,
    weapon: EquipmentItem | null,
    boots: EquipmentItem | null,
}

interface State {
    username: string,
    characterClass: CharacterClass,
    inventory: Item[],
    equipment: EquippedItems,
    stats: Stats,
    gold: number,
    acceptedQuests: Quest[],
    completedQuests: Quest[]
}

export const initialState: State = {
    username: "John Smith",
    characterClass: CharacterClass.Wizard,
    inventory: [...sampleItems, ...Array(INVENTORY_SIZE - sampleItems.length).fill(EMPTY_ITEM)],
    equipment: {
        helmet: null,
        armor: null,
        weapon: null,
        boots: null
    },
    stats: {
        level: 1,
        experience: 0,
        intelligence: 5,
        strength: 5,
        dexterity: 5,
        luck: 5,
        currentHealth: 100,
        maxHealth: 100,
        currentMana: 100,
        maxMana: 100,
    },
    gold: 0,
    acceptedQuests: [],
    completedQuests: []
}

type ACTION =
    | { type: "MOVE_ITEM", fromIndex: number, toIndex: number }
    | { type: "EQUIP_ITEM", equipment_slot: EquipmentSlots, item: Item }
    | { type: "COMPLETE_QUEST", quest_name: string }
    | { type: "ACCEPT_QUEST", quest: Quest }
    | { type: "FINISH_QUEST", questId: number }

export function appReducer(state: State, action: ACTION): State {
    console.debug(action)

    switch (action.type) {
        case "MOVE_ITEM":
            // Create a copy of the inventory
            const newInventory = state.inventory.slice()
            // Switch the items
            const fromItem = newInventory[action.fromIndex];
            const toItem = newInventory[action.toIndex];
            newInventory[action.fromIndex] = toItem;
            newInventory[action.toIndex] = fromItem;

            return {
                ...state,
                inventory: newInventory
            };

        case "EQUIP_ITEM":
            const newInventory2 = state.inventory.slice()
            const indexOfItem = state.inventory.findIndex(item => item === action.item)
            // Replace the item with a blank
            newInventory2[indexOfItem] = EMPTY_ITEM

            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    [action.equipment_slot]: action.item
                },
                inventory: newInventory2
            }

        case "ACCEPT_QUEST":
            // Add quest to accepted quests with timestamp
            const acceptedQuest = {
                ...action.quest,
                accepted: true,
                dateAccepted: new Date().toLocaleDateString()
            };

            return {
                ...state,
                acceptedQuests: [...state.acceptedQuests, acceptedQuest]
            };

        case "FINISH_QUEST":
            // Move quest from accepted to completed
            const questToComplete = state.acceptedQuests.find(q => q.id === action.questId);
            
            if (!questToComplete) return state;

            // Use the quest completion utility to process everything
            const completionResult = processQuestCompletion(
                questToComplete,
                state.inventory,
                state.gold,
                state.stats
            );

            return {
                ...state,
                acceptedQuests: state.acceptedQuests.filter(q => q.id !== action.questId),
                completedQuests: [...state.completedQuests, completionResult.completedQuest],
                inventory: completionResult.newInventory,
                gold: completionResult.newGold,
                stats: completionResult.newStats
            };
            
        case "COMPLETE_QUEST":
            return {
                ...state,
                gold: state.gold + 10
            }

        default:
            return state;
    }
}

const AppContext = createContext(initialState);
const AppDispatchContext = createContext((_: ACTION) => console.log(_));

export default function AppProvider({ children } : { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
            {children}
        </AppDispatchContext.Provider>
    </AppContext.Provider>
}

export function useApp() {
    return useContext(AppContext);
}

export function useAppDispatch() {
    return useContext(AppDispatchContext);
}