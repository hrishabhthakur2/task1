// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // The main App component of your app
import "./index.css"; // Your global styles (tailwind CSS, or custom styles)

// Initialize the app and mount it to the 'root' div in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
