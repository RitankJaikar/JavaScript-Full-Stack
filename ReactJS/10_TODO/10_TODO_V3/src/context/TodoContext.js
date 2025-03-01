import { createContext, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext({
    todoList: [
        {
          key: uuidv4(),
          todo: "Study",
          isDone: false
        },
        {
          key: uuidv4(),
          todo: "Sleep",
          isDone: false
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (key, todo) => {},
    deleteTodo: (key) => {},
    toggleIsDone: (key) => {}
});

export const TodoContextProvider = TodoContext.Provider;

export function useTodo() {
    return useContext(TodoContext);
}