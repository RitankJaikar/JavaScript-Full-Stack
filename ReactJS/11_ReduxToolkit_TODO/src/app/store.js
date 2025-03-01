import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import { loadState, saveState } from "./localstorage";

const preloadedState = loadState()

export const store = configureStore({
    reducer: {
        todo: todoReducer
    },
    preloadedState  //Allows for initializing the Redux store with existing data (e.g., from localStorage) to maintain the user’s context
});

// Save combined state to localStorage whenever it changes
store.subscribe(() => {
    saveState(store.getState());    //retrieves the current state of the Redux store
});
//store.subscribe(...): Ensures that every time the Redux state changes, the current state is saved to localStorage, providing persistence across sessions