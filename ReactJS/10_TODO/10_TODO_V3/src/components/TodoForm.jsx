import { useState } from "react";
import { useTodo } from "../context";

export default function TodoForm() {
    const [todo, setTodo] = useState("");

    const {addTodo} = useTodo();

    function handleSubmit(e) {
        e.preventDefault();
        addTodo(todo);
        setTodo("");
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