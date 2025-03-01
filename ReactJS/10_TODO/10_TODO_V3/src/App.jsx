import { useState, useEffect } from "react";
import {Todos,TodoForm } from "./components";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { TodoContextProvider } from "./context";

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todo) => {
    setTodoList(currTodos => {
      return [...currTodos, {
        key: uuidv4(),
        todo: todo,
        isDone: false
      }]
    })
  }

  const deleteTodo = (key) => {
    setTodoList(currTodos => {
      return currTodos.filter(currTodo => currTodo.key !== key);
    })
  }

  const updateTodo = (key, todo) => {
    setTodoList(currTodos => {
      return currTodos.map(currTodo => {
        if(currTodo.key === key) {
          return {...currTodo, todo: todo}
        }
        return currTodo;
      })
    })
  }

  const toggleIsDone = (key) => {
    setTodoList(currTodos => {
      return currTodos.map(currTodo => {
        if(currTodo.key === key) {
          return {...currTodo, isDone: !currTodo.isDone}
        }
        return currTodo;
      })
    })
  }

  useEffect(() => {         //localStorage get
    const todoList = JSON.parse(localStorage.getItem("todos"));
    if(todoList && todoList.length>0) {
      setTodoList(todoList);
    }
  }, []);

  useEffect(() => {         //localStorage set
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  console.log(todoList, "#");

  return (
    <>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-xl rounded-lg px-4 py-3 text-white bg-[#314e8e80]">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <TodoContextProvider value={{todoList, addTodo, updateTodo, deleteTodo, toggleIsDone}}>
                <div className="mb-4">
                    {/* Todo form goes here */} 
                    <TodoForm />
                </div>
                <div>
                    {/*Loop and Add TodoItem here */}
                    <Todos />
                </div>
              </TodoContextProvider>
          </div>
      </div>
    </>
  )
}

export default App;