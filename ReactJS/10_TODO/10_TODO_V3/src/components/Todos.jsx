import Todo from "./Todo";
import { useTodo } from "../context";

export default function Todos() {
    const {todoList} = useTodo();

    return (
        <ul>
            {todoList.map(todoItem => (
                <li key={todoItem.key} className="w-full">
                    <Todo todoItem={todoItem} />
                </li>
            ))}
        </ul>
    )
}