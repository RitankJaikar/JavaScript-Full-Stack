import Todo from "./Todo"

export default function Todos({todoList, setTodoList}) {
    return (
        <div>
            <ul>
                {todoList.map(todoItem => (
                    <li key={todoItem.key}>
                        <Todo todoItem={todoItem} setTodoList={setTodoList} />
                    </li>
                ))}
            </ul>
        </div>
    )
}