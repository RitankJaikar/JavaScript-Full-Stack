import React from "react";
import { useState } from "react";

// Counter Component
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg shadow-md w-64 text-center">
      <h2 className="text-xl font-bold">Counter</h2>
      <p className="text-lg my-2">{count}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={() => setCount(count - 1)}
      >
        Decrement
      </button>
    </div>
  );
}
