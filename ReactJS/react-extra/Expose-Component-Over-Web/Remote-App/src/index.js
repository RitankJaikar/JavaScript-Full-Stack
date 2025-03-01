import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import Counter from "./Components/Counter";
import { Todo } from "./Components/Todo";

const App = () => {
    return (
        <div>
            <h1>Remote App</h1>
            <br />
            <Counter />
            <br />
            <Todo />
        </div>
    )
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);