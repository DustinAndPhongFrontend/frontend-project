'use client'

import React, {createContext, useContext, useReducer} from 'react'
import {CharacterClass, EQUIPMENT, EquipmentItem, EquipmentSlots, Item, ITEMS, Stats} from "@/components/items";


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
    stats: Stats
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

        health: 100,
        mana: 100,
    }
}

type ACTION =
    | { type: "MOVE_ITEM", fromIndex: number, toIndex: number }
    | { type: "EQUIP_ITEM", equipment_slot: EquipmentSlots, item: Item }

export function appReducer(state: State, action: ACTION): State {
    console.debug(action)

    // Create a copy of the inventory
    const newInventory = state.inventory.slice()

    switch (action.type) {
        case "MOVE_ITEM":
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
            const indexOfItem = state.inventory.findIndex(item => item === action.item)
            // Replace the item with a blank
            newInventory[indexOfItem] = EMPTY_ITEM

            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    [action.equipment_slot]: action.item
                },
                inventory: newInventory
            }
        default:
            return state;
    }
}

const AppContext = createContext(initialState);
// Giving this context a useless function to satisfy typescript
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