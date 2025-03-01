import { useState } from "react";
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todo/todoSlice";

export default function AddTodo() {
    const [input, useInput] = useState("");
    const dispatch = useDispatch();

    function addTodoHandler(e) {
        e.preventDefault();
        dispatch(addTodo(input));
        useInput("");
    }

    return (
        <form onSubmit={addTodoHandler}>
            <input 
                type="text"
                placeholder="Enter a todo.."
                value={input}
                onChange={(e) => useInput(e.target.value)}
            />
            &nbsp;&nbsp;&nbsp;
            <button type="submit">Add</button>
        </form>
    )
}