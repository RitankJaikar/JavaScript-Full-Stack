import { createContext, useContext } from "react"

export const TodoContext = createContext({
    todoList: null,
    setTodoList: () => {}
});

export const TodoContextProvider = TodoContext.Provider;

export default function useTodo() {
    return useContext(TodoContext);
}