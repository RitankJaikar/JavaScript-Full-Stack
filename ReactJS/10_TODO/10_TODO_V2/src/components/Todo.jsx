import { useState } from "react";
import useTodo from "../context/TodoContext";

export default function Todo({ todoItem }) {
    const {setTodoList} = useTodo();

    function handleCheck(e, key) {
        setTodoList((currTodos) => {
            return currTodos.map(todoItem => {
                if (todoItem.key === key) {
                    return { ...todoItem, isDone: !todoItem.isDone };
                }
                return todoItem;
            });
        })
    }

    function handleDelete(e, key) {
        setTodoList((currTodos) => {
            return currTodos.filter(todoItem => todoItem.key !== key);
        })
    }

    const [updateTodo, setUpdateTodo] = useState("");
    const [switchUpdate, setSwitchUpdate] = useState(false);
    function handleUpdate() {
        setSwitchUpdate(!switchUpdate);
    }
    function handleCancel(e) {
        e.preventDefault();
        setUpdateTodo("");
        setSwitchUpdate(!switchUpdate);
    }
    function handleSubmit(e, key) {
        e.preventDefault();
        setTodoList((currTodos) => {
            return currTodos.map(todoItem => {
                if (todoItem.key === key) {
                    return { ...todoItem, todo: updateTodo ? updateTodo : todoItem.todo }
                }
                return todoItem;
            })
        });
        setSwitchUpdate(!switchUpdate);
    }

    return (
        <div className="p-2 mb-2 border-2 flex justify-between">
            <div style={todoItem.isDone && !switchUpdate ? { textDecoration: "line-through" } : {}} className="mr-10 self-center" >
                {/*} <div style={switchUpdate ? { display: "none" } : { display: "block" }}>
                    {todoItem.todo}
                </div>
                <div style={switchUpdate ? { display: "block" } : { display: "none" }}>
                    <form onSubmit={(e) => handleSubmit(e, todoItem.key)}>
                        <input type="text" placeholder="update..." value={updateTodo ? updateTodo : todoItem.todo} onChange={(e) => setUpdateTodo(e.target.value)} className="text-[#172842]" required />
                        &nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        &nbsp;&nbsp;
                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                </div> */}
                { switchUpdate ? (         //way-2
                    <form onSubmit={(e) => handleSubmit(e, todoItem.key)}>
                        <input type="text" placeholder="update..." value={updateTodo ? updateTodo : todoItem.todo} onChange={(e) => setUpdateTodo(e.target.value)} className="text-[#172842]" required />
                        &nbsp;&nbsp;
                        <button type="submit">Submit</button>
                        &nbsp;&nbsp;
                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                ) : (
                    <div>{todoItem.todo}</div>
                ) }
            </div>
            <div>
                <input type="checkbox" checked={todoItem.isDone === true} onChange={(e) => handleCheck(e, todoItem.key)} />
                &nbsp;&nbsp;
                <button onClick={(e) => handleUpdate(e, todoItem.key)}>Update</button>
                &nbsp;&nbsp;
                <button onClick={(e) => handleDelete(e, todoItem.key)}>Delete</button>
            </div>
        </div>
    )
}