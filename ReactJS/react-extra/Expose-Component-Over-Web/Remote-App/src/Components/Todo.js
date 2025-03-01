import React from "react";
import { useState } from "react";

// Todo Component
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-64 mt-4">
      <h2 className="text-xl font-bold">Todo List</h2>
      <input
        className="border p-2 w-full my-2 rounded-lg"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
      />
      <button
        className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={addTask}
      >
        Add Task
      </button>
      <ul className="mt-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between p-2 bg-gray-100 my-1 rounded-lg"
          >
            {task}
            <button className="text-red-500" onClick={() => removeTask(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Todo };
