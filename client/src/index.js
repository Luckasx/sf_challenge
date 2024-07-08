import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./leaflet.scss";


import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);