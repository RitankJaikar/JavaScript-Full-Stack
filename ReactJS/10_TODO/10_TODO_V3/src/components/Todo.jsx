import { useState } from "react";
import { useTodo } from "../context";

export default function Todo({ todoItem }) {
    const [isEditable, setIsEditable] = useState(false);
    const [updatedTodo, setUpdatedTodo] = useState(todoItem.todo);
    const {updateTodo, deleteTodo, toggleIsDone} = useTodo();

    const editTodo = () => {
        updateTodo(todoItem.key, updatedTodo);
        setIsEditable(false);
    }

    const toggleIsDoneFun = () => {
        toggleIsDone(todoItem.key);
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todoItem.isDone ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todoItem.isDone}
                onChange={toggleIsDoneFun}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todoItem.isDone ? "line-through" : ""}`}
                value={updatedTodo}
                onChange={(e) => setUpdatedTodo(e.target.value)}
                readOnly={!isEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todoItem.isDone) return;

                    if (isEditable) {
                        editTodo();
                    } else setIsEditable((prev) => !prev);
                }}
                disabled={todoItem.isDone}
            >
                {isEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todoItem.key)}
            >
                ❌
            </button>
        </div>
    );
}