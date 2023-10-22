import React from "react";
import { createRoot } from "react-dom/client";
import webpackImg from "./assets/img/webpack-icon.svg";

function App() {
  return (
    <div>
      <img src={webpackImg}></img>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
