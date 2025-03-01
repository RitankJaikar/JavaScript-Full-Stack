import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import useTodo from "../context/TodoContext";

export default function TodoForm() {
    const [todo, setTodo] = useState("Read");

    const {setTodoList} = useTodo();

    function handleSubmit(e) {
        e.preventDefault();
        setTodoList((currTodos) => {
            currTodos.push({
                key: uuidv4(),
                todo: todo,
                isDone: false
            });
            //return currTodos;   //it will not re-render like this
            return [...currTodos];
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex">
                <input required type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="write here..." className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5" />
                <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">Add</button>
            </form>
        </div>
    )
}