import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./leaflet.scss";
// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';


import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);