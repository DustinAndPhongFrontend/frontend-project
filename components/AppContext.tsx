'use client'

import React, {createContext, useContext, useReducer} from 'react'

interface State {}

export const initialState: State = {}

type ACTION =
    | { type: "DO_NOTHING" }

export function appReducer(state: State, action: ACTION): State {
    console.debug(action)
    switch (action.type) {
        case "DO_NOTHING":
            return state;
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