'use client'

import React, {createContext, useContext, useReducer} from 'react'
import {EQUIPMENT, Item, ITEMS} from "@/components/items";


const sampleItems: Item[] = [
    ITEMS[0],
    EQUIPMENT[0],
    EQUIPMENT[1],
]

const INVENTORY_SIZE = 16
export const EMPTY_ITEM = {
    id: "",
    name: "",
    description: "",
    image: "",
}

interface State {
    inventory: Item[]
}

export const initialState: State = {
    inventory: [...sampleItems, ...Array(INVENTORY_SIZE - sampleItems.length).fill(EMPTY_ITEM)]
}

type ACTION =
    | { type: "MOVE_ITEM", fromIndex: number, toIndex: number }

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