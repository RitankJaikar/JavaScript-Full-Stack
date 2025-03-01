import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from "react";

export default function Todos() {
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();

    function handleDelete(id) {
        dispatch(removeTodo(id))
    }

    const [etitingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    function handleEdit(id, currentText) {
        setEditingId(id);
        setEditText(currentText);
    }

    function hadnleUpdate(id) {
        dispatch(updateTodo({id, updatedText: editText}));
        setEditingId(null);
        setEditText("");
    }

    return(
        <ul>
            {todos.map(todo => {
                return (
                    <li key={todo.id}>
                        {etitingId !== todo.id ? 
                            <>
                                <span>{todo.text}</span>
                                &nbsp;&nbsp;&nbsp;
                                <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
                                &nbsp;&nbsp;
                                <button onClick={(e) => handleEdit(todo.id, todo.text)}>Edit</button>
                            </> : 
                            <>
                                <input type="text" value={editText} onChange={e => setEditText(e.target.value)} />
                                &nbsp;&nbsp;&nbsp;
                                <button onClick={(e) => hadnleUpdate(todo.id)}>Save</button>
                            </>
                        }
                    </li>
                )
            })}
        </ul>
    )
}