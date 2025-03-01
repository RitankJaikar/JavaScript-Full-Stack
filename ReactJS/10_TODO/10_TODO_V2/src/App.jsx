import { useState } from "react";
import {Todos,TodoForm } from "./components";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { TodoContextProvider } from "./context/TodoContext";

function App() {
  const [todoList, setTodoList] = useState([
    {
      key: uuidv4(),
      todo: "Study",
      isDone: false
    },
    {
      key: uuidv4(),
      todo: "Sleep",
      isDone: false
    }
  ]);

  console.log(todoList, "#");

  return (
    <>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-xl rounded-lg px-4 py-3 text-white bg-[#314e8e80]">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <TodoContextProvider value={{todoList, setTodoList}}>
                <div className="mb-4">
                    {/* Todo form goes here */} 
                    <TodoForm />
                </div>
                <div>
                    {/*Loop and Add TodoItem here */}
                    <Todos todoList={todoList} />
                </div>
              </TodoContextProvider>
          </div>
      </div>
    </>
  )
}

export default App;