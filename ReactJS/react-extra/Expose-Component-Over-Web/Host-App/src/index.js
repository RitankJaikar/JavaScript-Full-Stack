import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const App = () => {
    const [ReceivedCounter, setReceivedCounter] = useState(null);
    const [ReceivedTodo, setReceivedTodo] = useState(null);

    useEffect(() => {
        import("remoteApp/CounterApp").then((module) => {
            setReceivedCounter(() => module.default);   //default
            // Ensure it's a React component
        });
    }, []); // ✅ Added dependency array to run only once

    useEffect(() => {
        import("remoteApp/TodoApp").then((module) => {
            setReceivedTodo(() => module.Todo); //named
        });
    }, []);

    return (
        <div>
            <h1>Host App or Fetch App</h1>
            <br />
            {ReceivedCounter ? <ReceivedCounter /> : <p>Loading remote component...</p>}
            <br />
            {ReceivedTodo ? <ReceivedTodo /> : <p>Loading remote component...</p>}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
