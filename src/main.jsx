import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./App.css";
import GesamtseitenContextProvider from "./contexts/GesamtseitenContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GesamtseitenContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GesamtseitenContextProvider>
  </StrictMode>
);
