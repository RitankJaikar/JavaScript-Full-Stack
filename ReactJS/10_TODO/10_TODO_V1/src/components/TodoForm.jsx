import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoForm({setTodoList}) {
    const [todo, setTodo] = useState("Read");

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
            <form onSubmit={handleSubmit}>
                <input required type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className="p-2 rounded" placeholder="write here..." />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit">Add</button>
            </form>
        </div>
    )
}