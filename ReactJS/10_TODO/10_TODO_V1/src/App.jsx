import { useState } from "react";
import {Todos,TodoForm } from "./components";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';

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
      <TodoForm setTodoList={setTodoList} />
      <br /><br />
      <Todos todoList={todoList} setTodoList={setTodoList} />
    </>
  )
}

export default App;