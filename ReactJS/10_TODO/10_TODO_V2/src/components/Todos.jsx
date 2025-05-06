import useTodo from "../context/TodoContext";
import Todo from "./Todo";

export default function Todos() {
    const {todoList} = useTodo();

    return (
        <ul>
            {todoList.map(todoItem => (
                <li key={todoItem.key}>
                    <Todo todoItem={todoItem} />
                </li>
            ))}
        </ul>
    )
}