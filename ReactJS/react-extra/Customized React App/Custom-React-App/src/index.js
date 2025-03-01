import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const App = () => {
    return <h1>Hello World</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);