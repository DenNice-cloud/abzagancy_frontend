import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
