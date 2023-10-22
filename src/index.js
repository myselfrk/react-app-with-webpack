import React from "react";
import { createRoot } from "react-dom/client";
import webpackImg from "./assets/img/webpack-icon.svg";
import "./index.scss";

function App() {
  return (
    <div>
      <img className="webpack-icon" src={webpackImg}></img>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
